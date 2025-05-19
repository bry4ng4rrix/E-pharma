import React, { Component } from "react";
import Chart from "react-apexcharts";

class Linechart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["L", "M", "M", "J", "V", "S"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 20,]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row flex w-full">
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
