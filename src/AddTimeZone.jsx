import React, { useState, useCallback, useContext, useRef } from 'react'
import { getTimeZones, filterTimeZones, groupTimeZones, formatOffset, getCity, getCountry } from './TimeZonesHelper'
import Select from 'react-select'
import { TimeZoneContext } from './TimeZoneContext'
import './AddTimeZone.css'

const displayCounty = (label) => {
  const county = getCountry(label)
  return county ? `(${county})` : ''
}

const AddTimeZone = () => {
  const { addTimeZone, timezones } = useContext(TimeZoneContext)
  const tzs = filterTimeZones(getTimeZones(), timezones)
  const timezoneGroups = groupTimeZones(tzs)
  const [selectValue, setSelectValue] = useState(null)
  const selectInputRef = useRef()

  const add = useCallback(() => {
    addTimeZone(selectValue)
    selectInputRef.current.clearValue()
  }, [setSelectValue, addTimeZone, selectValue])

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
      <button disabled={!selectValue} className="add-timezone-button" onClick={add}>
        Add
      </button>
    </div>
  )
}

export default AddTimeZone
