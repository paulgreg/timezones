import React, { Component } from 'react';
import './Time.css';

function pad(nb) {
    return nb < 10 ? '0' + nb : '' + nb
}

function build(offset) {
  const options = { weekday: 'short', day: 'numeric' };
  const date = new Date()
  return {
      hours: pad(date.getUTCHours() + offset),
      minutes: pad(date.getMinutes()),
      seconds: pad(date.getSeconds()),
      day: date.toLocaleDateString('fr-FR', options)
  }
}

export default class Time extends Component {

  constructor(props) {
    super(props)
    this.state = build(this.props.timezone.offset)
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
    this.setState(build(this.props.timezone.offset))
  }

  render() {
    return (
      <div className="time">
        <span className="time-label">{this.props.label}</span>
        <span className="time-time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
        <span className="time-date">({this.state.day})</span>
      </div>
    );
  }
}

