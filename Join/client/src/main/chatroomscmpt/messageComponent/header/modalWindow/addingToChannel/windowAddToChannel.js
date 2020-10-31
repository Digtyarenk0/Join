import {actionPromiseAdding} from "../../../../../../redux/adding/actions";
import {addingFriendToChannel} from "./addingFriendToChannel";
import {actionPromise} from "../../../../../../redux/stage/actions";
import {searchFriendUser} from "./searchFiend";
import React, {useEffect, useState} from "react";
import LiUserItem from "../../../../headerChannels/modalWindow/searchFriends/liUserItem";
import checkNested from "../../../../../../checkNested";
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {socketAddToChannel} from '../../../../../socketClient'
import {getUsersByChannel} from "../actionGetUsersByChannel";

const WindowAddingToChannel = ({showCS, addFriendToChannel, search, channelId, errorbd, complete, settingGetDelUser}) => {
    const [channelAddingShow, setChannelAddingShow] = useState(false);
    const [idFriendUser, setIdFriendUser] = useState("");
    const SettingChannelHandleClose = () => {
        setChannelAddingShow(false)
        settingGetDelUser({channelId: channelId})
        console.log("YES")
    }

    useEffect(() => {
        socketAddToChannel({idFriendUser, channelId})
    }, [complete])


    useEffect(() => {
        if (showCS) {
            setChannelAddingShow(true)
        }
    }, [showCS])

    const [valueSearchFriend, setValueSearchFriend] = useState("");


    useEffect(() => {
        let val = valueSearchFriend.trim()
        let itemsUlRooms = document.querySelectorAll('#UlUserForSearch li');
        if (val != '') {
            itemsUlRooms.forEach(function (elem) {
                if (elem.innerText.search(val) == -1) {
                    elem.hidden = true;
                } else {
                    elem.hidden = false;
                }
            });
        } else {
            itemsUlRooms.forEach(function (elem) {
                elem.hidden = false;
            });
        }

    }, [valueSearchFriend])


    const addFriendSubmit = async () => {
        if (idFriendUser) {
            await addFriendToChannel({channelId: channelId, userId: idFriendUser})
        }
    }

    useEffect(() => {
        search(valueSearchFriend)
    }, [valueSearchFriend])


    const UserList = ({users}) => {
        const PSearchFriendError = ({txt}) => <p className="m-0 p-0 PSearchFriendError">{txt}</p>;
        if (users) {
            users = users.filter(x => !!x)
            return (
                <ul className="pl-0 UlUserForSearch" value={idFriendUser}
                    onChange={(e) => setIdFriendUser(e.target.id.slice(11, e.target.id.length))}>
                    {users.map((item, index) => {
                        if (item) return <LiUserItem user={item} key={index}/>
                    })}
                </ul>
            )
        }
        return (<ul id="UlUserForSearch">
            {users ? <PSearchFriendError txt={"Упс, такого чела нет"}/> : <PSearchFriendError txt={"Ищу"}/>}
        </ul>)
    }

    const mapStateSearchFriend = state => {
        return {
            users: checkNested(state, "stage", "searchFriendUser", "payload", "data", "getFriends"),
        }
    }

    const CUserList = connect(mapStateSearchFriend, null)(UserList)

    return (
        <Modal
            show={channelAddingShow}
            onHide={SettingChannelHandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="ModalWindowBody">
                <label style={{color: "#41B581", fontSize: "25px", paddingBottom: "5px"}}
                       htmlFor="inputSearchUsers">Кого будем добавлять?</label>
                <input type="text" className="w-75 pl-1 inputSearchUsers" autoComplete="off"
                       placeholder="Поиск..." value={valueSearchFriend}
                       onChange={e => setValueSearchFriend(e.target.value)}/>
                <div className="mt-2 DivContainerForUserSearchList">
                    <CUserList/>
                </div>
            </Modal.Body>
            <Modal.Footer className="ModalWindowFooter">
                <p className="PSearchFriendBDNotification">{errorbd ? errorbd : complete ? "Пользователь добавлен" : ""}</p>
                <Button variant="secondary" onClick={addFriendSubmit} className="ModalWindowFooterButton">
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


const dispatchAddFriendToChannel = ({channelId, userId}) => async dispatch => {
    dispatch(actionPromiseAdding(addingFriendToChannel({channelId, userId}), 'addFriendToChannelMap'))
}

const dispatchSearchFriendUser = (usernameSearchFriend) => async dispatch => {
    console.log(usernameSearchFriend)
    return await dispatch(actionPromise(searchFriendUser({usernameSearchFriend}), 'searchFriendUser'))
}

const dispatchGetUsersByChannel = ({channelId}) => async dispatch => {
    return await dispatch(actionPromise(getUsersByChannel({channelId}), 'getUsersByChannel'))
}

const mapStateChannelSetting = state => {
    return {
        channelId: checkNested(state, "chosenChannel", "getDataChosenChanel", "payload", "data", "getChatById", "id"),
        errorbd: (state && state.adding && state.adding.addFriendToChannelMap && state.adding.addFriendToChannelMap.payload &&
            state.adding.addFriendToChannelMap.payload.errors &&
            state.adding.addFriendToChannelMap.payload.errors[0] &&
            state.adding.addFriendToChannelMap.payload.errors[0].message),
        complete: checkNested(state, "adding", "addFriendToChannelMap", "payload", "data", "addUserToChat")
    }
}

export default connect(mapStateChannelSetting, {
    addFriendToChannel: dispatchAddFriendToChannel,
    search: dispatchSearchFriendUser,
    settingGetDelUser: dispatchGetUsersByChannel
})(WindowAddingToChannel)