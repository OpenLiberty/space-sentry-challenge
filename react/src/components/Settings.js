import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css"
import "../css/admin.css"
import Timer from './Timer'
import Score from './Score'
import ArrowKeys from './ArrowKeys'
import { Container, Card , Row, Col} from 'react-bootstrap';

class Settings extends Component {

    render(){
        return (
            <div className="Game"> 
                <div class="App-header">
                        <Row>
                            <Col className="text-center">
                            <img src={logo} className="Logo-small" alt="OpenLibertyGameLogo"/>
                            </Col>
                        </Row>
                    <Row>
                    <div className="futurepanel">
                        <div className="futurepanel__header">
                        <h1 className="futurepanel__title">Targets Config</h1>
                        </div>
                        <div className="futurepanel__body">
                            <div>
                            <h4 className="heading">Targets Array</h4>
                            <button className="futurebutton" id="target_button" disabled>Connect</button>
                            <div> Status: <span id="target_status">Connecting...</span> </div>
                            <div> IP: <span id="target_ip">Unknown</span> </div>
                            <div className="futurepanel__divider"></div>
                            </div>
                            <div>
                            <div className="futuregrid">
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">T1</h4>
                                <button className="futurebutton" id="target_button1">Toggle</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">T2</h4>
                                <button className="futurebutton" id="target_button2">Toggle</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">T3</h4>
                                <button className="futurebutton" id="target_button3">Toggle</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">T4</h4>
                                <button className="futurebutton" id="target_button4">Toggle</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">T5</h4>
                                <button className="futurebutton" id="target_button5">Toggle</button>
                                </div>		        			        			        			      
                            </div>
                            <div className="futurepanel__divider"></div>
                            </div>
                            <div>
                                <div className="futuregrid">
                                    <div className="futuregrid__row">
                                        <h4 className="futuregrid__cell">All up</h4>
                                        <button className="futurebutton" id="allup_button">run</button>
                                    </div>
                                    <div className="futuregrid__row">
                                        <h4 className="futuregrid__cell">All down</h4>
                                        <button className="futurebutton" id="alldown_button">run</button>
                                    </div>		  
                                    <div className="futuregrid__row">
                                        <h4 className="futuregrid__cell">Cycle</h4>
                                        <button className="futurebutton" id="cycle_button">run</button>
                                    </div>			  								
                                </div>
                                <div className="futurepanel__divider"></div>
                            </div>
                            <div>
                                <div className="futuregrid">
                                    <div className="futuregrid__row">
                                        <h4 className="futuregrid__cell">Laser value</h4>
                                        <div className="futureinput futureinput--text">
                                            <input type="number" name="litinput" id="litinput" placeholder="240"/>
                                        </div>
                                        <button id="litupdate_button" className="futurebutton">update</button>
                                    </div>
                                    <div className="futurepanel__divider"></div>
                                    <div className="futuregrid__row">
                                        <h4 className="futuregrid__cell">Piezo value</h4>
                                        <div className="futureinput futureinput--text">
                                            <input type="number" name="hitinput" id="hitinput" placeholder="150"/>
                                        </div>
                                        <button id="hitupdate_button" class="futurebutton">update</button>
                                    </div>		  	  								
                                </div>
                                <div className="futurepanel__divider"></div>
                            </div>
                        </div>
                    </div> 
                    <div className="futurepanel">
                        <div className="futurepanel__header">
                        <h1 className="futurepanel__title">Spaceship Config</h1>
                        </div>
                        <div className="futurepanel__body">
                            <div>
                            <h4 className="heading">Spaceship</h4>
                            <button className="futurebutton" id="ship_button" disabled>Connect</button>
                            <div> Status: <span id="ship_status">Connecting...</span> </div>
                            <div> IP: <span id="ship_ip">Unknown</span> </div>
                            <div className="futurepanel__divider"></div>
                            </div>	
                            <div className="futuregrid">
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">Sweep Pan</h4>
                                <button className="futurebutton" id="ship_sweep_pan_btn">RUN</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">Sweep Tilt</h4>
                                <button className="futurebutton" id="ship_sweep_tilt_btn">RUN</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">Laser on</h4>
                                <button className="futurebutton" id="ship_firebutton">TOGGLE</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">Laser Off</h4>
                                <button className="futurebutton" id="ship_firebutton_off">Toggle</button>
                                </div>
                                <div className="futuregrid__row">
                                <h4 className="futuregrid__cell">Reset</h4>
                                <button className="futurebutton" id="ship_reset">RUN</button>
                                </div>		        			        			        			      
                            </div>		
                        </div>
                    </div>	  
                </Row>
                <div className="row">
                    <div className="col-md-11 col-centered text-center">
                        <button className="btn btn-primary" id="menuButton">Return to Menu</button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Settings;
