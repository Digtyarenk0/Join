import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import LiUserItem from "./liUserItem";
import {addingFriend} from "./addingFriend";
import {searchUser} from "./searchUser";
import {actionPromiseAdding} from "../../../../../redux/adding/actions";
import checkNested from "../../../../../checkNested";
import {actionPromise} from "../../../../../redux/stage/actions";


const actionAddFriend = (idFriendUser) => async dispatch => {
    dispatch(actionPromiseAdding(addingFriend({idFriendUser}), 'friend'))
}

const actionSearchUser = (valueSearchFriend) => async dispatch => {
    dispatch(actionPromise(searchUser({valueSearchFriend}), 'searchUser'))
}


const WindowSearchFriend = ({showSF, addFriend, search, errorbd, complete}) => {
    const [addFriendShow, setaddFriendShow] = useState(false);
    const FhandleClose = () => {
        setaddFriendShow(false)
    }


    useEffect(() => {
        if (showSF) {
            setaddFriendShow(true)
        }
    }, [showSF])

    const [valueSearchUser, setValueSearchUser] = useState("");


    useEffect(() => {
        let val = valueSearchUser.trim()
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

    }, [valueSearchUser])

    let idFriendUser = ''
    const addFriendSubmit = async () => {
        idFriendUser = idFriendUser.slice(11, idFriendUser.length)
        if (idFriendUser) {
            await addFriend(idFriendUser)
        }
        idFriendUser = ''
    }


    useEffect(() => {
        search(valueSearchUser)
    }, [valueSearchUser])


    const UserList = ({users}) => {
        const PSearchFriendError = ({txt}) => <p className="m-0 p-0 PSearchFriendError">{txt}</p>
        if (users && users.length > 0) {
            return (
                <ul className="UlUserForSearch" value={idFriendUser} onChange={(e) => {
                    idFriendUser = e.target.id
                }}>
                    {users.map((item, index) => <LiUserItem user={item} key={index}/>)}
                </ul>
            )
        }
        return (<ul id="UlUserForSearch">
            {users == null ? <PSearchFriendError txt={"Упс, такого чела нет"}/> : <PSearchFriendError txt={"Ищу"}/>}
        </ul>)
    }

    const mapStateSearchFriend = state => {
        return {
            users: checkNested(state, "stage", "searchUser", "payload", "data", "getUsersByUsername"),
        }
    }

    const CUserList = connect(mapStateSearchFriend, null)(UserList)

    return (
        <Modal
            show={addFriendShow}
            onHide={FhandleClose}
            keyboard={false}
            style={{background: "rgba(0,0,0,0.2)", paddingTop: "10vh"}}>
            <Modal.Body className="ModalWindowBody">
                <label style={{color: "#41B581", fontSize: "25px", paddingBottom: "5px"}}
                       htmlFor="inputSearchUsers">Кого будем искать?</label>
                <input type="text" className="w-75 pl-1 inputSearchUsers" autoComplete="off"
                       placeholder="Поиск..." value={valueSearchUser}
                       onChange={e => setValueSearchUser(e.target.value)}/>
                <div>
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

const mapStateAdding = state => {
    return {
        errorbd: (state && state.adding && state.adding.friend && state.adding.friend.payload &&
            state.adding.friend.payload.errors &&
            state.adding.friend.payload.errors[0] &&
            state.adding.friend.payload.errors[0].message),
        complete: checkNested(state, "adding", "friend", "payload", "data", "addFriend", "id")
    }
}

export default connect(mapStateAdding, {addFriend: actionAddFriend, search: actionSearchUser})(WindowSearchFriend)