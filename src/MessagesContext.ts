import {createContext, useState, useContext} from 'react';
import {ApolloQueryResult, gql, useApolloClient, useQuery} from "@apollo/client";
import Message from "./TransferObjects/Message";
import User from "./TransferObjects/Users";
import Channel from "./TransferObjects/Channels";
import ChatOptionsContext from "./ChatOptionsContext";


export interface Messages {
    messages: Message[];
    // setMessages: (messages: Message[]) => void;
    fetchMessages: (channel: Channel) => Message[]
    fetchLatestMessages: (channel: Channel, messageId: string, old: boolean) => Promise<Message[]>;

    currentMessage: string;
    setCurrentMessage: (text: string) => void;

    postMessage: (channel: Channel, text: string, userId: User) => Promise<Message>;
}


const localStoredMessage = localStorage.getItem('currentMessage')
const defaultCurrentMessage = localStoredMessage === null ? '' : localStoredMessage


const GET_MESSAGES = gql`
    query {
        fetchLatestMessages(channelId: $channel){
            messageId
            text
            datetime
            userId
        }
    }
`

// export function useMessagesContextValue(): Messages {
//     const {user, channel} = useContext(ChatOptionsContext);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const client = useApolloClient()
//
//     const fetchMessages = () => {
//       const {loading, data} = useQuery<Message, {channelId: string}>(GET_MESSAGES, {variables: {channelId: Channel[channel]}, onCompleted: (data) => {
//               console.log(data);
//               setMessages([data]);
//           }})
//       return messages;
//     }
//     fetchMessages();
//     return {
//         currentMessage: "", fetchLatestMessages(channel: Channel, messageId: string, old: boolean): Promise<Message[]> {
//             return Promise.resolve([]);
//         }, postMessage(channel: Channel, text: string, userId: User): Promise<Message> {
//             return Promise.resolve({datetime: 'ss', messageId: 'ss', text: 'ss', userId: 'ss'});
//         }, setCurrentMessage(text: string): void {
//         },
//         fetchMessages,
//         messages,
//
//     }
// }
// export const MessagesContext = createContext<Messages>(useMessagesContextValue());
//
// export default MessagesContext;
