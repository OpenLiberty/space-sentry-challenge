import React, {Component} from 'react';
import "../App.css";
import {Form, Button} from 'react-bootstrap';

class EnterName extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendUser = this.sendUser.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.sendUser()
        event.preventDefault();
    }

    sendUser () {
        if (this.state.value === "") alert('Please enter a valid user name');
        else{
            var data = this.state.value;
        fetch("http://localhost:9081/liberty-demo-game/gameapp/game/" + this.state.value, {
            method: "POST",
            body: data
        }).then(res => res.json()).then((result) => console.log('Result:', JSON.stringify(result)), (error) => console.log('Error:', JSON.stringify(error)))
    }
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