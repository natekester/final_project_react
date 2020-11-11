
import React, {Component} from "react";
import {login, logout, isRefreshValid, getNewToken, isTokenValid } from "./Functions";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state ={
            username: '',
            password: ''

        };

        this.login = this.login.bind(this)
        

          
    }

    async login(){
        console.log(`username is now: ${this.state.username}`)

        

        await login(this.state.username, this.state.password)

        this.props.loggedIn()
    }

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        });
        console.log(`username is now: ${this.state.username}`)
    }


    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        });
        console.log(`password is now: ${this.state.password}`)

    }




    render(){
        return (
            <div>
                <label for="uname"><b>Username</b></label>
                <input id="username" type="text" placeholder="Enter Username" name="uname" onChange={this.updateUsername} required></input>
                <br></br>
                <label for="psw"><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" name="psw" onChange={this.updatePassword} required></input>
                <br></br>
                <input id="login" type="button" onClick={this.login} value="Login"></input>

            </div>
        );
    }
}

export default Login;
