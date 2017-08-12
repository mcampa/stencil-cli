import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import './styles/main.scss';

// /**
//  * Both configureStore and Root are required conditionally.
//  * See configureStore.js and Root.js for more details.
//  */
import configureStore from './store/configureStore';
import Root from './containers/Root';

const initialState = JSON.parse(atob(document.getElementById('debug-bar-data').innerHTML));

const store = configureStore(initialState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('debug-bar-root')
);
