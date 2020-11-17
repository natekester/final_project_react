import React, {Component} from "react";
import {Scatter} from 'react-chartjs-2';


const chartData = {
  datasets:[
      {
          label: "S11 Polar Graph",
          fill: true ,

          pointBorderColor: 'rgba(1,1,1,1)',
          pointBackgroundColor: '#fc0fc0',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [
            { x: 65, y: 75 },
            { x: 59, y: 49 },
            { x: 80, y: 90 },
            { x: 81, y: 29 },
            { x: 56, y: 36 },
            { x: 55, y: 25 },
            { x: 40, y: 18 },],

            
      }
  ]
}

const chartOptions = {

  maintainAspectRatio: false,
  showLine: true,
  legend: false,
  title: {
    display: true,
    text: 'Scatter Plot of Scrap',
    position :'top',
    fontStyle: 'bold',
    size: 14,
    fontFamily : 'Poppins',
    fontColor : 'white'

  },  
  
  scales: {
      xAxes: [{
        gridLines: {
          color: '#ccc',
        },
        
          display: true,
          labelString: "Frequency (Hz)",
          size:20,
      }],
      yAxes: [{
        gridLines: {
          color: '#ccc',
        },
          display: true,
          labelString: "Frequency (Hz)"
      }]
  }
}

class ScatterGraph extends Component {
    render() {
        return (
          <div id="graph" className="col-md-10 col-xs-12">
            <Scatter data={chartData} options={chartOptions} />

            {/* <HorizontalBar data={state}></HorizontalBar> */}
          </div>
        );
    }
}export default ScatterGraph;


