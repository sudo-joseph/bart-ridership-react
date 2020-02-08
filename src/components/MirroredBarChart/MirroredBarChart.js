import React, { Component } from 'react';
import './MirroredBarChart.css';
import Select from '../../components/Select/Select.js';
import Header from '../../components/Header/Header.js';

class MirroredBarChart extends Component {
  render() {

    return (
      <div className="MBC">
        <Header
           title={this.props.title}
           subtitle={this.props.subtitle}/>
        <div className="MBC-Dataview-yAxis">
          <div className="MBC-Dataview-yAxis-Top">
            {this.props.yAxisLabelTop}
          </div>
          <div className="MBC-Dataview-yAxis-Bottom">
            {this.props.yAxisLabelBottom}
          </div>
        </div>
        <div className="MBC-Dataview">
          <div className="MBC-Dataview-Controls">
            {this.props.controls.map((data,index) => (
              <Select
                name={data.name}
                items={data.items}
                changeFcn={data.changeFcn}
                key={index}/>
              ))
            }
          </div>
          <div className="MBC-Dataview-yAxis MBC-Data-yAxis-Top">
            <div className="">
              &lt;
            </div>
            <div className="MBC-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div>{this.props.yAxisRange} Pax</div>
            <div className="MBC-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div className="">
              &gt;
            </div>
          </div>
          <div className="MBC-Dataview-Top">
            {
              this.props.upperData.map((top,index) => (
                 <div   key={index+100}
                        className="MBC-Dataview-Data-Box"
                        style={{height: top,}}> </div>
                    ))
            }
          </div>
          <div className="MBC-Dataview-Bottom">
            {
              this.props.lowerData.map((bottom,index) => (
                 <div   key={index+200}className="MBC-Dataview-Data-Box"
                        style={{height: bottom,}}></div>
                    ))
            }
          </div>
          <div className="MBC-Dataview-yAxis MBC-Data-yAxis-Bottom">
            <div className="">
              &lt;
            </div>
            <div className="MBC-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div>{this.props.yAxisRange} Pax</div>
            <div className="MBC-Dataview-yAxis-Hr">
              <hr />
            </div>
            <div className="">
              &gt;
            </div>
          </div>
          <div className="MBC-Dataview-xAxis">
            {
              this.props.xAxisValue.map((value,index) => (
            <div key={index+300}
              className="MBC-Dataview-xAxis-Box">
              {value}
            </div>
          ))}

          </div>
          <div className="MBC-Dataview-xLabel">
            {this.props.xAxisLabel}
          </div>
        </div>
      </div>
    );
  }
}

export default MirroredBarChart;
