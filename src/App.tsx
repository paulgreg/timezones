import React from 'react'
import AddTimeZone from './AddTimeZone'
import { TimeZoneProvider } from './TimeZoneContext'
import AnalogClock from './AnalogClok'
import TimeZones from './TimeZones'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AnalogClock size={140} />
        <h1 className="App-title">TimeZones</h1>
      </header>
      <TimeZoneProvider>
        <TimeZones />
        <div className="App-timezone">
          <AddTimeZone />
        </div>
      </TimeZoneProvider>
      <a href="https://github.com/paulgreg/timezones/blob/master/README.md">readme</a> -{' '}
      <a href="https://github.com/paulgreg/timezones">github</a> - <a href="https://paulgreg.me/">author</a>
    </div>
  )
}

export default App
