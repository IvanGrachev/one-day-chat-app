import React, {useContext} from 'react'
import Message from "../../TransferObjects/Message";
import ChatOptionsContext from "../../ChatOptionsContext";
import Users, {User} from "../../TransferObjects/Users";

interface MessagesListProps {
    messages: Message[],
    getMoreMessages: (old: boolean, messageId: string) => void,
}

const UserPics = {
    [Users.Sam]: 'Sam.png',
    [Users.Joyse]: 'Joyse.png',
    [Users.Russell]: 'Russel.png',
}



export function MessagesList({messages, getMoreMessages}: MessagesListProps) {
    const {user} = useContext(ChatOptionsContext)

    return (
        <ul className="chat-box chatContainerScroll">
            <li className="chat-left" onClick={() => getMoreMessages(true, messages ? messages[0].messageId : '')}>
                <button type="button" className="btn btn-info">
                    Read More <i className="fa fa-arrow-up"/>
                </button>
            </li>
            {messages.map(({ messageId, userId, datetime, text }: Message) =>
                <li className={user === userId ? 'chat-right' : 'chat-left'} key={messageId}>
                    <div className="chat-avatar">
                        <img src={`${userId}.png`} alt="User"/>
                        <div className="chat-name">{userId}</div>
                    </div>
                    <div className="chat-text">{text}
                    </div>
                    <div className="chat-hour">{datetime}</div>
                </li>
            )}
            {/*<li className="chat-left">*/}
            {/*    <div className="chat-avatar">*/}
            {/*        <img src="Russell.png" alt="User"/>*/}
            {/*        <div className="chat-name">Russell</div>*/}
            {/*    </div>*/}
            {/*    <div className="chat-text">Hello, I'm Russell.*/}
            {/*        <br/>How can I help you today?*/}
            {/*    </div>*/}
            {/*    <div className="chat-hour">08:55</div>*/}
            {/*</li>*/}
            {/*<li className="chat-right">*/}
            {/*    <div className="chat-hour">08:56 <span className="fa fa-check-circle"/>*/}
            {/*        <span*/}
            {/*            className="chat-message">Sent</span></div>*/}
            {/*    <div className="chat-text">Hi, Russell*/}
            {/*        <br/> I need more information about Developer Plan.*/}
            {/*    </div>*/}
            {/*    <div className="chat-avatar">*/}
            {/*        <img src="Joyse.png" alt="User"/>*/}
            {/*        <div className="chat-name">Joyse</div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className="chat-left">*/}
            {/*    <div className="chat-avatar">*/}
            {/*        <img src="Sam.png" alt="User"/>*/}
            {/*        <div className="chat-name">Sam</div>*/}
            {/*    </div>*/}
            {/*    <div className="chat-text">Are we meeting today?*/}
            {/*        <br/>Project has been already finished and I have results to show you.*/}
            {/*    </div>*/}
            {/*    <div className="chat-hour">08:57</div>*/}
            {/*</li>*/}
            {/*<li className="chat-right">*/}
            {/*    <div className="chat-hour">08:59 <span*/}
            {/*        className="fa fa-check-circle"/> <span*/}
            {/*        className="chat-message">Sent</span></div>*/}
            {/*    <div className="chat-text">Well I am not sure.*/}
            {/*        <br/>I have results to show you.*/}
            {/*    </div>*/}
            {/*    <div className="chat-avatar">*/}
            {/*        <img src="Joyse.png" alt="User"/>*/}
            {/*        <div className="chat-name">Joyse</div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li className="chat-right">*/}
            {/*    <div className="chat-hour">09:02 <span*/}
            {/*        className="fa fa-exclamation-circle"/> <span*/}
            {/*        className="chat-message">Error</span></div>*/}
            {/*    <div className="chat-text">Hey, can you receive my chat?</div>*/}
            {/*    <div className="chat-avatar">*/}
            {/*        <img src="Joyse.png" alt="User"/>*/}
            {/*        <div className="chat-name">Joyse</div>*/}
            {/*    </div>*/}
            {/*</li>*/}
            <li className="left" onClick={() => getMoreMessages(true, messages ? messages[messages.length - 1].messageId : '')}>
                <button type="button" className="btn btn-info">
                    Read More <i className="fa fa-arrow-down"/>
                </button>
            </li>
        </ul>
    )
}

export default MessagesList;