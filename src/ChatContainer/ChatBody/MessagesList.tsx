import React from 'react'
import Message from "../../Types/Message";
import MessageComponent from "./Message/Message";
import ReadMoreButton from "./ReadMoreButton";
import MessageWithUnsentFlag from "../../Types/MessageWithUnsentFlag";
import styled from "styled-components";

interface MessagesListProps {
    messages: (Message | MessageWithUnsentFlag)[],
    getMoreMessages: (old: boolean, messageId: string) => void,
}

const ListContainer = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`


export function MessagesList({messages, getMoreMessages}: MessagesListProps) {
    return (
        <ListContainer className="chat-box chatContainerScroll">
            <ReadMoreButton getMoreMessages={getMoreMessages} messageId={messages.length ? messages[0].messageId : ''}
                            old/>
            {messages.map((message: Message | MessageWithUnsentFlag) => <MessageComponent {...message}
                                                                                          key={message.messageId}/>
            )}
            <ReadMoreButton getMoreMessages={getMoreMessages}
                            messageId={messages.length ? messages[messages.length - 1].messageId : ''}/>
        </ListContainer>
    )
}

export default MessagesList;
