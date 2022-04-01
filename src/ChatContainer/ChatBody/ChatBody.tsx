import React, {useContext, useEffect, useState} from 'react'
import styled from "styled-components";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";

import MessagesList from "./MessagesList";
import NewMessage from "./Message/NewMessage";
import ChatOptionsContext from "../../ChatOptionsContext";
import {Channel} from "../../Types/Channels";
import Message from "../../Types/Message";
import {GET_MESSAGES, GET_MORE_MESSAGES, POST_MESSAGE} from "../../client";
import MessageWithUnsentFlag from "../../Types/MessageWithUnsentFlag";

function sortMessagesByDate(first: Message, second: Message) {
    const firstDate = new Date(first.datetime)
    const secondDate = new Date(second.datetime)
    return +firstDate - +secondDate
}

const POLLING_INTERVAL = 2000

const ChannelTitle = styled.div`
    width: 100%;
    padding: 0 15px;
    min-height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #e6ecf3;
    -webkit-border-radius: 0 3px 0 0;
    -moz-border-radius: 0 3px 0 0;
    border-radius: 0 3px 0 0;
`;

const ChatContainer = styled.div`
    position: relative;
    padding: 1rem;
`

export function ChatBody() {
    const {channel, user} = useContext(ChatOptionsContext)
    const [newMessage, setNewMessage] = useState<string>(localStorage.getItem('newMessage') || '')
    const [tempMessagesAfterServerError, setTempMessageAfterServerError] = useState<MessageWithUnsentFlag[]>([])
    const [messagesFromLatestQuery, setMessagesFromLatestQuery] = useState<Message[]>([])


    const {loading, data, error, startPolling, stopPolling, refetch} = useQuery(GET_MESSAGES,
        {
            variables: {
                channelId: Channel[channel]
            },
            pollInterval: POLLING_INTERVAL,
        })

    useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (!loading && data && !error) {
            const sortedMessages = [...data.fetchLatestMessages].sort(sortMessagesByDate)
            setMessagesFromLatestQuery(sortedMessages)
        }
    }, [loading, data, error])

    useEffect(() => {
        refetch()
        setTempMessageAfterServerError([])
    }, [channel, user])


    const [getMoreMessagesQuery, {
        loading: loadingFromMoreMessagesQuery,
        data: dataFromMoreMessagesQuery,
        error: errorFromMoreMessagesQuery,
        called,
        variables
    }] = useLazyQuery(GET_MORE_MESSAGES,
        {
            variables: {
                channelId: Channel[channel],
                messageId: '0',
                old: false,
            },
        })

    useEffect(() => {
        if (errorFromMoreMessagesQuery) {
            console.log(errorFromMoreMessagesQuery)
        }
        if (!loadingFromMoreMessagesQuery && dataFromMoreMessagesQuery && !errorFromMoreMessagesQuery) {
            const sortedMessages = [...dataFromMoreMessagesQuery.fetchMoreMessages].sort(sortMessagesByDate)
            if (!sortedMessages.length) {
                if (variables && !variables.old) startPolling(POLLING_INTERVAL)
                return
            }
            setTempMessageAfterServerError([])
            setMessagesFromLatestQuery(sortedMessages)
        }
    }, [loadingFromMoreMessagesQuery, dataFromMoreMessagesQuery, errorFromMoreMessagesQuery, variables])

    const [postMessage, {}] = useMutation(POST_MESSAGE, {
        variables: {
            channelId: Channel[channel],
            text: newMessage,
            userId: user,
        }
    })


    const handleMessageChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setNewMessage(event.currentTarget.value)
        localStorage.setItem('newMessage', event.currentTarget.value)
    }

    const getMoreMessages = (old: boolean, messageId: string) => {
        getMoreMessagesQuery({variables: {old, messageId, channelId: Channel[channel]}})
        stopPolling()
    }

    const sendMessage = () => {
        newMessage && postMessage({
            onCompleted: () => {
                refetch()
                setNewMessage('')
                localStorage.removeItem('newMessage')
            }, onError: (error) => {
                console.log(error)
                setTempMessageAfterServerError([...tempMessagesAfterServerError, {
                    datetime: new Date().toISOString(),
                    text: newMessage,
                    userId: user,
                    messageId: new Date().toISOString(),
                    serverRespondedWithError: true,
                }])
            }
        })
    }


    return (
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <ChannelTitle>
                <span>{Channel[channel]} Channel</span>
            </ChannelTitle>
            <ChatContainer>
                <MessagesList
                    messages={tempMessagesAfterServerError.length ? [...messagesFromLatestQuery, ...tempMessagesAfterServerError] : messagesFromLatestQuery}
                    getMoreMessages={getMoreMessages}/>
                <NewMessage message={newMessage} onBlur={handleMessageChange} onChange={handleMessageChange}
                            sendMessage={sendMessage}/>
            </ChatContainer>
        </div>
    )
}


export default ChatBody;
