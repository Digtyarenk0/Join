import React, {useEffect, useState} from "react";
import checkNested from "../../../../../checkNested";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import WindowAddToChannel from "./addingToChannel/windowAddToChannel";
import ListOfParticipants from './userListPartitionChannel'


const WindowSettingsChannel = ({showSetting, channelName, users}) => {
    const [channelSettingShow, setChannelSettingShow] = useState(false);
    const [channelAddingShow, setChannelAddingShow] = useState(false);

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
            onHide={SettingChannelHandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="d-flex flex-column align-items-center justify-content-around ModalWindowBody">
                <div style={{color: "#f0f1f5"}} className="w-100">
                    <div style={{borderBottom: "5px solid #474951"}}>
                        <h4 style={{color: "#f0f1f5"}}>Настройки канала</h4>
                    </div>
                    <div>
                        <p className="ChannelNameSettings">{channelName}</p>
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
                        <p className="p-2 text-white" style={{}}>Добавить пользователя</p>
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

const mapChannelInfo = state => {
    return {
        idChannel: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'id')),
        channelName: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'name'))
    }
}

export default connect(mapChannelInfo, null)(WindowSettingsChannel)