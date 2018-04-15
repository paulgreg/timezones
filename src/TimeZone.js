import React, { Component } from 'react';
import './TimeZone.css';
import TimeZonesHelper from './TimeZonesHelper'

const tzh = new TimeZonesHelper()

export default class TimeZone extends Component {

  constructor(props) {
    super(props)

    const tzs = this.filterTimezones(tzh.getAll(), props.excludedLabels)
    this.state = { timezones: tzs, selectValue: tzs[0].label }
  }

  filterTimezones (timezones, excludedLabels) {
    return timezones.filter(tz => excludedLabels.indexOf(tz.label) === -1)
  }

  exclude (excludedLabels) {
    const tzs = this.filterTimezones(this.state.timezones, excludedLabels)
    this.setState({ timezones: tzs, selectValue: tzs[0].label })
  }

  addTimezone() {
    this.props.addFn(this.state.selectValue)
  }

  handleChange(e) {
    this.setState({selectValue: e.target.value});
  }

  render() {
    return (
      <div className="timezone">
        <select
          value={this.state.selectValue}
          onChange={this.handleChange.bind(this)}>
          {this.state.timezones.map(tz =>
            <option key={tz.label} value={tz.label}>{tz.label} ({tz.offset}h)</option>
          )}
        </select>
        <button onClick={this.addTimezone.bind(this)}>Add</button>
      </div>
    );
  }
}

