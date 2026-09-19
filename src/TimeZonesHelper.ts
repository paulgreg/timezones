import { Temporal } from '@js-temporal/polyfill'
import { TimeZoneType, TimeZonesType } from './TimeZonesTypes'

const filterTzWithCity = (label: string) => label.includes('/')

const format = (label: string) => label.replaceAll('_', ' ')

export const getContinent = (label: string) => label.split('/')[0]

const splitLabel = (label: string) => label.split('/')

export const getCountry = (label: string) => {
  const s = splitLabel(label)
  return s.length === 3 ? format(s[1]) : ''
}

export const getCity = (label: string) => {
  const s = splitLabel(label)
  const city = s.at(-1)
  if (!city) throw new Error('missing city')
  return format(city)
}

const getAllCache: TimeZonesType = []

const getOffset = (label: string) => Temporal.Now.zonedDateTimeISO(label).offsetNanoseconds / 6e10

export const getTimeZones = (): TimeZoneType[] => {
  if (!getAllCache.length) {
    const allTzs = Intl.supportedValuesOf('timeZone')
      .filter(filterTzWithCity)
      .map((label) => ({ label, offset: getOffset(label) }))
    getAllCache.push(...allTzs.toSorted(sortTimeZone))
  }
  return getAllCache
}

const getCache: Record<string, TimeZoneType> = {}

export const getTimeZone = (zoneToLookup: string) => {
  if (!getCache[zoneToLookup]) {
    getCache[zoneToLookup] = { label: zoneToLookup, offset: getOffset(zoneToLookup) }
  }
  return getCache[zoneToLookup]
}

export const sortTimeZone = (tz1: TimeZoneType, tz2: TimeZoneType) => {
  const { label: labelA } = tz1
  const { label: labelB } = tz2
  const continentA = getContinent(labelA)
  const continentB = getContinent(labelB)
  const cityA = getCity(labelA)
  const cityB = getCity(labelB)

  if (continentA === continentB) {
    if (cityA < cityB) return -1
    else if (cityA > cityB) return 1
    return 0
  }
  if (continentA < continentB) return -1
  if (continentA > continentB) return 1
  return 0
}

const pad = (nb: number) => (nb < 10 ? '0' + nb : '' + nb)

export const formatOffset = (nb: number) => {
  const sign = nb >= 0 ? '+' : '-'
  const abs = Math.abs(nb)
  const hours = Math.floor(abs / 60)
  const minutes = abs % 60
  return minutes ? `(${sign}${hours}:${pad(minutes)})` : `(${sign}${hours}h)`
}

export const filterTimeZones = (timezones: TimeZonesType, excludedLabels: Array<string>) =>
  timezones.filter((tz) => !excludedLabels.includes(tz.label))

export const groupTimeZones = (timezones: TimeZonesType) =>
  timezones.reduce((acc: Record<string, TimeZonesType>, value) => {
    const continent = getContinent(value.label)
    if (!acc[continent]) acc[continent] = []
    acc[continent].push(value)
    return acc
  }, {})
