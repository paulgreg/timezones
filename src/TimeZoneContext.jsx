import { useState, useCallback, createContext } from 'react'

export const TimeZoneContext = createContext(undefined)

export const TimeZoneProvider = ({ children }) => {
  const LOCAL_STORAGE_KEY = 'timezone_labels'
  const DEFAULT_TIMEZONES = 'Europe/Paris,America/New_York'

  const initialLabels = window.localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_TIMEZONES

  const [timezones, setTimezones] = useState(initialLabels.split(','))

  const update = useCallback(
    (labels) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, labels.join(','))
      setTimezones(labels)
    },
    [setTimezones]
  )

  const addTimeZone = useCallback((timezoneToAdd) => update(timezones.concat(timezoneToAdd)), [timezones, update])

  const removeTimeZone = useCallback(
    (timezoneToRemove) => update(timezones.filter((l) => l !== timezoneToRemove)),
    [timezones, update]
  )

  const value = {
    timezones,
    addTimeZone,
    removeTimeZone,
  }

  return <TimeZoneContext.Provider value={value}>{children}</TimeZoneContext.Provider>
}
