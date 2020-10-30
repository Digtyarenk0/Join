import React, {useEffect} from 'react';
import {connect} from "react-redux";
import EmptyChannel from './emptyChannel'
import {getChannels} from "./getChannels";
import ChannelItem from './channelItem'
import {actionPromiseChannels} from "../../redux/channels/actions";
import checkNested from "../../checkNested";
import HeaderChannels from "./headerChannels/header";
import Channel from "./messageComponent";
import {Route} from "react-router";
import {socketWaitingNotiUserThatDel, socketNotiUserThatDel} from "../socketClient";

const actionGetChannels = () => async dispatch => dispatch(actionPromiseChannels(getChannels(), "getChannels"))

const Channels = ({channels, channelArray = [], newChannel, completeDelUser}) => {
    useEffect(() => {
        channels()
    }, [newChannel])

    socketWaitingNotiUserThatDel(channels)

    useEffect(() => {
        if (completeDelUser) {
            socketNotiUserThatDel({userId: completeDelUser})
        }
    }, [completeDelUser])

    if (channelArray) {
        return (
            <ul className="p-0 m-0 h-100 w-100 ChannelsWindowResize" id="UlChatsUserForMain">
                {channelArray.map((item, index) => <ChannelItem itemRooms={item} key={index}/>)}
            </ul>
        )
    }
    return (<EmptyChannel/>)
}

const mapChannelsToProps = state => {
    return {
        channelArray: (checkNested(state, 'channels', 'getChannels', 'payload', 'data', 'getChatsUs')),
        newChannel: (checkNested(state, 'adding', 'createChannel', 'payload', 'data', 'createChat')),
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
                <CChannels/>
            </div>
            <div className="d-flex flex-column h-100 w-100 m-0 p-0 ChannelContainer"
                 style={{backgroundColor: "#33363d"}}>
                <Route path="/join/:id/:name" component={Channel} exact/>
            </div>

        </div>
    )
}

export {ChannelMainContainer}
