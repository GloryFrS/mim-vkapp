import React from 'react';
import ReactDOM from 'react-dom';
import connect  from '@vkontakte/vkui-connect';
import {BrowserRouter} from 'react-router-dom';
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './fonts/stylesheet.css';
import './index.css';

import App from './App';

// Init VK App
connect.send('VKWebAppInit', {});

const root = document.getElementById('root');

mVKMiniAppsScrollHelper(root);

ReactDOM.render((
    <BrowserRouter>
        <App location={window.location}/>
    </BrowserRouter>
), root);

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();