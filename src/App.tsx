import React from 'react';
import {ApolloProvider} from "@apollo/client";

import Header from "./Header/Header";
import ChatContainer from "./ChatContainer/ChatContainer";

import ChatOptionsContext, {useChatOptionsContextValue} from "./ChatOptionsContext";
import client from "./client";


function App() {
    const chatOptionsValue = useChatOptionsContextValue()
    return (
        <>
            <ApolloProvider client={client}>
                <ChatOptionsContext.Provider value={chatOptionsValue}>
                    <Header/>
                    <ChatContainer/>
                </ChatOptionsContext.Provider>
            </ApolloProvider>
        </>
    );
}

export default App;
