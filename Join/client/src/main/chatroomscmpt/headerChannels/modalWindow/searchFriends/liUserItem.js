import React from "react";

export default ({user: {username, id}}) => {
    return (
        <li className="p-0 m-0" style={{listStyle: "none"}}>
            <div className="d-flex align-items-center">
                <input class="CustomCheckForUserFindList" type="radio" name="friend" id={"liUserToAdd"+id}/>
                <label htmlFor={"liUserToAdd" + id} className="p-0 pl-2 m-0"
                       style={{fontSize: "20px", color: "#c3c5c8", fontWeight: "500"}}>{username}</label>
            </div>
        </li>
    )

}