import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {

    return (
      <div className="Header-Title">
        <h3> {this.props.title} </h3>
        <h4> {this.props.subtitle}</h4>
      </div>
    );
  }
}

export default Header;
