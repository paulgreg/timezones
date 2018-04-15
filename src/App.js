import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time'

import timezones from 'timezones.json'
console.log(timezones)
const RST = timezones[39]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TimeZones</h1>
        </header>
        <div className="App-time"><Time label="Europe/Paris" timezone={RST} /></div>
      </div>
    );
  }
}

export default App;
