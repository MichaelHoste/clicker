import React, { Component } from 'react';

import Revenue from './Revenue';

class Upgrades extends Component {

  render() {
    return (
      <div className="upgrades">
        <Revenue />
        { this.renderUpgrades() }
        { this.renderUpgrades() }
        { this.renderUpgrades() }
        { this.renderUpgrades() }
      </div>
    );
  }

  renderUpgrades() {
    return (
      <div className="upgrade">
        <div className="level-up">
          <div className="text">
            Level up
          </div>
          <div className="value">
            $3
          </div>
        </div>
        <div className="name">
          Coach entrepreneurial
        </div>
        <div className="level">
          Lvl 34
        </div>
        <div style={{ clear:'both' }}>
        </div>
      </div>
    )
  }
}

export default Upgrades;
