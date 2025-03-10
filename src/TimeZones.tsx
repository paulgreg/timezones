import React from 'react'
import { useTimeZoneContext } from './TimeZoneContext'
import TimeZone from './TimeZone'

const TimeZones = () => {
  const { timezones, removeTimeZone } = useTimeZoneContext()

  return (
    <>
      {timezones.map((timezoneLabel) => (
        <div className="TimeZones-time" key={timezoneLabel}>
          <TimeZone timezoneLabel={timezoneLabel} removeFn={removeTimeZone} />
        </div>
      ))}
    </>
  )
}

export default TimeZones
