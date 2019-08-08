import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Game from './components/Game'
import Index from './components/Index'
import 'bootstrap/dist/css/bootstrap.css'
import GamePlay from './components/GamePlay';
import Practice from './components/Practice'


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/gameplay" component={GamePlay}/>
            <Route path="/practice" component={Practice}/>
            <Route path="/game" component={Game}/>
        </div>
    </Router>,
document.getElementById('root'));


serviceWorker.unregister();
