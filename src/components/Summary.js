import React, { Component } from 'react';

class Summary extends Component {
  render() {
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
            { this.props.increaseTextForLevel(this.props.level) }
          </span>
        </div>
        <div className="next-level">
          <strong>Next level:</strong>
          <span className="power">
            { this.props.increaseTextForLevel(this.props.level + 1) }
          </span>
        </div>
      </div>
    )
  }
}

export default Summary;
