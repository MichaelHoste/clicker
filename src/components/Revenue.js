import React, { Component } from 'react';

class Revenue extends Component {

  render() {
    return (
      <div className="revenue">
        <div className="dollars-per-second">
          ${this.props.increasePerSecond}
        </div>

        <div className="dollars-per-click">
          ${this.props.increasePerClick}
        </div>
      </div>
    );
  }
}

export default Revenue;
