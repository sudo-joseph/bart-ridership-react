import React, { Component } from 'react';
import './MirroredBarChart.css';
import Select from '../../components/Select/Select.js';

class MirroredBarChart extends Component {
  render() {

    return (
      <div className="Content">
        <div className="Content-Title">
          <h3> {this.props.stations[this.props.station]+ "  Station Arriving and Departing Passengers"} </h3>
          <h4> (Monthly Average Pax per Hour)</h4>
        </div>
        <div className="Content-Dataview-yAxis">
          <div className="Content-Dataview-yAxis-Top">
            Arrivals
          </div>
          <div className="Content-Dataview-yAxis-Bottom">
            Departures
          </div>
        </div>
        <div className="Content-Dataview">
          <div className="Content-Dataview-Controls">
            <Select
              name="Stations"
              items={this.props.stations}
              changeFcn={this.props.updateStation}/>
            <Select
              name="Year"
              items={this.props.years.reduce(function(o, val) { o[val] = val; return o; }, {})}
              changeFcn={this.props.updateYear}/>
            <Select
              name="Month"
              items={this.props.months.reduce(function(o, val) { o[val] = val; return o; }, {})}
              changeFcn={this.props.updateMonth}/>
            <Select
              name="DayofWeek"
              items={{'weekday':'Weekdays','weekend':'Weekends & Holidays'}}
              changeFcn={this.props.updateDayofWeek}/>
          </div>
          <div className="Content-Dataview-yAxis Content-Data-yAxis-Top">
            <div className="">
              &lt;
            </div>
            <div className="Content-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div>15000 Pax</div>
            <div className="Content-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div className="">
              &gt;
            </div>
          </div>
          <div className="Content-Dataview-Top">
            {
              this.props.arrivalData.map(top => (
                 <div className="Content-Dataview-Data-Box"
                        style={{height: top,}}> {Math.round(top/this.props.scaleFactor)} </div>
                    ))
            }
          </div>
          <div className="Content-Dataview-Bottom">
            {
              this.props.departData.map(bottom => (
                 <div className="Content-Dataview-Data-Box"
                        style={{height: bottom,}}> {Math.round(bottom/this.props.scaleFactor)} </div>
                    ))
            }
          </div>
          <div className="Content-Dataview-yAxis Content-Data-yAxis-Bottom">
            <div className="">
              &lt;
            </div>
            <div className="Content-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div>15000 Pax</div>
            <div className="Content-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div className="">
              &gt;
            </div>
          </div>
          <div className="Content-Dataview-xAxis">
            {
              this.props.arrivalData.map((hour,index) => (
            <div className="Content-Dataview-xAxis-Box">
              {index}
            </div>
          ))}

          </div>
          <div className="Content-Dataview-xLabel">
            (Hour of Day)
          </div>
        </div>
      </div>
    );
  }
}

export default MirroredBarChart;
