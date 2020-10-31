import React from "react";

export default ({user: {username, id, media}}) => {
     media = media && media[0] && media[0].urlFilename
    return (
        <label htmlFor={"liUserToAdd" + id} className="d-flex align-items-center LiSearchUser">
        <li className="p-0 m-0 ">
            <div className="d-flex align-items-center  ml-3">
                <input class="CustomCheckForUserFindList" type="radio" name="friend" id={"liUserToAdd"+id} />
                <div className="d-flex align-items-center pl-2">
                    <img style={{width: "25px"}} src={"http://localhost:4000/media/" + (media ? media : "deffaultAvatar.ico")} alt="ERR"/>
                    <label htmlFor={"liUserToAdd" + id} className="p-0 pl-2 m-0"
                           style={{fontSize: "20px", color: "#c3c5c8", fontWeight: "500"}}>{username}</label>
                </div>
            </div>
            </li>
        </label>
    )
}