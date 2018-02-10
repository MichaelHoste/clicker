import React, { Component } from 'react';

class Upgrade extends Component {

  render() {
    let opacity = this.props.amount < this.props.costToLevelUp ? 0.2 : 1.0

    return (
      <div className="upgrade"
           style={{ opacity: opacity }}>
        <div className="level-up">
          <div className="text">
            Level up
          </div>
          <div className="cost">
            ${this.props.costToLevelUp}
          </div>
        </div>
        <div className="name">
          { this.props.name }
        </div>
        <div className="level">
          Lvl { this.props.level }
        </div>
        <div style={{ clear:'both' }}>
        </div>
      </div>
    );
  }
}

export default Upgrade;
