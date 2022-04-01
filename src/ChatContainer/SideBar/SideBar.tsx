import React from 'react'
import UserPicker from "./UserPicker";
import GroupPicker from "./GroupPicker";
import styled from "styled-components";


const PickersWrapper = styled.div`
    position: relative;
    padding: 1rem 0;
    border-right: 1px solid #e6ecf3;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
`

export function SideBar() {
    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
            <PickersWrapper>
                <UserPicker/>
                <GroupPicker/>
            </PickersWrapper>
        </div>
    )
}

export default SideBar;