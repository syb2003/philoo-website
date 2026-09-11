# Philoo Scout homepage chat pass

Branch: `feature/philoo-scout-marketing`

Local preview: `http://localhost:3000/`

No production deployment, merge, appointment, or form submission was performed.

## Design changes

- Replaced the homepage's automatic three-stage candidate walkthrough with one static Scout opening-chat preview.
- Removed hero stage tabs, counters, playback controls, fictional roles and candidates, search chips, result cards, and feedback actions.
- Kept the preview honest: it is labelled `Interface-preview`, contains no textbox or button, accepts no visitor data, and never simulates a search.
- Added a short, one-time CSS entrance for the panel, Scout message, and composer. The complete chat remains the initial and resting state.
- Widened the Scout marketing container to approximately 1360px and aligned the header, hero, sections, and footer to it.
- Strengthened the visible lavender hero glow while keeping white surfaces, navy typography, and one purple primary action.
- Tightened hero and section spacing so useful process content appears sooner.
- Replaced the large repeated homepage process heading with three compact cards: explain who you need, review candidates, and choose who to contact.
- Kept the detailed four-stage walkthrough on How it works and preserved its illustrative status.

## Files changed in this pass

- `components/scout/ScoutSearchDemo.tsx`
- `components/scout/ScoutPages.tsx`
- `components/scout/scout.module.css`
- `lib/scout-demo.ts`
- `lib/scout.ts`
- `artifacts/scout-chat-pass/`

The branch already contained the broader Scout marketing rebuild. Those existing uncommitted changes were preserved.

## Browser checks

- NL and EN homepage headings, chat labels, composer labels, and process text render in the correct language.
- The hero preview text was identical immediately after entry and after 2.2 seconds; it never navigated to a candidate/result state.
- The preview region contains zero buttons and zero textboxes. The send arrow is decorative and excluded from assistive announcements.
- The Dutch hero CTA links to `/demo`; the secondary link targets `/hoe-het-werkt`; the English language link targets `/en`.
- The real booking fallback remains `https://calendly.com/syb-philoo/30min`.
- Desktop, wide desktop, tablet, mobile, and a full mobile page were visually inspected. No page-width overflow or scaled-down dashboard treatment was visible.
- The tablet process cards reflow before their copy becomes cramped.
- Browser console error checks were empty for Scout and CV Studio.
- The animation uses fixed-size content and transform/opacity only, preventing layout shift. It finishes in about 1.25 seconds.
- `prefers-reduced-motion` reduces all Scout animation and transition durations to a static result. Exact media emulation was unavailable in the browser harness, so this branch was verified by implementation inspection.
- A 200% browser-zoom control was unavailable; the equivalent narrow-layout reflow was inspected through tablet and mobile widths.
- The browser harness did not expose a video recorder or local animation encoder. Start/rest motion frames are included instead of a recording.

## Screenshots

Desktop:

- `after/desktop/home-nl-wide.png`
- `after/desktop/home-nl-1440.png`
- `after/desktop/home-nl-1280.png`
- `after/desktop/home-en-1280.png`
- `after/desktop/home-nl-tablet.png`
- `after/desktop/home-process-nl-1280.png`
- `after/desktop/how-it-works-nl.png`
- `after/desktop/home-motion-mid.png`
- `after/desktop/home-motion-rest.png`

Mobile:

- `after/mobile/home-nl-390.png`
- `after/mobile/home-en-390.png`
- `after/mobile/home-nl-full.png`
- `after/mobile/home-process-nl.png`

CV Studio:

- `after/cv-studio/login-1280.png`

## Automated verification

- `npm run lint`: pass.
- `npm test`: 13/13 CV Studio tests pass.
- `npm run build -- --webpack`: pass; 54 routes generated.
- `git diff --check`: pass.

## CV Studio preservation evidence

- No files changed under `app/cv-studio`, `app/[lang]/cv-studio`, `components/cv-studio`, `lib/cv-studio`, or the protected CV Studio asset directories.
- The fresh post-change login screenshot is byte-for-byte identical to the trusted pre-pass screenshot at `artifacts/scout-polish/cv-studio/login-1280x720.png`.
- Both login screenshots have SHA-256 `9e515ff8be3344ce6bab5685c450948d696077548429cdd82f0da0d6277abfa5`.
- A fresh anonymous visit to `/cv-studio/conversies/nieuw` still redirects to `/cv-studio` and shows `Inloggen op CV Studio`.
- All 13 protected tests pass, including asset integrity, session boundaries, output mappings, document validity, and download MIME types.
- The prior authenticated conversion/download verification remains documented in `artifacts/scout-refinement/README.md`. It was not repeated in this pass because the current shell has no CV Studio demo credentials.

## Questions for the later copy pass

- Should the hero address the visitor as `je` consistently across every Scout page, or should any agency-facing pages retain a different tone?
- Should the English category remain `Candidate sourcing software`, or use a plainer phrase closer to the Dutch wording?
- Is `Interface-preview` the preferred permanent disclosure, or should it become a shorter product label once genuine Scout footage is available?
- Should the process cue include the refined shortlist as a fourth phrase, or remain focused on the three actions a visitor takes?
- Which evidence terms can the real product substantiate consistently on candidate pages?
