import timezones from 'timezones.json'
const etc = 'Etc'

const flatten = (arr) =>
  arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])

const getLabelIdx = (array, label) => array.findIndex((tz) => tz.label === label)

const uniqueTimezone = (tz, idx, array) => getLabelIdx(array, tz.label) === idx

const filterTzWithCity = (tz) => tz.label.indexOf('/') !== -1

const format = (label) => label.replace(/_/g, ' ')

export const getContinent = (label, avoidEtc = false) => {
  const continent = label.split('/')[0]
  return avoidEtc && continent === etc ? '' : continent
}

const splitLabel = (label) => label.split('/')

export const getCountry = (label) => {
  const s = splitLabel(label)
  return s.length === 3 ? format(s[1]) : ''
}

export const getCity = (label) => {
  const s = splitLabel(label)
  const city = s[s.length - 1]
  return format(city)
}

const getAllCache = []

export const getTimeZones = () => {
  if (!getAllCache.length) {
    const allTzs = flatten(
      timezones.map((tz) => {
        return tz.utc.map((label) => {
          return { label, offset: tz.offset }
        })
      })
    )
    getAllCache.push.apply(getAllCache, allTzs.filter(filterTzWithCity).filter(uniqueTimezone).sort(sortTimeZone))
  }
  return getAllCache
}

const getCache = {}

export const getTimeZone = (zoneToLookup) => {
  if (!getCache[zoneToLookup]) {
    const tz = timezones.find((tz) => {
      return tz.utc.find((zone) => zone === zoneToLookup)
    })
    const result = Object.assign({ label: zoneToLookup }, tz)
    getCache[zoneToLookup] = result
  }
  return getCache[zoneToLookup]
}

export const sortTimeZone = ({ label: labelA, offset: offsetA }, { label: labelB, offset: offsetB }) => {
  const continentA = getContinent(labelA)
  const continentB = getContinent(labelB)
  const cityA = getCity(labelA)
  const cityB = getCity(labelB)

  const continentAIsEtc = continentA === etc
  const continentBIsEtc = continentB === etc

  if (continentAIsEtc && continentBIsEtc) {
    return offsetB - offsetA
  } else if (continentA === continentB) {
    return cityA < cityB ? -1 : cityA > cityB ? 1 : 0
  } else if (continentAIsEtc || continentBIsEtc) {
    return continentAIsEtc ? 1 : -1
  }
  return continentA < continentB ? -1 : continentA > continentB ? 1 : 0
}

export const formatOffset = (nb) => `(${nb >= 0 ? '+' : ''}${nb}h)`

export const filterTimeZones = (timezones, excludedLabels) =>
  timezones.filter((tz) => excludedLabels.indexOf(tz.label) === -1)

export const groupTimeZones = (timezones) =>
  timezones.reduce((acc, value) => {
    const continent = getContinent(value.label)
    if (!acc[continent]) acc[continent] = []
    acc[continent].push(value)
    return acc
  }, {})
