import timezones from 'timezones.json'

export default class {

  get(zoneToLookup) {
    const tz = timezones.find(tz => {
      return tz.utc.find(zone => zone === zoneToLookup)
    })
    return Object.assign({ label: zoneToLookup }, tz)
  }

}

