# Philoo Scout preview handoff

Branch: `feature/philoo-scout-marketing`

Local preview: `http://localhost:3000/`

No production deployment or merge was performed.

## Route map

| Page | Dutch | English |
| --- | --- | --- |
| Homepage | `/` | `/en` |
| How it works | `/hoe-het-werkt` | `/en/how-it-works` |
| Hiring teams | `/voor-bedrijven` | `/en/for-companies` |
| Recruitment agencies | `/voor-recruitmentbureaus` | `/en/for-recruitment-agencies` |
| About | `/over` | `/en/about` |
| Demo | `/demo` | `/en/demo` |

`/auto-sourcer` permanently redirects to `/hoe-het-werkt`. `/en/auto-sourcer` permanently redirects to `/en/how-it-works`.

The retained custom-software routes (`/maatwerk` and `/en/custom-software`), public CV Studio routes, protected `/cv-studio` application, and legal routes remain available.

## Scout screenshots

Desktop screenshots are in `after/desktop/`. Mobile screenshots at 390 × 844 are in `after/mobile/`, including the open mobile menu.

## CV Studio baseline and regression evidence

Baseline screenshots captured before source edits are in `baseline/`. Matching post-rebuild screenshots are in `after/cv-studio/`.

- No tracked file changed under `app/cv-studio`, `app/[lang]/cv-studio`, `components/cv-studio`, `lib/cv-studio`, `private/cv-studio-demo`, or `public/images/cv-studio`.
- CV Studio's shared page components, header/footer, global stylesheet, product-interest route, video assets, and file-tracing configuration were also unchanged.
- All 13 existing CV Studio tests pass.
- Anonymous access still redirects protected application pages, and unauthenticated file access still fails closed.
- A fresh local QA login returned 200, the protected conversion page returned 200, and the named PDF download returned `application/pdf`, `private, no-store`, and the expected attachment filename.
- The downloaded PDF hash was `5abf630cc63b6c3f79b0573beb301dc20d61214f7657e50d09f6d23b21c17c8c`, matching the protected source asset.
- The authenticated browser flow still selected a demo candidate, generated a conversion, reached the correct result URL, and emitted a DOCX download event.
- The mobile new-conversion baseline and regression screenshots are pixel-identical. Desktop screenshots have the same dimensions and visually matching application chrome; small pixel deltas come from the browser's development overlay, transitions, and embedded PDF renderer. The protected result screenshot's larger delta is confined primarily to PDF viewer zoom/rasterisation rather than Philoo source UI.

## Verification

- `CV_STUDIO_DEMO_ENABLED=true npm run build -- --webpack`: pass (54 static/dynamic page outputs generated, including dynamic protected CV Studio routes). The default Turbopack builder could not bind its internal CSS worker port in this sandbox; this is an environment restriction, not an application compile error.
- `npm run lint`: pass
- `npm test`: 13/13 pass
- All 12 Scout routes: 200
- Retained custom-software, public CV Studio, and canonical legal routes: 200
- Auto Sourcer redirects: 308 to the correct language equivalent
- Metadata: unique titles/descriptions, canonical URLs, and paired NL/EN alternates verified in the rendered pages
- Sitemap: new Scout routes added; old Auto Sourcer routes removed; public CV Studio, retained custom software, and legal routes retained; private `/cv-studio` not added
- Responsive browser checks: 1440, 1024, 390, and 320 CSS pixels
- Heading structure: one H1 on every Scout page
- Horizontal overflow: none at checked widths
- Key foreground/background colour pairs: 5.40:1 to 18.74:1 contrast
- Keyboard: desktop audience disclosure opens and closes by keyboard; mobile focus wraps inside the menu; Escape closes and returns focus to the menu button
- Console: no errors across the checked Scout routes
- Booking: repository destination and public response verified as `https://calendly.com/syb-philoo/30min` (HTTP 200); no appointment was created
- Local production preview: all Scout routes return 200; `/cv-studio` returns 200; an unauthenticated protected deep link redirects to `/cv-studio`; a fresh authenticated page and PDF download both return 200

## Remaining decisions

- Decide separately whether and when to retire `/maatwerk` and `/en/custom-software`.
- No approved founder photo was present, so the About page uses the requested typographic founder treatment.
- Existing legal copy was preserved. Its current legal accuracy was not independently substantiated and should be reviewed by the owner or legal counsel before a production launch.
- Booking completion is not tracked because the repository does not expose a verified completion event. Scheduler-link clicks are not counted as completed bookings.
