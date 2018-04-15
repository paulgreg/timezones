import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time'

import timezones from 'timezones.json'
const RST = timezones[39]
const CPS = timezones[94]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TimeZones</h1>
        </header>
        <div className="App-time"><Time label="Europe/Paris" timezone={RST} /></div>
        <div className="App-time"><Time label="Pacific/Noumea" timezone={CPS} /></div>
      </div>
    );
  }
}

export default App;
