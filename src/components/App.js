import React, { Component } from 'react';
import '../css/app.css';

import Money from './Money.js';
import Upgrades from './Upgrades.js';
import Ideas from './Ideas.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: 0.0,
      increasePerSecond: 0.0,
      increasePerClick:  1.0,
      levels: {
        brainstorming: 0,
        coach:         0,
        cofounder:     0
      }
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        amount: this.state.amount + this.state.increasePerSecond / 5.0
      })
    }, 200);
  }

  componentWillUnmount() {
     clearInterval(this.timer);
  }

  upgrades() {
    return {
      brainstorming: {
        name: "Brainstorming",
        firstActionText: "Make",
        nextActionsText: "Level up",
        costToLevelUp: (level) => level <= 15 ? Math.floor((5 + level) * Math.pow(1.07, Math.max(0, level - 1))) : Math.floor(20 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 1,
        levelUpIncreasePerSecond: (level) => 0
      },
      coach: {
        name: "Coach Entrepreneurial",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => Math.floor(54 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 5
      },
      cofounder: {
        name: "Co-Fondateur",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => Math.floor(268 * Math.pow(1.07, level - 1)),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 22
      }
      // 1000 / 74
      // 4000 / 245
      // 20000 / 976
      // 10000 / 3725
    }
  }

  click() {
    this.setState({
      amount: this.state.amount + this.state.increasePerClick
    })
  }

  levelUp(name) {
    let upgrades      = this.upgrades();
    let upgrade       = upgrades[name];
    let currentLlevel = this.state.levels[name];

    // update levels hash
    let levels = this.state.levels
    levels[name] = levels[name] + 1

    this.setState({
      amount:            this.state.amount - upgrade['costToLevelUp'](currentLlevel),
      increasePerSecond: this.state.increasePerSecond + upgrade['levelUpIncreasePerSecond'](currentLlevel),
      increasePerClick:  this.state.increasePerClick + upgrade['levelUpIncreasePerClick'](currentLlevel),
      levels:            this.state.levels
    })
  }

  render() {
    return (
      <div className="clicker-container">
        <Money amount={this.state.amount} />

        <Upgrades amount={this.state.amount}
                  upgrades={this.upgrades()}
                  increasePerSecond={this.state.increasePerSecond}
                  increasePerClick={this.state.increasePerClick}
                  levels={this.state.levels}
                  levelUp={this.levelUp.bind(this)} />

        <Ideas click={this.click.bind(this)} />
      </div>
    );
  }
}

export default App;
