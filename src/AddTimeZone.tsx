import React, { useState, useCallback, useRef } from 'react'
import { getTimeZones, filterTimeZones, groupTimeZones, formatOffset, getCity, getCountry } from './TimeZonesHelper'
import { useTimeZoneContext } from './TimeZoneContext'
import Select, { SingleValue, GroupBase, SelectInstance } from 'react-select'
import './AddTimeZone.css'

const displayCounty = (label: string) => {
  const county = getCountry(label)
  return county ? `(${county})` : ''
}

type OptionType = {
  value: string
  label: string
}
type GroupOptionsType = {
  label: string
  options: Array<OptionType>
}

const AddTimeZone = () => {
  const { addTimeZone, timezones } = useTimeZoneContext()
  const tzs = filterTimeZones(getTimeZones(), timezones)
  const timezoneGroups = groupTimeZones(tzs)
  const [selectValue, setSelectValue] = useState<OptionType | null>(null)
  const selectRef = useRef<SelectInstance<OptionType, false, GroupBase<OptionType>> | null>(null)

  const add = useCallback(() => {
    if (selectValue) {
      addTimeZone(selectValue.value)
      selectRef.current?.clearValue()
    }
  }, [selectValue, addTimeZone])

  const handleChange = useCallback(
    (item: SingleValue<OptionType>) => {
      if (item) {
        setSelectValue(item)
      }
    },
    [setSelectValue]
  )

  const groupedOptions: GroupOptionsType[] = Object.keys(timezoneGroups).map((group) => ({
    label: group,
    options: timezoneGroups[group].map(
      (tz): OptionType => ({
        value: tz.label,
        label: `${getCity(tz.label)} ${displayCounty(tz.label)} ${formatOffset(tz.offset)}`,
      })
    ),
  }))

  return (
    <div className="add-timezone">
      <Select<OptionType, false, GroupBase<OptionType>>
        ref={selectRef}
        options={groupedOptions}
        onChange={handleChange}
        className="add-timezone-select-container"
        classNamePrefix="add-timezone-select"
        isClearable={true}
        value={selectValue}
      />
      <button disabled={!selectValue} className="add-timezone-button" onClick={add}>
        Add
      </button>
    </div>
  )
}

export default AddTimeZone
