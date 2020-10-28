import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {actionPromiseAdding} from "../../../../../redux/adding/actions";
import {createChannel} from "./createChannel";

const actionCreateChannel = (inputChatName) => async dispatch => {
    dispatch(actionPromiseAdding(createChannel({inputChatName}), 'createChannel'))
}


const WindowCreateChannel = ({showCCH = false, create}) => {
    const [inputChatName, setInput] = useState('');

    const [chatNameError, setChatError] = useState('');
    const [cheateChatShow, setcheateChatShow] = useState(false);

    useEffect(() => {
        if (showCCH) {
            setcheateChatShow(true)
        }
    }, [showCCH])

    const handleClose = () => {
        setcheateChatShow(false)
    }

    const handleSubmit = async () => {
        if (inputChatName.length > 2) {
            setChatError("Создаю")
             let createResult = await create(inputChatName)
            // socket.emit('CreateChat', {data: data})
            setChatError("")
            setcheateChatShow(false)
        } else {
            setChatError("Хотя бы 3 буквы...")
        }
    }

    return (
        <Modal
            show={cheateChatShow}
            onHide={handleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "20vh"}}>
            <Modal.Body className="ModalWindowBody">
                <input type="text" className="pl-3 mt-2 ModalWindowBodyCreateChannelInput"
                       placeholder="Хочешь создать чат?" onChange={e => setInput(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer className="ModalWindowFooter">
                <p style={{color: "#41B581", fontSize: "20px", paddingBottom: "5px"}}>{chatNameError}</p>
                <Button variant="secondary" className="ModalWindowFooterButton" onClick={handleSubmit}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default connect(null, {create: actionCreateChannel})(WindowCreateChannel)