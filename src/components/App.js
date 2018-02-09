import React, { Component } from 'react';
import '../css/app.css';

import Money from './Money.js';
import Upgrades from './Upgrades.js';
import Ideas from './Ideas.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: 1000
    }
  }

  render() {
    return (
      <div className="clicker-container">
        <Money amount={this.state.amount} />
        <Upgrades />
        <Ideas />
      </div>
    );
  }
}

export default App;
