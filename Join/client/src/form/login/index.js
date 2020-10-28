import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {mutationLogin} from "../mutationLogin";
import checkNested from "../../checkNested";
import {actionCheckLog, actionLogin} from "../../redux/user/actions";
import {actionPromise} from "../../redux/stage/actions";

const actionsLog = ({login, password}) => async dispatch => {
    const tokens = await dispatch(actionPromise(mutationLogin({login, password}), "login"))
    if (tokens && tokens.data && tokens.data.login && tokens.data.login.accessToken && tokens.data.login.refreshToken) {
        const user = await dispatch(actionLogin(tokens.data.login))
        console.log(user)
        return user
    }
    return tokens
}

const checkToken = () => async dispatch => {
    let check = await dispatch(actionCheckLog())
    return check
}

const Login = ({onLogin, checkToken, errorbd = '', loader,access}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    if (localStorage.authToken) {
        checkToken()
    }
    if(localStorage.authToken && access){
        window.location = '/join'
    }

    return (<div className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
                 style={{width: "15%"}}>
        <div className="border-0 p-3" style={{
            backgroundColor: "#36393f",
            width: "30%",
            boxShadow: " 7px 7px 30px 1px rgba(0,0,0,0.55)",
            borderRadius: "12px"
        }}>
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center flex-column">
                    <p className="TitleFormInput">С возвращением!</p>
                    <p className="LabelForInputForm" style={{fontSize: "16px"}}>Мы так рады видеть вас
                        снова!</p>
                </div>
            </div>
            <div className="d-flex justify-content-center flex-column">
                <label htmlFor="emial_Login"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ЛОГИН</label>
                <input id="emial_Login" className="ml-2 mr-2 pl-2 rounded FormInput"
                       type="text" name="login" value={login} onChange={(e) => setLogin(e.target.value)}
                       maxLength="50"/>
                <label htmlFor="password_login"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ПАРОЛЬ</label>
                <input id="password_login" className="ml-2 mr-2 pl-2 rounded FormInput" type="password"
                       value={password} name="password" onChange={(e) => setPassword(e.target.value)}
                       maxLength="50"/>
                <p className="text-center m-0 pb-2 AlertErrorMessage">{errorbd}</p>
                <div className="spinner-border text-secondary ml-auto mr-auto mb-2" role="status"
                     hidden={!loader}>
                    <span className="sr-only">Loading...</span>
                </div>
                <input id="LoginButton" onClick={() => onLogin({login, password})}
                       type="submit" disabled={loader} value="ВОЙТИ"
                       className="text-white p-2 rounded border-0 shadow submitButton"/>
                <div className="d-flex pl-1 pt-2 pb-2 m-0 text-left ">
                    <p сlass="p-0 m-0" style={{color: "#72767d", fontSize: "13px"}}>Нужна учетная
                        запись?&nbsp;</p><Link to="/registration"><p
                    className="p-0 m-0 PLinkToForm"> Зарегистрироваться</p></Link></div>
            </div>
        </div>
    </div>)

}

const mapStateToProps = state => {
    console.log(state)
    return {
        errorbd: (state && state.stage && state.stage.login && state.stage.login.payload &&
            state.stage.login.payload.errors &&
            state.stage.login.payload.errors[0] &&
            state.stage.login.payload.errors[0].message),
        loader: (checkNested(state, 'stage', 'login', 'loader')),
        access: (checkNested(state, 'user', 'access'))
    }
}
export default connect(mapStateToProps, {onLogin: actionsLog, checkToken: checkToken})(Login)
