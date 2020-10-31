import checkNested from "../../../../../checkNested";
import {actionPromiseAdding} from "../../../../../redux/adding/actions";
import {actionPromise} from "../../../../../redux/stage/actions";
import {delUserOfChannel} from "./deleteUserOfChannel";
import {getUsersByChannel} from './actionGetUsersByChannel'
import {connect} from "react-redux";
import React, {useEffect} from "react";

const LiItemUserPartitionChannel = ({users: {id, username,media}, delUser, idChannel}) => {
    media = media && media[0] && media[0].urlFilename

    return (
    <li className="LiUserPartitionChannel" style={{listStyle: "none"}}>
             <div className="d-flex align-items-center justify-content-between">
                 <input className="CustomCheckForUserFindList SettingsChannelRadio" type="radio" name="friend" id={id}/>
                 <label htmlFor={"checkId"} className="p-0 pl-2 m-0"
                       style={{fontSize: "20px", color: "#c3c5c8", fontWeight: "500"}}>{username}</label>
                 <button className="p-2 ButtonDelUserChannel"
                         onClick={() => delUser({channelId: idChannel, userId: id})}>
                     <svg width="1.2em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor">
                         <path fillRule="evenodd"
                               d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                     </svg>
                 </button>
             </div>
         </li>
    )
}

const mapChannelInfoForDell = state => {
    return {
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id'))
    }
}

const actionDelUserOfChannel = ({channelId, userId}) => async dispatch => {
    return await dispatch(actionPromiseAdding(delUserOfChannel({channelId, userId}), 'delUserOfChannel'))
}

const CLiItemUserPartitionChannel = connect(mapChannelInfoForDell, {delUser: actionDelUserOfChannel})(LiItemUserPartitionChannel)

const ListOfParticipants = ({getUserList, users, idChannel,completeDelUser}) => {

    useEffect(() => {
        if (idChannel) {
            console.log(idChannel)
            getUserList({channelId:idChannel})
        }
    }, [idChannel,completeDelUser])

    return (
        <div>
            <p className="text-left ml-2" style={{color: "#8e9297", fontWeight: "500"}}>{users.length > 4 ? users.length + " Участников" : users.length + " Участника" }</p>
            <div className="p-0" style={{border: "2px solid rgba(0,0,0,0.1)", borderRadius: "5px"}}>
                <ul className="p-0 m-0">
                    {users.length > 0 ? users.map((item, index) => <CLiItemUserPartitionChannel users={item} key={index}/>) : ""}
                </ul>
            </div>
        </div>
    )
}

const actionGetUsersByChannel = ({channelId}) => async dispatch => {
    return await dispatch(actionPromise(getUsersByChannel({channelId}), 'getUsersByChannel'))
}

const mapUsersByChannel = state => {
    return {
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id')),
        users: (checkNested(state, 'stage', 'getUsersByChannel', 'payload', 'data', 'getUsersByChannel')),
        completeDelUser: (checkNested(state, 'adding', 'delUserOfChannel', 'payload', 'data', 'deleteUserOfChannel', 'content'))
    }
}

export default connect(mapUsersByChannel, {getUserList: actionGetUsersByChannel})(ListOfParticipants)