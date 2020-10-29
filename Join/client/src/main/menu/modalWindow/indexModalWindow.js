import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {actionLogout} from "../../../redux/user/actions";
import checkNested from "../../../checkNested";
import {socketStatusUser} from "../../socketClient";


const LogoutButton = ({actions}) =>
    (<Link to="/join">
        <button onClick={() => actions()} class="btn text-white justify-content-center"
                style={{
                    background: "#7289da",
                    fontWeight: "500"
                }}>Logout
        </button>
    </Link>)

const CLogoutButton = connect(null, {actions: actionLogout})(LogoutButton)

const IndexModalWindowUser = ({showSettingUser,user}) => {
    const [userSettingShow, setUserSettingShow] = useState(false);

    const SettingChannelHandleClose = () => {
        setUserSettingShow(false)
    }

    socketStatusUser()

    useEffect(() => {
        if (showSettingUser) {
            setUserSettingShow(true)
        }
    }, [showSettingUser])


    return (
        <Modal
            show={userSettingShow}
            // show={true}
            onHide={SettingChannelHandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="d-flex flex-column ModalWindowBody">
                <div className="text-left" style={{borderBottom: "5px solid #474951"}}>
                    <h3 style={{color: "#f0f1f5"}}>МОЯ УЧЁТНАЯ ЗАПИСЬ</h3>
                </div>
                <div className="d-flex mt-3"
                     style={{background: "#292b2f", borderRadius: "8px", border: "1px solid #000"}}>
                    <div className="d-flex w-25 justify-content-center align-items-center">
                        <img src="" alt="ava"/>
                    </div>
                    <div>
                        <div className="mt-2 mb-2 text-left">
                            <p className="TitlePshUserSetting">ИМЯ ПОЛЬЗОВАТЕЛЯ</p>
                            <div>
                                <p className="ContentUserSettingPsh">{user ? user.username + "#" + user.id  : ""}</p>
                            </div>
                        </div>
                        <div className="mt-2 mb-2  text-left">
                            <p className="TitlePshUserSetting">СТАТУС</p>
                            <div>
                                <p className="ContentUserSettingPsh StatusUser">Online</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer className="ModalWindowFooter">
                <div>
                    <CLogoutButton/>
                    {/*<button className="d-flex mr-4 mt-1 align-items-center submitButton ModalWindowSettingButton"*/}
                    {/*        onClick={ChannelAddingHandleShow}>*/}
                    {/*    <p className="p-2 text-white" style={{}}>Добавить пользователя</p>*/}
                    {/*    <svg width="1.3em" viewBox="0 0 16 16" className="bi bi-gear mt-1"*/}
                    {/*         fill="#fff">*/}
                    {/*        <path fillRule="evenodd"*/}
                    {/*              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                </div>
            </Modal.Footer>
        </Modal>
    )
}

const mapChannelInfo = state => {
    return {
        user: checkNested(state, 'user', 'user')
    }
}

export default connect(mapChannelInfo, null)(IndexModalWindowUser)