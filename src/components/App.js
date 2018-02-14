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
        market:        0,
        coach:         0,
        cofounder:     0,
        prototype:     0,
        seed:          0,
        employees:     0,
        series:        0
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

  exponential() {
    return 1.14;
  }

  powerFormula(base, level) {
    // to be sure to start with the base itself
    let newBase = base + (base * this.exponential() - base);

    return Math.floor(newBase * Math.pow(this.exponential(), level - 1));
  }

  upgrades() {
    return {
      brainstorming: {
        name: "Brainstorming",
        firstActionText: "Make",
        nextActionsText: "Level up",
        costToLevelUp: (level) => level > 15 ? this.powerFormula(20, level) : Math.floor((5 + level) * Math.pow(1.07, Math.max(0, level - 1))),
        levelUpIncreasePerClick: (level) => 1,
        levelUpIncreasePerSecond: (level) => 0
      },
      market: {
        name: "Market Research",
        firstActionText: "Conduct",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(50, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 5
      },
      coach: {
        name: "Entrepreneurial Coach",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(250, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 22
      },
      cofounder: {
        name: "Co-Founder",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(1000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 74
      },
      prototype: {
        name: "Prototype",
        firstActionText: "Create",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(4000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 245
      },
      seed: {
        name: "Seed Funding",
        firstActionText: "Raise",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(20000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 976
      },
      employees: {
        name: "Employees",
        firstActionText: "Hire first",
        nextActionsText: "Hire",
        costToLevelUp: (level) => this.powerFormula(100000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 3725
      },
      series: {
        name: "Serie A/B/C/... Fundings",
        firstActionText: "Raise",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(1000000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 20000
      }
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
