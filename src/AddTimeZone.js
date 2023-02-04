import React, { useState, useCallback, useEffect } from 'react'
import { getTimeZones, filterTimeZones, groupTimeZones, formatOffset, getCity, getCountry } from './TimeZonesHelper'
import './AddTimeZone.css'

const displayCounty = (label) => {
  const county = getCountry(label)
  return county ? `(${county})` : ''
}

const AddTimeZone = ({ excludedTimezones, addFn }) => {
  const tzs = filterTimeZones(getTimeZones(), excludedTimezones)
  const timezoneGroups = groupTimeZones(tzs)
  const firstTimeZone = tzs[0].label
  const [selectValue, setSelectValue] = useState(firstTimeZone)

  useEffect(() => setSelectValue(firstTimeZone), [firstTimeZone])

  const addTimezone = useCallback(() => addFn(selectValue), [addFn, selectValue])

  const handleChange = useCallback(
    (e) => {
      setSelectValue(e.target.value)
    },
    [setSelectValue]
  )

  return (
    <div className="add-timezone">
      <select value={selectValue} onChange={handleChange}>
        {Object.keys(timezoneGroups).map((group) => (
          <optgroup key={group} label={group}>
            {timezoneGroups[group].map((tz) => (
              <option key={tz.label} value={tz.label}>
                {getCity(tz.label)} {displayCounty(tz.label)} {formatOffset(tz.offset)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button onClick={() => addTimezone()}>Add</button>
    </div>
  )
}

export default AddTimeZone
