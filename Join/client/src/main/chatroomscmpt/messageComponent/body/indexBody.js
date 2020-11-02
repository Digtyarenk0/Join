import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import checkNested from "../../../../checkNested";
import {actionPromiseChosenChannelMessages} from "../../../../redux/useChannelMessages/actions";
import {getMessagesByChannel} from "./actionGetMessagesByChannel";
import {socketJoinToChannel} from '../../../socketClient'
import MessageItem from "./MessageItem";



const ChannelHistory = ({channelHistory, checkNewMessage, idChannel, getMSG}) => {
    const [arrayMessages, setArrayMessages] = useState([{
        id: "0", content: "Загрузка...", createdAt: "Загрузка...",
        user: {id: "0", username: "Загрузка...."}
    }])
    useEffect(() => {
        socketJoinToChannel()
    }, [idChannel])

    useEffect(() => {
        if (idChannel) getMSG({idChannel})
    }, [idChannel])


    useEffect(() => {
        if (channelHistory && channelHistory.length > 0) setArrayMessages(channelHistory)
    }, [channelHistory])
    if (channelHistory == 0) return <p className="text-center">Чат пуст</p>
    return (arrayMessages.map((item, index) => <MessageItem message={item} key={index}/>))
}

const mapChannelHistoryMessage = state => {
    return {
        channelHistory: checkNested(state, "chosenChannelMessages", "getMessagesByChannel", "payload", "data", "getMessagesByChat"),
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id'))
    }
}

const dispatchMessagesByChannel = ({idChannel}) => async dispatch => {
    dispatch(actionPromiseChosenChannelMessages(await getMessagesByChannel({idChannel}), "getMessagesByChannel"))
}

const CBodyMessageComponent = connect(mapChannelHistoryMessage, {getMSG: dispatchMessagesByChannel})(ChannelHistory)

export default () => {
    return (
        <div className="d-flex flex-column-reverse rounded-bottom p-0 h-100" >
            <ul className="d-flex flex-column-reverse m-0 p-0 BodyMessageComponent" id="ChatHistory">
                <CBodyMessageComponent/>
            </ul>
        </div>
    )
}