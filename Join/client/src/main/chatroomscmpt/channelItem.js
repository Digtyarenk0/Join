import {Link} from "react-router-dom";
import deffaultavatar from "./messageComponent/deffaultAvatar.ico";
import React from "react";

export default ({itemRooms: {id, name = "Загрузка...", lastMessage}}, index) => {
    let createdAt, content
    let user = {id: "", username: ""}
    if (!lastMessage) {
        createdAt = '';
        content = 'Чат пуст'
    } else {
        createdAt = lastMessage.createdAt
        content = lastMessage.content
        user = lastMessage.user
        if (user.username.search(":") === -1) {
            user.username += ":"
        } else {
            user.username = user.username
        }
    }
    let media = user && user.media[0] && user.media[0].urlFilename
    createdAt ? createdAt = new Date(Number(createdAt)).getHours() + ":" + new Date(Number(createdAt)).getMinutes() : createdAt = ""
    return (<li className="m-0 p-0 RoomsChatsElement" key={index} style={{listStyle: 'none'}}>
        <Link to={`/join/${id}/${name}`}>
            <div id={id} className=" p-1 m-0 d-flex" style={{background: "transparent"}}>
                <div className="m-1 pr-1"><img
                    src={"http://localhost:4000/media/" + (media ? media : "deffaultAvatar.ico")} alt="avatar"
                    style={{height: "50px", borderRadius: "50%"}}/></div>
                <div className="d-flex flex-column h-100 col-10">
                    <div className="d-flex justify-content-between p-0 pt-1 h-100"><p class="pb-0 m-0 clipChannel"
                                                                                      style={{
                                                                                          color: "#e3e3e3",
                                                                                          fontWeight: "500",
                                                                                          maxWidth: "15vw"
                                                                                      }}>{name}</p>
                        <p className="pb-0 m-0" style={{fontSize: "12px", color: "#43b581"}}>{createdAt}</p>
                    </div>
                    <div className="m-0 ml-0 p-0 pb-1 d-flex justify-content-start "
                         style={{maxWidth: "80%", maxHeight: "50px", overflow: "hidden"}}>
                        <p style={{color: "#43b581"}} className="m-0 clipChannel">{user.username}&nbsp;</p>
                        <p className=" clipChannel"
                           style={{color: "#b9bbbe", maxWidth: "6vw", maxHeight: "25px"}}>{content}</p></div>
                </div>
            </div>
        </Link></li>)
}