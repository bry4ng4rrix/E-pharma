import React, { Component } from "react";
import Chart from "react-apexcharts";

class Linechart extends Component {
  
  constructor(props) {
const a = 10
const b = 30
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5", "6"]
        }
      },
      series: [
        {
          name:"Nombre",
          data: [a, b, 45, 50, 49, 20,]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Linechart;
