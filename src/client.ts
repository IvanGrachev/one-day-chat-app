import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const GET_MESSAGES = gql`
    query FetchLatestMessages($channelId: String!) {
        fetchLatestMessages(channelId: $channelId){
            messageId
            text
            datetime
            userId
        }
    }
`

export const GET_MORE_MESSAGES = gql`
    query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
        fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old){
            messageId
            text
            datetime
            userId
        }
    }
`

export const POST_MESSAGE = gql`
    mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
        postMessage(channelId: $channelId, text: $text, userId: $userId) {
            userId,
            datetime,
            text,
            messageId
        }
    }
`

export const client = new ApolloClient({
    uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
    cache: new InMemoryCache()
});


export default client
