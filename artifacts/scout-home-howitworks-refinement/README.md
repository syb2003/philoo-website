# Philoo Scout homepage + Hoe het werkt — refinement QA

## Scope

- Nederlandse homepagehero: exacte nieuwe productzin en rustige anchorlink naar updates.
- Eén Scout-aanmeldblok voor de Nederlandse homepage.
- Nederlandse proces- en democopy op `/hoe-het-werkt`.
- Hogere, compactere uitlijning en een witte proceskolom binnen de bestaande 1360px-container.
- Additieve Scout-bron- en analytics-identificatie; bestaande CV Studio-contracten blijven ongewijzigd.

## Copywijzigingen

- `Vertel Philoo wie je zoekt. Scout vindt passende kandidaten.` → `Vertel wie je zoekt. Scout vindt passende kandidaten.`
- Nieuw: `Volg de ontwikkelingen` → `#ontwikkelingen`.
- Nieuw aanmeldblok: `Wil je op de hoogte blijven?` / `Ontvang updates over Scout en hoor wanneer je het kunt proberen.`
- `Scout onthoudt je feedback en gebruikt die ook bij een volgende vacature.` → `Scout neemt je feedback ook mee naar een volgende vacature.`
- Stap 1: `Beschrijf in gewone taal wat iemand moet kunnen.` → `Beschrijf wat iemand moet kunnen en wat belangrijk is voor je team.`
- Stap 2: `Zie welke bekende ervaring aansluit op je vraag.` → `Bekijk hun ervaring en geef aan wie je zou benaderen.`
- Stap 3: `Geef aan wat wel en niet past.` → `Geef aan wat niet past.`
- Stap 4: `Scout toont andere kandidaten. Jij kiest wie je benadert.` → `Scout zoekt verder met je feedback. Jij kiest wie je benadert.`
- Nederlands demoprofiel: `Business development` → `Commercieel specialist`.

## Vastgesteld in de browser

- Desktop 1440px, tablet 768px, mobiel 390px en smal mobiel 320px: geen horizontale pagina-overflow.
- De homepage-anchor eindigt op `#ontwikkelingen`; de doeltitel is zichtbaar onder de sticky header.
- Het Scout-aanmeldblok komt één keer voor, heeft zichtbare labels en stapelt verticaal op mobiel.
- De Engelse homepage heeft geen Nederlands aanmeldblok of Nederlandse labels.
- Autoplay doorloopt 1 → 2 → 3 → 4 en stopt op stap 4.
- Replay begint opnieuw bij stap 1.
- Een expliciete pauze en een handmatige stapkeuze blijven gepauzeerd.
- Buiten beeld pauzeert de reeks; na terugkeer in beeld gaat zij verder.
- Browserconsole: geen nieuwe errors of warnings; alleen ontwikkelserver-info/HMR.
- Formulier met lokaal uitgeschakelde webhook: HTTP 500, invoer blijft staan, knop wordt opnieuw bruikbaar, duidelijke fouttekst, geen succesmelding.

## Formulierverwerking

- Bestaande `/api/product-interest`-route hergebruikt.
- Nieuwe bron: `scout_updates`; deze is apart van `autosourcer_interest` en `cvstudio_early_access`.
- Alleen e-mail is verplicht voor Scout-updates; bestaande vereisten voor Auto Sourcer en CV Studio blijven intact.
- Server-side test met gemockte webhook bevestigt succes uitsluitend na een upstream `{ ok: true }`.
- Ongeldig e-mailadres wordt vóór een webhookcall afgewezen.
- Er is geen echte testaanmelding of testmail verstuurd.

## Technische checks

- `npm run lint`: geslaagd.
- `npm test`: 15/15 geslaagd, waaronder alle 13 bestaande CV Studio-tests en 2 nieuwe formuliercontracttests.
- `git diff --check`: geslaagd.
- `npm run build`: niet uitvoerbaar door een hostbeperking in Turbopack (`binding to a port: Operation not permitted`).
- `npm run build -- --webpack`: geslaagd; TypeScript, alle 54 routes en productie-output voltooid.

## CV Studio-bescherming

- Voor en na de wijziging is `/cv-studio` als visuele baseline vastgelegd.
- Geen bestanden onder `app/cv-studio`, `components/cv-studio` of de CV Studio-assets zijn gewijzigd.
- Browsercontrole: demo-kandidaat Marieke van Dijk geselecteerd, conversie gegenereerd, anonieme variant gekozen; DOCX- en PDF-links wijzen naar de anonieme bestanden.
- Alle 13 bestaande CV Studio-regressietests slagen.

## Screenshots

### Desktop

- `final/home-desktop.png`
- `final/home-updates-desktop.png`
- `final/how-desktop.png`
- `final/cv-studio-entry.png`

### Mobile

- `final/home-mobile.png`
- `final/home-updates-mobile.png`
- `final/how-mobile.png`

De map `baseline/` bevat de nulmetingen van homepage, Hoe het werkt en CV Studio.
