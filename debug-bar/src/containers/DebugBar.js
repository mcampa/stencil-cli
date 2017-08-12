import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// // import * as CounterActions from '../actions/CounterActions';
import Context from '../components/Context';
import Configuration from '../components/Configuration';
import Errors from '../components/Errors';
import Bundle from '../components/Bundle';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class DebugBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: localStorage.getItem('debug-bar-open') || false,
      activeTab: localStorage.getItem('debug-bar-activeTab') || null,
    };

    console.log('init', this.state);
  }

  toggleBar() {
    if (this.state.activeTab) {
      this.toggleTab(this.state.activeTab);
    }

    const open = this.state.open ? false : true;
    localStorage.setItem('debug-bar-open', open);
    this.setState({ open });
  }

  toggleTab(name) {
    const activeTab = this.state.activeTab === name ? null : name;

    localStorage.setItem('debug-bar-activeTab', activeTab);
    this.setState({ activeTab });
  }

  getActiveClass(tab) {
    return this.state.activeTab === tab ? 'active' : '';
  }

  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { context } = this.props;

    console.log('init', this.state);

    return (
      <div className={'debug-bar-container' + (this.state.open ? ' active' : '') }>
        <ul className="debug-bar-tabs">
          <li><button className={this.getActiveClass('context')} onClick={() => this.toggleTab('context')}>Context</button></li>
          <li><button className={this.getActiveClass('config')} onClick={() => this.toggleTab('config')}>Configuration</button></li>
          <li><button className={this.getActiveClass('errors')} onClick={() => this.toggleTab('errors')}>Errors<span className="badge">1</span></button></li>
          <li><button className={this.getActiveClass('bundle')} onClick={() => this.toggleTab('bundle')}>Bundle</button></li>
          <li>Template File: <b className="info">templates/{context.template}.html</b></li>
          <li>Page Type: <b className="info">{context.page_type}</b></li>
        </ul>

        <button className="debug-bar-switch" onClick={() => this.toggleBar()}>{this.state.open ? '>>' : '<<'}</button>

        <div className={this.state.activeTab ? 'panes active' : 'panes'}>
          <div className={this.getActiveClass('context')}>
            <Context context={context} />
          </div>
          <div className={this.getActiveClass('config')}>
            <Context context={context.theme_settings} />
          </div>
          <div className={this.getActiveClass('errors')}>
            <Errors />
          </div>
          <div className={this.getActiveClass('bundle')}>
            <Bundle />
          </div>
        </div>
      </div>
    );
  }
}

DebugBar.propTypes = {
  context: PropTypes.object.isRequired,
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    context: state.context,
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
//  * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // actions: bindActionCreators(CounterActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugBar);
