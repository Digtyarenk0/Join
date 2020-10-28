import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import checkNested from "../../checkNested";
import getGQL from "../../getGQL";
import {actionPromise} from "../../redux/stage/actions";
import {actionLogin} from "../../redux/user/actions";
import {mutationLogin} from "../mutationLogin";

const actionReg = ({username, login, password}) => async dispatch => {
    const data = await dispatch(actionPromise(await getGQL('/graphql')
    (`mutation registration($username: String,$login: String,$password: String){
                registration(user: {username: $username, login: $login, password: $password}){
                            id
                            username
                        }}`, `{  "username": \"${username}\",
                        "login": \"${login}\",
                       "password": \"${password}\"}`), "registration"))
    if (data && data.data && data.data.registration && data.data.registration.id) {
        const token = await dispatch(actionPromise(mutationLogin({login, password})))
        console.log(token.data.login)
        const user = await dispatch(actionLogin(token.data.login))
    }
    return data
}

const Registration = ({onRegistration, errorbd = '', loader}) => {
    const [username, setUsername] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [errorValid, setErrValid] = useState('')

    function validator() {
        if (/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
            if (/^[a-zA-Z0-9_-]{4,16}$/.test(login)) {
                if (/^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,18}$/.test(password)) {
                    if (password === cpassword) {
                        onRegistration({username, login, password})
                        setErrValid("")
                    } else {
                        setErrValid("Пароли не совпадают")
                        setCPassword('');
                        setPassword('')
                    }
                } else {
                    setErrValid("'Некорректный пароль пароль должен содержать: Прописный и строчные буквы латинского алфавита Как минимум 1 цифру Должен содержать минимум 6 символов")
                    setCPassword('');
                    setPassword('')
                }
            } else {
                setErrValid('Логин должен содержать: От 4 до 16 символов Может содеражать прописный,строчные буквы латинского алфавита, а также цифры')
            }
        } else {
            setErrValid("Имя пользователя должено содержать: От 4 до 16 символов Может содеражать прописный,строчные буквы латинского алфавита, а также цифры")
        }
    }

    return (<div className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
                 style={{width: "15%"}}>
        <div className="border-0 rounded p-3" style={{
            backgroundColor: "#36393f",
            width: "30%",
            maxWidth: "420px",
            boxShadow: " 7px 7px 30px 1px rgba(0,0,0,0.55)"
        }}>
            <div className="TitleFormInput">Создать
                учетную запись
                <div className="spinner-border text-secondary ml-3" role="status" hidden={!loader}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="nickname_Registr"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ИМЯ
                    ПОЛЬЗОВАТЕЛЯ</label>
                <input id="nickname_Registr" className="ml-2 mr-2 pl-2 rounded FormInput"
                       maxLength="50" autoComplete="off"
                       type="text" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="login_Registr"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ЛОГИН</label>
                <input id="login_Registr" className="ml-2 mr-2 pl-2 rounded FormInput"
                       maxLength="50"
                       type="text" value={login}
                       onChange={(e) => setLogin(e.target.value)}/>
                <label htmlFor="regPasswordinpt"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ПАРОЛЬ</label>
                <input id="regPasswordinpt" className="ml-2 mr-2 pl-2 rounded FormInput" maxLength="50"
                       type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirmRegPasswordinpt"
                       className="p-0 pl-2 pb-1 m-0 font-weight-bolder text-left LabelForInputForm">ПОДТВЕРЖДЕНИЕ
                    ПАРОЛЯ</label>
                <input id="confirmRegPasswordinpt" maxLength="50"
                       className="ml-2 mr-2 pl-2 rounded FormInput"
                       maxLength="50"
                       type="password" value={cpassword}
                       onChange={(e) => setCPassword(e.target.value)}/>
                <p className="text-center m-0 pb-2 AlertErrorMessage"
                   name="error">{errorValid ? errorValid : errorbd ? errorbd : ""}</p>
                <input type="submit" disabled={loader}
                       value="ЗАРЕГИСТРИРОВАТЬСЯ" onClick={() => validator()}
                       className="text-white p-2 rounded border-0 shadow submitButton"/>
                <div className="pl-1 pb-3 m-0 text-left ">
                    <Link to="/authentication"><p className="p-0 pt-1 m-0 PLinkToForm">Уже зарегистрированы?</p>
                    </Link></div>
                <label className="d-block p-0 pl-1 pb-1 m-0 text-left "
                       style={{color: "#8e9297", fontSize: "10px"}}>
                    Регистрируясь, Вы соглашаюсь с <a className="p-0 m-0" style={{color: "#677bc3"}}>Условиями
                    Использыования</a> и <a
                    className="p-0 m-0" style={{color: "#677bc3"}}>Политикой Конфидинциальности</a> Join.
                </label>
            </div>
        </div>
    </div>)
}

const mapStateToProps = state => {
    return {
        errorbd:
            (state.stage && state.stage.registration
                && state.stage.registration.payload &&
                state.stage.registration.payload.errors &&
                state.stage.registration.payload.errors[0] &&
                state.stage.registration.payload.errors[0].message),
        loader: (checkNested(state, 'stage', 'registration', 'loader'))
    }
}


export default connect(mapStateToProps, {onRegistration: actionReg})(Registration)