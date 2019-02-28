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
      getAllCache = allTzs.filter(filterTzWithCity).filter(uniqueTimezone).sort(this.sortTimezone)
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

  sortTimezone (a, b) {
    const labelA = a.label.split('/')
    const labelB = b.label.split('/')
    const [ continentA, cityA ] = labelA
    const [ continentB, cityB ] = labelB

    const continentAIsEtc = continentA === etc
    const continentBIsEtc = continentB === etc

    if (continentAIsEtc && continentBIsEtc) {
      return b.offset - a.offset
    } else if (continentA === continentB) {
      return cityA < cityB ? -1 : (cityA > cityB) ? 1 : 0
    } else if (continentAIsEtc || continentBIsEtc) {
      return continentAIsEtc ? 1 : -1
    }
    return continentA < continentB ? -1 : (continentA > continentB) ? 1 : 0
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

