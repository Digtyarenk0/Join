import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Registration from "./form/registration"
import Login from "./form/login"
import Main from "./main/indexMain"

const NOTFOUND = () => {
    if (!localStorage.authToken) {
        window.location = "/authentication"
    } else {
        setTimeout(() => {
            // window.location = "/join"
        }, 7000)
    }
    return (
        <div>
            <Link to="/authentication"><h3 className="text-warning">404 PAGE NOT FOUND</h3>
                <p className="text-success">Вернуться на главную...</p></Link>
        </div>
    )
}


class App extends Component {
    render() {
        return (
                <div className="App col-12 m-0 p-0 background_svgmain">
                    <Switch>
                        <Route exact path='(/authentication|)' component={Login}/>
                        <Route exact path='/registration' component={Registration}/>
                        <Route exact path={['/join','/join/*']} component={Main} />
                        <Route component={NOTFOUND} exact/>
                    </Switch>
                </div>
        );
    }
}

export default (App)