import React, {Component} from 'react';
import "../App.css";
import {Form, Button} from 'react-bootstrap';

class EnterName extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <div className="EnterName">
            <header className="App">
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter your User Name" value={this.state.value} onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                    {this.props.underbar}
                </Form.Text>
            </Form.Group>
            </Form>
            </header>
            </div>
        );
    }
}

export default EnterName;