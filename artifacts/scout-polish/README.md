# Philoo Scout polish handoff

Branch: `feature/philoo-scout-marketing`

Local preview: `http://localhost:3000/`

No production deployment, merge, or appointment creation was performed.

## Outcome

- Refined the existing Scout marketing build instead of replacing it.
- Reworked the homepage hero into a broader 45/55 layout with a compact, product-like three-stage Scout preview.
- Added one-pass autoplay when the preview enters the viewport, pause/resume, replay, and direct stage selection. Manual stage selection stops autoplay; playback also pauses off-screen or while the tab is hidden and is disabled for reduced motion.
- Kept one coherent fictional scenario: an initially plausible B2B growth candidate, feedback that clarifies hands-on new-client acquisition, and a different refined candidate with a reason to review and an explicit unknown.
- Simplified the top of the How it works page so the richer four-stage walkthrough directly supports the page introduction.
- Tightened desktop spacing and headline scale, strengthened the purple/navy/lavender visual system, and improved mobile hierarchy and demo readability.
- Kept the Scout UI clearly labelled as an illustrative example with fictional profiles; it does not pretend to run a real search.

## Route map

| Page | Dutch | English |
| --- | --- | --- |
| Homepage | `/` | `/en` |
| How it works | `/hoe-het-werkt` | `/en/how-it-works` |
| Hiring teams | `/voor-bedrijven` | `/en/for-companies` |
| Recruitment agencies | `/voor-recruitmentbureaus` | `/en/for-recruitment-agencies` |
| About | `/over` | `/en/about` |
| Demo | `/demo` | `/en/demo` |

`/auto-sourcer` redirects to `/hoe-het-werkt`; `/en/auto-sourcer` redirects to `/en/how-it-works`. Custom-software URLs remain available but unpromoted. Legal and CV Studio routes remain in place.

## Verification

- `npm run lint`: pass.
- `npm test`: 13/13 CV Studio tests pass.
- `npm run build -- --webpack`: pass; 54 routes generated.
- `git diff --check`: pass.
- Browser-tested the NL/EN homepages and every new supporting-page layout at desktop and mobile widths.
- Homepage direct stage selection, play/pause, replay, one-pass autoplay, and manual autoplay cancellation were exercised in the browser.
- Verified the NL How it works language switch targets `/en/how-it-works` rather than the English homepage.
- Verified `/auto-sourcer` lands on `/hoe-het-werkt`.
- Verified the Demo page fallback targets the repository's real scheduler: `https://calendly.com/syb-philoo/30min`. No appointment was created.
- Fresh browser console check on the Demo route: no errors.
- No horizontal overflow at the checked mobile widths; headings, stage labels, chat text, and candidate details remain readable.
- Representative keyboard controls use native buttons/links and visible focus styles; page heading structure and the documented contrast checks remain valid.
- Reduced-motion handling was confirmed by implementation inspection because the available browser session did not expose media emulation.

## CV Studio preservation evidence

- `git diff` is empty for `app/cv-studio`, `app/[lang]/cv-studio`, `components/cv-studio`, `lib/cv-studio`, `public/images/cv-studio`, and the protected CV Studio videos.
- All 13 existing CV Studio tests pass after the Scout changes.
- A fresh anonymous browser check of `/cv-studio/conversies/nieuw` still redirects to `/cv-studio` and displays `Inloggen op CV Studio`.
- A fresh CV Studio login screenshot is in `cv-studio/login-1280x720.png`.
- The immediately preceding protected-flow verification remains in `../scout-refinement/README.md`: successful Marieke conversion, DOCX/PDF controls, PDF response headers, and the matching protected PDF hash.
- The current refinement only changes Scout-scoped components, Scout content, and Scout page composition; it does not alter the protected implementation or its dependencies.

## Screenshots

Desktop screenshots are in `desktop/`; mobile screenshots are in `mobile/`. They cover the NL homepage, refined homepage state, How it works, Hiring teams, Recruitment agencies, About, Demo, and the English mobile homepage.

## Remaining decisions

- The retained privacy and terms pages still need owner/legal review before production; no compliance assurances were invented.
- No approved founder photo is available, so About uses the existing typographic founder treatment.
- There is no verified scheduler completion event, so clicking the booking link is not counted as a completed booking.
- Final retirement of the unpromoted custom-software URLs remains a separate migration decision.
- The example evidence wording should be checked against the real product's available evidence granularity before production launch.
