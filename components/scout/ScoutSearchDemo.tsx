"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatIcon, SearchIcon } from "@/components/Icons";
import { trackEvent } from "@/components/site/Analytics";
import { PhilooMark } from "@/components/site/PhilooMark";
import type { Language } from "@/lib/i18n";
import { scoutDemoCopy } from "@/lib/scout-demo";
import styles from "@/components/scout/scout.module.css";

const DETAIL_LAST_STAGE = 3;
const DETAIL_STAGE_DURATION_MS = 5200;

type DemoCopy = (typeof scoutDemoCopy)[Language];

type PlaybackOptions = {
  autoplay: boolean;
  duration: number;
  lang: Language;
  lastStage: number;
  source: string;
};

function useDemoPlayback({ autoplay, duration, lang, lastStage, source }: PlaybackOptions) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const started = useRef(false);
  const autoplayStarted = useRef(false);
  const completed = useRef(false);
  const inView = useRef(false);
  const pausedByUser = useRef(false);

  const trackStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    trackEvent("scout_example_start", { language: lang, sourceCategory: source });
  }, [lang, source]);

  const markComplete = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    trackEvent("scout_example_complete", { language: lang, sourceCategory: source });
  }, [lang, source]);

  const selectStage = useCallback((nextStage: number, trigger: "automatic" | "manual") => {
    const boundedStage = Math.max(0, Math.min(lastStage, nextStage));
    if (trigger === "manual") {
      pausedByUser.current = true;
      setPlaying(false);
    }
    if (boundedStage === lastStage) setPlaying(false);
    if (trigger === "manual" && boundedStage < lastStage) completed.current = false;
    trackStart();
    setStage(boundedStage);
    trackEvent("scout_example_stage_select", {
      language: lang,
      sourceCategory: `${source}:stage-${boundedStage + 1}:${trigger}`,
    });
    if (boundedStage === lastStage) markComplete();
  }, [lang, lastStage, markComplete, source, trackStart]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || stage >= lastStage) return;
    const timer = window.setTimeout(() => selectStage(stage + 1, "automatic"), duration);
    return () => window.clearTimeout(timer);
  }, [duration, lastStage, playing, reducedMotion, selectStage, stage]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
        setPlaying(false);
        return;
      }
      if (
        autoplay
        && !autoplayStarted.current
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        autoplayStarted.current = true;
        trackStart();
        setPlaying(true);
        return;
      }
      if (
        autoplay
        && autoplayStarted.current
        && !pausedByUser.current
        && !document.hidden
        && stage < lastStage
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setPlaying(true);
      }
    }, { threshold: [0, 0.35] });
    observer.observe(root);
    return () => observer.disconnect();
  }, [autoplay, lastStage, stage, trackStart]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) {
        setPlaying(false);
        return;
      }
      if (
        autoplay
        && autoplayStarted.current
        && inView.current
        && !pausedByUser.current
        && !reducedMotion
        && stage < lastStage
      ) {
        setPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [autoplay, lastStage, reducedMotion, stage]);

  const togglePlayback = useCallback(() => {
    if (playing) {
      pausedByUser.current = true;
      setPlaying(false);
      return;
    }
    if (reducedMotion) return;
    pausedByUser.current = false;
    trackStart();
    if (stage === lastStage) {
      completed.current = false;
      setStage(0);
      trackEvent("scout_example_stage_select", { language: lang, sourceCategory: `${source}:stage-1:replay` });
    }
    setPlaying(true);
  }, [lang, lastStage, playing, reducedMotion, source, stage, trackStart]);

  return { playing, reducedMotion, rootRef, selectStage, stage, togglePlayback };
}

export function ScoutHomeDemoPreview({ lang }: { lang: Language }) {
  const copy = scoutDemoCopy[lang];

  return (
    <section aria-label={copy.home.previewLabel} className={styles.homeChatWindow}>
      <header className={styles.homeChatHeader}>
        <DemoBrand />
      </header>

      <div className={styles.homeChatCanvas}>
        <article className={styles.homeChatMessage}>
          <span aria-hidden="true" className={styles.homeChatAvatar}><PhilooMark sizes="28px" /></span>
          <div>
            <span className={styles.homeChatMessageLabel}>{copy.home.messageLabel}</span>
            <h2>{copy.home.welcome}</h2>
            <p>{copy.home.welcomeSupport}</p>
          </div>
        </article>

        <div aria-label={copy.home.composerLabel} className={styles.homeChatComposer}>
          <span>{copy.home.composer}</span>
          <span aria-hidden="true" className={styles.homeChatSend}>→</span>
        </div>
      </div>

      <footer aria-label={copy.home.processLabel} className={styles.homeChatProcess}>
        {copy.home.process.map((item, index) => (
          <span className={styles.homeChatProcessStep} key={item}>
            <span>{item}</span>
            {index < copy.home.process.length - 1 ? <span aria-hidden="true" className={styles.homeChatProcessArrow}>→</span> : null}
          </span>
        ))}
      </footer>
    </section>
  );
}

export function ScoutSearchDemo({ lang }: { lang: Language }) {
  const copy = scoutDemoCopy[lang];
  const { playing, reducedMotion, rootRef, selectStage, stage, togglePlayback } = useDemoPlayback({
    autoplay: true,
    duration: DETAIL_STAGE_DURATION_MS,
    lang,
    lastStage: DETAIL_LAST_STAGE,
    source: "scout:how-it-works-demo",
  });

  return (
    <section aria-labelledby="interactive-example-title" className={`${styles.searchDemo} ${playing ? styles.demoPlaying : styles.demoPaused}`} id="interactive-example" ref={rootRef}>
      <div className={styles.searchDemoWindow}>
        <header className={styles.searchDemoHeader}>
          <DemoBrand />
          <DemoPlaybackControls
            atEnd={stage === DETAIL_LAST_STAGE}
            copy={copy}
            onToggle={togglePlayback}
            playing={playing}
            reducedMotion={reducedMotion}
          />
        </header>
        <DemoStageNavigation
          className={styles.demoInlineNavigation}
          copy={copy}
          onSelect={(index) => selectStage(index, "manual")}
          stage={stage}
        />
        <div aria-atomic="true" aria-live="polite" className={styles.demoCanvas} key={stage}>
          <h2 className={styles.srOnly} id="interactive-example-title">{copy.stages[stage].title}</h2>
          {stage === 0 ? <NeedStage copy={copy} /> : null}
          {stage === 1 ? <ReviewStage copy={copy} lang={lang} /> : null}
          {stage === 2 ? <FeedbackStage copy={copy} /> : null}
          {stage === 3 ? <OutputStage lang={lang} /> : null}
        </div>
      </div>

      <noscript>
        <div className={styles.demoNoScript}>
          <h2>{copy.staticFallbackTitle}</h2>
          <ol>{copy.stages.map((item) => <li key={item.nav}><strong>{item.title}</strong> {item.body}</li>)}</ol>
        </div>
      </noscript>
    </section>
  );
}

function DemoBrand() {
  return (
    <div aria-label="Philoo Scout" className={styles.demoBrand}>
      <PhilooMark sizes="30px" />
      <strong>philoo</strong>
      <span>Scout</span>
    </div>
  );
}

function DemoPlaybackControls({ atEnd, copy, onToggle, playing, reducedMotion }: {
  atEnd: boolean;
  copy: DemoCopy;
  onToggle: () => void;
  playing: boolean;
  reducedMotion: boolean;
}) {
  const label = reducedMotion ? copy.reducedMotion : atEnd ? copy.replay : playing ? copy.pause : copy.play;
  return (
    <button aria-label={label} aria-pressed={playing} className={styles.demoPlaybackControl} disabled={reducedMotion} onClick={onToggle} title={label} type="button">
      <span aria-hidden="true">{atEnd ? "↺" : playing ? "Ⅱ" : "▶"}</span>
      <span className={styles.playbackLabel}>{label}</span>
    </button>
  );
}

function DemoStageNavigation({ className, copy, onSelect, stage }: {
  className: string;
  copy: DemoCopy;
  onSelect: (index: number) => void;
  stage: number;
}) {
  return (
    <nav aria-label={copy.stageNavigation} className={className}>
      <ol>
        {copy.stages.map((item, index) => (
          <li key={item.nav}>
            <button aria-current={stage === index ? "step" : undefined} className={stage === index ? styles.demoStageActive : undefined} onClick={() => onSelect(index)} type="button">
              <span aria-hidden="true">0{index + 1}</span>
              <strong>{item.nav}</strong>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function NeedStage({ copy }: { copy: DemoCopy }) {
  return (
    <div className={styles.needStage}>
      <article className={styles.demoPromptCard}>
        <span className={styles.demoPromptIcon}><PhilooMark sizes="28px" /></span>
        <div><strong>{copy.conversation[0].label}</strong><h3>{copy.conversation[0].text}</h3><p>{copy.stages[0].body}</p></div>
      </article>
      <div aria-label={copy.composerLabel} className={styles.demoComposer}>
        <span>{copy.composerPlaceholder}</span><span aria-hidden="true">→</span>
      </div>
    </div>
  );
}

function ReviewStage({ copy, lang }: { copy: DemoCopy; lang: Language }) {
  const selection = lang === "nl" ? {
    title: "Eerste selectie",
    count: "3 kandidaten gevonden",
    candidates: [
      ["Kandidaat 01", "Commercieel manager", "Utrecht"],
      ["Kandidaat 02", "Accountmanager", "Rotterdam"],
      ["Kandidaat 03", "Commercieel specialist", "Amersfoort"],
    ],
    counter: "Kandidaat 1 / 3",
    relevant: "Waarom relevant",
    relevantItems: ["Zakelijke klanten", "Groei bestaande accounts"],
    signal: "Signaal · waar beschikbaar",
    signalValue: "Open to work",
    signalNote: "Mogelijk relevant",
    check: "Nog te checken",
    checkValue: "Interesse in deze vacature",
  } as const : {
    title: "First selection",
    count: "3 candidates found",
    candidates: [
      ["Candidate 01", "Commercial manager", "Utrecht"],
      ["Candidate 02", "Account manager", "Rotterdam"],
      ["Candidate 03", "Commercial specialist", "Amersfoort"],
    ],
    counter: "Candidate 1 / 3",
    relevant: "Why relevant",
    relevantItems: ["Business clients", "Existing-account growth"],
    signal: "Signal · where available",
    signalValue: "Open to work",
    signalNote: "Potentially relevant",
    check: "Still to check",
    checkValue: "Interest in this role",
  } as const;

  return (
    <div className={styles.demoSelectionStage}>
      <header className={styles.demoSelectionHeader}>
        <strong>{selection.title}</strong>
        <span>{selection.count}</span>
      </header>
      <div className={styles.demoSelectionGrid}>
        <div aria-label={selection.count} className={styles.demoCandidateList} role="list">
          {selection.candidates.map(([name, role, location], index) => (
            <div aria-current={index === 0 ? "true" : undefined} className={`${styles.demoCandidateRow} ${index === 0 ? styles.demoCandidateRowActive : ""}`} key={name} role="listitem">
              <span aria-hidden="true">0{index + 1}</span>
              <div><strong>{name}</strong><small>{role}</small></div>
              <small>{location}</small>
            </div>
          ))}
        </div>

        <article className={styles.demoCandidateDetail}>
          <header>
            <div><span>{selection.counter}</span><h3>{copy.initialCandidate.role}</h3><p>{copy.initialCandidate.location}</p></div>
          </header>
          <section className={styles.demoRelevantBlock}>
            <strong>{selection.relevant}</strong>
            <div>{selection.relevantItems.map((item) => <span key={item}>{item}</span>)}</div>
          </section>
          <div className={styles.demoCandidateMetaGrid}>
            <section className={styles.demoSignalBlock}>
              <span>{selection.signal}</span>
              <strong>{selection.signalValue}</strong>
              <small>{selection.signalNote}</small>
            </section>
            <section className={styles.demoCheckBlock}>
              <span>{selection.check}</span>
              <strong>{selection.checkValue}</strong>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

function FeedbackStage({ copy }: { copy: DemoCopy }) {
  return (
    <div className={styles.feedbackStage}>
      <article className={styles.demoFeedbackPanel}>
        <span><ChatIcon /></span><div><strong>{copy.feedbackLabel}</strong><p>{copy.feedback}</p></div>
      </article>
      <div className={styles.priorityUpdate}>
        <h3><SearchIcon />{copy.updateTitle}</h3>
        <div><span className={styles.priorityMore}>↑</span><p><strong>{copy.moreLabel}</strong>{copy.more}</p></div>
        <div><span className={styles.priorityLess}>↓</span><p><strong>{copy.lessLabel}</strong>{copy.less}</p></div>
      </div>
    </div>
  );
}

function OutputStage({ lang }: { lang: Language }) {
  const selection = lang === "nl" ? {
    title: "Aangepaste selectie",
    count: "3 kandidaten gevonden",
    summary: "Meer nadruk op zelf verkopen · Minder teammanagement",
    feedbackLabel: "Op basis van feedback",
    feedback: ["Meer zelf sales", "Minder teammanagement", "Regio Randstad", "Recente commerciële ervaring"],
    signalLabel: "Signalen waar beschikbaar",
    candidates: [
      {
        initials: "AM",
        name: "Alex Morgan",
        role: "Commercieel specialist",
        location: "Regio Rotterdam",
        tags: ["Zelf sales", "B2B-klanten"],
        signal: "Open to work",
      },
      {
        initials: "RV",
        name: "Robin de Vries",
        role: "Accountmanager",
        location: "Regio Utrecht",
        tags: ["Nieuwe klanten", "Eerste gesprekken"],
        signal: "Recent actief",
      },
      {
        initials: "SJ",
        name: "Samira Jansen",
        role: "Business developer",
        location: "Regio Den Haag",
        tags: ["Zakelijke klanten", "Zelf acquisitie"],
        signal: "Beschikbaarheidsignaal",
      },
    ],
  } as const : {
    title: "Adjusted selection",
    count: "3 candidates found",
    summary: "More emphasis on direct selling · Less team management",
    feedbackLabel: "Based on feedback",
    feedback: ["More direct selling", "Less team management", "Randstad area", "Recent commercial experience"],
    signalLabel: "Signals where available",
    candidates: [
      {
        initials: "AM",
        name: "Alex Morgan",
        role: "Commercial specialist",
        location: "Rotterdam region",
        tags: ["Direct selling", "B2B clients"],
        signal: "Open to work",
      },
      {
        initials: "RV",
        name: "Robin de Vries",
        role: "Account manager",
        location: "Utrecht region",
        tags: ["New clients", "First conversations"],
        signal: "Recently active",
      },
      {
        initials: "SJ",
        name: "Samira Jansen",
        role: "Business developer",
        location: "The Hague region",
        tags: ["Business clients", "Direct outreach"],
        signal: "Availability signal",
      },
    ],
  } as const;

  return (
    <div className={styles.adjustedSelectionStage}>
      <header className={styles.adjustedSelectionHeader}>
        <div>
          <h3>{selection.title}</h3>
          <p>{selection.summary}</p>
        </div>
        <span>{selection.count}</span>
      </header>

      <section className={styles.adjustedFeedbackSummary}>
        <strong>{selection.feedbackLabel}</strong>
        <div>
          {selection.feedback.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <div className={styles.adjustedListHeader}>
        <span>{selection.signalLabel}</span>
      </div>

      <div aria-label={selection.count} className={styles.adjustedCandidateList} role="list">
        {selection.candidates.map((candidate, index) => (
          <article className={`${styles.adjustedCandidateRow} ${index === 0 ? styles.adjustedCandidateRowActive : ""}`} key={candidate.name} role="listitem">
            <span aria-hidden="true" className={styles.adjustedCandidateAvatar}>{candidate.initials}</span>
            <div className={styles.adjustedCandidateIdentity}>
              <h3>{candidate.name}</h3>
              <p>{candidate.role}<span aria-hidden="true"> · </span>{candidate.location}</p>
            </div>
            <div className={styles.adjustedCandidateTags}>
              {candidate.tags.map((tag) => <span key={tag}>{tag}</span>)}
              <span className={styles.adjustedSignal}>{candidate.signal}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
