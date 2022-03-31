import React from 'react'
import UserPicker from "./UserPicker";
import GroupPicker from "./GroupPicker";

export function SideBar() {
    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
            <div className="users-container">
                <UserPicker />
                <GroupPicker />
            </div>
        </div>
    )
}

export default SideBar;