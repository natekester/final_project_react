import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
            'April', 'May'],
    datasets: [
    {
        label: 'inches of rain',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
    }
    ]
}

class ScrapGraph extends Component {
    render() {
        return (
          <div id="graph" className="col-md-10 col-xs-12">
            <Bar
              data={state}
              width={100}
              height={300}      
            

              options={{
                responsive: true,
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text:'Total rain per Month',
                  fontSize:20
                },
                legend:{
                  responsive: true,
                  maintainAspectRatio: false,
                  display:true,
                  position:'top'
                }
              }}
            />
          </div>
        );
    }
}export default ScrapGraph;


