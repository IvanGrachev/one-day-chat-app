import Message from "./Message";

export interface MessageWithUnsentFlag extends Message {
    serverRespondedWithError?: boolean;
}

export default MessageWithUnsentFlag
