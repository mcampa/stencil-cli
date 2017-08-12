import React, { Component, PropTypes } from 'react';
import JSONTree from 'react-json-tree';

export default class Context extends Component {
  render() {
    return (
      <div className="context-container">
        <JSONTree data={this.props.context} />
      </div>
    );
  }
}

Context.propTypes = {
  context: PropTypes.object.isRequired,
};
