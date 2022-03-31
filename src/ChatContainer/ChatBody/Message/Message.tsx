import React from 'react'

export function Message() {
    return (
        <li className="chat-right">
            <div className="chat-hour">08:59 <span
                className="fa fa-check-circle"/> <span
                className="chat-message">Sent</span></div>
            <div className="chat-text">Well I am not sure.
                <br/>I have results to show you.
            </div>
            <div className="chat-avatar">
                <img src="Joyse.png" alt="User"/>
                <div className="chat-name">Joyse</div>
            </div>
        </li>
    )
}

export default Message;