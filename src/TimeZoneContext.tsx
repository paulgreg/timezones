import React, { useState, useCallback, createContext, useContext, useMemo } from 'react'

type TimeZoneContextType = {
  timezones: Array<string>
  addTimeZone: (timezone: string) => void
  removeTimeZone: (timezone: string) => void
}

export const TimeZoneContext = createContext<TimeZoneContextType>({} as TimeZoneContextType)

export const useTimeZoneContext = () => useContext(TimeZoneContext)

interface TimeZoneContextProviderPropsType {
  children: React.ReactNode | React.ReactNode[]
}

export const TimeZoneProvider: React.FC<TimeZoneContextProviderPropsType> = ({ children }) => {
  const LOCAL_STORAGE_KEY = 'timezone_labels'
  const DEFAULT_TIMEZONES = 'Europe/Paris,America/New_York'

  const initialLabels = window.localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_TIMEZONES

  const [timezones, setTimezones] = useState<Array<string>>(initialLabels.split(','))

  const update = useCallback(
    (labels: Array<string>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, labels.join(','))
      setTimezones(labels)
    },
    [setTimezones]
  )

  const addTimeZone = useCallback(
    (timezoneToAdd: string) => update(timezones.concat(timezoneToAdd)),
    [timezones, update]
  )

  const removeTimeZone = useCallback(
    (timezoneToRemove: string) => update(timezones.filter((l) => l !== timezoneToRemove)),
    [timezones, update]
  )

  const contextValue = useMemo(
    () => ({
      timezones,
      addTimeZone,
      removeTimeZone,
    }),
    [timezones, addTimeZone, removeTimeZone]
  )

  return <TimeZoneContext.Provider value={contextValue}>{children}</TimeZoneContext.Provider>
}
