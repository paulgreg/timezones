import React, { useState, useCallback, useEffect } from 'react'
import { registerTick, unregisterTick } from './Tick'
import { DateTime } from 'luxon'
import { getTimeZone, formatOffset, getCountry, getCity, getContinent } from './TimeZonesHelper'
import './TimeZone.css'

const dateLocaleStringOptions = { weekday: 'short', day: 'numeric' }

const getDay = (date) => date.toLocaleString(window.navigator.language, dateLocaleStringOptions)

const getDayOrNightClass = (date) => (date.hour >= 7 && date.hour <= 19 ? 'day' : 'night')

const pad = (nb) => (nb < 10 ? '0' + nb : '' + nb)

const Time = ({ timezoneLabel, removeFn }) => {
  const [timestamp, setTimestamp] = useState(Date.now())

  const updateTimestamp = useCallback((newTimestamp) => setTimestamp(newTimestamp), [setTimestamp])

  useEffect(() => {
    registerTick(timezoneLabel, updateTimestamp)
    return () => unregisterTick(timezoneLabel)
  }, [registerTick, unregisterTick, updateTimestamp, timezoneLabel])

  const remove = useCallback(() => removeFn(timezoneLabel), [removeFn, timezoneLabel])

  const timezone = getTimeZone(timezoneLabel)
  const date = DateTime.fromMillis(timestamp).setZone(timezone.label)
  const county = getCountry(timezoneLabel)

  return (
    <div className="timezone">
      <span className="timezone-label">
        {getCity(timezone.label)}&nbsp;
        <small>{formatOffset(timezone.offset)}</small>&nbsp;
        {county ? <small>{county}</small> : <small>{getContinent(timezone.label, true)}</small>}
      </span>
      <span className={`timezone-${getDayOrNightClass(date)}`}></span>
      <span className="timezone-time">
        {pad(date.hour)}:{pad(date.minute)}
      </span>
      <span className="timezone-date">({getDay(date)})</span>
      <span className="timezone-remove" onClick={remove}></span>
    </div>
  )
}

export default Time
