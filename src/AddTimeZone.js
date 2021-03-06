import React, { Component } from 'react';
import './AddTimeZone.css';
import { getTimeZones, filterTimeZones, groupTimeZones, formatOffset, getCity, getCounty } from './TimeZonesHelper'

function buildState(excludedLabels) {
  const tzs = filterTimeZones(getTimeZones(), excludedLabels)
  const timezoneGroups = groupTimeZones(tzs)
  return { timezoneGroups, selectValue: tzs[0].label }
}

function displayCounty (label) {
  const county = getCounty(label)
  return county ? `(${county})` : ''
}

export default class AddTimeZone extends Component {

  constructor(props) {
    super(props)
    this.state = buildState(props.excludedLabels)
  }

  exclude (excludedLabels) {
    this.setState(buildState(excludedLabels))
  }

  addTimezone() {
    this.props.addFn(this.state.selectValue)
  }

  handleChange(e) {
    this.setState({selectValue: e.target.value});
  }

  render() {
    return (
      <div className="add-timezone">
        <select
          value={this.state.selectValue}
          onChange={this.handleChange.bind(this)}>
          {Object.keys(this.state.timezoneGroups).map(group =>
            <optgroup key={group} label={group}>
            {this.state.timezoneGroups[group].map(tz =>
              <option key={tz.label} value={tz.label}>{getCity(tz.label)} {displayCounty(tz.label)} {formatOffset(tz.offset)}</option>
            )}
            </optgroup>
          )}
        </select>
        <button onClick={this.addTimezone.bind(this)}>Add</button>
      </div>
    );
  }
}

