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

function filterEtcTz (tz) {
  return !tz.label.startsWith('Etc')
}

const getCache = {}

export default class {

  getAll() {
    const allTzs = flatten(timezones.map(tz => {
      return tz.utc.map(label => {
        return { label, offset: tz.offset }
      })
    }))
    return allTzs.filter(filterEtcTz).filter(uniqueTimezone).sort(sortTimezone)
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

}

