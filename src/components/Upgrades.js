import React, { Component } from 'react';
import _ from 'lodash';

import Revenue from './Revenue';
import Upgrade from './Upgrade';

class Upgrades extends Component {

  render() {
    return (
      <div className="upgrades">
        <Revenue increasePerSecond={this.props.increasePerSecond}
                 increasePerClick={this.props.increasePerClick}
                 formatAmount={this.props.formatAmount} />

        <div className="upgrades-list">
          { this.renderUpgrades() }
        </div>
      </div>
    );
  }

  renderUpgrades() {
    let upgrades    = this.props.upgrades;
    let upgradeKeys = _.keys(upgrades)

    return _.map(upgradeKeys, (key, i) => {
      let upgrade       = upgrades[key];
      let level         = this.props.levels[key];
      let previousLevel = i > 0 ? this.props.levels[upgradeKeys[i-1]] : 0;

      if(i === 0 || previousLevel > 0) {
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
                   levelUp={this.props.levelUp}
                   formatAmount={this.props.formatAmount} />
        )
      }
    })
  }
}

export default Upgrades;
