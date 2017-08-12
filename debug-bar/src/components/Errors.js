import React, { Component } from 'react';

export default class Console extends Component {
  render() {
    return (
      <section className="errors-container">
        <ul className="errors">
          <li>
Error: Uncaught error: Parse error on line 15:<br/>
...if products.featured}<br/>
-----------------------^<br/>
Expecting 'CLOSE_RAW_BLOCK', 'CLOSE', 'CLOSE_UNESCAPED', 'OPEN_SEXPR', 'CLOSE_SEXPR', 'ID', 'OPEN_BLOCK_PARAMS', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'NULL', 'DATA', 'SEP', got 'INVALID'<br/>
          </li>
        </ul>
      </section>
    );
  }
}
