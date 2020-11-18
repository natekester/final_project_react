import React, {Component} from "react";

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
    this.pushLogin = this.pushLogin.bind(this);
    this.logout = this.logout.bind(this);

    // login('vitor', '123')
    
    if (localStorage.getItem("refresh_token") === null) {
      this.pushLogin()

    }else{
      //check if the refresh token is good.

      const isRefValid = async () => {
        const valid = await isRefreshValid();
        return valid
      }
      
      const valid = isRefValid();

      

      if(valid === true){

        this.pushOpenScrap();

      }else if (valid == false){
        this.pushLogin()

      }
    }
  }

  pushLogin(){

    
    this.props.history.push("/login");
    
  }




  pushOpenScrap(){
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
              <TopLayout pushLogin={this.pushLogin} logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <NewScrap pushLogin={this.pushLogin} logout={this.logout} ></NewScrap>
            </Route>

            <Route path="/openScrap">
            <TopLayout pushLogin={this.pushLogin} logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>

              <OpenScrapList pushLogin={this.pushLogin} logout={this.logout} ></OpenScrapList>
            </Route>

            <Route path="/closedScrap">
              <TopLayout pushLogin={this.pushLogin} logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <ClosedScrapList pushLogin={this.pushLogin} logout={this.logout} ></ClosedScrapList>
            </Route>

            <Route path="/graphScrap">
              <TopLayout pushLogin={this.pushLogin} logout={this.logout} graphDisplay={this.graphDisplay} openScrapListDisplay={this.openScrapListDisplay} closedScrapListDisplay={this.closedScrapListDisplay} createNewScrapDisplay={this.createNewScrapDisplay}></TopLayout>
              <ScrapGraph pushLogin={this.pushLogin} logout={this.logout} ></ScrapGraph>
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
