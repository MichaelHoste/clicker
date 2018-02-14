import React, { Component } from 'react';

class Upgrade extends Component {

  isBuyable() {
    return this.props.amount >= this.props.costToLevelUp;
  }

  levelUp() {
    if(this.isBuyable()) {
      this.props.levelUp(this.props.keyName);
    }
  }

  render() {
    return (
      <div className="upgrade">
        { this.renderLevelUpButton() }
        <div className="name">
          { this.props.name }
        </div>
        { this.renderLevel() }
        <div style={{ clear:'both' }}>
        </div>
      </div>
    );
  }

  renderLevelUpButton() {
    let text    = this.props.level === 0 ? this.props.firstActionText : this.props.nextActionsText;
    let cursor  = this.isBuyable() ? 'pointer' : 'default';
    let opacity = this.isBuyable() ? 1.0 : 0.2;

    return (
      <div className="level-up"
           style={{ cursor: cursor, opacity: opacity }}
           onClick={this.levelUp.bind(this)}>
        <div className="text">
          { text }
        </div>
        <div className="cost">
          ${this.props.formatAmount(this.props.costToLevelUp)}
        </div>
      </div>
    )
  }

  renderLevel() {
    let style = this.props.level === 0 ? { visibility: 'hidden' } : {};

    return (
      <div className="level"
           style={style}>
        Lvl { this.props.level }
      </div>
    )
  }
}

export default Upgrade;
