import React, {useEffect} from 'react'
import {ChannelMainContainer} from './chatroomscmpt/index'
import {connect} from "react-redux";
import IndexMenu from "./menu/indexMenu";
import {actionCheckLog} from "../redux/user/actions";
import checkNested from "../checkNested";
import {socketPostUserData,waitAddMeToNewChannel} from './socketClient'
import {actionPromiseChannels} from "../redux/channels/actions";
import {getChannels} from "./chatroomscmpt/getChannels";


const checkToken = () => async dispatch => {
    let check = await dispatch(actionCheckLog())
    return check
}

const Main = ({checkToken, access, user,getChannels}) => {
    if (localStorage.authToken && !access || !localStorage.authToken) {
        checkToken()
    }
    useEffect(() => {
        if (user){
            socketPostUserData(user)
            waitAddMeToNewChannel(getChannels)
        }
    }, [user])
    // checkStatus()
    return (
        <div class="d-flex w-100 h-100" style={{width: "100vw"}}>
            <IndexMenu/>
            <div class="bg-dark m-0 p-0" style={{width: "95vw"}}>
                <ChannelMainContainer/>
            </div>
        </div>)
}

const actionGetNewChannels = () => async dispatch => dispatch(actionPromiseChannels(getChannels(), "getChannels"))


const mapStateToProps = state => {
    if (state.user && state.user.access == false) {
        window.location = "/"
    }
    return {
        access: (checkNested(state, 'user', 'access')),
        user: (checkNested(state, 'user', 'user'))
    }
}

export default connect(mapStateToProps, {checkToken: checkToken, getChannels: actionGetNewChannels})(Main)