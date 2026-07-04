import type { Language } from "./i18n";

export type SectionId =
  | "home"
  | "voorbeelden"
  | "werkwijze"
  | "voor-wie"
  | "pricing"
  | "services"
  | "contact";

export type SiteCopy = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    items: Array<{
      id: SectionId;
      label: string;
    }>;
    cta: string;
    menu: string;
    close: string;
    language: string;
  };
  hero: {
    headline: [string, string];
    lead?: string;
    body: string;
    credibility?: string;
    cta: string;
    visualAria: string;
    workflow: string[];
  };
  benefits: Array<{
    title: string;
    body: string;
  }>;
  examples: {
    title: string;
    link: string;
    cards: Array<{
      eyebrow: string;
      title: string;
      body: string;
    }>;
  };
  process: {
    title: string;
    steps: Array<{
      number: string;
      title: string;
      body: string;
    }>;
  };
  audience: {
    title: string;
    bullets: string[];
  };
  testimonial: {
    quote: string;
    attribution: string;
    ratingLabel: string;
  };
  pricing: {
    label: string;
    title: string;
    intro: string;
    secondParagraph: string;
    subtitle: string;
    exampleLabel: string;
    calculationIntro: string;
    impactLines: string[];
    finalLine: string;
    disclaimer: string;
  };
  services: {
    title: string;
    intro: string;
    cards: Array<{
      title: string;
      body: string;
      price: string;
    }>;
  };
  bottomCta: {
    headline: string;
    body: string;
    button: string;
  };
};

export const siteCopy = {
  nl: {
    metadata: {
      title: "Philoo Recruit | Minder administratie. Meer plaatsingen.",
      description:
        "Philoo Recruit helpt recruitmentbureaus meer plaatsingen te realiseren door handwerk rond planning, opvolging en ATS/CRM-updates te verminderen.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "pricing", label: "Waarom?" },
        { id: "voorbeelden", label: "Voorbeelden" },
        { id: "werkwijze", label: "Werkwijze" },
        { id: "voor-wie", label: "Voor wie" },
        { id: "services", label: "Overige diensten" },
        { id: "contact", label: "Contact" },
      ],
      cta: "Plan een gratis kennismaking",
      menu: "Menu openen",
      close: "Menu sluiten",
      language: "Taal wisselen",
    },
    hero: {
      headline: ["Minder administratie.", "Meer plaatsingen."],
      lead: "Philoo Recruit helpt recruitmentbureaus aan meer plaatsingen in minder tijd door handmatig werk te automatiseren.",
      body: "AI neemt het operationale werk over zodat recruiters meer tijd hebben voor kandidaten en klanten.",
      credibility: "Live in weken. Al actief bij 5+ recruitmentbureaus.",
      cta: "Plan een gratis kennismaking",
      visualAria: "Workflowvisualisatie met Philoo in het midden",
      workflow: [
        "Vacature aanvraag",
        "Interview gepland",
        "Kandidaat gematcht",
        "Opvolging klaargezet",
        "ATS bijgewerkt",
        "Notities samengevat",
      ],
    },
    benefits: [
      {
        title: "Minder handmatig werk",
        body: "Verminder repetitieve taken rond planning, opvolging en ATS-updates.",
      },
      {
        title: "Sneller schakelen",
        body: "Minder vertraging tussen kandidaten, klanten en volgende stappen.",
      },
      {
        title: "Meer tijd voor gesprekken",
        body: "Geef recruiters meer tijd voor gesprekken met kandidaten en klanten.",
      },
      {
        title: "Beter overzicht",
        body: "Zie wat openstaat, vertraagd is, en wat nog aandacht nodig heeft.",
      },
    ],
    examples: {
      title: "Waar Philoo Recruit bij kan helpen",
      link: "Bespreek jouw recruitmentproces →",
      cards: [
        {
          eyebrow: "Interviewplanning",
          title: "Van heen-en-weer-mailen naar automatische planning",
          body: "Planning, reminders en statusupdates worden klaargezet, zodat recruiters minder tijd verliezen aan coördinatie.",
        },
        {
          eyebrow: "ATS/CRM-updates",
          title: "Van vergeten notities naar een up-to-date CRM.",
          body: "Philoo Recruit werkt het CRM bij, bereidt opvolging voor en maakt openstaande acties inzichtelijk.",
        },
       {
  eyebrow: "Kandidaat- en klantopvolging",
  title: "Van wachten op reactie naar actief opvolgen.",
  body: "Openstaande acties worden zichtbaar gemaakt, zodat kandidaten en klanten niet blijven liggen tussen gesprekken, feedback en volgende stappen.",
},
        {
  eyebrow: "Matching",
  title: "Van handmatig zoeken in het CRM naar een eerste selectie.",
  body: "Kandidaten worden vergeleken met de aanvraag. De recruiter krijgt een overzicht met mogelijke matches, toelichting en aandachtspunten, maar blijft zelf beslissen.",
},
      ],
    },
    process: {
      title: "Hoe we werken",
      steps: [
        {
          number: "1",
          title: "Begrijpen",
          body: "We kijken naar jullie recruitmentproces, tools en handmatige taken.",
        },
        {
          number: "2",
          title: "Ontwerpen",
          body: "We kiezen één proces en bepalen wat automatisch kan, en waar recruiters in controle moeten blijven.",
        },
        {
          number: "3",
          title: "Bouwen",
          body: "We bouwen, testen en lanceren de workflow binnen jullie bestaande tools.",
        },
        {
          number: "4",
          title: "Verbeteren",
          body: "Na livegang bekijken we feedback, meten we tijdswinst en gaan we door naar het volgende proces.",
        },
      ],
    },
    audience: {
      title: "Voor wie dit is",
      bullets: [
        "Recruitmentbureaus die minder handmatig werk willen.",
        "Teams die willen dat recruiters meer tijd besteden aan gesprekken met kandidaten en klanten.",
        "Bureaus die tijd en kosten willen besparen zonder nieuwe tool, nieuw platform of groot IT-project.",
        "Ondernemers die klein willen starten met één praktische workflow en daarna verder willen uitbreiden.",
      ],
    },
    testimonial: {
      quote:
        "Philoo bracht de automatisering en operationele structuur die we misten. Ze begrepen snel hoe ons team werkte en bouwden betrouwbare automatiseringen in onder andere Notion, HubSpot, Google Sheets, Slack en Airtable. Ideeën werden snel vertaald naar werkende systemen. De communicatie was helder en de oplossingen waren stabiel, schaalbaar en direct bruikbaar. Philoo voelde als een echte partner en niet als alleen een uitvoerder.",
      attribution: "Eigenaar recruitmentbureau",
      ratingLabel: "5.0 met vijf gouden sterren",
    },
    pricing: {
      label: "Probleem",
      title: "De verborgen kosten van handmatig recruitmentwerk",
      intro:
        "Interviewplanning kan tot 35% van de tijd van recruiters kosten. ATS/CRM-administratie kan ongeveer 8 uur per week kosten.",
      secondParagraph:
        "Elk uur dat opgaat aan feedback najagen of interviews coördineren, is een uur dat niet wordt besteed aan kandidaten spreken of klanten adviseren.",
      subtitle: "Voorbeeldberekening",
      exampleLabel: "Voorbeeld: handmatige recruitmentadministratie",
      calculationIntro:
        "Eén recruiter die 8 uur per week verliest aan ATS/CRM-admin betekent:",
      impactLines: [
        "32 uur per maand",
        "384 uur per jaar",
        "Meer dan €15.000 aan tijd per recruiter per jaar",
      ],
      finalLine:
        "En dan tellen we de kosten van fouten nog niet mee, zoals gemiste opvolging, verouderde kandidaatstatussen, vergeten klantfeedback en incomplete notities.",
      disclaimer: "", 
    },
    services: {
      title: "Andere manieren waarop we recruitmentteams helpen",
      intro:
        "Naast procesautomatisering helpt Philoo Recruit recruitmentteams ook om praktisch met AI te starten in hun dagelijkse werk.",
      cards: [
        {
          title: "AI-training voor recruiters",
          body: "Praktische training voor recruiters om AI veilig te gebruiken in hun dagelijks werk.",
          price: "Prijs op aanvraag",
        },
        {
          title: "Recruitment tooling op maat",
          body: "Een op maat gemaakte tool speciaal ontworpen voor jullie recruitmentproces.",
          price: "Prijs op aanvraag",
        },
      ],
    },
    bottomCta: {
      headline: "Benieuwd waar jij tijd verliest en geld laat liggen?",
      body: "Plan een gratis kennismaking. We kijken naar jullie huidige proces en identificeren samen waar Philoo Recruit kan helpen.",
      button: "Plan een gratis kennismaking",
    },
  },
  en: {
    metadata: {
      title: "Philoo Recruit | Less admin. More placements.",
      description:
        "Philoo Recruit helps recruitment agencies get more placements in less time by reducing manual work around scheduling, follow-up and ATS/CRM updates.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "pricing", label: "Why?" },
        { id: "voorbeelden", label: "Examples" },
        { id: "werkwijze", label: "How it works" },
        { id: "voor-wie", label: "Who it’s for" },
        { id: "services", label: "Other services" },
        { id: "contact", label: "Contact" },
      ],
      cta: "Book a free intro call",
      menu: "Open menu",
      close: "Close menu",
      language: "Switch language",
    },
    hero: {
      headline: ["Less admin.", "More placements."],
      lead: "Philoo Recruit helps recruitment agencies get more placements in less time by removing the manual work that slows recruiters down.",
      body: "AI takes care of the manual work, so recruiters have more time for candidates and clients.",
      credibility: "Built in weeks. Already trusted by 5+ recruitment agencies.",
      cta: "Book a free intro call",
      visualAria: "Workflow visual with Philoo in the center",
      workflow: [
        "Vacancy request",
        "Interview scheduled",
        "Candidate matched",
        "Follow-up prepared",
        "ATS updated",
        "Notes summarized",
      ],
    },
    benefits: [
      {
        title: "Less manual work",
        body: "Reduce repetitive tasks around scheduling, follow-up and ATS updates.",
      },
      {
        title: "Move faster",
        body: "Shorter delays between candidates, clients and next steps.",
      },
      {
        title: "More time for conversations",
        body: "Let recruiters spend more time speaking with candidates and clients.",
      },
      {
        title: "Better visibility",
        body: "See what is open, delayed, completed, and needs attention.",
      },
    ],
    examples: {
      title: "Where Philoo Recruit can help",
      link: "Discuss your recruitment workflow →",
      cards: [
        {
  eyebrow: "Interview scheduling",
  title: "From endless back-and-forth to booked interviews.",
  body: "Interview planning becomes easier to track, with clear reminders, confirmations and next steps for the recruiter to review.",
},
        {
  eyebrow: "ATS/CRM updates",
  title: "From scattered notes to records recruiters can trust.",
  body: "Candidate updates, next steps and important details are prepared after calls and emails, so the ATS reflects what is actually happening.",
},
        {
  eyebrow: "Candidate and client follow-up",
  title: "From scattered reminders to reliable follow-up.",
  body: "Open replies, client feedback and promised callbacks are kept visible, so recruiters know who needs attention and what should happen next.",
},
        {
  eyebrow: "Candidate matching",
  title: "From CRM search to a first shortlist.",
  body: "Existing candidates are compared with the client request, with context on why they may fit and what the recruiter should check before reaching out.",
},
      ],
    },
    process: {
      title: "How we work",
      steps: [
        {
          number: "1",
          title: "Understand",
          body: "We look at your recruitment process, tools and manual tasks.",
        },
        {
          number: "2",
          title: "Design",
          body: "We choose one workflow and define what should happen automatically, and where recruiters stay in control.",
        },
        {
          number: "3",
          title: "Build",
          body: "We build, test and launch the workflow inside your existing tools.",
        },
        {
          number: "4",
          title: "Improve",
          body: "After launch, we review feedback, measure time saved and continue to the next workflow.",
        },
      ],
    },
    audience: {
      title: "Who this is for",
      bullets: [
        "Recruitment agencies that want less manual work.",
        "Teams that want recruiters to spend more time with candidates and clients.",
        "Agencies that want to save time and money without new tools, a new platform or a large IT project.",
        "Owners who want to start small with one practical workflow before expanding further.",
      ],
    },
    testimonial: {
      quote:
        "Philoo delivered the automation and operational structure we were missing. They quickly understood how our team worked and built reliable automations across Notion, HubSpot, Google Sheets, Slack and Airtable. Ideas were translated into working systems fast. Communication was clear, and the solutions were stable, scalable and immediately useful. Philoo felt like a real partner, not just a contractor.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 with five gold stars",
    },
    pricing: {
      label: "Problem",
      title: "The hidden cost of manual recruitment work",
      intro:
        "Interview scheduling alone can take up to 35% of recruiter time. ATS/CRM administration can cost around 8 hours per week.",
      secondParagraph:
        "Every hour spent chasing feedback or coordinating interviews is an hour not spent speaking with candidates or advising clients.",
      subtitle: "Example calculation",
      exampleLabel: "Example: manual recruitment admin",
      calculationIntro:
        "One recruiter losing 8 hours per week to ATS/CRM admin means:",
      impactLines: [
        "32 hours per month",
        "384 hours per year",
        "Over €15,000 in time per recruiter per year",
      ],
      finalLine:
        "And that does not include the cost of mistakes, such as missed follow-ups, outdated candidate statuses, forgotten client feedback, and incomplete notes.",
      disclaimer: "",
    },
    services: {
      title: "Other ways we can help recruitment teams",
      intro:
        "Besides workflow automation, Philoo Recruit can help recruitment teams start practically with AI in their daily work.",
      cards: [
        {
          title: "Recruiter AI training",
          body: "Practical training for recruiters on how to use AI safely in daily work, without replacing recruiter judgment.",
          price: "Price on request",
        },
        {
  title: "Custom recruitment tooling",
  body: "Internal tooling that helps recruiters spend less time on admin and more time with candidates and clients.",
  price: "Price on request",
},
      ],
    },
    bottomCta: {
      headline: "Ready to find where your recruiters are losing time?",
      body: "Book a free intro call. We’ll look at your current process and identify one workflow where Philoo Recruit can help reduce manual work.",
      button: "Book a free intro call",
    },
  },
} satisfies Record<Language, SiteCopy>;
