import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { scoutPaths, type ScoutPageKey } from "@/lib/scout";
import { socialMetadata } from "@/lib/seo";

const metadataCopy: Record<ScoutPageKey, Record<Language, { title: string; description: string }>> = {
  home: {
    nl: {
      title: "Philoo Scout | Vind relevante kandidaten",
      description: "Vertel Scout wie je zoekt, bekijk kandidaten en geef feedback. Scout gebruikt je feedback om verder te zoeken.",
    },
    en: {
      title: "Philoo Scout | Find relevant candidates",
      description: "Tell Philoo who you need. Scout uses your context and feedback to find relevant candidates.",
    },
  },
  howItWorks: {
    nl: {
      title: "Hoe Philoo Scout werkt | Van zoekvraag naar kandidaten",
      description: "Leg uit wie je zoekt, bekijk de eerste kandidaten en geef feedback. Scout gebruikt die feedback bij het verdere zoeken.",
    },
    en: {
      title: "How Philoo Scout works | From brief to candidates",
      description: "Explain who you need, review an initial shortlist and use your feedback to sharpen the search direction.",
    },
  },
  companies: {
    nl: {
      title: "Philoo Scout voor bedrijven | Vind de mensen die je nodig hebt",
      description: "Combineer de kennis van de leidinggevende en de recruiter. Scout gebruikt hun feedback bij het zoeken en selecteren.",
    },
    en: {
      title: "Philoo Scout for hiring teams | Find the people you need",
      description: "Bring hiring-manager and recruiter input together in a focused search for relevant candidates.",
    },
  },
  agencies: {
    nl: {
      title: "Philoo Scout voor recruitmentbureaus",
      description: "Leg vast wie je klant zoekt, bekijk kandidaten en gebruik klantfeedback bij het verdere zoeken.",
    },
    en: {
      title: "Philoo Scout for recruitment agencies",
      description: "Turn a client brief and feedback into a focused search for candidates worth reviewing.",
    },
  },
  about: {
    nl: {
      title: "Over Philoo | Recruitmentsoftware met context",
      description: "Philoo richt zich op Scout: recruitmentsoftware die context en feedback gebruikt om relevante kandidaten te vinden.",
    },
    en: {
      title: "About Philoo | Recruitment software built on context",
      description: "Philoo is focused on Scout: recruitment software that uses context and feedback to find relevant candidates.",
    },
  },
  demo: {
    nl: {
      title: "Plan een Philoo Scout-demo",
      description: "Neem een vacature mee en bekijk hoe Scout zoekt, profielinformatie toont en je feedback gebruikt.",
    },
    en: {
      title: "Book a Philoo Scout demo",
      description: "See how Philoo Scout brings together a search brief, candidate feedback and a focused shortlist.",
    },
  },
};

export function scoutMetadata(page: ScoutPageKey, lang: Language): Metadata {
  const copy = metadataCopy[page][lang];
  const canonical = scoutPaths[page][lang];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: { nl: scoutPaths[page].nl, en: scoutPaths[page].en },
    },
    ...socialMetadata(copy.title, copy.description, canonical, lang === "nl" ? "nl_NL" : "en_GB"),
  };
}
