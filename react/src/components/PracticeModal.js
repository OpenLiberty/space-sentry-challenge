import React, {Component} from 'react';
import "../App.css";
import {Modal,Button} from 'react-bootstrap';

class PracticeModal extends Component {
    constructor(props,context){
        super(props,context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state={
            show:true,
        };
    }


    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }


    render(){
        return (
            <div className="PracticeModal">
            <header className="">
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Practice Mode!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Practice shooting all the targets in one minute but your rank will not be affected</p>
                        </Modal.Body>
                </Modal>
            </header>
            </div>
        );
    }
}

export default PracticeModal;