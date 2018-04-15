
import TimeZonesHelper from './TimeZonesHelper'

const tzh = new TimeZonesHelper()

it('should return zone for Europe/Paris', () => {
    const tz = tzh.get('Europe/Paris')
    expect(tz).not.toEqual({})
    expect(tz.value).toEqual("Romance Standard Time")
    expect(tz.abbr).toEqual("RDT")
    expect(tz.offset).toEqual(2)
    expect(tz.label).toEqual("Europe/Paris")
})
