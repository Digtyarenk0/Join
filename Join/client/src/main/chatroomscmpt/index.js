import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import EmptyChannel from './emptyChannel'
import {getChannels} from "./getChannels";
import {getLastMsg} from "./getLastMsg";
import ChannelItem from './channelItem'
import {actionPromiseChannels} from "../../redux/channels/actions";
import checkNested from "../../checkNested";
import HeaderChannels from "./headerChannels/header";
import Channel from "./messageComponent";
import {Route} from "react-router";
import {socketWaitingNotiUserThatDel, socketNotiUserThatDel, socketMyChannelsParticipation} from "../socketClient";

const actionGetChannels = () => async dispatch => dispatch(actionPromiseChannels(getChannels(), "getChannels"))

const Channels = ({channels, channelArray = [], newLastMSG, newChannel, completeDelUser}) => {
    const [arrLastMsg, setArrLastMsg] = useState([])

    useEffect(() => {
        channels()
    }, [newChannel])

    socketWaitingNotiUserThatDel(channels)

    useEffect(() => {
        if (completeDelUser) {
            socketNotiUserThatDel({userId: completeDelUser})
        }
    }, [completeDelUser])

    useEffect(() => {
        if (channelArray) setArrLastMsg(channelArray)
        if (newLastMSG) setArrLastMsg(newLastMSG)
    }, [channelArray, newLastMSG])

    if (arrLastMsg && arrLastMsg.length > 0) {
        return (
            <ul className="p-0 m-0 h-100 ChannelsWindowResize" id="UlChatsUserForMain">
                {arrLastMsg.map((item,index) => {
                    return <ChannelItem itemRooms={item} key={index}/>
                })}
            </ul>
        )
    }

    return (<EmptyChannel/>)
}

const mapChannelsToProps = state => {
    return {
        channelArray: (checkNested(state, 'channels', 'getChannels', 'payload', 'data', 'getChatsUs')),
        newChannel: (checkNested(state, 'adding', 'createChannel', 'payload', 'data', 'createChat')),
        newLastMSG: checkNested(state, 'channels', 'getChannelLastMSG', "payload", "data", "getChatsUs"),
        completeDelUser: (checkNested(state, 'adding', 'delUserOfChannel', 'payload', 'data', 'deleteUserOfChannel', 'content'))

    }
}

const CChannels = connect(mapChannelsToProps, {channels: actionGetChannels})(Channels)


const ChannelMainContainer = () => {
    return (
        <div className="d-flex col-12 w-100 h-100 m-0 p-0" style={{background: "#2f3236"}}>
            <div className="d-flex flex-column"
                 style={{width: "40%", maxWidth: "40%", minWidth: "20%", maxHeight: "100vmin"}}>
                <div className="p-1 justify-content-center align-items-center ChannelsDesigned"
                     style={{minHeight: "50px"}}>
                    <HeaderChannels/>
                </div>
                <div style={{maxWidth: "100%"}}>
                    <CChannels/>
                </div>
            </div>
            <div className="d-flex flex-column h-100 w-100 m-0 p-0 ChannelContainer"
                 style={{backgroundColor: "#33363d"}}>
                <Route path="/join/:id/:name" component={Channel} exact/>
            </div>

        </div>
    )
}

export {ChannelMainContainer}
