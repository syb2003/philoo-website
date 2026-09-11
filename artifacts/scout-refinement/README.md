# Philoo Scout refinement handoff

Branch: `feature/philoo-scout-marketing`

Local preview: `http://localhost:3000/`

No production deployment, merge, or appointment creation was performed.

## What changed

- Replaced the sparse homepage hero visual with a compact visitor-controlled example that shows an initial candidate, feedback, and a different refined candidate.
- Rebuilt the detailed How it works page around one coherent four-stage scenario: search brief, first profile, refined result, and candidate output.
- Added direct stage selection, previous/next controls, replay, and optional playback. Manual interaction stops playback; playback also stops when the module leaves the viewport or the document becomes hidden.
- Added a final output view that separates relevant experience, example supporting evidence, open questions, and the visitor's next step.
- Added a concise deliverable/control section and six FAQs to the How it works page.
- Added homepage audience routes for hiring teams and recruitment agencies.
- Reduced headline scale and excess vertical spacing without changing the approved white/lavender/purple/navy identity.
- Centralized all new interaction and FAQ copy in `lib/scout-demo.ts` for English and Dutch.
- Added Scout interaction analytics events without sending candidate details or form content.

## Scripted example walkthrough

1. A visitor explains that they need a commercial professional who personally wins new B2B clients.
2. Scout asks whether the person should lead a team or keep selling directly.
3. The initial fictional profile, Robin de Vries, has relevant commercial experience, but recent work emphasizes team management and growth in existing accounts.
4. The visitor applies the supplied feedback that personal new-client acquisition matters.
5. Scout visibly increases emphasis on personal prospecting and first conversations, while reducing emphasis on team management and existing-account growth.
6. A different fictional profile, Alex Morgan, appears with example evidence, open questions, and a suggested next step.

The module is an illustrative preview. It does not accept free text, run a search, expose real sources, or imply that the marketing page is a working sourcing application.

## Route map

| Page | Dutch | English |
| --- | --- | --- |
| Homepage | `/` | `/en` |
| How it works | `/hoe-het-werkt` | `/en/how-it-works` |
| Hiring teams | `/voor-bedrijven` | `/en/for-companies` |
| Recruitment agencies | `/voor-recruitmentbureaus` | `/en/for-recruitment-agencies` |
| About | `/over` | `/en/about` |
| Demo | `/demo` | `/en/demo` |

`/auto-sourcer` permanently redirects to `/hoe-het-werkt`; `/en/auto-sourcer` permanently redirects to `/en/how-it-works`. Retained custom-software, public CV Studio, protected CV Studio, and canonical legal routes remain available.

## Analytics

The existing analytics endpoint and delivery mechanism are reused. Added events:

- `scout_example_start`
- `scout_example_stage_select` with manual or automatic source category
- `scout_example_feedback`
- `scout_example_detail_open`
- `scout_example_complete`
- `scout_booking_link_click`

Existing Scout primary CTA, How it works, and audience-navigation events remain in place. Browser interactions produced successful `202` responses from `/api/analytics-event`. Booking-link clicks are not counted as completed bookings because no genuine completion event is available.

## Screenshots

Pre-refinement desktop and mobile baselines are in `baseline/`.

Post-refinement screenshots are in:

- `after/desktop/`: homepage, How it works introduction, stages 1/3/4, hiring teams, recruitment agencies, About, and Demo.
- `after/mobile/`: homepage at 390 and 320 pixels, How it works introduction and stages, hiring teams, recruitment agencies, About, and Demo.
- `after/cv-studio/`: fresh login, new-conversion, result, and public NL/EN CV Studio views.

## Verification

- `npm run lint`: pass.
- `npm test`: 13/13 CV Studio tests pass.
- `CV_STUDIO_DEMO_ENABLED=true npm run build -- --webpack`: pass; 54 static/dynamic outputs generated.
- All 12 requested Scout routes: HTTP 200 in the local production build.
- Auto Sourcer legacy redirects: HTTP 308 to the correct language-equivalent How it works page.
- Retained custom-software routes, canonical legal routes, public CV Studio routes, and `/cv-studio`: available.
- Metadata: titles, descriptions, canonical URLs, paired NL/EN alternates, and one H1 verified on representative NL/EN pages.
- Language switching: verified to the equivalent page, including `/hoe-het-werkt` ↔ `/en/how-it-works`.
- Responsive browser checks: 1440, 1024, 390, and 320 CSS pixels; no horizontal overflow.
- Interaction: direct stage navigation, before/after candidate change, explicit priority change, detail view, previous/next, replay, playback, pause, manual override, and off-screen stop verified.
- Reduced motion: the module reads `prefers-reduced-motion`, disables playback in that mode, and CSS removes module animation/transition. The available browser harness did not expose media emulation, so this branch was verified by implementation inspection rather than an emulated runtime screenshot.
- Accessibility: keyboard activation of stage controls works; focused controls expose a 3px visible outline; native FAQ disclosures work; heading structure and representative colour contrast pass WCAG AA (6.06:1 for body text on white; 5.80:1 or better for white CTA text across the gradient).
- Booking: repository destination and public response verified as `https://calendly.com/syb-philoo/30min` (HTTP 200). No appointment was created.
- Analytics: actual browser interactions returned HTTP 202 from the existing analytics endpoint; the event allowlist and payload mapping cover the new events.
- Runtime: no Scout application errors remained after the demo tracking fix. Next development mode still emits its existing `scroll-behavior: smooth` advisory while navigating CV Studio; the production build succeeds.

## CV Studio preservation evidence

- No tracked file changed under `app/cv-studio`, `app/[lang]/cv-studio`, `components/cv-studio`, `lib/cv-studio`, or `public/cv-studio`.
- All 13 existing CV Studio tests pass.
- Anonymous protected deep links still redirect to `/cv-studio`.
- A fresh local production-mode QA login returned 200, and the protected new-conversion page returned 200.
- A named Marieke PDF download returned 200 with `application/pdf`, `private, no-store`, and the expected attachment filename.
- The downloaded PDF hash is `5abf630cc63b6c3f79b0573beb301dc20d61214f7657e50d09f6d23b21c17c8c`, matching the protected source asset.
- The browser flow selected Marieke, generated the conversion, reached `/cv-studio/conversies/marieke`, and exposed the existing DOCX/PDF controls.
- Fresh desktop/mobile login and conversion screenshots, the result screenshot, and public NL/EN screenshots are in `after/cv-studio/` for comparison with the trusted pre-refinement images in `../scout-rebuild/after/cv-studio/`.

## Hypotheses and suggested learning

No performance uplift is claimed. The refinement tests three design hypotheses:

- A concrete before/after candidate example will make the role of feedback easier to understand than a decorative workflow illustration.
- A substantial ungated explanation will help visitors assess relevance before booking.
- Clear demo expectations will improve the quality of booking intent.

Before A/B testing, observe a small number of hiring managers and agency recruiters using the module. Ask them to explain what changed after the feedback stage, what they believe Scout knows versus still needs to check, and what they expect to happen after booking.

## Remaining decisions and copy notes

- The existing privacy and terms pages are placeholders saying full policies are still being prepared. Their legal accuracy and completeness need owner/legal review before production launch; no compliance text was invented.
- No approved founder photo is present, so About continues to use the typographic founder treatment.
- Confirm the evidence granularity the real product can show before turning the example's supporting-evidence wording into product UI claims.
- Confirm whether any genuine scheduler-completion signal can be exposed before adding booking-completion analytics.
- Shared-workspace, ATS integration, persistent-learning, availability, and automated-decision claims remain intentionally absent because they are not confirmed.
- A later copy pass can refine stage labels, example messages, and FAQ phrasing without changing the positioning or page structure.
- Decide separately whether and when to retire `/maatwerk` and `/en/custom-software`.
