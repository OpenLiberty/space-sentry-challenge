import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../css/normalize.min.css"
import "../App.css"
import LinkButton from './LinkButton'

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
        <div className="row">   
        <div id="arrowKeys" className="col-md-12 col-centered text-center">
          <div className="arrow-key-container">
            <div id="arrowUp" className="arrow-key up" data-key="38" onClick={event => console.log("ArrowUp")} ></div><br/>
            <div id="arrowLeft" className="arrow-key left" data-key="37" onClick={event => console.log("ArrowLeft")}></div>
            <div id="arrowDown" className="arrow-key down" data-key="40" onClick={event => console.log("ArrowDown")}></div>
            <div id="arrowRight" className="arrow-key right" data-key="39" onClick={event => console.log("ArrowRight")}></div>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col-md-11 col-centered text-center">
            <div className="fire-key-container">
              <div id="fireLaser" className="fire-key fire" data-key="32" onClick={event => console.log(" ")}><span id="beamText">FIRE BEAM</span></div>
            </div>
          </div>
       </div>
       <div className="row">
        <div className="col-md-11 col-centered text-center">
          <LinkButton id="stop_button" className="secondary" route='/' name='Stop Game'/> 
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