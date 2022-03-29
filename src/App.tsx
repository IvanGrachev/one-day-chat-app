import React from 'react';

import Header from "./Header/Header";
import ChatContainer from "./ChatContainer/ChatContainer";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
  cache: new InMemoryCache()
});


client
.query({
  query: gql`
    query {
      fetchLatestMessages(channelId: "1"){
        messageId
        text
        datetime
        userId
      }
    }
  `
})
.then(result => console.log(result));

function App() {
  return (
    <>
      <ApolloProvider client={client} >
        <Header />
        <ChatContainer />
      </ApolloProvider>
    </>
  );
}

export default App;
