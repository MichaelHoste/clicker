import React, { Component } from 'react';
import _ from 'lodash';

import Revenue from './Revenue';
import Upgrade from './Upgrade';

class Upgrades extends Component {

  render() {
    return (
      <div className="upgrades">
        <Revenue increasePerSecond={this.props.increasePerSecond}
                 increasePerClick={this.props.increasePerClick} />
        { this.renderUpgrades() }
      </div>
    );
  }

  renderUpgrades() {
    let upgrades = this.props.upgrades;

    return _.map(_.keys(upgrades), (key, i) => {
      let upgrade = upgrades[key];
      let level   = this.props.levels[key];

      return (
        <Upgrade key={i}
                 keyName={key}
                 amount={this.props.amount}
                 name={upgrade['name']}
                 level={level}
                 firstActionText={upgrade['firstActionText']}
                 nextActionsText={upgrade['nextActionsText']}
                 costToLevelUp={upgrade['costToLevelUp'](level)}
                 levelUpIncreasePerClick={upgrade['levelUpIncreasePerClick'](level)}
                 levelUpIncreasePerSecond={upgrade['levelUpIncreasePerSecond'](level)}
                 levelUp={this.props.levelUp} />
      )
    })
  }
}

export default Upgrades;
