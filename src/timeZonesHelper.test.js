
import TimeZonesHelper from './TimeZonesHelper'

const tzh = new TimeZonesHelper()

describe('get', () => {
    it('should return zone for Europe/Paris', () => {
        const tz = tzh.get('Europe/Paris')
        expect(tz).not.toEqual({})
        expect(tz.value).toEqual("Romance Standard Time")
        expect(tz.abbr).toEqual("RDT")
        expect(tz.offset).toEqual(2)
        expect(tz.label).toEqual("Europe/Paris")
    })
})

describe('sortTimezone', () => {
    it('sortTimezone should sort by continent', () => {
        expect(tzh.sortTimezone({label: 'A/a'}, {label:'A/a'})).toEqual(0)
        expect(tzh.sortTimezone({label: 'A/a'}, {label:'B/b'})).toEqual(-1)
        expect(tzh.sortTimezone({label: 'B/b'}, {label:'A/a'})).toEqual(1)
    })
    it('sortTimezone should sort by city', () => {
        expect(tzh.sortTimezone({label: 'A/a'}, {label:'A/b'})).toEqual(-1)
        expect(tzh.sortTimezone({label: 'A/b'}, {label:'A/a'})).toEqual(1)
    })
    it('sortTimezone should set Etc at the end', () => {
        expect(tzh.sortTimezone({label: 'Etc/a'}, {label:'A/b'})).toEqual(1)
        expect(tzh.sortTimezone({label: 'Etc/b'}, {label:'A/a'})).toEqual(1)
    })
    it('sortTimezone should sort Etc by offset', () => {
        expect(tzh.sortTimezone({label: 'Etc/a', offset: 0}, {label:'Etc/b', offset: 1})).toEqual(1)
        expect(tzh.sortTimezone({label: 'Etc/b', offset: 1}, {label:'Etc/a', offset: 0})).toEqual(-1)
    })
})

describe('getAll', () => {
    it('should return all zone', () => {
        const tzs = tzh.getAll()
        expect(tzs.length).toEqual(429)
        expect(tzs[0].label).toEqual('Africa/Abidjan')
        expect(tzs[0].offset).toEqual(0)
    })
})
