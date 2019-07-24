import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../css/normalize.min.css"
import "../App.css"

class ArrowKeys extends Component {
    constructor(props){
        super(props)
        this.state={
            minutes:'00',
            seconds:'59',
            start: true
        }
    }

    componentDidMount(){   
    }

    render() {
       return (
        <div>
        <div class="row">   
        <div id="arrowKeys" class="col-md-12 col-centered text-center">
          <div class="arrow-key-container">
            <div id="arrowUp" class="arrow-key up" data-key="38" onClick={event => console.log(event.key)}></div><br/>
            <div id="arrowLeft" class="arrow-key left" data-key="37"></div>
            <div id="arrowDown" class="arrow-key down" data-key="40"></div>
            <div id="arrowRight" class="arrow-key right" data-key="39"></div>
          </div>
        </div>
      </div>
        <div class="row">
          <div class="col-md-11 col-centered text-center">
            <div class="fire-key-container">
              <div id="fireLaser" class="fire-key fire" data-key="32"><span id="beamText">FIRE BEAM</span></div>
            </div>
          </div>
       </div>
       <div class="row">
        <div class="col-md-11 col-centered text-center">
          <button id="stop_button" class="btn btn-secondary">Stop Game</button>
        </div>
       </div>
      </div>
      );
    }
  }

  export default ArrowKeys;

  // <p tabIndex={-1}
  //                   onKeyDown={event => console.log(event.key)}>
  //                   Click to focus, then hit a key.
  //                   </p>