import React, {Component} from "react";
import logo from './logo.svg';

import './App.css';
import TopLayout from './TopLayout.js';
import ScrapGraph from "./ScrapGraph";
import OpenScrapList from "./OpenScrapList";
import ClosedScrapList from "./ClosedScrapList";
import NewScrap from "./NewScrap";
import Login from "./Login";
import { isRefreshValid, logout } from "./Functions";
import {
  Switch,
  Route,
  withRouter
  
} from "react-router-dom";



class App extends Component {
  
  constructor(props) {
    super(props);



    this.loggedIn = this.loggedIn.bind(this);

    // login('vitor', '123')
    
    console.log(` our local storage refresh token value: ${localStorage.getItem("refresh_token")}`)
    if (localStorage.getItem("refresh_token") === null) {
      this.pushLogin()

    }else{
      //check if the refresh token is good.

      const isRefValid = async () => {
        const valid = await isRefreshValid();
        console.log(`isref (App) valid: ${valid}`)
        return valid
      }
      
      const valid = isRefValid();

      

      if(valid === true){

        console.log(`attempting to change the state of display and toplayout`)
        this.pushOpenScrap();
        console.log(`is refresh valid? ${valid}`)

      }else if (valid == false){
        console.log(`is refresh valid? ${valid}`)
        this.pushLogin()

      }
    }
  }

  pushLogin(){
    console.log("changing the push hstory to /login")

    
    this.props.history.push("/login");
    
  }




  pushOpenScrap(){
    console.log("changing the push hstory to /openscrap")
    this.props.history.push("/openScrap?page=1");


  }
  

  loggedIn(){
    console.log(`attempting login`)
    if (localStorage.getItem("refresh_token") != null) {
      
        this.props.history.push("/openScrap?page=1");

        console.log(`attempting to change the state of display and toplayout`)

    }
    
  }

  logout(){
    
    console.log('attempting to logout')
    logout()
    
  }

  render() {
     

  
    return (
      <div className="App">
        <header className="App-header">

          <Switch>

            <Route path="/newScrap">
              <TopLayout logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <NewScrap></NewScrap>
            </Route>

            <Route path="/openScrap">
            <TopLayout logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>

              <OpenScrapList></OpenScrapList>
            </Route>

            <Route path="/closedScrap">
              <TopLayout logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <ClosedScrapList></ClosedScrapList>
            </Route>

            <Route path="/graphScrap">
              <TopLayout logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <ScrapGraph></ScrapGraph>
            </Route>

            <Route path="/login">
              <Login loggedIn={this.loggedIn}></Login>
            </Route>

          </Switch>


        </header>
      </div>
    );
  }
}

export default withRouter(App);
