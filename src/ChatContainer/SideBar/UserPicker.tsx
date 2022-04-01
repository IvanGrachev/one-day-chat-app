import React, {ChangeEvent, useContext} from 'react'
import ChatOptionsContext from "../../ChatOptionsContext";
import User from "../../Types/Users";

export function UserPicker() {
    const {user, setUser} = useContext(ChatOptionsContext)

    return (
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">1. Choose your user</label>
            <select className="form-control" id="exampleFormControlSelect1" value={user}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setUser(User[e.currentTarget.value as keyof typeof User])
                    }}>
                <option>Joyse</option>
                <option>Sam</option>
                <option>Russell</option>
            </select>
        </div>
    )
}

export default UserPicker;
