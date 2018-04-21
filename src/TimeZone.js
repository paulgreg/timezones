import React, { Component } from 'react';
import './TimeZone.css';

import TimeZonesHelper from './TimeZonesHelper'
const tzh = new TimeZonesHelper()

function pad(nb) {
    return nb < 10 ? '0' + nb : '' + nb
}

function build(props) {
  const timezone = tzh.get(props.label)
  const options = { weekday: 'short', day: 'numeric' };
  const date = new Date()
  const minuteOffset = timezone.offset * 60
  date.setHours(date.getUTCHours() + (minuteOffset / 60))
  date.setMinutes(date.getUTCMinutes() + (minuteOffset % 60))
  return {
      timezone: timezone,
      hours: pad(date.getHours()),
      minutes: pad(date.getMinutes()),
      seconds: pad(date.getSeconds()),
      day: date.toLocaleDateString(window.navigator.language, options)
  }
}

export default class Time extends Component {

  constructor(props) {
    super(props)
    this.state = build(this.props)
  }

  componentDidMount() {
    this.play()
  }

  componentWillUnmount() {
    this.pause()
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  play() {
    if (!this.interval) {
      this.interval = setInterval(this.update.bind(this), 1000)
    }
  }

  update() {
    this.setState(build(this.props))
  }

  remove() {
    this.props.removeFn(this.state.timezone.label)
  }

  render() {
    return (
      <div className="timezone">
        <span className="timezone-label">{this.state.timezone.label} {tzh.formatOffset(this.state.timezone.offset)}</span>
        <span className="timezone-time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
        <span className="timezone-date">({this.state.day})</span>
        <span className="timezone-remove" onClick={this.remove.bind(this)}></span>
      </div>
    );
  }
}

