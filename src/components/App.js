import React, { Component } from 'react';
import '../css/app.css';

import Money from './Money.js';
import Upgrades from './Upgrades.js';
import Ideas from './Ideas.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
      increasePerSecond: 0,
      increasePerClick: 1
    }
  }

  click() {
    this.setState({
      amount: this.state.amount + this.state.increasePerClick
    })
  }

  render() {
    return (
      <div className="clicker-container">
        <Money amount={this.state.amount} />

        <Upgrades increasePerSecond={this.state.increasePerSecond}
                  increasePerClick={this.state.increasePerClick} />

        <Ideas click={this.click.bind(this)} />
      </div>
    );
  }
}

export default App;
