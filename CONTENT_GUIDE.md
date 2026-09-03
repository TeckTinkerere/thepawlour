# Updating the website without a developer

Everything visible on the site — prices, opening hours, the team, FAQs, the
banner at the top of the page — comes from one place. Nothing is written into
the code, so none of it needs a developer to change.

There are two ways to edit, and you can move between them at any time.

---

## Option A — Google Sheet (recommended)

Best if you want to change prices or hours yourself, from a phone or laptop,
without touching GitHub.

### One-time setup (about 10 minutes)

1. Make a new Google Sheet called **Pawlour website content**.
2. Add one tab per section, named exactly:
   `Business`, `Hours`, `Highlights`, `Stats`, `Services`, `Team`, `FAQs`, `Testimonials`.
   You only need the tabs you want to control — anything missing falls back to
   what is already on the site.
3. Give each tab the header row listed below, in row 1.
4. **File → Share → Publish to the web → Entire document → Publish.**
   (Publishing is what lets the site read it. It stays read-only to the public
   and the sheet URL is never shown on the site.)
5. Copy the sheet ID from its URL — the long code between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`1AbC...xyz`**`/edit`
6. In Netlify: **Site configuration → Environment variables → Add**
   `CONTENT_SHEET_ID` = that ID. Then **Deploys → Trigger deploy**.

After that, edits to the sheet appear on the live site within **5 minutes**.
No deploy, no developer.

### Tab layouts

**Business** — two columns, `Key` and `Value`. Add only the rows you need:

| Key | Value |
| --- | --- |
| `name` | The Pawlour |
| `tagline` | Boarding · Daycare · Spa · Grooming |
| `description` | One sentence used in search results and the footer |
| `phone` | +65 8668 9078 |
| `whatsapp` | +6586689078 |
| `email` | hello@thepawlour.com |
| `address` | Street address, if you want it shown |
| `locality` | Hougang |
| `postalcode` | 530123 |
| `announcement` | **Closed 14–17 Feb for Chinese New Year** — shows as a bar at the top of every page. Clear the cell to remove it. |
| `heroheadline` | The big line on the homepage |
| `herointro` | The paragraph under it |
| `heropoints` | Three short proof points, separated by `\|` |
| `heroimage` | Web address of the homepage photo |
| `reviewrating` | 4.8 |
| `reviewcount` | 100 |
| `googlemapsurl` | Link to your Google listing |
| `mapembedurl` | The `src` from Google Maps → Share → Embed a map |

**Hours** — `Days`, `Opens`, `Closes`, `Closed`

| Days | Opens | Closes | Closed |
| --- | --- | --- | --- |
| Monday \| Tuesday \| Wednesday \| Thursday \| Friday | 10:00 | 18:00 | no |
| Saturday | 10:00 | 17:00 | no |
| Sunday | 11:00 | 16:00 | no |

Times are 24-hour. The site turns these into "10am – 6pm", works out whether
you are **open right now**, and feeds Google's opening-hours listing.

**Services** — `Type`, `Name`, `Summary`, `Includes`, `Small`, `Medium`, `Large`, `Price`, `Featured`, `Visible`

- `Type` is `package` (size-based pricing), `spa`, or `addon`.
- `Includes` is a list separated by `|` — `Bath | Nail trim | Ear clean`.
- `Small` / `Medium` / `Large` are for packages; `Price` is for spa and add-ons.
- `Featured` = `yes` puts the "Most booked" label on it.
- `Visible` = `no` hides a row without deleting it — useful for seasonal work.

**Team** — `Name`, `Role`, `Specialty`, `Experience`, `Certifications`, `Photo`, `Visible`

The team section **only appears once you add rows here**. Leave `Photo` empty
and the person's initials are shown instead of a picture.

**FAQs** — `Category`, `Question`, `Answer`, `Visible`
**Testimonials** — `Name`, `Quote`, `Rating`, `Pet`, `Breed`, `Visible`
**Highlights** — `Icon`, `Title`, `Description` (icon: `open-space`, `certificate`, `bottle`, `paw`, `scissors`, `clock`)
**Stats** — `Value`, `Label`

Every tab is read on its own. A tab with a typo in it simply falls back to what
the site already shows — it can't take the site down.

---

## Option B — edit `content/site.json`

Best for one-off wording changes, and it is the file the site falls back to.

1. Open `content/site.json` on GitHub.
2. Press the pencil icon, make the change, and commit.
3. Netlify rebuilds automatically; the change is live in a few minutes.

Keep the quotes and commas as they are — the file is checked on every build, so
a broken one will fail the build rather than break the site.

There is also `CONTENT_JSON_URL`, which points at any hosted JSON file in the
same shape. Set it if you would rather keep content somewhere other than a
Google Sheet.

---

## What is deliberately empty

Three sections start empty and stay hidden until you fill them, because
inventing them would mean putting made-up people and made-up results on a real
business's website:

| Section | Add through |
| --- | --- |
| **Team** | the `Team` tab, or `team` in `site.json` |
| **Testimonials** | the `Testimonials` tab (copy real Google reviews) |
| **Salon photography** | `heroimage`, or drop a file in `public/images/` and use `/images/your-photo.jpg` |

The homepage reads correctly without them, and improves the moment they arrive.

## Photos

Two options:

- **Hosted** — paste any image address into `heroimage`. Only `images.pexels.com`
  and `images.unsplash.com` are allowed by default; other hosts need a one-line
  change in `next.config.js`.
- **Uploaded** — add the file to `public/images/` in GitHub and use the path
  `/images/your-photo.jpg`. This is the better option for photos of your own
  salon: nothing external can take them away.

## Settings reference

| Environment variable | What it does |
| --- | --- |
| `CONTENT_SHEET_ID` | ID of the published Google Sheet |
| `CONTENT_JSON_URL` | Address of a hosted JSON file, used instead of the sheet |
| `CONTENT_REVALIDATE_SECONDS` | How often the site re-reads content. Default `300` (5 minutes) |

Neither source is required. With both unset, the site runs entirely from
`content/site.json`.

## If the sheet is unreachable

Nothing breaks, in this order:

1. The site keeps serving the last content it read successfully.
2. If it has never read it (a fresh deploy), it uses `content/site.json`.
3. The deploy still succeeds either way, with a warning in the build log
   (`[content] could not read …`).

A typo in one tab only costs that tab its changes — the rest of the sheet still
applies, and that section keeps the values it already had.
