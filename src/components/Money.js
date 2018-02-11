import React, { Component } from 'react';

class Money extends Component {

  render() {
    return (
      <div className="money">
        ${ this.props.amount.toFixed(0) }
      </div>
    );
  }
}

export default Money;
