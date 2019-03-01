import timezones from 'timezones.json'
const etc = 'Etc'

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function getLabelIdx (array, label) {
  return array.findIndex(tz => tz.label === label)
}

function uniqueTimezone (tz, idx, array) {
  return getLabelIdx(array, tz.label) === idx;
}

function filterTzWithCity(tz) {
  return tz.label.indexOf('/') !== -1
}

function format(label) {
  return label.replace('_', ' ')
}
export function getContinent (label) {
  return label.split('/')[0]
}

export function getCounty(label) {
  const s = label.split('/')
  return s.length === 3 ? format(s[1]) : ''
}

export function getCity(label) {
  const s = label.split('/')
  return format(s[s.length-1])
}

const getAllCache = []

export function getTimeZones() {
  if (!getAllCache.length) {
    const allTzs = flatten(timezones.map(tz => {
      return tz.utc.map(label => {
        return { label, offset: tz.offset }
      })
    }))
    getAllCache.push.apply(getAllCache, allTzs.filter(filterTzWithCity).filter(uniqueTimezone).sort(sortTimeZone))
  }
  return getAllCache
}

const getCache = {}

export function getTimeZone(zoneToLookup) {
  if (!getCache[zoneToLookup]) {
    const tz = timezones.find(tz => {
      return tz.utc.find(zone => zone === zoneToLookup)
    })
    const result = Object.assign({ label: zoneToLookup }, tz)
    getCache[zoneToLookup] = result
  }
  return getCache[zoneToLookup]
}

export function sortTimeZone ({ label: labelA, offset: offsetA }, { label: labelB, offset: offsetB }) {
  const continentA = getContinent(labelA)
  const continentB = getContinent(labelB)
  const cityA = getCity(labelA)
  const cityB = getCity(labelB)

  const continentAIsEtc = continentA === etc
  const continentBIsEtc = continentB === etc

  if (continentAIsEtc && continentBIsEtc) {
    return offsetB - offsetA
  } else if (continentA === continentB) {
    return cityA < cityB ? -1 : (cityA > cityB) ? 1 : 0
  } else if (continentAIsEtc || continentBIsEtc) {
    return continentAIsEtc ? 1 : -1
  }
  return continentA < continentB ? -1 : (continentA > continentB) ? 1 : 0
}

export function formatOffset (nb) {
  return `(${nb >= 0 ? '+' : ''}${nb}h)`
}

export function filterTimeZones (timezones, excludedLabels) {
  return timezones.filter(tz => excludedLabels.indexOf(tz.label) === -1)
}

export function groupTimeZones (timezones) {
  return timezones.reduce((acc, value) => {
    const continent = getContinent(value.label)
    if (!acc[continent]) acc[continent] = []
    acc[continent].push(value)
    return acc
  }, {})
}

