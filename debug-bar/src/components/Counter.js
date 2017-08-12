import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {

  add() {
    this.props.actions.addToList(this.props.counter);
  }

  render() {
    return (
      <div className="counter-container">
        <div className="counter-num-label">{this.props.counter}</div>
        <div className="counter-even-label">{this.props.counter % 2 === 0 ? 'even' : 'odd'}</div>
        <div className="counter-buttons">
          <button onClick={() => this.props.actions.decrement()}>-</button>
          <button onClick={() => this.props.actions.increment()}>+</button>
        </div>

        <button onClick={() => this.add()}>Add</button>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
};
