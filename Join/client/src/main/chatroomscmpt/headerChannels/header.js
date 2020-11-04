import React, {useEffect, useState} from "react";
import WindowSearchFriend from "./modalWindow/searchFriends/windowSearchFriend";
import WindowCreateChannel from "./modalWindow/createChannel/windowCreateChannel";

export default () => {
    const [valueSearch, setValueSearch] = useState('');
    const [addFriendShow, setAddFriendShow] = useState(false);
    const [createChatShow, setCreateChatShow] = useState(false);

    const createChatHandleShow = () => {
        if (createChatShow) {
            setCreateChatShow(false)
            setTimeout(() => setCreateChatShow(true), 50)
        } else {
            setCreateChatShow(true);
        }
    }

    const FriendHandleShow = () => {
        if (addFriendShow) {
            setAddFriendShow(false)
            setTimeout(() => setAddFriendShow(true), 50)
        } else {
            setAddFriendShow(true);
        }
    }


    useEffect(() => {
        let val = valueSearch.trim()
        let itemsUlRooms = document.querySelectorAll('#UlChatsUserForMain li');
        if (val != '') {
            itemsUlRooms.forEach(function (elem) {
                if (elem.innerText.split(/\n/ig)[0].search(val) == -1) {
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
    }, [valueSearch])


    return (
        <div className="d-flex justify-content-between pt-1" >
            <div style={{background: "#202225", borderRadius: "5px", width: "50%" , height: "35px"}}
                 className="d-flex justify-content-between">
                <input id="inputSearchRooms" type="text" className="w-75 pl-1" autoComplete="off"
                       style={{background: "transparent", color: "#c3c5c8", borderRadius: "5px"}}
                       placeholder="Поиск..." value={valueSearch} onChange={e => setValueSearch(e.target.value)}/>
                <button style={{background: "transparent", border: "none", outline: "none"}}
                        onClick={() => setValueSearch('')}
                        className="pb-1">
                    <svg width="1.2em" viewBox="0 0 16 16" className="bi bi-hash p-0 m-0" fill="#b9bbbe">
                        <path
                            d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z"/>
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>
                <button className="ml-2" style={{background: "transparent", border: "none", outline: "none"}}
                        onClick={FriendHandleShow}>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-person-plus-fill"
                         fill="#b9bbbe">
                        <path fillRule="evenodd"
                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </button>
            </div>
            <button className="ml-2" style={{background: "transparent", border: "none", outline: "none"}}
                    onClick={createChatHandleShow}>
                <svg height="1.7em" viewBox="0 0 15 15" className="bi bi-plus" fill="#b9bbbe">
                    <path fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
            {addFriendShow ? <WindowSearchFriend showSF={addFriendShow}/> : ""}
            {createChatShow ? <WindowCreateChannel showCCH={createChatShow}/> : ""}

        </div>
    )
}
