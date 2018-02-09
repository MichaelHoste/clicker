import React, { Component } from 'react';

class Money extends Component {

  render() {
    return (
      <div className="money">
        ${ this.props.amount }
      </div>
    );
  }
}

export default Money;
