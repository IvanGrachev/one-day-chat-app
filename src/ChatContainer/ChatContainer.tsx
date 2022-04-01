import React from 'react';
import SideBar from "./SideBar/SideBar";
import ChatBody from "./ChatBody/ChatBody";
import styled from "styled-components";

const ChatContainerWrapper = styled.div`
    border: 0;
    background: #f4f5fb;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-bottom: 2rem;
    box-shadow: none;
`

export function ChatContainer() {
    return (
        <div className="content-wrapper">
            <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <ChatContainerWrapper className="m-0">
                        <div className="row no-gutters">
                            <SideBar/>
                            <ChatBody/>
                        </div>
                    </ChatContainerWrapper>
                </div>
            </div>
        </div>)
}

export default ChatContainer;
