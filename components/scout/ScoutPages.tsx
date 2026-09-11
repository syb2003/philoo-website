import {
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  FileCheckIcon,
  SearchIcon,
  UsersIcon,
} from "@/components/Icons";
import { AnalyticsPageView } from "@/components/site/Analytics";
import { ScoutShell } from "@/components/scout/ScoutShell";
import { ScoutTrackedAnchor, ScoutTrackedLink } from "@/components/scout/ScoutTracking";
import {
  AboutMarkVisual,
  AgencyVisual,
  FeedbackPreview,
  TeamsVisual,
} from "@/components/scout/ScoutVisuals";
import { ScoutHomeDemoPreview, ScoutSearchDemo } from "@/components/scout/ScoutSearchDemo";
import { ScoutUpdatesForm } from "@/components/scout/ScoutUpdatesForm";
import { CALENDLY_URL, type Language } from "@/lib/i18n";
import { scoutDemoCopy } from "@/lib/scout-demo";
import { scoutHomeCopy, scoutPageCopy, scoutPaths, scoutUi } from "@/lib/scout";
import styles from "@/components/scout/scout.module.css";

const stepIcons = [ChatIcon, UsersIcon, SearchIcon] as const;

export function ScoutHomePage({ lang }: { lang: Language }) {
  const copy = scoutHomeCopy[lang];

  return (
    <ScoutShell currentPage="home" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.heroSection} ${styles.homeHeroSection}`}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 className={styles.heroTitle}>{copy.headline}</h1>
              <p className={styles.heroLead}>{copy.lead}</p>
              <div className={styles.heroActions}>
                <ScoutTrackedLink className={styles.primaryButton} event="scout_primary_cta_click" href={scoutPaths.demo[lang]} language={lang} placement="home-hero">
                  {copy.primaryCta}
                </ScoutTrackedLink>
                <ScoutTrackedLink className={styles.secondaryButton} event="scout_how_it_works_click" href={scoutPaths.howItWorks[lang]} language={lang} placement="home-hero">
                  {copy.secondaryCta}
                </ScoutTrackedLink>
              </div>
              <p className={styles.smallNote}>{copy.note}</p>
              {lang === "nl" ? (
                <ScoutTrackedAnchor
                  className={styles.developmentLink}
                  event="scout_updates_click"
                  href="#ontwikkelingen"
                  language={lang}
                  placement="home-hero"
                >
                  Volg de ontwikkelingen <span aria-hidden="true">↓</span>
                </ScoutTrackedAnchor>
              ) : null}
            </div>
            <ScoutHomeDemoPreview lang={lang} />
          </div>
        </section>

        <section className={styles.homeProcessSection} id="how-it-works">
          <div className={styles.container}>
            <h2 className={styles.homeProcessHeading}>{copy.stepsTitle}</h2>
            <div className={styles.homeProcessGrid}>
              {copy.steps.map(([title, body], index) => {
                const Icon = stepIcons[index];
                return (
                  <article className={styles.homeProcessCard} key={title}>
                    <span className={styles.iconBubble}><Icon /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.tintedSection}`}>
          <div className={`${styles.container} ${styles.candidateSectionGrid}`}>
            <div className={styles.sectionCopy}>
              <p className={styles.eyebrow}>{copy.candidateLabel}</p>
              <h2 className={styles.sectionTitle}>{copy.candidateTitle}</h2>
              <p className={styles.sectionIntro}>{copy.candidateIntro}</p>
            </div>
            <article aria-label={copy.candidateLabel} className={styles.candidateDetailCard}>
              <span className={styles.previewPill}>{copy.candidateDisclosure}</span>
              <div className={styles.candidateIdentity}>
                <span className={styles.largeAvatar}>AM</span>
                <div><h3>{copy.candidateName}</h3><p>{copy.candidateRole} · {copy.candidateLocation}</p></div>
              </div>
              <dl className={styles.candidateFacts}>
                <div><dt>{copy.whyLabel}</dt><dd>{copy.why}</dd></div>
                <div><dt>{copy.checkLabel}</dt><dd>{copy.check}</dd></div>
              </dl>
              <details className={styles.evidenceDisclosure}>
                <summary>{copy.evidenceToggle}</summary>
                <ul>{copy.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.compactSection}`}>
          <div className={styles.container}>
            <div className={styles.audienceRouteHeader}>
              <h2 className={styles.sectionTitle}>{copy.audienceTitle}</h2>
              <p className={styles.sectionIntro}>{copy.audienceIntro}</p>
            </div>
            <div className={styles.audienceRouteGrid}>
              {copy.audiences.map(([title, body, linkLabel], index) => {
                const page = index === 0 ? "companies" : "agencies";
                return (
                  <ScoutTrackedLink className={styles.audienceRouteCard} event="scout_audience_navigation" href={scoutPaths[page][lang]} key={title} language={lang} placement={`home-${page}`}>
                    <span className={styles.iconBubble}>{index === 0 ? <UsersIcon /> : <SearchIcon />}</span>
                    <span><strong>{title}</strong><small>{body}</small><em>{linkLabel}<span aria-hidden="true">→</span></em></span>
                  </ScoutTrackedLink>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCta body={copy.finalBody} lang={lang} note={copy.finalNote} placement="home-final" title={copy.finalTitle} />

        {lang === "nl" ? (
          <section aria-labelledby="ontwikkelingen-title" className={`${styles.section} ${styles.updatesSection}`} id="ontwikkelingen">
            <div className={`${styles.container} ${styles.updatesCard}`}>
              <div className={styles.updatesIntro}>
                <h2 id="ontwikkelingen-title">Wil je op de hoogte blijven?</h2>
                <p>Ontvang updates over Scout en hoor wanneer je het kunt proberen.</p>
              </div>
              <ScoutUpdatesForm />
            </div>
          </section>
        ) : null}
      </main>
    </ScoutShell>
  );
}

export function ScoutHowItWorksPage({ lang }: { lang: Language }) {
  const copy = scoutPageCopy.howItWorks[lang];
  const demoCopy = scoutDemoCopy[lang];

  return (
    <ScoutShell currentPage="howItWorks" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.heroSection} ${styles.howHeroSection}`}>
          <div className={styles.container}>
            <PageHeroCopy eyebrow={copy.eyebrow} intro={copy.intro} title={copy.title} />
            <ScoutSearchDemo lang={lang} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.tintedSection} ${styles.compactSection}`}>
          <div className={`${styles.container} ${styles.deliverableGrid}`}>
            <div>
              <p className={styles.eyebrow}>{copy.deliverableLabel}</p>
              <h2 className={styles.sectionTitle}>{copy.deliverableTitle}</h2>
              <p className={styles.sectionIntro}>{copy.deliverableIntro}</p>
            </div>
            <dl className={styles.deliverableList}>
              {copy.deliverableItems.map(([title, body], index) => (
                <div key={title}><dt><span>0{index + 1}</span>{title}</dt><dd>{body}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${styles.section} ${styles.compactSection}`}>
          <div className={styles.narrowContainer}>
            <div className={styles.faqHeader}>
              <h2 className={styles.sectionTitle}>{demoCopy.faqTitle}</h2>
              <p className={styles.sectionIntro}>{demoCopy.faqIntro}</p>
            </div>
            <div className={styles.faqList}>
              {demoCopy.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCta body={copy.finalBody} lang={lang} note={copy.finalNote} placement="how-it-works-final" title={copy.finalTitle} />
      </main>
    </ScoutShell>
  );
}

export function ScoutCompaniesPage({ lang }: { lang: Language }) {
  const copy = scoutPageCopy.companies[lang];
  const label = lang === "nl" ? "Illustratie" : "Illustration";

  return (
    <ScoutShell currentPage="companies" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <PageHeroCopy eyebrow={copy.eyebrow} intro={copy.intro} title={copy.title} />
            <TeamsVisual label={label} lang={lang} />
          </div>
        </section>

        <AudienceSteps points={copy.points} title={copy.sectionTitle} />

        <section className={`${styles.section} ${styles.tintedSection}`}>
          <div className={styles.narrowContainer}>
            <h2 className={styles.sectionTitle}>{copy.focusTitle}</h2>
            <div className={styles.focusPanel}>
              <FocusItem icon={<FileCheckIcon />} label={copy.needLabel} value={copy.need} />
              <FocusItem icon={<CheckCircleIcon />} label={copy.checkLabel} value={copy.check} />
            </div>
          </div>
        </section>

        <FinalCta body={copy.finalBody} lang={lang} placement="companies-final" title={copy.finalTitle} />
      </main>
    </ScoutShell>
  );
}

export function ScoutAgenciesPage({ lang }: { lang: Language }) {
  const copy = scoutPageCopy.agencies[lang];
  const label = lang === "nl" ? "Illustratie" : "Illustration";

  return (
    <ScoutShell currentPage="agencies" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <PageHeroCopy eyebrow={copy.eyebrow} intro={copy.intro} title={copy.title} />
            <AgencyVisual label={label} lang={lang} />
          </div>
        </section>

        <AudienceSteps points={copy.points} title={copy.sectionTitle} />

        <section className={`${styles.section} ${styles.tintedSection}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>{copy.previewTitle}</h2>
            <FeedbackPreview feedback={copy.feedback} feedbackLabel={copy.feedbackLabel} label={label} why={copy.why} whyLabel={copy.whyLabel} />
          </div>
        </section>

        <FinalCta body={copy.finalBody} lang={lang} placement="agencies-final" title={copy.finalTitle} />
      </main>
    </ScoutShell>
  );
}

export function ScoutAboutPage({ lang }: { lang: Language }) {
  const copy = scoutPageCopy.about[lang];

  return (
    <ScoutShell currentPage="about" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <PageHeroCopy eyebrow={copy.eyebrow} intro={copy.intro} title={copy.title} />
            <AboutMarkVisual label="Philoo" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.narrowContainer}>
            <div className={styles.centeredIntro}>
              <h2 className={styles.sectionTitle}>{copy.sectionTitle}</h2>
              <p className={styles.sectionIntro}>{copy.sectionBody}</p>
            </div>
            <div className={styles.principlesGrid}>
              {copy.principles.map(([title, body], index) => {
                const Icon = stepIcons[index];
                return <article className={styles.principleCard} key={title}><span className={styles.iconBubble}><Icon /></span><h3>{title}</h3><p>{body}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.founderSection}`}>
          <div className={`${styles.narrowContainer} ${styles.founderGrid}`}>
            <div className={styles.founderIdentity}>
              <span className={styles.eyebrow}>{copy.founderLabel}</span>
              <span className={styles.founderAvatar}>SJ</span>
              <div><h2>{copy.founderName}</h2><p>{copy.founderRole}</p></div>
            </div>
            <blockquote>{copy.founderQuote}</blockquote>
          </div>
        </section>

        <FinalCta body={copy.finalBody} lang={lang} placement="about-final" title={copy.finalTitle} />
      </main>
    </ScoutShell>
  );
}

export function ScoutDemoPage({ lang }: { lang: Language }) {
  const copy = scoutPageCopy.demo[lang];

  return (
    <ScoutShell currentPage="demo" lang={lang}>
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main id="main-content">
        <section className={`${styles.section} ${styles.demoSection}`}>
          <div className={`${styles.container} ${styles.demoGrid}`}>
            <div>
              <PageHeroCopy eyebrow={copy.eyebrow} intro={copy.intro} title={copy.title} />
              <div className={styles.demoPoints}>
                {copy.points.map(([title, body], index) => {
                  const Icon = stepIcons[index];
                  return <article key={title}><span className={styles.iconBubble}><Icon /></span><div><h2>{title}</h2><p>{body}</p></div></article>;
                })}
              </div>
            </div>
            <aside className={styles.bookingCard}>
              <span className={styles.bookingIcon}><CalendarIcon /></span>
              <h2>{copy.bookingTitle}</h2>
              <p>{copy.bookingBody}</p>
              <ScoutTrackedAnchor
                alsoTrackBookingClick
                className={styles.primaryButton}
                event="scout_primary_cta_click"
                href={CALENDLY_URL}
                language={lang}
                placement="demo-calendar"
                rel="noopener noreferrer"
                target="_blank"
              >
                {copy.bookingCta}
              </ScoutTrackedAnchor>
              <a className={styles.emailLink} href={`mailto:${copy.fallbackEmail}`}>{copy.fallback} {copy.fallbackEmail}</a>
              <small>{copy.note}</small>
            </aside>
          </div>
        </section>
      </main>
    </ScoutShell>
  );
}

function PageHeroCopy({ eyebrow, intro, title }: { eyebrow: string; intro: string; title: string }) {
  return (
    <div className={styles.heroCopy}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.pageHeroTitle}>{title}</h1>
      <p className={styles.heroLead}>{intro}</p>
    </div>
  );
}

function AudienceSteps({ points, title }: { points: readonly (readonly [string, string])[]; title: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.narrowContainer}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.stepsGrid}>
          {points.map(([pointTitle, body], index) => {
            const Icon = stepIcons[index];
            return <article className={styles.stepCard} key={pointTitle}><span className={styles.iconBubble}><Icon /></span><div><span className={styles.stepNumber}>0{index + 1}</span><h3>{pointTitle}</h3><p>{body}</p></div></article>;
          })}
        </div>
      </div>
    </section>
  );
}

function FocusItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className={styles.focusItem}><span className={styles.iconBubble}>{icon}</span><div><span>{label}</span><p>{value}</p></div></div>;
}

function FinalCta({ body, lang, note, placement, title }: { body: string; lang: Language; note?: string; placement: string; title: string }) {
  return (
    <section className={`${styles.section} ${styles.finalSection}`}>
      <div className={`${styles.container} ${styles.finalCard}`}>
        <h2>{title}</h2>
        <p>{body}</p>
        <ScoutTrackedLink className={styles.primaryButton} event="scout_primary_cta_click" href={scoutPaths.demo[lang]} language={lang} placement={placement}>
          {scoutUi[lang].demo}
        </ScoutTrackedLink>
        {note ? <small className={styles.finalNote}>{note}</small> : null}
      </div>
    </section>
  );
}
