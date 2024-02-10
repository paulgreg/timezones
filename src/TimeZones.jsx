import { useContext } from 'react'
import { TimeZoneContext } from './TimeZoneContext'
import TimeZone from './TimeZone'

const TimeZones = () => {
  const { timezones, removeTimeZone } = useContext(TimeZoneContext)

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
