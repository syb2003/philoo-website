"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircleIcon, ChatIcon, FileCheckIcon, SearchIcon } from "@/components/Icons";
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
          {stage === 1 ? <ReviewStage copy={copy} /> : null}
          {stage === 2 ? <FeedbackStage copy={copy} /> : null}
          {stage === 3 ? <OutputStage copy={copy} /> : null}
        </div>
        <footer className={styles.searchDemoFooter}>
          <span>{copy.disclosure}</span>
        </footer>
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

function ReviewStage({ copy }: { copy: DemoCopy }) {
  return (
    <div className={styles.reviewStage}>
      <article className={styles.demoCandidateCard}>
        <CandidateSummary initials="01" location={copy.initialCandidate.location} name={copy.initialCandidate.name} role={copy.initialCandidate.role} />
        <div className={styles.demoCandidateEvidence}><strong>{copy.initialCandidate.experienceLabel}</strong><ul>{copy.initialCandidate.experience.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className={styles.demoCandidateGap}><strong>{copy.initialCandidate.gapLabel}</strong><p>{copy.initialCandidate.gap}</p></div>
      </article>
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

function OutputStage({ copy }: { copy: DemoCopy }) {
  return (
    <article className={styles.outputStage}>
      <header><CandidateSummary initials="02" location={copy.refinedCandidate.location} name={copy.refinedCandidate.name} role={copy.refinedCandidate.role} /></header>
      <div className={styles.outputGrid}>
        <section><h3><FileCheckIcon />{copy.refinedCandidate.evidenceLabel}</h3><ul>{copy.refinedCandidate.experience.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h3><ChatIcon />{copy.refinedCandidate.unknownsLabel}</h3><ul>{copy.refinedCandidate.unknowns.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      <section className={styles.outputNextStep}><h3><CheckCircleIcon />{copy.refinedCandidate.nextLabel}</h3><p>{copy.refinedCandidate.next}</p></section>
    </article>
  );
}

function CandidateSummary({ initials, location, name, role }: { initials: string; location: string; name: string; role: string }) {
  return <div className={styles.demoCandidateSummary}><span className={styles.largeAvatar}>{initials}</span><div><h3>{name}</h3><p>{role}<span aria-hidden="true"> · </span>{location}</p></div></div>;
}
