import React, {Component} from "react";
import { closeScrap } from "./Functions";



class ScrapItem extends Component {
    constructor(props) {
        super(props);
        const user = window.localStorage.getItem('username');

        this.state = {
            index: this.props.index,
            checkbox: false,
            open: this.props.isOpen,
            submitted: false,
            user: user,
            comment:'',

        }
        this.submitClosure = this.submitClosure.bind(this);

        console.log(`scrap item recieved value: ${this.props.index}`)
        console.log(`our user is ${this.props.user}`)

    }

    revealCloseItems = (event) => {

        if(this.state.checkbox === false){
            this.setState({checkbox: true})
        }else{
            this.setState({checkbox: false})
        }

    }

    updateText = (event) => {

        this.setState({
            comment: event.target.value,
        })

    }
    
    async submitClosure(){



        const response = await closeScrap(this.props.scrapPK, this.state.comment);

        if(response === true){
            this.setState({
                checkbox: false,
                open: false,
                submitted: true,
            
            })
        }else{
            console.log('Had an error submitting to DB')
            //TODO add error message to UI
        }



    }

    render(){
        return (
            <div className="scrap">

                <div className="row" >
                    <div className="scrapItem">
                        <h4 className="scrDesc">LotID: {this.props.lotID}  </h4> 
                        <h4 className="scrDesc">Product:{this.props.prodID}       Desc: {this.props.desc} </h4> 
                        <h4 className="scrDesc"> Cost($):{this.props.cost}</h4>
                        <h5 className="scrDesc"> Creating By: {this.props.user}  </h5>
                         <h5 className="scrDesc">Time Created: {this.props.time}</h5>
                        <h6 className="scrDesc">Units lost: {this.props.units}</h6> 
                        <h6 className="scrDesc">  Failure Mode: {this.props.failure}</h6>
                        {this.state.open === true ? <div> <label>Close: <input type="checkbox" onClick={this.revealCloseItems}></input></label> </div>:'' }
                        {this.state.checkbox === true ? <div><h5>Closing Comment:</h5><input className="inputBox" type="textbox" onChange={this.updateText}></input> <input id="submitClose" type="button" value="Close Scrap" onClick={this.submitClosure}></input> <h5>Submitting User: {this.state.user}</h5></div>: ''}
                        {this.state.submitted === true? <h4> Scrap has been closed.</h4> : ''}
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default ScrapItem;