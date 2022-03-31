import React, {useContext} from 'react'
import ChatOptionsContext from "../../ChatOptionsContext";
import Channel from "../../TransferObjects/Channels";

export function GroupPicker() {
    const {channel, setChannel} = useContext(ChatOptionsContext)

    return (
        <>
            <p>2. Choose your Channel</p>
            <ul className="users">
                <li className={`channel ${channel === Channel.General ? 'active-user' : ''}`} onClick={() => {
                    setChannel(Channel.General)
                    console.log(Channel.General)
                }}>
                    <p className="name-time">
                        <span className="name">General Channel</span>
                    </p>
                </li>
                <li className={`channel ${channel === Channel.Technology ? 'active-user' : ''}`} onClick={() => {
                    setChannel(Channel.Technology)
                    console.log(Channel.Technology)

                }}>
                    <p className="name-time">
                        <span className="name">Technology Channel</span>
                    </p>
                </li>
                <li className={`channel ${channel === Channel.LGTM ? 'active-user' : ''}`} onClick={() => {
                    setChannel(Channel.LGTM)
                    console.log(Channel.LGTM)
                }}>
                    <p className="name-time">
                        <span className="name">LGTM Channel</span>
                    </p>
                </li>
            </ul>
        </>
    )
}

export default GroupPicker;