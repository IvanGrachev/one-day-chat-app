import React from 'react'
import styled from "styled-components";

interface ReadMoreProps {
    getMoreMessages: (old: boolean, messageId: string) => void;
    messageId: string;
    old?: boolean;
}

const ReadMoreContainer = styled.li`
`

export const ReadMoreButton = ({getMoreMessages, messageId, old}: ReadMoreProps) => {
    return <ReadMoreContainer onClick={() => getMoreMessages(!!old, messageId)} className="mb-3">
        <button type="button" className="btn btn-info">
            Read More <i className={`fa ${old ? 'fa-arrow-up' : 'fa-arrow-down'}`}/>
        </button>
    </ReadMoreContainer>
}

export default ReadMoreButton;
