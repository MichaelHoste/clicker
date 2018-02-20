import React, { Component } from 'react';
import _                    from 'lodash';

class Upgrade extends Component {

  constructor(props) {
    super(props)

    this.state = {
      summaryIsOpen: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.summaryIsOpen != nextState.summaryIsOpen
      ||
      (this.props.amount < this.props.costToLevelUp && nextProps.amount >= nextProps.costToLevelUp)
      ||
      this.props.level != nextProps.level
    )
  }

  isBuyable() {
    return this.props.amount >= this.props.costToLevelUp;
  }

  levelUp() {
    if(this.isBuyable()) {
      this.props.levelUp(this.props.keyName);
    }
  }

  openSummary() {
    this.setState({
      summaryIsOpen: true
    })
  }

  closeSummary() {
    this.setState({
      summaryIsOpen: false
    })
  }

  totalLevelUpPerClickForLevel(level) {
    let levelsRange = _.range(1, level + 1)

    return _.sumBy(levelsRange, (level) => {
      return this.props.levelUpIncreasePerClick(level)
    })
  }

  totalLevelUpPerSecondForLevel(level) {
    let levelsRange = _.range(1, level + 1)

    return _.sumBy(levelsRange, (level) => {
      return this.props.levelUpIncreasePerSecond(level)
    })
  }

  increaseTextForLevel(level) {
    if(this.props.keyName === 'brainstorming') {
      return `$${this.totalLevelUpPerClickForLevel(level)} per click`
    }
    else {
      return `$${this.totalLevelUpPerSecondForLevel(level)} per second`
    }
  }

  render() {
    return (
      <div className="upgrade">
        { this.renderLevelUpButton() }
        <div className="name">
          { this.props.name }
        </div>
        { this.renderCurrentLevel() }
        <div style={{ clear:'both' }}>
        </div>

        { this.renderSummary() }
      </div>
    );
  }

  renderLevelUpButton() {
    let text       = this.props.level === 0 ? this.props.firstActionText : this.props.nextActionsText;
    let cursor     = this.isBuyable()    ? 'pointer' : 'default';
    let opacity    = this.isBuyable()    ? 1.0 : 0.2;

    return (
      <div className="level-up"
           style={{ cursor: cursor, opacity: opacity }}
           onClick={this.levelUp.bind(this)}
           onMouseEnter={this.openSummary.bind(this)}
           onMouseLeave={this.closeSummary.bind(this)}>
        <div className="text">
          { text }
        </div>
        <div className="cost">
          ${this.props.formatAmount(this.props.costToLevelUp)}
        </div>
      </div>
    )
  }

  renderCurrentLevel() {
    let style = this.props.level === 0 ? { visibility: 'hidden' } : {};

    return (
      <div className="level"
           style={style}>
        Lvl { this.props.level }
      </div>
    )
  }

  renderSummary() {
    if(this.state.summaryIsOpen) {
      return (
        <div className="summary">
          <h2 className="name">
            { this.props.name }
          </h2>
          <div className="description">
            { this.props.description }
          </div>
          <div className="current-level">
            <strong>Current level:</strong>
            <span className="power">
              { this.increaseTextForLevel(this.props.level) }
            </span>
          </div>
          <div className="next-level">
            <strong>Next level:</strong>
            <span className="power">
              { this.increaseTextForLevel(this.props.level + 1) }
            </span>
          </div>
        </div>
      )
    }
  }
}

export default Upgrade;
