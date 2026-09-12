import { ChatIcon, FileCheckIcon, SearchIcon, UsersIcon } from "@/components/Icons";
import { PhilooMark } from "@/components/site/PhilooMark";
import type { Language } from "@/lib/i18n";
import styles from "@/components/scout/scout.module.css";

type PreviewProps = { label: string };

function PreviewLabel({ children }: { children: string }) {
  return <figcaption className={styles.previewLabel}>{children}</figcaption>;
}

export function HomeScoutVisual({ feedback, label, prompt }: PreviewProps & { feedback: string; prompt: string }) {
  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.homeVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={`${styles.messageCard} ${styles.homePrompt}`}>
        <ChatIcon />
        <span>{prompt}</span>
      </div>
      <div className={styles.candidateStack}>
        <CandidateRow initials="AM" name="Alex Morgan" role="Business Development Manager" />
        <CandidateRow initials="JT" name="Jamie Taylor" role="Account Manager" />
      </div>
      <div className={`${styles.feedbackCard} ${styles.homeFeedback}`}>
        <span className={styles.dot} />
        <span>{feedback}</span>
      </div>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function ConversationVisual({ label, scout, user }: PreviewProps & { scout: string; user: string }) {
  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.conversationVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={`${styles.messageCard} ${styles.userMessage}`}>
        <span className={styles.smallAvatar}>U</span>
        <span>{user}</span>
      </div>
      <div className={`${styles.messageCard} ${styles.scoutMessage}`}>
        <span className={styles.markAvatar}><PhilooMark className={styles.inlineMark} sizes="28px" /></span>
        <span>{scout}</span>
      </div>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function ProcessSummaryVisual({ items, label }: PreviewProps & { items: readonly string[] }) {
  const icons = [ChatIcon, UsersIcon, SearchIcon, FileCheckIcon] as const;

  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.processSummaryVisual}`}>
      <div className={styles.processSummaryHeader}>
        <span className={styles.interactivePill}>{label}</span>
        <PhilooMark className={styles.processSummaryMark} sizes="32px" />
      </div>
      <ol className={styles.processSummaryList}>
        {items.map((item, index) => {
          const Icon = icons[index] ?? SearchIcon;
          return (
            <li key={item}>
              <span className={styles.processSummaryIcon}><Icon /></span>
              <span><small>0{index + 1}</small><strong>{item}</strong></span>
              {index < items.length - 1 ? <span aria-hidden="true" className={styles.processSummaryArrow}>→</span> : null}
            </li>
          );
        })}
      </ol>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function StepPreview({ label, number, prompt }: PreviewProps & { number: string; prompt: string }) {
  if (number === "02") {
    return (
      <figure aria-label={label} className={`${styles.visual} ${styles.stepVisual}`}>
        <div aria-hidden="true" className={styles.orbit} />
        <CandidateRow initials="AM" name="Alex Morgan" role="Business Development Manager" />
        <div className={styles.feedbackCard}><ChatIcon /><span>{prompt}</span></div>
        <PreviewLabel>{label}</PreviewLabel>
      </figure>
    );
  }

  if (number === "03") {
    return (
      <figure aria-label={label} className={`${styles.visual} ${styles.stepVisual}`}>
        <div aria-hidden="true" className={styles.orbit} />
        <div className={styles.shortlistCard}>
          <CandidateRow initials="AM" name="Alex Morgan" role="Business Development Manager" />
          <div className={styles.shortlistSummary}>
            <FileCheckIcon />
            <span>{prompt}</span>
          </div>
        </div>
        <PreviewLabel>{label}</PreviewLabel>
      </figure>
    );
  }

  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.stepVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={styles.briefCard}>
        <SearchIcon />
        <span>{prompt}</span>
      </div>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function TeamsVisual({ label, lang }: PreviewProps & { lang: Language }) {
  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.teamsVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={`${styles.personCard} ${styles.managerCard}`}>
        <span className={styles.avatar}>HM</span>
        <span><strong>{lang === "nl" ? "Leidinggevende" : "Hiring manager"}</strong><small>{lang === "nl" ? "Moet zelf nieuwe klanten winnen." : "Must win new clients."}</small></span>
      </div>
      <div className={`${styles.personCard} ${styles.recruiterCard}`}>
        <span className={styles.avatar}>RC</span>
        <span><strong>Recruiter</strong><small>{lang === "nl" ? "Laten we deze profielen beoordelen." : "Let’s review these profiles."}</small></span>
      </div>
      <div className={styles.alignmentCard}>
        <UsersIcon />
        <span>{lang === "nl" ? "Een selectie waarop we kunnen handelen." : "A shortlist we can act on."}</span>
      </div>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function AgencyVisual({ label, lang }: PreviewProps & { lang: Language }) {
  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.agencyVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={styles.briefSignal}><FileCheckIcon /><span>{lang === "nl" ? "Sterke saleservaring. Moet zelf blijven verkopen." : "Strong sales experience. Must keep selling directly."}</span></div>
      <div className={styles.candidateStack}>
        <CandidateRow initials="AM" name="Alex Morgan" role="Business Development Manager" status={lang === "nl" ? "Past bij briefing" : "Fits the brief"} />
        <CandidateRow initials="JT" name="Jamie Taylor" role="Account Manager" status={lang === "nl" ? "Te beoordelen" : "To review"} />
      </div>
      <div className={styles.readySignal}>{lang === "nl" ? "Selectie klaar om te beoordelen" : "Shortlist ready to review"}</div>
      <PreviewLabel>{label}</PreviewLabel>
    </figure>
  );
}

export function FeedbackPreview({ feedback, feedbackLabel, label, why, whyLabel }: PreviewProps & { feedback: string; feedbackLabel: string; why: string; whyLabel: string }) {
  return (
    <figure aria-label={label} className={`${styles.widePreview} ${styles.visual}`}>
      <PreviewLabel>{label}</PreviewLabel>
      <div className={styles.feedbackSource}>
        <ChatIcon />
        <span><small>{feedbackLabel}</small><strong>{feedback}</strong></span>
      </div>
      <span aria-hidden="true" className={styles.previewArrow}>→</span>
      <div className={styles.feedbackCandidate}>
        <span className={styles.avatar}>AM</span>
        <span className={styles.feedbackCandidateName}><strong>Alex Morgan</strong><small>Business Development Manager</small></span>
        <span className={styles.feedbackReason}><small>{whyLabel}</small><strong>{why}</strong></span>
      </div>
    </figure>
  );
}

export function AboutMarkVisual({ label }: PreviewProps) {
  return (
    <figure aria-label={label} className={`${styles.visual} ${styles.aboutVisual}`}>
      <div aria-hidden="true" className={styles.orbit} />
      <div className={styles.aboutMarkGlow}><PhilooMark className={styles.aboutMark} priority sizes="150px" /></div>
    </figure>
  );
}

function CandidateRow({ initials, name, role, status }: { initials: string; name: string; role: string; status?: string }) {
  return (
    <div className={styles.candidateRow}>
      <span className={styles.avatar}>{initials}</span>
      <span className={styles.candidateText}><strong>{name}</strong><small>{role}</small></span>
      {status ? <span className={styles.candidateStatusBadge}>{status}</span> : null}
      <span aria-hidden="true" className={styles.rowArrow}>›</span>
    </div>
  );
}
