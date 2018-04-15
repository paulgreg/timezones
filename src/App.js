import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Time from './Time'
import TimeZone from './TimeZone'

class App extends Component {

  constructor(props) {
    super(props)
    var rawLabels = (window.localStorage && window.localStorage.labels) || 'Europe/Paris,Pacific/Noumea'
    this.state = { labels: rawLabels.split(',')}
  }

  addTimeZone(label) {
    const labels = this.state.labels.concat(label)
    localStorage.labels = labels.join(',')
    this.setState({
      labels
    })
    // TODO: refresh the Timezone component to exclude new label
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
            <div className="App-time" key={label}><Time label={label} /></div>
          )
        }
        <div className="App-timezone"><TimeZone addFn={this.addTimeZone.bind(this)} exclude={this.state.labels} /></div>
      </div>
    );
  }
}

export default App;
