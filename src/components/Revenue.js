import React, { Component } from 'react';

class Revenue extends Component {

  render() {
    let formattedIncreasePerSecond = this.props.formatAmount(this.props.increasePerSecond)
    let formattedIncreasePerClick = this.props.formatAmount(this.props.increasePerClick)

    return (
      <div className="revenue">
        <div className="dollars-per-second">
          ${formattedIncreasePerSecond}
        </div>

        <div className="dollars-per-click">
          ${formattedIncreasePerClick}
        </div>
      </div>
    );
  }
}

export default Revenue;
