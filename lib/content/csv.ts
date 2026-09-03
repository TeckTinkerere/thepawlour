/**
 * Minimal RFC-4180 CSV reader.
 *
 * Google Sheets exports quote any cell containing a comma, quote or newline,
 * so a naive `split(',')` corrupts real content (service descriptions in
 * particular). This handles quoted fields, escaped quotes and CRLF.
 */

export function parseCsv(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  let i = 0

  // Strip a UTF-8 BOM, which Sheets sometimes prepends.
  const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input

  const endField = () => {
    row.push(field)
    field = ''
  }
  const endRow = () => {
    endField()
    rows.push(row)
    row = []
  }

  while (i < text.length) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        continue
      }
      field += char
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = true
      i += 1
      continue
    }
    if (char === ',') {
      endField()
      i += 1
      continue
    }
    if (char === '\r') {
      // Swallow CR; the following LF ends the row.
      i += 1
      continue
    }
    if (char === '\n') {
      endRow()
      i += 1
      continue
    }

    field += char
    i += 1
  }

  // Trailing field/row, unless the file simply ended with a newline.
  if (field.length > 0 || row.length > 0) endRow()

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''))
}

/**
 * Turns a sheet into objects keyed by its header row.
 * Headers are lower-cased and stripped of spaces so "Price Small",
 * "price small" and "pricesmall" all reach the same key.
 */
export function parseSheet(csv: string): Record<string, string>[] {
  const rows = parseCsv(csv)
  if (rows.length < 2) return []

  const headers = rows[0].map((header) => header.trim().toLowerCase().replace(/[\s_-]+/g, ''))

  return rows.slice(1).map((row) => {
    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      if (header) record[header] = (row[index] ?? '').trim()
    })
    return record
  })
}

/** Splits a multi-value cell. Owners type "Bath | Nail trim | Ear clean". */
export function splitList(value: string | undefined): string[] {
  if (!value) return []
  return value
    .split(/[|\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

/** Reads the loose spellings of "no" a spreadsheet accumulates. */
export function isFalsy(value: string | undefined): boolean {
  if (value === undefined) return false
  return ['no', 'false', 'hide', 'hidden', 'off', '0'].includes(value.trim().toLowerCase())
}
