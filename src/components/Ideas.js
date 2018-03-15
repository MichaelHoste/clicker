import React, { Component } from 'react';
import lightBulb            from '../images/light-bulb.png'

class Ideas extends Component {

  click(e) {
    this.props.click()
  }

  render() {
    return (
      <div className="ideas">
        <img src={ lightBulb }
             className="lightbulb"
             alt="Ideas"
             onClick={this.click.bind(this)} />
      </div>
    );
  }
}

export default Ideas;
