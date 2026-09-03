import fc from 'fast-check'
import { isFalsy, parseCsv, parseSheet, splitList } from '@/lib/content/csv'
import { mergeContent } from '@/lib/content/normalize'
import { getDefaultContent } from '@/lib/content'
import { formatDays, formatTime, getOpenStatus } from '@/lib/hours'

const defaults = getDefaultContent()

describe('CSV parsing', () => {
  it('keeps commas and quotes that appear inside a cell', () => {
    const csv = 'Name,Summary\n"Full Grooming","Bath, brush and a ""breed-specific"" cut"'
    expect(parseSheet(csv)).toEqual([
      { name: 'Full Grooming', summary: 'Bath, brush and a "breed-specific" cut' },
    ])
  })

  it('handles newlines inside a quoted cell and CRLF line endings', () => {
    const csv = 'Question,Answer\r\n"How often?","Every 4 weeks.\nSometimes 8."\r\n'
    expect(parseSheet(csv)).toEqual([{ question: 'How often?', answer: 'Every 4 weeks.\nSometimes 8.' }])
  })

  it('normalises header spelling so owners can retype a header', () => {
    for (const header of ['Price Small', 'price small', 'PRICE_SMALL', 'price-small']) {
      expect(Object.keys(parseSheet(`${header}\n$45`)[0])).toEqual(['pricesmall'])
    }
  })

  it('drops blank rows left behind by spreadsheet editing', () => {
    expect(parseCsv('a,b\n1,2\n,\n\n3,4')).toEqual([
      ['a', 'b'],
      ['1', '2'],
      ['3', '4'],
    ])
  })

  it('never loses a field, whatever the cell contents', () => {
    fc.assert(
      fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 5 }), (cells) => {
        const csv = cells.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
        const [row] = parseCsv(csv)
        // A row of only-empty cells is filtered out as blank.
        if (cells.every((cell) => cell.trim() === '')) return
        expect(row).toHaveLength(cells.length)
      })
    )
  })

  it('splits list cells and reads the ways a spreadsheet says "no"', () => {
    expect(splitList('Bath | Nail trim |  Ear clean ')).toEqual(['Bath', 'Nail trim', 'Ear clean'])
    expect(splitList(undefined)).toEqual([])
    expect(['no', 'NO', 'false', 'hide', '0'].every(isFalsy)).toBe(true)
    expect(isFalsy('yes')).toBe(false)
  })
})

describe('Merging owner content over the defaults', () => {
  it('returns the defaults when there is no remote source', () => {
    expect(mergeContent(defaults, null)).toEqual(defaults)
  })

  it('applies only the fields the owner filled in', () => {
    const merged = mergeContent(defaults, { business: { phone: '+65 1111 2222' } as never })

    expect(merged.business.phone).toBe('+65 1111 2222')
    expect(merged.business.name).toBe(defaults.business.name)
    expect(merged.services).toEqual(defaults.services)
  })

  it('keeps a section rather than emptying it when the tab is broken', () => {
    for (const broken of [{ services: [] }, { services: [{}] }, { services: 'oops' }] as never[]) {
      expect(mergeContent(defaults, broken).services).toEqual(defaults.services)
    }
  })

  it('lets the team and testimonials be deliberately empty', () => {
    // These sections must be able to stay empty: the site should show no team
    // at all rather than invented groomers.
    expect(mergeContent(defaults, { team: [], testimonials: [] } as never).team).toEqual([])
    expect(mergeContent(defaults, { team: [], testimonials: [] } as never).testimonials).toEqual([])
  })

  it('drops rows that are missing what they need to render', () => {
    const merged = mergeContent(defaults, {
      team: [{ name: 'Wei Ling', role: 'Groomer' }, { role: 'No name here' }],
      faqs: [{ question: 'Q?', answer: '' }],
    } as never)

    expect(merged.team).toHaveLength(1)
    expect(merged.faqs).toEqual(defaults.faqs)
  })

  it('rejects opening hours that are not real times', () => {
    const merged = mergeContent(defaults, {
      hours: [{ days: ['Monday'], opens: 'ten am', closes: '18:00', closed: false }],
    } as never)

    expect(merged.hours).toEqual(defaults.hours)
  })

  it('clamps a testimonial rating into 1–5', () => {
    const merged = mergeContent(defaults, {
      testimonials: [
        { name: 'A', quote: 'Great', rating: 99 },
        { name: 'B', quote: 'Good', rating: 'not a number' },
      ],
    } as never)

    expect(merged.testimonials.map((item) => item.rating)).toEqual([5, 5])
  })

  it('survives any shape a remote source throws at it', () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const merged = mergeContent(defaults, anything as never)
        expect(typeof merged.business.name).toBe('string')
        expect(Array.isArray(merged.services)).toBe(true)
        expect(Array.isArray(merged.hours)).toBe(true)
      })
    )
  })
})

describe('Opening hours', () => {
  const hours = defaults.hours
  const sgt = 'Asia/Singapore'
  // 2026-03-04 is a Wednesday.
  const at = (iso: string) => new Date(iso)

  it('formats times and day ranges the way a shopfront writes them', () => {
    expect(formatTime('10:00')).toBe('10am')
    expect(formatTime('18:30')).toBe('6.30pm')
    expect(formatTime('00:00')).toBe('12am')
    expect(formatDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])).toBe('Mon – Fri')
    expect(formatDays(['Saturday'])).toBe('Saturday')
    expect(formatDays(['Monday', 'Thursday'])).toBe('Mon, Thu')
  })

  it('reports open during opening hours, in the salon timezone', () => {
    // 06:00 UTC on a Wednesday is 14:00 in Singapore.
    const status = getOpenStatus(hours, sgt, at('2026-03-04T06:00:00Z'))
    expect(status.isOpen).toBe(true)
    expect(status.label).toBe('Open until 6pm')
  })

  it('reports closed before opening and names the opening time', () => {
    // 00:00 UTC is 08:00 in Singapore, two hours before opening.
    const status = getOpenStatus(hours, sgt, at('2026-03-04T00:00:00Z'))
    expect(status.isOpen).toBe(false)
    expect(status.label).toBe('Closed · opens 10am')
  })

  it('points at the next open day once today has finished', () => {
    // 14:00 UTC is 22:00 in Singapore, after closing.
    const status = getOpenStatus(hours, sgt, at('2026-03-04T14:00:00Z'))
    expect(status.isOpen).toBe(false)
    expect(status.label).toBe('Closed · opens tomorrow 10am')
  })

  it('never claims to be open when every day is closed', () => {
    const closed = hours.map((row) => ({ ...row, closed: true }))
    expect(getOpenStatus(closed, sgt, at('2026-03-04T06:00:00Z'))).toEqual({ isOpen: false, label: 'Closed' })
  })
})
