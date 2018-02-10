import React, { Component } from 'react';
import lightBulb from '../images/light-bulb.png'

class Ideas extends Component {

  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     money: 1000
  //   }
  // }

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
