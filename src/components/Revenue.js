import React, { Component } from 'react';

class Revenue extends Component {

  render() {
    let formattedIncreasePerSecond = this.props.formatAmount(this.props.increasePerSecond)
    let formattedIncreasePerClick = this.props.formatAmount(this.props.increasePerClick)

    return (
      <div className="revenue">
        <div className="dollars-per-second">
          <em>per second</em>
          <span>${formattedIncreasePerSecond}</span>
        </div>

        <div className="dollars-per-click">
          <em>per click</em>
          <span>${formattedIncreasePerClick}</span>
        </div>
      </div>
    );
  }
}

export default Revenue;
