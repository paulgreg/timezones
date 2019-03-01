import React, { Component } from 'react';
import './TimeZone.css';
import { registerTick, unregisterTick } from './Tick'
import { DateTime } from 'luxon'
import { getTimeZone, formatOffset, getCounty, getCity, getContinent } from './TimeZonesHelper'

function pad(nb) {
    return nb < 10 ? '0' + nb : '' + nb
}

function getDayOrNightClass(date) {
  return date.hour >= 7 && date.hour <= 19 ? 'day' : 'night'
}

export default class Time extends Component {

  constructor(props) {
    super(props)
    this.state = { timestamp: +new Date() }
  }

  componentDidMount() {
    registerTick(this.props.label, this.update.bind(this))
  }

  componentWillUnmount() {
    unregisterTick(this.props.label)
  }

  update(timestamp) {
    this.setState({ timestamp })
  }

  remove() {
    this.props.removeFn(this.props.label)
  }

  render() {
    const { label } = this.props
    const { timestamp } = this.state

    const timezone = getTimeZone(label)

    const options = { weekday: 'short', day: 'numeric' };
    const date = DateTime.fromMillis(timestamp).setZone(timezone.label)
    const hours = pad(date.hour)
    const minutes = pad(date.minute)
    const day = date.toLocaleString(window.navigator.language, options)
    const dayOrNightClass = `timezone-${getDayOrNightClass(date)}`
    const county = getCounty(label)

    return (
      <div className="timezone">
        <span className="timezone-label">
          {getCity(timezone.label)}&nbsp;
          <small>{formatOffset(timezone.offset)}</small>&nbsp;
          {
            county
              ? (<small>{county}</small>)
              : <small>{getContinent(timezone.label)}</small>
          }
        </span>
        <span className={dayOrNightClass}></span>
        <span className="timezone-time">{hours}:{minutes}</span>
        <span className="timezone-date">({day})</span>
        <span className="timezone-remove" onClick={this.remove.bind(this)}></span>
      </div>
    )
  }
}

