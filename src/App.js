import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TimeZone from './TimeZone'
import AddTimeZone from './AddTimeZone'

class App extends Component {

  constructor(props) {
    super(props)
    var rawLabels = (window.localStorage && window.localStorage.labels) || 'Europe/Paris,America/New_York'
    this.state = { labels: rawLabels.split(',')}
  }

  update (labels) {
    localStorage.labels = labels.join(',')
    this.setState({ labels })
    this._addtimezone.exclude(labels)
  }

  addTimeZone(label) {
    const labels = this.state.labels.concat(label)
    this.update(labels)
  }

  removeTimeZone(labelToRemove) {
    const labels = this.state.labels.filter(l => l !== labelToRemove)
    this.update(labels)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TimeZones</h1>
        </header>
        {
          this.state.labels.map((label) =>
            <div className="App-time" key={label}>
              <TimeZone label={label} removeFn={this.removeTimeZone.bind(this) }/>
            </div>
          )
        }
        <div className="App-timezone">
          <AddTimeZone addFn={this.addTimeZone.bind(this)} excludedLabels={this.state.labels} ref={r => { this._addtimezone = r }} />
        </div>
        <a href="https://github.com/paulgreg/timezones">github</a> - <a href="https://paulgreg.me/">author</a>
      </div>
    );
  }
}

export default App;
