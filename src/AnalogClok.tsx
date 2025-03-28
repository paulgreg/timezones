import React, { useState, useEffect, useCallback } from 'react'
import { registerTick, unregisterTick } from './Tick'
import './AnalogClock.css'

const clockLabel = 'clock'

type AnalogClockType = {
  size: number
}

const AnalogClock: React.FC<AnalogClockType> = ({ size = 200 }) => {
  const z = size / 2
  const transformOrigin = `${z} ${z}`

  const [hourAngle, setHourAngle] = useState(0)
  const [minuteAngle, setMinuteAngle] = useState(0)
  const [secondAngle, setSecondAngle] = useState(0)
  const [state, setState] = useState(0) // State is used to remove transition after hands initialization

  const separations = new Array(12).fill(0)

  const updateTime = useCallback(
    (timestamp: number) => {
      if (state < 2) setState((state) => state + 1)
      const date = new Date(timestamp)
      setHourAngle((360 * date.getHours()) / 12 + date.getMinutes() / 2)
      setMinuteAngle((360 * date.getMinutes()) / 60)
      setSecondAngle((360 * date.getSeconds()) / 60)
    },
    [state, setHourAngle, setMinuteAngle, setSecondAngle]
  )

  useEffect(() => {
    registerTick(clockLabel, updateTime)
    return () => unregisterTick(clockLabel)
  }, [registerTick, unregisterTick, updateTime])

  useEffect(() => {}, [])

  return (
    <svg width={size} height={size} className={state < 2 ? 'transition' : ''}>
      <g>
        <circle
          id="circle"
          style={{ stroke: '#FFF', strokeWidth: `${z * 0.08}px`, fill: 'royalblue' }}
          cx={z}
          cy={z}
          r={z * 0.8}
        ></circle>
      </g>
      <g>
        <line
          x1={z}
          y1={z}
          x2={z}
          y2={z * 0.55}
          style={{ strokeWidth: '3px', stroke: '#fffbf9' }}
          transform={`rotate(${hourAngle})`}
          transform-origin={transformOrigin}
        />
        <line
          x1={z}
          y1={z}
          x2={z}
          y2={z * 0.4}
          style={{ strokeWidth: '4px', stroke: '#fdfdfd' }}
          transform={`rotate(${minuteAngle})`}
          transform-origin={transformOrigin}
        />
        <line
          x1={z}
          y1={z}
          x2={z}
          y2={z * 0.3}
          style={{ strokeWidth: '2px', stroke: '#C1EFED' }}
          transform={`rotate(${secondAngle})`}
          transform-origin={transformOrigin}
        />
      </g>
      <circle
        id="center"
        cx={z}
        cy={z}
        r="3"
        style={{ fill: 'royalblue', stroke: 'lightblue', strokeWidth: '2px' }}
      ></circle>
      {separations.map((_v, idx) => (
        <line
          key={`hands-${idx}`}
          x1={z}
          y1={z * 0.3}
          x2={z}
          y2={z * 0.4}
          transform={`rotate(${(idx * 360) / 12} ${z} ${z})`}
          style={{ stroke: '#ffffff' }}
        />
      ))}
    </svg>
  )
}

export default AnalogClock
