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

function getFinalMessages(data: Message[], dataMore: Message[], dataFromLatest: Message[]): Message[] {
    if(dataMore && dataMore.length) return [...dataMore]
    else if(dataFromLatest && dataFromLatest.length) return [...dataFromLatest]
    return [...data]
}

function useFetchLatestOrFetchMoreQuery(channel: Channel, user: string) : {messages: Message[], loading: boolean, refetchLatest: any, getMoreMessagesQuery: any} {
    const [messagesFromLatestQuery, setMessagesFromLatestQuery] = useState<Message[] | null>(null)

    const {loading, data, error, refetch: refetchLatest} = useQuery(GET_MESSAGES,
        {variables: {
            channelId: Channel[channel]},
            pollInterval: 0})

    const messages: Message[] = data ? data.fetchLatestMessages : []


    const [getMoreMessagesQuery, {loading: loadingMore, data: dataMore, error: errorMore, called}] = useLazyQuery(GET_MORE_MESSAGES,
        {variables: {
                channelId: Channel[channel],
                messageId: '0'
            }})

    const messagesMore: Message[] = !loadingMore && dataMore? dataMore.fetchMoreMessages : []

    if(dataMore && dataMore.fetchMoreMessages && dataMore.fetchMoreMessages.length && dataMore.fetchMoreMessages !== messagesFromLatestQuery){
        setMessagesFromLatestQuery(dataMore.fetchMoreMessages)
    }
    useEffect(() => { refetchLatest() }, [channel, user])

    const finalMessages =  getFinalMessages(messages, messagesMore, messagesFromLatestQuery || [])

    return {messages: finalMessages.sort(sortMessagesByDate), loading: loading || loadingMore, refetchLatest, getMoreMessagesQuery}
}

export function ChatBody() {


    const {channel, user} = useContext(ChatOptionsContext)
    const [newMessage, setNewMessage] = useState<string>(localStorage.getItem('newMessage') || '')

    const {messages, loading, refetchLatest, getMoreMessagesQuery} = useFetchLatestOrFetchMoreQuery(channel, user)
    const [postMessage, {loading: loadingPostMessage, error}] = useMutation(POST_MESSAGE, {variables: {
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
    }

    const sendMessage = () => {
        newMessage && postMessage({onCompleted: () => {
            refetchLatest();
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
                <MessagesList messages={messages} getMoreMessages={getMoreMessages} />
                <NewMessage message={newMessage} onBlur={handleMessageChange} onChange={handleMessageChange} sendMessage={sendMessage} />
            </div>
        </div>
    )
}


export default ChatBody;