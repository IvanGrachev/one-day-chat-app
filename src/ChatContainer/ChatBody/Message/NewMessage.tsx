import React from 'react'
import newMessage from "./NewMessage";

// <NewMessage message={newMessage} onBlur={handleMessageChange} onChange={handleMessageChange} sendMessage={sendMessage} onEnter={handleMessageChange} />

interface NewMessageProps {
    message: string,
    onBlur: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    onChange: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    sendMessage: () => void;
}


export function NewMessage({onBlur, onChange, sendMessage, message}: NewMessageProps) {
    return (
        <div className="form-group mt-3 mb-0">
            <textarea className="form-control" rows={3}
                      placeholder="Type your message here..." value={message} onChange={onChange} onBlur={onBlur} onSubmit={sendMessage}/>
            <button type="button" className="btn btn-info" onClick={sendMessage}>
                Send Message <i className="fa fa-send"/>
            </button>
        </div>
    )
}

export default NewMessage;