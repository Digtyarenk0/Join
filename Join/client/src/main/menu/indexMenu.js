import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionLogout} from '../../redux/user/actions';


const UserInfo = ({username}) => <p class="p-0 m-0 mt-2 text-truncate text-center"
                                    style={{color: "#43b581", fontWeight: "500"}}>{username || 'anon'}</p>
const ConnectedUserInfo = connect(state => ({username: state.user && state.user.user && state.user.user.username}))(UserInfo)


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


const Rooms = () => {
    return (
        <div style={{width: '70px', height: "70px"}}>
            <Link to="./">
                <div style={{width: '70px', height: "70px", background: "#36393f"}}
                     className="d-flex justify-content-center align-items-center rounded-circle">
                    <svg height="40px" viewBox="0 0 16 16" className="bi bi-award" fill="#43b581">
                        <path fillRule="evenodd"
                              d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"/>
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                </div>
            </Link>

        </div>
    )
}


const IndexMenu = () => {
    return (<div className="d-flex flex-column justify-content-between h-100 m-0"
                 style={{maxWidth: "7vw", minWidth: "100px", background: "#202225"}}>
            <div className="m-0 p-0">
                <ConnectedUserInfo/>
            </div>
            <div className="d-flex justify-content-center" style={{height: "85vmin"}}>
                <Rooms/>
            </div>
            <div className="text-center mb-2">
                f
                <CLogoutButton/>
            </div>
        </div>
    )
}

export default connect(null, null)(IndexMenu)