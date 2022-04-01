import React, {useContext} from 'react'
import ChatOptionsContext from "../../../ChatOptionsContext";
import Message from "../../../TransferObjects/Message";


function addZeroIfLessThanTen(number: number): string{
    return number < 10 ? '0' + number: number.toString()
}

function formatDate(dateTime: string) : string {
    const date = new Date(dateTime)
    return `${addZeroIfLessThanTen(date.getHours())}:${addZeroIfLessThanTen(date.getMinutes())}`
}

export function MessageComponent({userId, datetime, text, messageId}: Message) {
    const {user} = useContext(ChatOptionsContext)

    if(user === userId){
        return (
            <li className="chat-right">
                <div className="chat-hour">{formatDate(datetime)} <span className="fa fa-check-circle" style={{margin: '0 5px'}}/>
                    <span
                        className="chat-message">Sent</span></div>
                <div className="chat-text">{text}
                </div>
                <div className="chat-avatar">
                    <img src={`${userId}.png`} alt="User"/>
                    <div className="chat-name">{userId}</div>
                </div>
            </li>
        )
    }
    return (
        <li className="chat-left" key={messageId}>
            <div className="chat-avatar">
                <img src={`${userId}.png`} alt="User"/>
                <div className="chat-name">{userId}</div>
            </div>
            <div className="chat-text">{text}
            </div>
            <div className="chat-hour">{formatDate(datetime)}</div>
        </li>
    )
}

export default MessageComponent;