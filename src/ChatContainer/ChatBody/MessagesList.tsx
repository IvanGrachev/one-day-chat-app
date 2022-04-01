import React, {useContext} from 'react'
import Message from "../../TransferObjects/Message";
import ChatOptionsContext from "../../ChatOptionsContext";
import MessageComponent from "./Message/Message";
import ReadMoreButton from "./ReadMoreButton";

interface MessagesListProps {
    messages: Message[],
    getMoreMessages: (old: boolean, messageId: string) => void,
}



export function MessagesList({messages, getMoreMessages}: MessagesListProps) {
    const {user} = useContext(ChatOptionsContext)

    return (
        <ul className="chat-box chatContainerScroll">
            <ReadMoreButton getMoreMessages={getMoreMessages} messageId={messages.length ? messages[0].messageId : ''} old />
            {messages.map((message: Message) => <MessageComponent {...message} />

            )}
            <ReadMoreButton getMoreMessages={getMoreMessages} messageId={messages.length ? messages[messages.length - 1].messageId : ''} />
        </ul>
    )
}

export default MessagesList;