import {createContext, useState} from 'react';
import User from "./Types/Users";
import Channel from "./Types/Channels";

export interface ChatOptions {
    user: User;
    channel: Channel;
    setUser: (user: User) => void;
    setChannel: (channel: Channel) => void;
}


const localStorageUser = localStorage.getItem('user')
const defaultUser = localStorageUser === null ? User.Joyse : <User>localStorageUser

const localStorageChannel = localStorage.getItem('channel')
const defaultChannel = localStorageChannel === null ? Channel.General : <Channel>+localStorageChannel

export const chatOptionsDefault: ChatOptions = {
    user: defaultUser,
    channel: defaultChannel,
    setUser: (user) => {
    },
    setChannel: (channel) => {
    },
}

export function useChatOptionsContextValue(): ChatOptions {
    const [user, setUser] = useState<User>(defaultUser);
    const [channel, setChannel] = useState<Channel>(defaultChannel);

    return {
        user,
        channel,
        setUser: (user: User) => {
            setUser(user)
            localStorage.setItem('user', user)
        },
        setChannel: (channel: Channel) => {
            setChannel(channel)
            localStorage.setItem('channel', channel.toString())
        },
    }
}

export const ChatOptionsContext = createContext<ChatOptions>(chatOptionsDefault);


export default ChatOptionsContext;
