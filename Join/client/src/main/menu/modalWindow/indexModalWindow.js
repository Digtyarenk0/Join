import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {actionLogout} from "../../../redux/user/actions";
import checkNested from "../../../checkNested";
import DropZoneUserSetIco from "./DropZoneUserSetIco";
import DropZoneUpdateUserIco from "./DropZoneUpdateUserIco";

const LogoutButton = ({actions}) =>
    (<Link to="/join">
        <button onClick={() => actions()} className="btn text-white justify-content-center"
                style={{
                    background: "#7289da",
                    fontWeight: "500"
                }}>Logout
        </button>
    </Link>)

const CLogoutButton = connect(null, {actions: actionLogout})(LogoutButton)


const IndexModalWindowUser = ({showSettingUser, user}) => {
    const [userSettingShow, setUserSettingShow] = useState(false);

    const SettingChannelHandleClose = () => {
        setUserSettingShow(false)
    }

    useEffect(() => {
        if (showSettingUser) {
            setUserSettingShow(true)
        }
    }, [showSettingUser])

    return (
        <Modal
            show={userSettingShow}
            onHide={SettingChannelHandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="d-flex flex-column ModalWindowBody">
                <div className="text-left" style={{borderBottom: "5px solid #474951"}}>
                    <h3 style={{color: "#f0f1f5"}}>МОЯ УЧЁТНАЯ ЗАПИСЬ</h3>
                </div>
                <div className="d-flex mt-3"
                     style={{background: "#292b2f", borderRadius: "8px", border: "1px solid #000", width: "90%"}}>
                    <div className="d-flex w-25 justify-content-center align-items-center">
                        {user && user.ico && user.ico.urlFilename ? <DropZoneUpdateUserIco/> : <DropZoneUserSetIco/>}
                    </div>
                    <div>
                        <div className="mt-2 mb-2 text-left">
                            <p className="TitlePshUserSetting">ИМЯ ПОЛЬЗОВАТЕЛЯ</p>
                            <div>
                                <p className="ContentUserSettingPsh">{user ? user.username + "#" + user.id : ""}</p>
                            </div>
                        </div>
                        <div className="mt-2 mb-2  text-left">
                            <p className="TitlePshUserSetting">СТАТУС</p>
                            <div>
                                <p className="ContentUserSettingPsh StatusUser"></p>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer className="ModalWindowFooter">
                <div>
                    <CLogoutButton/>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

const mapUserInfo = state => {
    return {
        user: checkNested(state, 'user', 'user')
    }
}

export default connect(mapUserInfo, null)(IndexModalWindowUser)