
import React, {Component} from "react";
import './App.css';
import {getProd, get_failures, submitScrap} from "./Functions";

var descriptions;
var ids;
var costUnits;
var units;

class NewScrap extends Component {
    constructor(props) {
        super(props);

        const user = window.localStorage.getItem('username');

        this.state = {
            loaded: "false",
            prodID: [''],
            prodDesc: "",
            id: "",
            selectedID:"",
            failureMode: [''],
            selectedFailure:"",
            costPerUnit: "",
            unit: "",
            unitsLost: '',
            totalCost: '',
            loggedInUser: user,
            disabled: 'true',
            display: '',
            submitted: '',




          };

          this.loadProd();
          this.changeURL = this.props.changeURL;
          this.submitScrap = this.submitScrap.bind(this);
          this.updateSelectedID=this.updateSelectedID.bind(this)
          this.updateFailure=this.updateFailure.bind(this)

          
    }

    updateSelectedID = (event) => {
        var index;
        var length = this.state.prodID.length;
        var prod = this.state.prodID;
        var selected = event.target.value

        this.setState(
            { display: ''}
        )

        for(var i =1 ; i<length; i++){
            if(prod[i] === selected){
                index = i;
                break
            }
        }

        const desc = descriptions[index];
        const id = ids[index];
        const cost = costUnits[index];
        const unit = units[index];

        const fetchFailures = async () => {
            const failures = await get_failures(id);
            console.log(`failures in newscrap: ${failures}`)
            
            this.setState({
                selectedID: selected,
                id: id,
                costPerUnit: cost,
                prodDesc: desc,
                unit: unit,
                totalCost: 0,
                failureMode: failures,
                submitted: '',
                
    
            });
            console.log(`display: ${this.state.display}`)
            console.log(`failureModes: ${this.state.failureMode}`)
            this.setState({
               display: 'true',
            })

        };



        fetchFailures();

        if(selected == '' || this.state.selectedFailure == '' || this.state.totalCost == 0){
            this.setState({
                disabled: "true",
            })
        }else{
            
            this.setState({
                disabled: "",
            })

        }

        

    }



    updateFailure = (event) => {
        this.setState({
            selectedFailure: event.target.value
        });

        if(this.state.selectedID == '' || event.target.value == '' || this.state.totalCost == 0){
            this.setState({
                disabled: "true",
            })
        }else{
            
            this.setState({
                disabled: "",
            })

        }
    }

    updateUnits = (event) => {
        const cost = event.target.value * this.state.costPerUnit
        
        this.setState({
            unitsLost: event.target.value,
            totalCost: cost,
        })


        if(cost == 0 || this.state.selectedID === '' || this.state.selectedFailure === ''){
            this.setState({
                disabled: "true",
            })
        }else{
            
            this.setState({
                disabled: "",
            })

        }

        console.log(`our current state of totalCost: ${this.state.totalCost}`)


    }





    async loadProd(){
        const user = window.localStorage.getItem('username');


        let {prodID, prodDesc, unitCost, unit, id} = await getProd();
        console.log(`BLAM our prod id list is: ${prodID} , with username: ${user}`)

        costUnits = unitCost;
        descriptions = prodDesc;
        ids = id;
        units = unit;

        this.setState({
            loaded: "true",
            prodID: prodID,
            prodDesc: "",
            id: "",
            selectedID:"",
            failureMode: [''],
            selectedFailure:"",
            costPerUnit: "",
            unit: "",
            unitsLost: '',
            totalCost: '',
            loggedInUser: user,
            disabled: 'true',
            display: ''
          });

          console.log(`BLAM II our username: ${this.state.loggedInUser}`)


        

    }

    submitScrap(){
        console.log(`our total cost at time of submission was: ${this.state.totalCost}`)
        const user = window.localStorage.getItem('username');
        const cost = this.state.totalCost;
        const units = this.state.unitsLost;
        const prodID = this.state.id;
        const failure = this.state.selectedFailure;

        const submitScrapNow = async () => {
            const submitted = await submitScrap(user, cost, units, prodID, failure);
            return submitted;
        }
            


        const submitted = submitScrapNow();

        console.log(`our response from submitting was: ${submitted}`)


        if(submitted){
            this.setState({
                
                prodDesc: "",
                id: "",
                selectedID:"",
                failureMode: [''],
                selectedFailure:"",
                costPerUnit: "",
                unit: "",
                unitsLost: '',
                totalCost: '',
                disabled: 'true',
                display: '',
                submitted: <h1> Your scrap was submitted!</h1>
            })

        }else{
            this.setState({

                submitted: <h1> We had an error trying to submit scrap. Please try again.</h1>
            })

        }

        

        //Do the thing to submit all the scrap
    }

    render(){
        return (
            <div>
                <h3>Create New Scrap:</h3>

                <div className="row" >
                    <div className='col-md-12 col-xs-12' id="selectIdDiv">
                    <label> User: </label>  {this.state.loggedInUser}
                    </div>
                </div>

                <div className="row" >
                    <div className='col-md-12 col-xs-12' id="selectIdDiv">
                        <label id="prodIDLabel" className="newScrapForm" for="prodIdSelect"> ProdID: </label>
                        <select className="selector" name="prodIdSelect" id="prodIdSelect" value={this.state.selectedID} onChange={this.updateSelectedID}>
                            {this.state.prodID.map((id) => <option key={id} value={id}>{id}</option>)}
                        </select>
                        <h4 id="prodDesc">{this.state.prodDesc}</h4>
                    </div>
                </div>

                <div className="row" >
                    <div className='col-md-10 col-xs-10' id="selectFailure">
                    <label> Units Scrapped: </label>
                    <input min="0.001" max="1000000" className="inputBox" type="number" onChange={this.updateUnits} required></input>
                    <h4 id="prodDesc">{this.state.unit}</h4>
                    </div>
                    
                </div>

                <div className="row" >
                    <div className='col-md-10 col-xs-10' id="totalCost">
                    <label> Total Cost $: </label> {this.state.totalCost}
                     </div>
                </div>

                {this.state.display == 'true' ? 
                <div className="row" >
                    <div className='col-md-10 col-xs-10' id="selectFailure">
                        <label> Failure Mode: </label>
                        <select className="selector" name="failureSelect" id="failureSelect" value={this.props.selectedFailure} onChange={this.updateFailure}>
                            {this.state.failureMode.map((id) => <option key={id} value={id}>{id}</option>)}
                        </select>
                    </div>
                </div>  :<div className="row" >
                    <div className='col-md-10 col-xs-10' id="selectFailure">
                        <label> Failure Mode: </label> Select Product First.
                    </div>
                </div> }

                <input id="submitScrap" disabled={this.state.disabled} type="button" onClick={this.submitScrap} value="Submit Scrap"></input>

                {this.state.submitted}
            </div>
        );
    }
}

export default NewScrap;