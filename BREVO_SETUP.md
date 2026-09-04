# Sending booking requests through Brevo

The booking form on `/contact` posts to `/api/booking`, which emails the request
to the salon through [Brevo](https://www.brevo.com). Until it is configured the
form falls back to the WhatsApp handoff, so the site works either way.

## Setup (about 15 minutes)

1. **Create a Brevo account** and verify the domain or sender address you will
   send from. Brevo will not send from an unverified sender.
2. **Create an API key**: *Settings → SMTP & API → API Keys → Generate*.
   Copy it once; Brevo will not show it again.
3. **Add the environment variables in Netlify**
   (*Site configuration → Environment variables*):

   | Variable | Required | What it is |
   | --- | --- | --- |
   | `BREVO_API_KEY` | yes | The key from step 2 |
   | `BREVO_SENDER_EMAIL` | yes | The verified address the email is sent **from**, e.g. `website@thepawlour.com` |
   | `BREVO_SENDER_NAME` | no | Defaults to "The Pawlour website" |
   | `BREVO_TO_EMAIL` | no | Where booking requests land. Defaults to the sender address |
   | `BREVO_TO_NAME` | no | Defaults to "The Pawlour" |
   | `BREVO_LIST_ID` | no | Marketing list id. Only used for customers who tick the opt-in box |

4. **Redeploy** (*Deploys → Trigger deploy*). Environment variables are read at
   request time, but the deploy is what picks up a new setting.
5. **Send yourself a test booking** from `/contact`.

`BREVO_API_KEY` is only ever read on the server. It is never sent to the
browser, and it must not be prefixed with `NEXT_PUBLIC_`.

## What arrives

One email per request, subject line
`Booking request — Jane Tan (Shih Tzu) for 2026-04-18`, with the name, phone,
email, breed, preferred date, chosen service and notes. If the customer left an
email address, replying in your inbox replies to them.

## The marketing list

The form has an opt-in checkbox, disabled until the customer types an email
address. The contact is only written to Brevo when that box is ticked and
`BREVO_LIST_ID` is set.

Nothing is added to a marketing list without it. Under Singapore's PDPA, someone
asking to book a groom has not consented to marketing, and treating the two as
the same is how a sender reputation gets ruined.

## If something goes wrong

| What the visitor sees | What happened | What to check |
| --- | --- | --- |
| Form opens WhatsApp instead of confirming | Brevo is not configured | `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` are set, and the site has been redeployed |
| "We could not send that just now" | Brevo rejected the send or was unreachable | The function log — a `[brevo] email rejected (401)` means a bad key, `(400)` usually means an unverified sender |
| Nothing arrives, no error | Delivered but filtered | Junk folder, then Brevo's *Transactional → Logs* |

The visitor is always offered WhatsApp when a send fails, so a failure costs the
salon a tidy email, not the booking.

## Spam handling

- A honeypot field: off-screen, skipped by the keyboard and by screen readers,
  and read-only so no browser can autofill it. A submission that fills it is
  answered as though it worked, and dropped. It is deliberately biased towards
  missing a bot rather than ever discarding a real booking.
- Eight submissions per IP per ten minutes, invalid ones included. Loose on
  purpose: shared and carrier-NAT addresses are common in Singapore, and
  turning away a real customer costs more than an extra bot request.
- Server-side validation of every field, independent of the browser checks.

Rate limiting is per serverless instance rather than global, which blunts a
script without pretending to be a firewall. If the form ever gets seriously
targeted, put Brevo behind a captcha or move the limit into a shared store.
