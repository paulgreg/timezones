import React, { useState, useCallback, useRef } from 'react'
import Select from 'react-select'
import { getTimeZones, filterTimeZones, groupTimeZones, formatOffset, getCity, getCountry } from './TimeZonesHelper'
import './AddTimeZone.css'

const displayCounty = (label) => {
  const county = getCountry(label)
  return county ? `(${county})` : ''
}

const AddTimeZone = ({ excludedTimezones, addFn }) => {
  const tzs = filterTimeZones(getTimeZones(), excludedTimezones)
  const timezoneGroups = groupTimeZones(tzs)
  const [selectValue, setSelectValue] = useState(null)
  const selectInputRef = useRef()

  const addTimezone = useCallback(() => {
    addFn(selectValue)
    selectInputRef.current.clearValue()
  }, [setSelectValue, addFn, selectValue])

  const handleChange = useCallback((item) => setSelectValue(item?.value), [setSelectValue])

  const groupedOptions = Object.keys(timezoneGroups).map((group) => ({
    label: group,
    options: timezoneGroups[group].map((tz) => ({
      value: tz.label,
      label: `${getCity(tz.label)} ${displayCounty(tz.label)} ${formatOffset(tz.offset)}`,
    })),
  }))

  return (
    <div className="add-timezone">
      <Select
        ref={selectInputRef}
        options={groupedOptions}
        onChange={handleChange}
        className="add-timezone-select-container"
        classNamePrefix="add-timezone-select"
      />
      <button disabled={!selectValue} className="add-timezone-button" onClick={addTimezone}>
        Add
      </button>
    </div>
  )
}

export default AddTimeZone
