import React from 'react';
import SideBar from "./SideBar/SideBar";
import ChatBody from "./ChatBody/ChatBody";

export function ChatContainer() {
    return (
        <div className="content-wrapper">
            <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card m-0">
                        <div className="row no-gutters">
                            <SideBar />
                            <ChatBody />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default ChatContainer;