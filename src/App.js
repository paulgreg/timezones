import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time'

import TimeZonesHelper from './TimeZonesHelper'
const tzh = new TimeZonesHelper()
const RST = tzh.get('Europe/Paris')
const CPS = tzh.get('Pacific/Noumea')

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TimeZones</h1>
        </header>
        <div className="App-time"><Time timezone={RST} /></div>
        <div className="App-time"><Time timezone={CPS} /></div>
      </div>
    );
  }
}

export default App;
