import React from 'react'

interface ReadMoreProps {
    getMoreMessages: (old: boolean, messageId: string) => void;
    messageId: string;
    old?: boolean;
}

export const ReadMoreButton = ({getMoreMessages, messageId, old} : ReadMoreProps) => {
    return <li className="left" onClick={() => getMoreMessages(!!old, messageId)}>
        <button type="button" className="btn btn-info">
            Read More <i className={`fa ${old? 'fa-arrow-up' : 'fa-arrow-down'}`}/>
        </button>
    </li>
}

export default ReadMoreButton;