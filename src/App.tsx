import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import Header from "./Header/Header";
import ChatContainer from "./ChatContainer/ChatContainer";

import ChatOptionsContext, {useChatOptionsContextValue} from "./ChatOptionsContext";

const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
  cache: new InMemoryCache()
});

function App() {
  const chatOptionsValue = useChatOptionsContextValue()
  return (
    <>
      <ApolloProvider client={client} >
        <ChatOptionsContext.Provider value={chatOptionsValue}>
          <Header />
          <ChatContainer />
        </ChatOptionsContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
