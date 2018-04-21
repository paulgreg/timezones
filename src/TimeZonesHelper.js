import timezones from 'timezones.json'

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function sortTimezone (a, b) {
  return a.label <  b.label ? -1 : (a.label > b.label) ? 1 : 0
}

function getLabelIdx (array, label) {
  return array.findIndex(tz => tz.label === label)
}

function uniqueTimezone (tz, idx, array) {
  return getLabelIdx(array, tz.label) === idx;
}

function filterTzWithCity(tz) {
  return !tz.label.startsWith('Etc') && tz.label.indexOf('/') !== -1
}

const getCache = {}
let getAllCache = []

export default class {

  getAll() {
    if (!getAllCache.length) {
      const allTzs = flatten(timezones.map(tz => {
        return tz.utc.map(label => {
          return { label, offset: tz.offset }
        })
      }))
      getAllCache = allTzs.filter(filterTzWithCity).filter(uniqueTimezone).sort(sortTimezone)
    }
    return getAllCache
  }

  get(zoneToLookup) {
    if (!getCache[zoneToLookup]) {
      const tz = timezones.find(tz => {
        return tz.utc.find(zone => zone === zoneToLookup)
      })
      const result = Object.assign({ label: zoneToLookup }, tz)
      getCache[zoneToLookup] = result
    }
    return getCache[zoneToLookup]
  }

  formatOffset(nb) {
    return `(${nb >= 0 ? '+' : ''}${nb}h)`
  }

  filterTimezones (timezones, excludedLabels) {
    return timezones.filter(tz => excludedLabels.indexOf(tz.label) === -1)
  }

  getContinent (label) {
    return label.split('/')[0]
  }

  getCity(label) {
    const s = label.split('/')
    return s[s.length-1].replace('_', ' ')
  }

  groupTimezones (timezones) {
    return timezones.reduce((acc, value) => {
      const continent = this.getContinent(value.label)
      if (!acc[continent]) acc[continent] = []
      acc[continent].push(value)
      return acc
    }, {})
  }

}

