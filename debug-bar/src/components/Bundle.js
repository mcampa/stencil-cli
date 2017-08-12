import React, { Component } from 'react';


const steps = [
  {delay: 20, msg: 'SCSS Parsing Started...'},
  {delay: 300, msg: 'Template Parsing Started...'},
  {delay: 400, msg: 'Language Files Parsing Started...'},
  {delay: 300, msg: 'Building Theme Schema File...'},
  {delay: 200, msg: 'Generating Manifest Started...'},
  {delay: 1000, msg: 'Theme task Started...'},
  {delay: 300, msg: 'ok -- Language Files Parsing Finished'},
  {delay: 300, msg: 'ok -- Manifest Generation Finished'},
  {delay: 300, msg: 'ok -- Theme Schema Building Finished'},
  {delay: 300, msg: 'ok -- SCSS Parsing Finished'},
  {delay: 300, msg: 'ok -- Template Parsing Finished'},
  {delay: 300, msg: 'ok -- Theme task Finished'},
  {delay: 300, msg: 'ok -- Zipping Files Finished'},
  {delay: 1200, msg: 'ok -- Uploading bundle'},
  {delay: 300, msg: 'ok -- Applying theme'},
  {delay: 300, msg: 'done.'},
];

export default class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }


  bundle() {
    this.setState({ progress: [] });
    this.bundleStep(0);
  }

  bundleStep(n) {
    if (!steps[n]) {
      return;
    }

    setTimeout(() => {
      this.setState({ progress: [...this.state.progress, steps[n].msg] });
      this.bundleStep(n + 1);
    }, steps[n].delay);
  }

  render() {
    const output = this.state.progress.map(e => {
      return (
        <li>{e}</li>
      );
    });
    return (
      <section className="bundle-container">
        <div className="actions">
          <button onClick={() => this.bundle()}>Bundle</button>
          <button onClick={() => this.bundle()}>Push</button>
          <button onClick={() => this.bundle()}>Push &amp; Apply</button>
        </div>
        <ul>
          {output}
        </ul>
      </section>
    );
  }
}
