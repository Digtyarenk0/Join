import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import checkNested from "../../../../checkNested";
import {actionPromiseChosenChannelMessages} from "../../../../redux/useChannelMessages/actions";
import {getMessagesByChannel} from "./actionGetMessagesByChannel";
import {socketMyChannelsParticipation, socketJoinToChannel, socketNewMSGWait} from '../../../socketClient'

const MessageItem = ({message: {id, content, createdAt, user: {id: userId, username, media}, type}}, index) => {
    media ? media[0] ? media = media[0] : media = {} : media = {}
    media ? media.urlFilename ? media = media : media.urlFilename = "" : media.urlFilename = ""
    createdAt === "Загрузка..." ? createdAt = "" : createdAt = new Date(Number(createdAt)).getHours() + ":" + new Date(Number(createdAt)).getMinutes()
    if (type == "text") {
        return (<li class="p-0 m-0 " style={{listStyle: "none"}} key={index}>
            <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                <div className="m-1"><img
                    src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                    alt="avatar"
                    style={{height: "25px", width: "25px", borderRadius: "100%"}}/></div>
                <div className="d-flex flex-column">
                    <div className="d-flex m-1 p-0"><p class="mb-0" style={{color: "#43b581"}}>{username}</p><p
                        className="mb-0 p-1 pb-0"
                        style={{fontSize: "12px"}}>{createdAt}</p>
                    </div>
                    <div className="m-0 ml-1 p-0 pb-1 text-left"><p class="m-0 clip" style={{
                        color: "#b9bbbe",
                        maxWidth: "42vw"
                    }}>{content}</p>
                    </div>
                </div>
            </div>
        </li>)
    }
    if (type == "photo") {
        return (
            <li class="p-0 m-0 " style={{listStyle: "none"}} key={index}>
                <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                    <div className="m-1"><img
                        src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                        alt="avatar"
                        style={{height: "25px", width: "25px", borderRadius: "100%"}}/></div>
                    <div className="d-flex flex-column">
                        <div className="d-flex m-1 p-0"><p class="mb-0" style={{color: "#43b581"}}>{username}</p><p
                            className="mb-0 p-1 pb-0"
                            style={{fontSize: "12px"}}>{createdAt}</p>
                        </div>
                        <div className="m-0 ml-1 p-0 pb-1 text-left">
                            <a href={content}>
                                <img style={{maxHeight: "150px"}} src={"http://localhost:4000/media/" + content}
                                     alt="ERRLOAD"/>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
    return (
        <li className="p-0 m-0 " style={{listStyle: "none"}} key={index}>
            <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                <div className="m-1"><img
                    src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                    alt="avatar" style={{height: "25px"}}/></div>
                <div className="d-flex flex-column">
                    <div className="d-flex m-1 p-0"><p className="mb-0" style={{color: "#43b581"}}>*</p><p
                        className="mb-0 p-1 pb-0"
                        style={{fontSize: "12px"}}></p>
                    </div>
                    <div className="m-0 ml-1 p-0 pb-1 text-left">
                        <p className="m-0 clip" style={{
                            color: "#b9bbbe",
                            maxWidth: "42vw"
                        }}>Данные об этом сообщении повреждены</p>
                    </div>
                </div>
            </div>
        </li>

    )
}

const ChannelHistory = ({channelHistory, checkNewMessage, idChannel, getMSG}) => {
    const [arrayMessages, setArrayMessages] = useState([{
        id: "0", content: "Загрузка...", createdAt: "Загрузка...",
        user: {id: "0", username: "Загрузка...."}
    }])
    // const [status, setStatus] = useState('')
    useEffect(() => {
        socketJoinToChannel()
    }, [idChannel])


    useEffect(() => {
        if (idChannel) socketMyChannelsParticipation({idChannel})
    }, [idChannel])

    //     useEffect(() => {
    //     // socketMyChannelsParticipation({idChannel})
    // }, [checkNewMessage])

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
        <div className="d-flex flex-column-reverse h-100 rounded-bottom p-0" style={{maxHeight: "85vmin"}}>
            <ul className="d-flex flex-column-reverse m-0 p-0 BodyMessageComponent" id="ChatHistory">
                <CBodyMessageComponent/>
            </ul>
        </div>
    )
}