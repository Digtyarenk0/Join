import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./redux/rootReducer"
import {createBrowserHistory} from 'history';
import {BrowserRouter} from "react-router-dom";

export const history = createBrowserHistory();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe( () => console.log(store.getState()))

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)

render(app, document.getElementById('root'));

serviceWorker.unregister();
