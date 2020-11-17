import React, {Component} from "react";



class ScrapItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            index: this.props.index,
        }

        console.log(`scrap item recieved value: ${this.props.index}`)
        console.log(`our user is ${this.props.user}`)

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

                    </div>
                </div>
            </div>
        );
    }
}
export default ScrapItem;