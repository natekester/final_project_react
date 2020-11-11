import React, {Component} from "react";
import {

    Link
  } from "react-router-dom";

class TopLayout extends Component {
    constructor(props) {
        super(props);
      }

    render(){
        return (
            <div className="TopLayout">
                <div className="row" id="logout"> <Link to="/login" onClick={this.props.logout}>Logout</Link> </div>
                <div id='nav_list' className="row">
                    <div className='col-md-3 col-xs-3'> <Link className="nav_item" to="/openScrap?page=1">Open Scrap </Link> </div>
                    <div className='col-md-3 col-xs-3'> <Link className="nav_item" to="/closedScrap?page=1">Closed Scrap </Link></div>
                    <div className='col-md-3 col-xs-3'> <Link className="nav_item" to="/graphScrap">Graph Scrap </Link></div>
                    <div className='col-md-3 col-xs-3'> <Link className="nav_item" to="/newScrap">New Scrap </Link> </div>
                </div>
            </div>
        );
    }
}

export default TopLayout;
