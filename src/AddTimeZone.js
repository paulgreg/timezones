import React, { Component } from 'react';
import './AddTimeZone.css';
import TimeZonesHelper from './TimeZonesHelper'

const tzh = new TimeZonesHelper()

export default class AddTimeZone extends Component {

  constructor(props) {
    super(props)
    const tzs = tzh.filterTimezones(tzh.getAll(), props.excludedLabels)
    const timezoneGroups = tzh.groupTimezones(tzs)
    this.state = { timezones: tzs, timezoneGroups, selectValue: tzs[0].label }
  }

  exclude (excludedLabels) {
    const tzs = tzh.filterTimezones(tzh.getAll(), excludedLabels)
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
      <div className="add-timezone">
        <select
          value={this.state.selectValue}
          onChange={this.handleChange.bind(this)}>
          {Object.keys(this.state.timezoneGroups).map(group =>
            <optgroup key={group} label={group}>
            {this.state.timezoneGroups[group].map(tz =>
              <option key={tz.label} value={tz.label}>{tzh.getCity(tz.label)} {tzh.formatOffset(tz.offset)}</option>
            )}
            </optgroup>
          )}
        </select>
        <button onClick={this.addTimezone.bind(this)}>Add</button>
      </div>
    );
  }
}

