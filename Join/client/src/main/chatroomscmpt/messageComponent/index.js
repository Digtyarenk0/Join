import React, {useEffect} from "react";
import {connect} from "react-redux";
import {actionPromiseChosenChannel} from "../../../redux/useChannel/actions";
import {getChosenChannel} from './getChosenChannel'
import Header from "./header/indexHeader";
import Footer from "./footer/indexFooter";
import Body from './body/indexBody'


const Channel = ({match: {params: {id}}, fetchChannel}) => {
    useEffect(() => {
        fetchChannel({idChannel: id})
    }, [id])

    return (
        <div className="d-flex flex-column justify-content-between p-0 m-0 w-100 h-100" style={{resize: "none"}}>
            <Header/>
            <Body/>
            <Footer/>
        </div>
    )
}

const actionGetChannel = ({idChannel}) => async dispatch => {
    dispatch(actionPromiseChosenChannel(getChosenChannel(idChannel), "getDataChosenChanel"))
}


export default connect(null, {fetchChannel: actionGetChannel})(Channel)