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

  upgrades() {
    return {
      brainstorming: {
        name: "Brainstorming",
        costToLevelUp: (level) => level <= 15 ? Math.floor((5 + level) + Math.pow(1.07, level - 1)) : Math.floor(20 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 1,
        levelUpIncreasePerSecond: (level) => 0
      },
      coach: {
        name: "Coach Entrepreneurial",
        costToLevelUp: (level) => Math.floor(54 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 5
      },
      cofounder: {
        name: "Co-Fondateur",
        costToLevelUp: (level) => Math.floor(268 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 22
      }
      // 1000 / 74
      // 4000 / 245
      // 20000 / 976
      //  10000 / 3725
    }
  }

  renderUpgrades() {
    let upgrades = this.upgrades();

    return _.map(_.keys(upgrades), (key, i) => {
      let upgrade = upgrades[key];
      let level   = this.props.levels[key];

      return (
        <Upgrade key={i}
                 amount={this.props.amount}
                 name={upgrade['name']}
                 level={level}
                 costToLevelUp={upgrade['costToLevelUp'](level)}
                 levelUpIncreasePerClick={upgrade['levelUpIncreasePerClick'](level)}
                 levelUpIncreasePerSecond={upgrade['levelUpIncreasePerSecond'](level)} />
      )
    })
  }
}

export default Upgrades;
