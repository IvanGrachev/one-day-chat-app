import React, {useContext} from 'react'
import ChatOptionsContext from "../../../ChatOptionsContext";
import MessageWithUnsentFlag from "../../../Types/MessageWithUnsentFlag";
import styled from "styled-components";


const MessageLeft = styled.li`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-bottom: 40px;
`

const MessageRight = styled(MessageLeft)`
    justify-content: flex-end;
`

const MessageAvatar = styled.div`
    margin-right: 20px;
`

const MessageStatusTime = styled.div`
    padding: 0;
    margin-left: 10px;
    font-size: 0.80rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const MessageStatusText = styled.span`
    font-size: .75rem;
    color: #999999;
    text-align: center;
    margin-right: 5px;
`

const MessageText = styled.div`
    padding: 0.4rem 1rem;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #ffffff;
    font-weight: 300;
    line-height: 150%;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 10px;
        left: -20px;
        border: 10px solid;
        border-color: transparent #ffffff transparent transparent;
    }
`

const MessageTextRight = styled(MessageText)`
    text-align: right;
    margin-right: 20px;
    &:before {
        right: -20px;
        border-color: transparent transparent transparent #ffffff;
        left: inherit;
    }
`

const MessageName = styled.div`
    font-size: .75rem;
    color: #999999;
    text-align: center;
`

const MessageImage = styled.img`
    width: 48px;
    height: 48px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
`

function addZeroIfLessThanTen(number: number): string {
    return number < 10 ? '0' + number : number.toString()
}

function getLocalTimeFromDate(dateTime: string): string {
    const date = new Date(dateTime)
    return `${addZeroIfLessThanTen(date.getHours())}:${addZeroIfLessThanTen(date.getMinutes())}`
}

export function MessageComponent({userId, datetime, text, messageId, serverRespondedWithError}: MessageWithUnsentFlag) {
    const {user} = useContext(ChatOptionsContext)

    if (user === userId) {
        return (
            <MessageRight>
                <MessageStatusTime>{getLocalTimeFromDate(datetime)} <span
                    className={`fa ${!!serverRespondedWithError ? 'fa-exclamation-circle' : 'fa-check-circle'}`}
                    style={{
                        margin: '0 5px',
                        color: !!serverRespondedWithError ? '#b71e3c' : '#9ec94a',
                        fontSize: '16px'
                    }}/>
                    <MessageStatusText>{!!serverRespondedWithError ? 'Error' : 'Sent'}</MessageStatusText></MessageStatusTime>
                <MessageTextRight>{text}</MessageTextRight>
                <MessageAvatar>
                    <MessageImage src={`${userId}.png`} alt="User"/>
                    <MessageName>{userId}</MessageName>
                </MessageAvatar>
            </MessageRight>
        )
    }
    return (
        <MessageLeft>
            <MessageAvatar>
                <MessageImage src={`${userId}.png`} alt="User"/>
                <MessageName>{userId}</MessageName>
            </MessageAvatar>
            <MessageText>{text}</MessageText>
            <MessageStatusTime>{getLocalTimeFromDate(datetime)}</MessageStatusTime>
        </MessageLeft>
    )
}

export default MessageComponent;
