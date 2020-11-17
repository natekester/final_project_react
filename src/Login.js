
import React, {Component} from "react";
import {login, logout, isRefreshValid, getNewToken, isTokenValid } from "./Functions";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state ={
            username: '',
            password: '',
            error: '',

        };

        this.login = this.login.bind(this)
        

          
    }

    async login(){
        console.log(`username is now: ${this.state.username}`)

        

        const response = await login(this.state.username, this.state.password)

        if(response === true ){
            this.props.loggedIn()
        }else{
            this.setState(
                {
                    error: <h3> Credentials Incorrect. Try Again. </h3>
                }
            )

        }

        
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
                {this.state.error}

            </div>
        );
    }
}

export default Login;
