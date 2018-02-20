import React, { Component } from 'react';
import _                    from 'lodash';

import '../css/app.css';

import Money    from './Money.js';
import Upgrades from './Upgrades.js';
import Ideas    from './Ideas.js';
import Settings from './Settings.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: 0.0,
      increasePerClick:  1,
      increasePerSecond: 0,
      levels: {
        brainstorming: 0,
        coach:         0,
        market:        0,
        cofounder:     0,
        prototype:     0,
        seed:          0,
        employees:     0,
        series:        0
      }
    }
  }

  componentDidMount() {
    let interval = 0.1; // 100ms

    this.timer = setInterval(() => {
      this.setState({
        amount: this.state.amount + this.state.increasePerSecond * interval
      })
    }, 1000 * interval);
  }

  componentWillUnmount() {
     clearInterval(this.timer);
  }

  updateIncreasePerSecond() {
    this.setState({
      increasePerSecond: this.totalIncreasePer('Second')
    })
  }

  updateIncreasePerClick() {
    this.setState({
      increasePerClick: 1 + this.totalIncreasePer('Click')
    })
  }

  totalIncreasePer(unit) {
    let upgradeKeys = _.keys(this.state.levels)

    return _.sumBy(upgradeKeys, (upgradeKey) => {
      let levelsRange = _.range(1, this.state.levels[upgradeKey] + 1)

      return _.sumBy(levelsRange, (level) => {
        return this.upgrades()[upgradeKey][`levelUpIncreasePer${unit}`](level)
      })
    })
  }

  exponential() {
    return 1.35;
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
        description: "You *know* that you are an entrepreneur but you have no idea what to create.",
        firstActionText: "Make",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(5, level),
        levelUpIncreasePerClick: (level) => Math.floor(Math.pow(level, 1.14)),
        levelUpIncreasePerSecond: (level) => 0
      },
      coach: {
        name: "Entrepreneurial Coach",
        description: "A friend said that you need a business model and a business plan. What are those?",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(50, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 5
      },
      market: {
        name: "Market Research",
        description: "You just invented the new facebook for *stuff*. What if Facebook is already the new Facebook for *stuff*?",
        firstActionText: "Conduct",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(250, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 22
      },
      cofounder: {
        name: "Co-Founder",
        description: "You took 2 months to create the next best app. You even wrote the specs (2 pages). Time to find a technical co-founder!",
        firstActionText: "Hire",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(1000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 74
      },
      prototype: {
        name: "Prototype",
        description: "A prototype is the next best thing after a PowerPoint presentation. Please don't click here, it crashes the app.",
        firstActionText: "Create",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(4000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 245
      },
      seed: {
        name: "Seed Funding",
        description: "I don't want to live on this basement anymore. Also, my co-founder develops signs of vitamin deficiency.",
        firstActionText: "Raise",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(20000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 976
      },
      employees: {
        name: "Employees",
        description: "First employee will be a Human Resources Manager and he/she will deal with the next ones.",
        firstActionText: "Hire first",
        nextActionsText: "Hire",
        costToLevelUp: (level) => this.powerFormula(100000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 3725
      },
      series: {
        name: "Serie A/B/C/... Fundings",
        description: "We have 10M users, 30+ servers, 3 apps to maintain and no revenue. But we're the next big thing!",
        firstActionText: "Raise",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(1000000, level),
        levelUpIncreasePerClick: (level) => 0,
        levelUpIncreasePerSecond: (level) => 20000
      }
    }
  }

  formatAmount(amount) {
    if(amount >= 10000000000000) {
      return `${(amount/1000000000000).toFixed(0)}T`
    }
    else if(amount >= 10000000000) {
      return `${(amount/1000000000).toFixed(0)}B`
    }
    else if(amount >= 10000000) {
      return `${(amount/1000000).toFixed(0)}M`
    }
    else if(amount >= 10000) {
      return `${(amount/1000).toFixed(0)}K`
    }
    else {
      return `${amount.toFixed(0)}`
    }
  }

  click() {
    this.setState({
      amount: this.state.amount + this.state.increasePerClick
    })
  }

  levelUp(name) {
    let upgrades     = this.upgrades();
    let upgrade      = upgrades[name];
    let currentLevel = this.state.levels[name];

    // update levels hash
    let levels = this.state.levels
    levels[name] = levels[name] + 1

    this.setState({
      amount: this.state.amount - upgrade['costToLevelUp'](currentLevel),
      levels: this.state.levels
    }, () => {
      this.updateIncreasePerClick()
      this.updateIncreasePerSecond()
    })
  }

  importStateInBase64(base64State) {
    this.setState(
      JSON.parse(atob(base64State))
    )
  }

  render() {
    return (
      <div className="clicker-container">
        <Money amount={this.state.amount}
               formatAmount={this.formatAmount.bind(this)} />

        <Upgrades amount={this.state.amount}
                  upgrades={this.upgrades()}
                  increasePerSecond={this.state.increasePerSecond}
                  increasePerClick={this.state.increasePerClick}
                  levels={this.state.levels}
                  levelUp={this.levelUp.bind(this)}
                  formatAmount={this.formatAmount.bind(this)} />

        <Ideas click={this.click.bind(this)} />

        <Settings currentState={this.state}
                  importStateInBase64={this.importStateInBase64.bind(this)} />
      </div>
    );
  }
}

export default App;
