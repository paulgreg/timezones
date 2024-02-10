import { useCallback } from 'react'

const AnalogClock = ({ size = 200 }) => {
  const z = size / 2

  const date = new Date()
  const hourAngle = (360 * date.getHours()) / 12 + date.getMinutes() / 2
  const minuteAngle = (360 * date.getMinutes()) / 60
  const secondAngle = (360 * date.getSeconds()) / 60

  const shifter = useCallback((val) => [val, z, z].join(' '), [z])

  const separations = new Array(12).fill(0)

  return (
    <svg width={size} height={size}>
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
        <line x1={z} y1={z} x2={z} y2={z * 0.55} style={{ strokeWidth: '3px', stroke: '#fffbf9' }} id="hourhand">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="43200s"
            repeatCount="indefinite"
            from={shifter(hourAngle)}
            to={shifter(hourAngle + 360)}
          />
        </line>
        <line x1={z} y1={z} x2={z} y2={z * 0.4} style={{ strokeWidth: '4px', stroke: '#fdfdfd' }} id="minutehand">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="3600s"
            repeatCount="indefinite"
            from={shifter(minuteAngle)}
            to={shifter(minuteAngle + 360)}
          />
        </line>
        <line x1={z} y1={z} x2={z} y2={z * 0.3} style={{ strokeWidth: '2px', stroke: '#C1EFED' }} id="secondhand">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="60s"
            repeatCount="indefinite"
            from={shifter(secondAngle)}
            to={shifter(secondAngle + 360)}
          />
        </line>
      </g>
      <circle
        id="center"
        cx={z}
        cy={z}
        r="3"
        style={{ fill: 'royalblue', stroke: 'lightblue', strokeWidth: '2px' }}
      ></circle>
      {separations.map((v, idx) => (
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
