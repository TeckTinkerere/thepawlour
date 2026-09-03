import { readTab } from '@/lib/content/remote'
import { mergeContent } from '@/lib/content/normalize'
import { getDefaultContent } from '@/lib/content'

const defaults = getDefaultContent()

/**
 * End-to-end check of the workflow in CONTENT_GUIDE.md: the salon edits a
 * Google Sheet, Sheets serves it as CSV, and the site renders the result.
 * The CSV below is shaped exactly as Sheets exports it.
 */
describe('Reading a published Google Sheet', () => {
  it('applies a price change made in the Services tab', () => {
    const csv = [
      'Type,Name,Summary,Includes,Small,Medium,Large,Price,Featured,Visible',
      '"package","Full Grooming","Styling and finishing","Bath | Style | Nails","From $70","From $90","From $110",,"yes","yes"',
      '"addon","Teeth Brushing","Fresh breath",,,,,"$10",,"yes"',
      '"addon","Nail Colour","Retired for now",,,,,"$12",,"no"',
    ].join('\n')

    const content = mergeContent(defaults, readTab('Services', csv))

    expect(content.services).toHaveLength(2)
    expect(content.services[0]).toMatchObject({
      name: 'Full Grooming',
      featured: true,
      pricing: { small: 'From $70', medium: 'From $90', large: 'From $110' },
    })
    expect(content.services[0].includes).toEqual(['Bath', 'Style', 'Nails'])
    // A row marked Visible = no stays out of the site without being deleted.
    expect(content.services.map((s) => s.name)).not.toContain('Nail Colour')
  })

  it('reads business details, the hero and the review numbers from one key/value tab', () => {
    const csv = [
      'Key,Value',
      'phone,+65 6812 3456',
      'announcement,"Closed 14–17 Feb for Chinese New Year"',
      'heroheadline,Grooming that takes its time',
      'heropoints,No cages | Certified groomers',
      'reviewrating,4.9',
      'unknownkey,ignored',
    ].join('\n')

    const content = mergeContent(defaults, readTab('Business', csv))

    expect(content.business.phone).toBe('+65 6812 3456')
    expect(content.business.announcement).toBe('Closed 14–17 Feb for Chinese New Year')
    expect(content.hero.headline).toBe('Grooming that takes its time')
    expect(content.hero.points).toEqual(['No cages', 'Certified groomers'])
    expect(content.reviews.rating).toBe('4.9')
    // Untouched fields keep their committed values.
    expect(content.business.name).toBe(defaults.business.name)
    expect(content.reviews.count).toBe(defaults.reviews.count)
  })

  it('turns an Hours tab into opening hours and a public holiday closure', () => {
    const csv = [
      'Days,Opens,Closes,Closed',
      '"Monday | Tuesday | Wednesday | Thursday | Friday",09:30,19:00,no',
      'Saturday,10:00,17:00,no',
      'Sunday,,,yes',
    ].join('\n')

    const content = mergeContent(defaults, readTab('Hours', csv))

    expect(content.hours).toHaveLength(3)
    expect(content.hours[0]).toEqual({
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '19:00',
      closed: false,
    })
    expect(content.hours[2].closed).toBe(true)
  })

  it('brings the team section into existence when rows are added', () => {
    expect(defaults.team).toHaveLength(0)

    const csv = [
      'Name,Role,Specialty,Experience,Certifications,Photo,Visible',
      '"Wei Ling","Head groomer","Anxious pets","8 years","SKC Certified | Low-Stress Handling",,"yes"',
    ].join('\n')

    const content = mergeContent(defaults, readTab('Team', csv))

    expect(content.team).toHaveLength(1)
    expect(content.team[0].certifications).toEqual(['SKC Certified', 'Low-Stress Handling'])
    expect(content.team[0].photo).toBeUndefined()
  })

  it('ignores a tab that has only its header row', () => {
    const content = mergeContent(defaults, readTab('FAQs', 'Category,Question,Answer,Visible'))
    expect(content.faqs).toEqual(defaults.faqs)
  })
})
