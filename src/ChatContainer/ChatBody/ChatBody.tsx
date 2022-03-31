import React, {useContext, useEffect, useState} from 'react'
import MessagesList from "./MessagesList";
import NewMessage from "./Message/NewMessage";
import ChatOptionsContext from "../../ChatOptionsContext";
import {Channel} from "../../TransferObjects/Channels";
import {gql, useQuery} from "@apollo/client";
import Message from "../../TransferObjects/Message";


const GET_MESSAGES = gql`
    query FetchLatestMessages($channelId: String!) {
        fetchLatestMessages(channelId: $channelId){
            messageId
            text
            datetime
            userId
        }
    }
`

const GET_MORE_MESSAGES = gql`
    query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
        fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old){
            messageId
            text
            datetime
            userId
        }
    }
`

function useFetchLatestOrFetchMoreQuery(channel: Channel, user: string) : {messages: Message[], loading: boolean, refetchLatest: any, refetchMoreMessages: any} {
    const {loading, data, error, refetch: refetchLatest} = useQuery(GET_MESSAGES, {variables: {channelId: Channel[channel]}, pollInterval: 1000})

    const messages: Message[] = data ? data.fetchLatestMessages : []


    const {loading: loadingMore, data: dataMore, error: errorMore, refetch: refetchMoreMessages } = useQuery(GET_MORE_MESSAGES,
        {variables: {
                channelId: Channel[channel],
                messageId: '0'
            }, skip: true})

    const messagesMore: Message[] = !loadingMore && dataMore? dataMore.fetchMoreMessages : []


    useEffect(() => { refetchLatest() }, [channel, user])


    return {messages: messagesMore.length? messagesMore: messages, loading: loading || loadingMore, refetchLatest, refetchMoreMessages}
}

export function ChatBody() {


    const {channel, user} = useContext(ChatOptionsContext)
    const [newMessage, setNewMessage] = useState<string>(localStorage.getItem('newMessage') || '')

    const {messages, loading, refetchLatest, refetchMoreMessages} = useFetchLatestOrFetchMoreQuery(channel, user)


    const handleMessageChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNewMessage(event.currentTarget.value)
        localStorage.setItem('newMessage', event.currentTarget.value)
    }

    const getMoreMessages = (old: boolean, messageId: string) => {
        refetchMoreMessages({old, messageId})
    }

    const sendMessage = () => {

    }

    return (
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <div className="selected-user">
                <span>{Channel[channel]} Channel</span>
            </div>
            <div className="chat-container">
                <MessagesList messages={messages} getMoreMessages={getMoreMessages} />
                <NewMessage message={newMessage} onBlur={handleMessageChange} onChange={handleMessageChange} sendMessage={sendMessage} onEnter={handleMessageChange} />
            </div>
        </div>
    )
}


export default ChatBody;