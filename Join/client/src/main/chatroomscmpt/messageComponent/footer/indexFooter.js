import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {actionPromiseAdding} from "../../../../redux/adding/actions";
import {sendMessageInChosenChannel} from "./actionSendMessage"
import {getMessagesByChannel} from "../body/actionGetMessagesByChannel"
import {socketSendMessage, socketNewMSGWait} from '../../../socketClient'
import checkNested from "../../../../checkNested";
import {actionPromiseChosenChannelMessages} from "../../../../redux/useChannelMessages/actions";


const Footer = ({idChannel, channelName, sendMSG, getMSG, checkNewMessage}) => {
    const [messageContent, setMessageContent] = useState('');
    useEffect(() => {
        socketSendMessage({idChannel})
        socketNewMSGWait(getMSG)
    }, [checkNewMessage])

    const fncSND = ({idChannel, messageContent}) => {
        messageContent = messageContent.replace(/(?:\r\n|\r|\n)/g, '\\n');
        sendMSG({idChannel, messageContent})
    }

    return (
        <div className="d-flex align-items-center justify-content-between rounded-top"
             style={{height: "5%!important"}}>
            <div>
                <label htmlFor="uploadFileMsg" style={{cursor: "pointer"}}
                       className="w-100 h-100 d-flex justify-content-center align-content-center">
                    <svg viewBox="0 0 16 16" className="bi bi-file-earmark-arrow-up w-50"
                         fill="rgb(114, 137, 218)">
                        <path
                            d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                        <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
                        <path fillRule="evenodd"
                              d="M8 12a.5.5 0 0 0 .5-.5V7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 7.707V11.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                </label>
                <input id="uploadFileMsg" type="file" style={{display: "none"}}/>
            </div>
            <div className="col-10 pb-sm-1 mb-xs-2"
                 style={{backgroundColor: "#3e424a", borderRadius: "15px", display: "relative"}}>
                <textarea id="textareamsg" value={messageContent}
                          onChange={e => setMessageContent(e.target.value)} maxLength="351"
                          className="pt-1 TextAreaMessage" rows="1"
                          placeholder={`Написать ${channelName ? "в " + channelName : ""}`}/>
            </div>
            <button className="col-1 mb-2 p-0" onClick={() => {
                fncSND({idChannel, messageContent})
                setMessageContent("")
            }}
                    style={{border: "none", outline: "none", backgroundColor: "transparent"}}
                    type="button">
                <svg viewBox="0 0 16 16" className="bi bi-cursor w-50 h-50" fill="rgb(114, 137, 218)">
                    <path fillRule="evenodd"
                          d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                </svg>
            </button>
        </div>
    )
}

const sendMessage = ({idChannel, messageContent}) => dispatch => {
    dispatch(actionPromiseAdding(sendMessageInChosenChannel({idChannel, messageContent}), "sendMessage"))
}

const dispatchMessagesByChannel = ({idChannel}) => async dispatch => {
    dispatch(actionPromiseChosenChannelMessages(await getMessagesByChannel({idChannel}), "getMessagesByChannel"))
}


const mapIdChannel = state => {
    return {
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id')),
        channelName: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'name')),
        checkNewMessage: checkNested(state, "adding", "sendMessage", "payload", "data", "postMessage", "id")
    }
}

export default connect(mapIdChannel, {sendMSG: sendMessage, getMSG: dispatchMessagesByChannel})(Footer)