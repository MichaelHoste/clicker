import React, { Component } from 'react';
import lightBulb from '../images/light-bulb.png'

class Ideas extends Component {

  render() {
    return (
      <div className="ideas">
        <img src={ lightBulb }
             className="lightbulb"
             alt=""
             onClick={this.props.click} />
      </div>
    );
  }
}

export default Ideas;
