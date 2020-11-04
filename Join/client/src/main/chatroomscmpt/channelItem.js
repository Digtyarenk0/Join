import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import checkNested from "../../checkNested";


const ChannelItem = ({itemRooms: {id, name = "Загрузка...",lastMessage},lastMSG}, index) => {
    let createdAt, content
    let user
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
    let media = user && user.media && user.media[0] && user.media[0].urlFilename
    createdAt ? createdAt = new Date(Number(createdAt)).getHours() + ":" + new Date(Number(createdAt)).getMinutes() : createdAt = ""
    let typePhoto = <p style={{fontWeight: "600", color: "#39cfde"}} className="clipChannel">Фотография</p>
    let typeText = <p className="clipChannel"
                      style={{color: "#b9bbbe", maxWidth: "6vw", maxHeight: "25px"}}> {content}</p>
    return (
        <li className="m-0 p-0 w-100 RoomsChatsElement" key={index} style={{listStyle: 'none'}}>
            <Link to={`/join/${id}/${name}`}>
                <div id={id} className=" p-1 m-0 d-flex" style={{background: "transparent"}}>
                    <div className="m-1 pr-1"><img
                        src={"http://localhost:4000/media/" + (media ? media : "deffaultAvatar.ico")} alt="avatar"
                        style={{height: "50px", width: "50px", borderRadius: "50%"}}/></div>
                    <div className="d-flex flex-column h-100 w-100">
                        <div className="d-flex justify-content-between p-0 pt-1 h-100"><p
                            className="pb-0 m-0 clipChannel PNameForSearch"
                            style={{
                                color: "#e3e3e3",
                                fontWeight: "500",
                                maxWidth: "15vw"
                            }}>{name}</p>
                            <p className="pb-0 m-0" style={{fontSize: "12px", color: "#43b581"}}>{createdAt}</p>
                        </div>
                        <div className="m-0 ml-0 p-0 pb-1 d-flex justify-content-start "
                             style={{maxWidth: "80%", maxHeight: "50px", overflow: "hidden"}}>
                            <p style={{color: "#43b581"}}
                               className="m-0 clipChannel">{user ? user.username : ""}&nbsp;</p>
                            {lastMessage && lastMessage.type == "photo" ? typePhoto : typeText}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}
const mapChannelItem = state => {
    return {
        lastMSG: checkNested(state, 'channels', 'getChannelLastMSG', "payload", "data", "getChatsUs")
    }
}


export default connect(mapChannelItem,null)(ChannelItem)