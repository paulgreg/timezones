import { getTimeZone, getTimeZones, sortTimeZone, getCity, getCountry, getContinent } from './TimeZonesHelper'

describe('getTimeZone', () => {
  it('Europe/Paris', () => {
    const tz = getTimeZone('Europe/Paris')
    expect(tz).not.toEqual({})
    expect(tz.value).toEqual('Romance Standard Time')
    expect(tz.abbr).toEqual('RDT')
    expect(tz.offset).toEqual(2)
    expect(tz.label).toEqual('Europe/Paris')
  })
})

describe('getTimeZones', () => {
  it('should return all zone', () => {
    const tzs = getTimeZones()
    expect(tzs.length).toEqual(435)
    expect(tzs[0].label).toEqual('Africa/Abidjan')
    expect(tzs[0].offset).toEqual(0)
  })
})

describe('getCity', () => {
  it('America/La_Paz', () => {
    expect(getCity('America/La_Paz')).toEqual('La Paz')
  })
  it('America/Argentina/Salta', () => {
    expect(getCity('America/Argentina/Salta')).toEqual('Salta')
  })
  it('Europe/Isle_of_Man', () => {
    expect(getCity('Europe/Isle_of_Man')).toEqual('Isle of Man')
  })
})

describe('getContinent', () => {
  it('America/La_Paz', () => {
    expect(getContinent('America/La_Paz')).toEqual('America')
  })
  it('America/Argentina/Salta', () => {
    expect(getContinent('America/Argentina/Salta')).toEqual('America')
  })
})

describe('getCountry', () => {
  it('America/La_Paz', () => {
    expect(getCountry('America/La_Paz')).toEqual('')
  })
  it('America/Argentina/Salta', () => {
    expect(getCountry('America/Argentina/Salta')).toEqual('Argentina')
  })
})

describe('sortTimeZone', () => {
  it('sortTimezone should sort by continent', () => {
    expect(sortTimeZone({ label: 'A/a' }, { label: 'A/a' })).toEqual(0)
    expect(sortTimeZone({ label: 'A/a' }, { label: 'B/b' })).toEqual(-1)
    expect(sortTimeZone({ label: 'B/b' }, { label: 'A/a' })).toEqual(1)
  })
  it('sortTimezone should sort by city', () => {
    expect(sortTimeZone({ label: 'A/a' }, { label: 'A/b' })).toEqual(-1)
    expect(sortTimeZone({ label: 'A/b' }, { label: 'A/a' })).toEqual(1)
  })
  it('sortTimezone should set Etc at the end', () => {
    expect(sortTimeZone({ label: 'Etc/a' }, { label: 'A/b' })).toEqual(1)
    expect(sortTimeZone({ label: 'Etc/b' }, { label: 'A/a' })).toEqual(1)
  })
  it('sortTimezone should sort Etc by offset', () => {
    expect(sortTimeZone({ label: 'Etc/a', offset: 0 }, { label: 'Etc/b', offset: 1 })).toEqual(1)
    expect(sortTimeZone({ label: 'Etc/b', offset: 1 }, { label: 'Etc/a', offset: 0 })).toEqual(-1)
  })
  it('sortTimezone should sort by county', () => {
    expect(sortTimeZone({ label: 'America/Argentina/Rio' }, { label: 'America/Bahia' })).toEqual(1)
  })
})
