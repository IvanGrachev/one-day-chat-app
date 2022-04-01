import React, {useContext} from 'react'
import ChatOptionsContext from "../../ChatOptionsContext";
import Channel from "../../Types/Channels";
import styled from "styled-components";

const ChannelListContainer = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const ChannelListItem = styled.li`
    position: relative;
    width: 100%;
    padding: 10px 1rem;
    cursor: pointer;
    border-bottom: 1px solid #f0f4f8;
`

const ChannelNameWrapper = styled.p`
    font-weight: 600;
    font-size: .85rem;
    display: inline-block;
`

const ChannelName = styled.span`
    font-weight: 600;
    font-size: .85rem;
`

const SelectedChannelItem = styled(ChannelListItem)`
    background-color: #ffffff;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f9fb), to(#ffffff));
    background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);
    background-image: -moz-linear-gradient(right, #f7f9fb, #ffffff);
    background-image: -ms-linear-gradient(right, #f7f9fb, #ffffff);
    background-image: -o-linear-gradient(right, #f7f9fb, #ffffff);
    background-image: linear-gradient(right, #f7f9fb, #ffffff);
`

export function GroupPicker() {
    const {channel, setChannel} = useContext(ChatOptionsContext)

    const renderChannel = (channelToRender: Channel, label: string) => {
        if (channelToRender === channel) {
            return (
                <SelectedChannelItem onClick={() => {
                    setChannel(channelToRender)
                }}>
                    <ChannelNameWrapper>
                        <ChannelName>{label}</ChannelName>
                    </ChannelNameWrapper>
                </SelectedChannelItem>
            )
        } else {
            return (<ChannelListItem onClick={() => {
                    setChannel(channelToRender)

                }}>
                    <ChannelNameWrapper>
                        <ChannelName>{label}</ChannelName>
                    </ChannelNameWrapper>
                </ChannelListItem>
            )
        }
    }

    return (
        <>
            <p>2. Choose your Channel</p>
            <ChannelListContainer>
                {renderChannel(Channel.General, 'General Channel')}
                {renderChannel(Channel.Technology, 'Technology Channel')}
                {renderChannel(Channel.LGTM, 'LGTM Channel')}
            </ChannelListContainer>
        </>
    )
}

export default GroupPicker;
