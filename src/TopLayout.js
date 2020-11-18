import React, {Component} from "react";
import {Link} from "react-router-dom";
import tracks from './tracks.png';


class TopLayout extends Component {
    render(){
        return (
            <div className="TopLayout">
                <div className="row" id="scrapLogo2">
                    <h2 className="scrapTracker2">Scrap Tracker</h2>
                    <img id="tracks2" src={tracks} alt="Logo" />
                </div>
                <div className="row" id="logout">
                    <Link to="/login" className="link_logout" onClick={this.props.logout}>Logout</Link> </div>
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
