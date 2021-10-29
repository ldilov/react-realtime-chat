import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

