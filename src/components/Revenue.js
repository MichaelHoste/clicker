import React, { Component } from 'react';

class Revenue extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.increasePerSecond != nextProps.increasePerSecond
      ||
      this.props.increasePerClick  != nextProps.increasePerClick
    )
  }

  render() {
    let formattedIncreasePerSecond = this.props.formatAmount(this.props.increasePerSecond)
    let formattedIncreasePerClick  = this.props.formatAmount(this.props.increasePerClick)

    return (
      <div className="revenue">
        <div className="increase-per-second">
          <em>per second</em>
          <span>${formattedIncreasePerSecond}</span>
        </div>

        <div className="increase-per-click">
          <em>per click</em>
          <span>${formattedIncreasePerClick}</span>
        </div>
      </div>
    );
  }
}

export default Revenue;
