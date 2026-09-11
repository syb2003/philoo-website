# Philoo Scout typography and interaction refinement

## What changed

- Reused the original Philoo typography relationships and brand values inside the Scout-only CSS boundary.
- Kept the homepage hero in its non-editable chat opening state.
- Strengthened navy/body contrast, lavender surfaces, purple active states, card borders, and primary actions.
- Replaced repeated `voorbeeld` / `example` interface wording with natural NL/EN labels.
- Reduced the detailed walkthrough's spacing, heading scale, panel height, and visual weight.
- Added a check-mark selected-state indicator to walkthrough tabs.
- Added native `details` disclosures for `Waarom deze kandidaat past` and `Nog te bespreken`.
- Kept one walkthrough-level disclosure: `Demo met fictieve gegevens.` / `Demo with fictional data.`
- Preserved explicit play/pause, replay, previous/next, scripted feedback, and candidate-detail actions.

## Typography source

Verified against the retained original public-site implementation in:

- `components/site/HomePage.tsx`
- `components/site/SiteHeader.tsx`
- `app/globals.css`

Applied Scout values:

- Family: `Inter, "SF Pro Display", "Segoe UI", ui-sans-serif, system-ui, sans-serif`
- H1: weight 700, line-height 1.01, letter-spacing -0.04em, original clamp relationship
- Section headings: weight 700, line-height 1.08, letter-spacing -0.04em
- Navigation and buttons: weight 700
- Small uppercase labels: weight 900
- Heading navy: `#091238`
- Body: `#4D5679`
- Primary purple: `#563DFF`
- Lavender: `#F0EEFF`

No repository-hosted Inter font files or `next/font` setup were found. The implementation therefore keeps the verified original system fallback stack. The QA browser reports Inter available, but an exact cross-device face match depends on the visitor's installed fonts.

## Browser QA

- 1920 × 1080 desktop: NL homepage checked.
- 1440 × 900 desktop: all NL Scout pages and EN homepage checked.
- 767 × 1024 tablet: NL homepage and How it works checked.
- 390 × 844 mobile: NL/EN homepage and NL walkthrough/result checked.
- 720 × 900 CSS viewport: high-zoom-equivalent reflow checked for homepage and How it works.
- No horizontal document overflow at the checked widths.
- NL and EN route titles, H1s, and equivalent language links checked on all six Scout page pairs.
- Clean browser console on fresh Scout and CV Studio sessions.

Contrast ratios for the main pairs:

- Navy on white: 18.18:1
- Body blue-grey on white: 7.18:1
- Primary purple on white: 5.99:1
- Dark purple on lavender: 6.39:1

## Interaction checks

- Hero preview: zero buttons, inputs, or textareas; no candidate scenario; text remains unchanged after 5.6 seconds.
- Walkthrough: play/pause `aria-pressed` toggles correctly.
- Stage tabs: manual selection updates `aria-current="step"` and adds a visible check mark.
- Previous action is disabled on stage 1.
- `Pas feedback toe` / `Apply this feedback` moves to the refined stage.
- `Bekijk kandidaat` / `View candidate` moves to the result stage.
- Both candidate disclosures expand independently with native keyboard semantics.
- Mobile menu opens with Enter, moves focus to the first link, closes with Escape, and returns focus to the menu button.
- Keyboard focus ring measured as a visible solid purple outline.
- Booking link resolves to `https://calendly.com/syb-philoo/30min`; email fallback resolves to `mailto:hello@philoo.nl`.

## Routes

| Page | Dutch | English |
| --- | --- | --- |
| Homepage | `/` | `/en` |
| How it works | `/hoe-het-werkt` | `/en/how-it-works` |
| Hiring teams | `/voor-bedrijven` | `/en/for-companies` |
| Recruitment agencies | `/voor-recruitmentbureaus` | `/en/for-recruitment-agencies` |
| About | `/over` | `/en/about` |
| Demo | `/demo` | `/en/demo` |

Auto Sourcer aliases `/auto-sourcer`, `/nl/auto-sourcer`, and `/en/auto-sourcer` redirect to the matching How it works page. Retained custom-software pages remain at `/maatwerk` and `/en/custom-software` and are not promoted in Scout navigation.

## CV Studio preservation

- Captured the login baseline before this pass and the same viewport after this pass.
- Both PNGs have SHA-256 `9e515ff8be3344ce6bab5685c450948d696077548429cdd82f0da0d6277abfa5` and compare byte-for-byte identical.
- Protected source-path status is clean for `app/cv-studio`, `components/cv-studio`, `lib/cv-studio`, `private/cv-studio-demo`, and `public`.
- `/cv-studio/conversies/nieuw` redirects an anonymous session to `/cv-studio`.
- Login screen has one form, two inputs, and the existing `Inloggen` action.
- CV Studio test suite: 13/13 passed, including session, cookie, asset, PDF, DOCX, result/download, route-boundary, and noindex checks.
- The browser did not create an authenticated CV Studio session because no real demo password or session secret was used. Authentication and protected downloads were verified by the repository tests with safe test values.

## Build and checks

- `npm run lint`: passed.
- `npm test`: 13/13 passed.
- `git diff --check`: passed.
- `next build --webpack`: passed; 54 routes generated.
- The default Turbopack build could not start its local CSS helper process in the managed execution environment (`binding to a port: Operation not permitted`). The webpack production build completed successfully as the build verification fallback.

## Screenshots

Primary review images:

- `after/desktop/home-nl-1920.png`
- `after/desktop/home-nl-1440-full.png`
- `after/desktop/home-en-1440.png`
- `after/desktop/how-nl-1440.png`
- `after/desktop/how-nl-interactions.png`
- `after/mobile/home-nl-390.png`
- `after/mobile/home-en-390.png`
- `after/mobile/how-nl-390.png`
- `after/mobile/how-nl-result-390.png`
- `after/tablet/home-nl-768.png`
- `after/tablet/how-nl-768.png`
- `baseline/cv-studio.png`
- `after/cv-studio/login.png`

Supporting-page first-fold screenshots are included for Hiring teams, Recruitment agencies, About, and Demo.

## Later copy-pass questions

1. Should the homepage candidate card say `Fictief profiel` / `Fictional profile`, or use a softer approved product term?
2. Should `Kandidaatprofiel` / `Candidate profile` remain the section eyebrow, or should it describe the benefit instead?
3. Is `selectie` preferred consistently over `shortlist` in Dutch public copy?
4. Should English consistently use `candidate`, `person`, or `profile` when referring to the same result?

No production deployment, merge, or appointment creation was performed.
