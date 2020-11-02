import React, {useEffect, useState} from "react";
import checkNested from "../../../../../checkNested";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import WindowAddToChannel from "./addingToChannel/windowAddToChannel";
import ListOfParticipants from './userListPartitionChannel'
import {changeChannelName} from './actionChangeChannelName'
import {actionPromiseAdding} from "../../../../../redux/adding/actions";


const WindowSettingsChannel = ({showSetting, channelName, idChannel, changeName, users}) => {
    const [channelSettingShow, setChannelSettingShow] = useState(false);
    const [channelAddingShow, setChannelAddingShow] = useState(false);
    const [channelChangeName, setChannelChangeName] = useState(false);
    const [newNameChannel, setNewNameChannel] = useState(false);

    const changeShow = () => {
        setChannelChangeName(!channelChangeName)
    }

    const kayUpChangeNameChannel = e => {
        if (e.key === 'Enter') {
            changeShow()
            changeName({id: idChannel, name: newNameChannel})
            console.log("LOLS")
        }
    }

    const SettingChannelHandleClose = () => {
        setChannelSettingShow(false)
    }

    useEffect(() => {
        if (showSetting) {
            setChannelSettingShow(true)
        }
    }, [showSetting])


    const ChannelAddingHandleShow = () => {
        if (channelAddingShow) {
            setChannelAddingShow(false)
            setTimeout(() => setChannelAddingShow(true), 50)
        } else {
            setChannelAddingShow(true);
        }
    }


    return (
        <Modal
            show={channelSettingShow}
            // show={true}
            onHide={SettingChannelHandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="d-flex flex-column align-items-center justify-content-around ModalWindowBody">
                <div style={{color: "#f0f1f5"}} className="w-100">
                    <div style={{borderBottom: "5px solid #474951"}}>
                        <h4 style={{color: "#f0f1f5"}}>Настройки канала</h4>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        {channelChangeName ? <input className="InptChangeNameChannel" onKeyUp={kayUpChangeNameChannel}
                                                    onChange={(e) => setNewNameChannel(e.target.value)} placeholder={channelName}
                                                    type="text"/> :
                            <p className="ChannelNameSettings">{channelName}</p>}
                        <button className="ml-2 ResAll" onClick={changeShow}>
                            <svg width="1.3em" viewBox="0 0 16 16" className="bi bi-cursor-text ColChangeChannelNamesvg"
                                 fill="#7289da">
                                <path fillRule="evenodd"
                                      d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z"/>
                                <path
                                    d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ListOfParticipants/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="ModalWindowFooter">
                <div>
                    <button className="d-flex mr-4 mt-1 align-items-center submitButton ModalWindowSettingButton"
                            onClick={ChannelAddingHandleShow}>
                        <p className="p-2 text-white">Добавить пользователя</p>
                        <svg width="1.3em" viewBox="0 0 16 16" className="bi bi-gear mt-1"
                             fill="#fff">
                            <path fillRule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </button>
                </div>
            </Modal.Footer>
            {channelAddingShow ? <WindowAddToChannel showCS={channelAddingShow}/> : ""}
        </Modal>
    )
}

const dispatchNewChannelName = ({id, name}) => async dispatch => dispatch(actionPromiseAdding(changeChannelName({id, name})),"changeChannelName")

const mapChannelInfo = state => {
    return {
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id')),
        channelName: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'name'))
    }
}

export default connect(mapChannelInfo, {changeName: dispatchNewChannelName})(WindowSettingsChannel)