import React, { Component } from 'react';

import Revenue from './Revenue';
import Upgrade from './Upgrade';

class Upgrades extends Component {

  render() {
    return (
      <div className="upgrades">
        <Revenue increasePerSecond={this.props.increasePerSecond}
                 increasePerClick={this.props.increasePerClick} />
        { this.renderUpgrade() }
        { this.renderUpgrade() }
        { this.renderUpgrade() }
        { this.renderUpgrade() }
      </div>
    );
  }

  renderUpgrade() {
    return (
      <Upgrade name="Coach entrepreneurial"
               level={34}
               costToLevelUp={3} />
    )
  }
}

export default Upgrades;
