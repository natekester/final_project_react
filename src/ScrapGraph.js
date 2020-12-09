import React, {Component} from "react";
import ScrapGraphAll from './ScrapGraphAll';
import ScrapGraphClosed from './ScrapGraphClosed';
import ScrapGraphOpen from './ScrapGraphOpen';
import {isRefreshValid} from'./Functions';

class ScrapGraph extends Component {
  constructor(props){
    super(props); 


    this.state ={
      all: true,
      open: false,
      closed:false,
      

    }

    this.showAllScrap = this.showAllScrap.bind(this);
    this.showOpenScrap = this.showOpenScrap.bind(this);
    this.showClosedScrap = this.showClosedScrap.bind(this);
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);

    this.checkIfLoggedIn()



  }


  async checkIfLoggedIn(){
    console.log('Checking if logged in on graph.')

    try{
      const valid = await isRefreshValid()
      console.log(`our refresh check returned ${valid}`)
      if(  valid === false){
        
        console.log('Need to log in again.')
        this.props.pushLogin();
      }
    }
    catch(err){

        console.log(err)

        // this.props.logout();
        this.props.pushLogin();

    }

  }

  showAllScrap(){


    this.setState({
      all:true,
      open: false,
      closed: false,
    })

  }

  showOpenScrap(){


    this.setState({
      all: false,
      open: true,
      closed: false,
    })
    
  }

  showClosedScrap(){


    this.setState({
      all: false,
      open: false,
      closed: true,
    })
    
  }


  render() {
      return (
        <div>
        <div id="graph" className="col-md-10 col-xs-12">
        {this.state.all === true? <ScrapGraphAll></ScrapGraphAll>: ''}
        {this.state.open === true ? <ScrapGraphOpen></ScrapGraphOpen>: ''}
        {this.state.closed === true ? <ScrapGraphClosed></ScrapGraphClosed>: ''}

        </div>

        <div className="row">
        <input type="button" className="graphButton" value="All Scrap"  onClick={this.showAllScrap} >
        </input>
        <input type="button" className="graphButton" value="Closed Scrap" onClick={this.showClosedScrap}>
        </input>
        <input type="button" className="graphButton" value="Open Scrap"  onClick={this.showOpenScrap}>
        </input>
        </div>

        </div>
      );
  }
}export default ScrapGraph;


