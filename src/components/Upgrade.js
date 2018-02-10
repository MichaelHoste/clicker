import React, { Component } from 'react';

class Upgrade extends Component {

  render() {
    return (
      <div className="upgrade">
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
