import React, {useContext, useEffect, useState} from 'react'
import MessagesList from "./MessagesList";
import NewMessage from "./Message/NewMessage";
import ChatOptionsContext from "../../ChatOptionsContext";
import {Channel} from "../../TransferObjects/Channels";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import Message from "../../TransferObjects/Message";
import {GET_MESSAGES, GET_MORE_MESSAGES, POST_MESSAGE} from "../../client";

function sortMessagesByDate(first: Message, second: Message) {
    const firstDate = new Date(first.datetime)
    const secondDate = new Date(second.datetime)
    return +firstDate - +secondDate
}

const POLLING_INTERVAL = 2000

export function ChatBody() {
    const {channel, user} = useContext(ChatOptionsContext)
    const [newMessage, setNewMessage] = useState<string>(localStorage.getItem('newMessage') || '')
    const [tempMessageAfterServerError, setTempMessageAfterServerError] = useState<Message | null>()
    const [messagesFromLatestQuery, setMessagesFromLatestQuery] = useState<Message[]>([])


    const {loading, data, error, startPolling, stopPolling, refetch} = useQuery(GET_MESSAGES,
        {variables: {
                channelId: Channel[channel]},
            pollInterval: POLLING_INTERVAL,
        })

    useEffect(() => {
        if(error){
            console.log(error)
        }
        if(!loading && data && !error){
            const sortedMessages = [...data.fetchLatestMessages].sort(sortMessagesByDate)
            setMessagesFromLatestQuery(sortedMessages)
        }
    }, [loading, data, error])

    useEffect(() => { refetch() }, [channel, user])


    const [getMoreMessagesQuery, {loading: loadingFromMoreMessagesQuery, data: dataFromMoreMessagesQuery, error: errorFromMoreMessagesQuery, called, variables}] = useLazyQuery(GET_MORE_MESSAGES,
        {variables: {
                channelId: Channel[channel],
                messageId: '0',
                old: false,
            },
        })

    useEffect(() => {
        if(errorFromMoreMessagesQuery){
            console.log(errorFromMoreMessagesQuery)
        }
        if(!loadingFromMoreMessagesQuery && dataFromMoreMessagesQuery && !errorFromMoreMessagesQuery){
                const sortedMessages = [...dataFromMoreMessagesQuery.fetchMoreMessages].sort(sortMessagesByDate)
                if(!sortedMessages.length){
                    if(variables && !variables.old) startPolling(POLLING_INTERVAL)
                    return
                }
                setMessagesFromLatestQuery(sortedMessages)
        }
    }, [loadingFromMoreMessagesQuery, dataFromMoreMessagesQuery, errorFromMoreMessagesQuery, variables])

    const [postMessage, {}] = useMutation(POST_MESSAGE, {variables: {
            channelId: Channel[channel],
            text: newMessage,
            userId: user,
        }})


    const handleMessageChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setNewMessage(event.currentTarget.value)
        localStorage.setItem('newMessage', event.currentTarget.value)
    }

    const getMoreMessages = (old: boolean, messageId: string) => {
        getMoreMessagesQuery({variables: {old, messageId, channelId: Channel[channel]}})
        stopPolling()
    }

    const sendMessage = () => {
        newMessage && postMessage({onCompleted: () => {
            refetch()
            setNewMessage('')
            }, onError: (error) => {
                alert('An error occured. Please try again')
                console.log(error)
            }})
    }


    return (
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <div className="selected-user">
                <span>{Channel[channel]} Channel</span>
            </div>
            <div className="chat-container">
                <MessagesList messages={tempMessageAfterServerError ? [...messagesFromLatestQuery,  tempMessageAfterServerError] : messagesFromLatestQuery} getMoreMessages={getMoreMessages} />
                <NewMessage message={newMessage} onBlur={handleMessageChange} onChange={handleMessageChange} sendMessage={sendMessage} />
            </div>
        </div>
    )
}


export default ChatBody;