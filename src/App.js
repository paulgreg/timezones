import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time'
import TimeZone from './TimeZone'

class App extends Component {

  addTimeZone (label) {
    console.log(label)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TimeZones</h1>
        </header>
        <div className="App-time"><Time label="Europe/Paris" /></div>
        <div className="App-time"><Time label="Pacific/Noumea" /></div>
        <div className="App-timezone"><TimeZone addFn={this.addTimeZone} /></div>
      </div>
    );
  }
}

export default App;
