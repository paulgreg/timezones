import timezones from 'timezones.json'
import { TimeZoneType, TimeZonesType } from './TimeZonesTypes'
const etc = 'Etc'

const getLabelIdx = (array: TimeZonesType, label: string) => array.findIndex((tz) => tz.label === label)

const uniqueTimezone = (tz: TimeZoneType, idx: number, array: TimeZonesType) => getLabelIdx(array, tz.label) === idx

const filterTzWithCity = (tz: TimeZoneType) => tz.label.indexOf('/') !== -1

const format = (label: string) => label.replace(/_/g, ' ')

export const getContinent = (label: string, avoidEtc = false) => {
  const continent = label.split('/')[0]
  return avoidEtc && continent === etc ? '' : continent
}

const splitLabel = (label: string) => label.split('/')

export const getCountry = (label: string) => {
  const s = splitLabel(label)
  return s.length === 3 ? format(s[1]) : ''
}

export const getCity = (label: string) => {
  const s = splitLabel(label)
  const city = s[s.length - 1]
  return format(city)
}

const getAllCache: TimeZonesType = []

const flatten = (arr: TimeZoneType[][]): TimeZoneType[] =>
  arr.reduce((acc: TimeZoneType[], arrayToFlatten: TimeZoneType[] | TimeZoneType) => {
    if (Array.isArray(arrayToFlatten)) {
      return acc.concat(...arrayToFlatten)
    } else {
      return acc.concat(arrayToFlatten)
    }
  }, [])

export const getTimeZones = (): TimeZoneType[] => {
  if (!getAllCache.length) {
    const allTzs = flatten(timezones.map((tz) => tz.utc.map((label) => ({ label, offset: tz.offset }))))
    getAllCache.push(...allTzs.filter(filterTzWithCity).filter(uniqueTimezone).sort(sortTimeZone))
  }
  return getAllCache
}

const getCache: Record<string, TimeZoneType> = {}

export const getTimeZone = (zoneToLookup: string) => {
  if (!getCache[zoneToLookup]) {
    const tz = timezones.find((tz) => tz.utc.includes(zoneToLookup))

    if (tz) {
      const { offset } = tz
      getCache[zoneToLookup] = { label: zoneToLookup, offset }
    }
  }
  return getCache[zoneToLookup]
}

export const sortTimeZone = (tz1: TimeZoneType, tz2: TimeZoneType) => {
  const { label: labelA, offset: offsetA } = tz1
  const { label: labelB, offset: offsetB } = tz2
  const continentA = getContinent(labelA)
  const continentB = getContinent(labelB)
  const cityA = getCity(labelA)
  const cityB = getCity(labelB)

  const continentAIsEtc = continentA === etc
  const continentBIsEtc = continentB === etc

  if (continentAIsEtc && continentBIsEtc) {
    return offsetB - offsetA
  } else if (continentA === continentB) {
    if (cityA < cityB) return -1
    else if (cityA > cityB) return 1
    return 0
  } else if (continentAIsEtc || continentBIsEtc) {
    return continentAIsEtc ? 1 : -1
  }
  if (continentA < continentB) return -1
  if (continentA > continentB) return 1
  return 0
}

export const formatOffset = (nb: number) => `(${nb >= 0 ? '+' : ''}${nb}h)`

export const filterTimeZones = (timezones: TimeZonesType, excludedLabels: Array<String>) =>
  timezones.filter((tz) => excludedLabels.indexOf(tz.label) === -1)

export const groupTimeZones = (timezones: TimeZonesType) =>
  timezones.reduce((acc: Record<string, TimeZonesType>, value) => {
    const continent = getContinent(value.label)
    if (!acc[continent]) acc[continent] = []
    acc[continent].push(value)
    return acc
  }, {})
