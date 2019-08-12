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
import Loading from './components/Loading'
import Leaderboard from './components/Leaderboard'
import Settings from './components/Settings';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/gameplay" component={GamePlay}/>
            <Route path="/practice" component={Practice}/>
            <Route path="/game" component={Game}/>
            <Route path="/loading" component={Loading}/>
            <Route path="/leaderboard" component={Leaderboard}/>
            <Route path="/settings" component={Settings}/>

        </div>
    </Router>,
document.getElementById('root'));


serviceWorker.unregister();
