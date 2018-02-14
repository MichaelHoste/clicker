import React, { Component } from 'react';
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
        amount: this.state.amount + this.state.increasePerSecond / 10.0
      })
    }, 100);
  }

  componentWillUnmount() {
     clearInterval(this.timer);
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
        firstActionText: "Make",
        nextActionsText: "Level up",
        costToLevelUp: (level) => this.powerFormula(5, level),
        levelUpIncreasePerClick: (level) => 1 + Math.floor(Math.pow(level, 1.14)),
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

  // 1K  = 1,000 = One Thousand
  // 1M  = 1,000K  = One Million
  // 1B  = 1,000M  = One Billion
  // 1T  = 1,000B  = One Trillion
  // 1q  = 1,000T  = One Quadrillion
  // 1Q  = 1,000q  = One Quintillion
  // 1s  = 1,000Q  = One Sextillion
  // 1S  = 1,000s  = One Septillion
  // 1O  = 1,000S  = One Octillion
  // 1N  = 1,000O  = One Nonillion
  // 1d  = 1,000N  = One Decillion
  // 1U  = 1,000d  = One Undecillion
  // 1D  = 1,000U  = One Duodecillion
  // 1!  = 1,000D  = One Tredecillion
  // 1@  = 1,000!  = One Quattuordecillion
  // 1#  = 1,000@  = One Quindecillion
  // 1$  = 1,000#  = One Sexdecillion
  // 1%  = 1,000$  = One Septendecillion
  // 1^  = 1,000%  = One Octodecillion
  // 1&  = 1,000^  = One Novemdecillion
  // 1*  = 1,000&  = One Vigintillion
  // A lot > 1,000*  < A lot
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
