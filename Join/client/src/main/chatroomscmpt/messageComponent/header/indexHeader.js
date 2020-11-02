import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import checkNested from "../../../../checkNested";
import IndexModalWindowChannel from './modalWindow/indexModalWindowChannel'

const HeaderChannel = ({channelName}) => {
    const [roomName, setRoomsName] = useState("Загрузка...")
    const [channelSettingShow, setChannelSettingShow] = useState(false);


    useEffect(() => {
        setRoomsName(channelName)
    }, [channelName])

    const ChannelSettingHandleShow = () => {
        if (channelSettingShow) {
            setChannelSettingShow(false)
            setTimeout(() => setChannelSettingShow(true), 50)
        } else {
            setChannelSettingShow(true);
        }
    }

    return (<div className="d-flex justify-content-between HeaderMsgComponent pb-4"  style={{height: "53px"}}>
            <div className="pt-3 m-0">
                <p className="pl-2 m-0" style={{color: "#43b581"}}>{roomName}
                </p>
            </div>
            <button className="mr-4 mt-2" style={{background: "transparent", border: "none", outline: "none"}}
                    onClick={ChannelSettingHandleShow}>
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-gear HoverMyBtnSvgB9"
                     fill="#b9bbbe">
                    <path fillRule="#b9bbbe"
                          d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
                    <path fillRule="#b9bbbe"
                          d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
                </svg>
            </button>
            {channelSettingShow ? <IndexModalWindowChannel showSetting={channelSettingShow}/> : ""}
            <IndexModalWindowChannel/>
        </div>
    )
}
const mapNameChannel = state => {
    return {
        channelName: (checkNested(state, 'chosenChannel', 'getDataChosenChanel', 'payload', 'data', 'getChatById', 'name'))
    }
}

export default connect(mapNameChannel, null)(HeaderChannel)