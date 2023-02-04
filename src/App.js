import React, { useCallback, useState } from 'react'
import TimeZone from './TimeZone'
import AddTimeZone from './AddTimeZone'
import logo from './logo.svg'
import './App.css'

const LOCAL_STORAGE_KEY = 'timezone_labels'
const DEFAULT_TIMEZONES = 'Europe/Paris,America/New_York'

const initialLabels = window.localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_TIMEZONES

const App = () => {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">TimeZones</h1>
      </header>
      {timezones.map((timezoneLabel) => (
        <div className="App-time" key={timezoneLabel}>
          <TimeZone timezoneLabel={timezoneLabel} removeFn={removeTimeZone} />
        </div>
      ))}
      <div className="App-timezone">
        <AddTimeZone addFn={addTimeZone} excludedTimezones={timezones} />
      </div>
      <a href="https://github.com/paulgreg/timezones/blob/master/README.md">readme</a> -{' '}
      <a href="https://github.com/paulgreg/timezones">github</a> - <a href="https://paulgreg.me/">author</a>
    </div>
  )
}

export default App
