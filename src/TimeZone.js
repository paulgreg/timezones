import React, { Component } from 'react';
import './TimeZone.css';
import { registerTick, unregisterTick } from './Tick'

import TimeZonesHelper from './TimeZonesHelper'
const tzh = new TimeZonesHelper()

function pad(nb) {
    return nb < 10 ? '0' + nb : '' + nb
}

function getDayOrNightClass(date) {
  return date.getHours() >= 7 && date.getHours() <= 19 ? 'day' : 'night'
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
    const timezone = tzh.get(this.props.label)
    const options = { weekday: 'short', day: 'numeric' };
    const date = new Date(this.state.timestamp)
    const minuteOffset = timezone.offset * 60
    date.setHours(date.getUTCHours() + (minuteOffset / 60))
    date.setMinutes(date.getUTCMinutes() + (minuteOffset % 60))

    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())
    const day = date.toLocaleDateString(window.navigator.language, options)
    const dayOrNightClass = `timezone-${getDayOrNightClass(date)}`

    return (
      <div className="timezone">
        <span className="timezone-label">{tzh.getCity(timezone.label)} <small>{tzh.getContinent(timezone.label)}</small> <small>{tzh.formatOffset(timezone.offset)}</small></span>
        <span className={dayOrNightClass}></span>
        <span className="timezone-time">{hours}:{minutes}:{seconds}</span>
        <span className="timezone-date">({day})</span>
        <span className="timezone-remove" onClick={this.remove.bind(this)}></span>
      </div>
    )
  }
}

