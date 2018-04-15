
import TimeZonesHelper from './TimeZonesHelper'

const tzh = new TimeZonesHelper()

it('get should return zone for Europe/Paris', () => {
    const tz = tzh.get('Europe/Paris')
    expect(tz).not.toEqual({})
    expect(tz.value).toEqual("Romance Standard Time")
    expect(tz.abbr).toEqual("RDT")
    expect(tz.offset).toEqual(2)
    expect(tz.label).toEqual("Europe/Paris")
})

it('getall should return all zone', () => {
    const tzs = tzh.getAll()
    expect(tzs.length).toEqual(409)
    expect(tzs[0].label).toEqual('Pacific/Niue')
    expect(tzs[0].offset).toEqual(-11)
})
