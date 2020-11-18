import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
import {getGraphScrap} from './Functions'
const arbitraryStackKey = "stack1";



const state = {
  //I could setup the data by error column.
  //need 3 data sections, by prodID
  //scrap for each failure mode
  labels: ['Etching Error', 'Incorrect Conductivity' , 'Handling Error' ,'Contamination','Dimensions Out of Spec','Viscosity Issues','Polymerization Issues'],
  datasets: [
      {
          stack: arbitraryStackKey,
          label: '',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [0,0,0,0,0,0,0,0]
      },    
  ]
}

const options = {

    responsive: true,
    maintainAspectRatio: false,
    title:{
      display:true,
      text:'All Scrap Dollars by Cause',
      fontSize:24,
      fontColor: "white",
      fontStyle: 'bold'
    },
    scaleFontColor: 'red',

    scales: {
      xAxes: [{
          fontSize:24,
          fontColor: "white",
          fontStyle: 'bold',

          display: true,
          labelString: "Dollars ($)",
          format: d => `$${d}`,
          ticks: {
            fontColor: 'white'
          },
      }],
      yAxes: [{
        gridLines: {
          color: '#ccc',
        },
        ticks: {
          fontColor: 'white'
        },
      }]

    },
    legend:{
      labels:{
        fontColor: 'white',

      },
      responsive: true,
      maintainAspectRatio: false,
      display:true,
      position:'top'
    }
}



class ScrapGraphAll extends Component {
  constructor(props){
    super(props); 

    this.getData = this.getData.bind(this);




    this.state ={
      data:'',

      loaded: false
    }

    const ensureData  = async () => {
      await this.getData();
  }

    ensureData();

    




  }

  async getData(){
    let {prod1, prod2, prod3, prod1Desc,prod2Desc,prod3Desc, labels} = await getGraphScrap();

    console.log(`Our labels are: ${labels}`)
    console.log(`our prod1Desc: ${prod1Desc}`)
    console.log(`our prod2Desc: ${prod2Desc}`)
    console.log(`our prod3Desc: ${prod3Desc}`)

    
    const data = {
      //I could setup the data by error column.
      //need 3 data sections, by prodID
      //scrap for each failure mode
        labels: labels,
        datasets: [
          {
              stack: arbitraryStackKey,
              label: prod1Desc,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: prod1
          },    
          {
            stack: arbitraryStackKey,
            label: prod2Desc,
            backgroundColor: 'rgba(90,192,90,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: prod2
        },
        {
          stack: arbitraryStackKey,
          label: prod3Desc,
          backgroundColor: 'rgba(150, 92, 192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: prod3
        },
      ]
    }

    this.setState({
      data: data,
      loaded: true
    })


  }


  render() {
      return (
        <div id="graph" className="col-md-10 col-xs-12">
          {this.state.loaded === false ? <Bar
            data={state}
            width={100}
            height={300}      
            options={options} 
          />: <Bar
          data={this.state.data}
          width={100}
          height={300}      
          options={options} 
        /> }

          {/* <HorizontalBar data={state}></HorizontalBar> */}
        </div>
      );
  }
}export default ScrapGraphAll;


