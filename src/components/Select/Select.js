import React, {Component} from 'react';
import './Select.css';

class Select extends Component {
  render() {

    return (
      <div className={`Content-Dataview-Controls-${this.props.name}`} >
        <select onChange={this.props.changeFcn}>
          {Object.entries(this.props.items).map(([key, value],index) => (
            <option  key={index}
                     className="Content-Dataview-Controls-Option"
                     value= {key}> {value} </option>))}
        </select>
      </div>)
  }
}

export default Select;
