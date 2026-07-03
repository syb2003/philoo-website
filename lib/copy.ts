import type { Language } from "./i18n";

export type SectionId = "home" | "voorbeelden" | "werkwijze" | "voor-wie" | "pricing" | "services" | "contact";

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
      body: "We verbeteren workflows rond planning, opvolging, ATS/CRM-updates en kandidaat-/klantcoordinatie, binnen de tools die je team al gebruikt.",
      credibility: "Live in weken. Al actief bij 5+ recruitmentbureaus.",
      cta: "Plan een gratis kennismaking",
      visualAria: "Workflowvisualisatie met AI by Philoo in het midden",
      workflow: [
        "Nieuwe aanvraag",
        "Afspraak ingepland",
        "Document opgesteld",
        "CRM bijgewerkt",
        "Opvolging ingesteld",
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
  title: "Meer tijd voor conversa",
  body: "Laat recruiters meer tijd besteden aan kandidaten en klanten spreken.",
},
      {
  title: "Meer controle",
  body: "Zie wat openstaat, vertraagd is, afgerond is en aandacht nodig heeft.",
},
    ],
    examples: {
  title: "Waar Philoo Recruit bij kan helpen",
  link: "Bespreek jouw recruitmentproces →",
  cards: [
  {
  eyebrow: "Interviewplanning",
  title: "Van heen-en-weer mailen naar duidelijke planning.",
  body: "Planning, reminders en statusupdates worden klaargezet, zodat recruiters minder tijd verliezen aan coordinatie.",
},
{
  eyebrow: "ATS/CRM-updates",
  title: "Van vergeten notities naar schonere data.",
  body: "Philoo Recruit helpt records bijwerken, opvolging voorbereiden en openstaande acties zichtbaar houden.",
},
{
  eyebrow: "Kandidaat- en klantopvolging",
  title: "Van losse reminders naar duidelijke next steps.",
  body: "Opvolging wordt gestructureerd met nudges, taken en updates voor recruiters om te controleren.",
},
{
  eyebrow: "Matching- en shortlistsupport",
  title: "Van klantaanvraag naar eerste shortlist.",
  body: "Philoo Recruit kan criteria structureren, de database checken en kandidatenlijsten voorbereiden met recruiter approval.",
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
  body: "We kiezen één workflow en bepalen wat automatisch kan, en waar recruiters in controle blijven.",
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
        "Recruitmentbureaus die minder handwerk willen.",
        "Teams die willen dat recruiters meer tijd besteden aan kandidaten en klanten.",
        "Bureaus die tijd en kosten willen besparen zonder nieuwe tool, nieuw platform of groot IT-project.",
        "Ondernemers die klein willen starten met één praktische workflow en daarna verder willen uitbreiden.",
      ],
    },
    testimonial: {
      quote:
        "Philoo bracht de automatisering en operationele structuur die we misten. Ze begrepen snel hoe ons team werkte en bouwden betrouwbare automatiseringen in onder andere Notion, HubSpot, Google Sheets, Slack en Airtable. Ideeën werden snel vertaald naar werkende systemen. De communicatie was helder en de oplossingen waren stabiel, schaalbaar en direct bruikbaar. Philoo voelde als een echte partne en niet als alleen een uitvoerder.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 met vijf gouden sterren",
    },
    pricing: {
  label: "Probleem",
  title: "De verborgen kosten van handmatig recruitmentwerk",
  intro:
    "Interviewplanning kan tot 35% van recruitertijd kosten. ATS/CRM-administratie kan rond de 8 uur per week kosten. Dat zou de meeste recruitmentondernemers wakker moeten schudden.",
  secondParagraph:
    "Elk uur dat opgaat aan feedback najagen, records bijwerken of interviews coordineren, is een uur dat niet naar kandidaten spreken, klanten adviseren of vacatures vooruitbrengen gaat.",
  subtitle: "Voorbeeldberekening",
  exampleLabel: "Voorbeeld: handmatige recruitmentadministratie",
  calculationIntro:
    "Eén recruiter die 8 uur per week verliest aan ATS/CRM-admin betekent:",
  impactLines: [
    "32 uur per maand",
    "384 uur per jaar",
    "Meer dan €15.000 aan tijdwaarde per recruiter per jaar",
  ],
  finalLine:
    "En dan tellen we de kosten van fouten nog niet mee, zoals gemiste opvolging, verouderde kandidaatstatussen, vergeten klantfeedback, incomplete notities, dubbele invoer, verkeerde beschikbaarheidsinformatie of kandidaten die te laat worden benaderd.",
},
    services: {
      title: "Andere manieren waarop we recruitmentteams helpen",
      intro:
        "Naast procesautomatisering helpt Philoo Recruit recruitmentteams ook praktisch starten met AI in hun dagelijkse werk.",
      cards: [
        {
          title: "Recruitment proces scan",
          body: "We brengen in kaart waar je team tijd verliest en bepalen de beste eerste workflow om te verbeteren.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-training voor recruiters",
          body: "Praktische training voor recruiters om AI veilig te gebruiken in dagelijks werk, zonder het oordeel van recruiters te vervangen.",
          price: "Prijs op aanvraag",
        },
        {
          title: "Recruitment tooling op maat",
          body: "Een gerichte workflow rond jullie recruitmentproces, tools en bottlenecks.",
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
  body: "We improve workflows around scheduling, follow-up, ATS updates and candidate/client coordination, inside the tools your team already uses.",
  credibility: "Built in weeks. Trusted by 5+ recruitment agencies."
  cta: "Book a free intro call",
      visualAria: "Workflow visual with AI by Philoo in the center",
      workflow: [
        "New request",
        "Appointment scheduled",
        "Document prepared",
        "CRM updated",
        "Follow-up scheduled",
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
        title: "More control",
        body: "See what is open, delayed, completed and needs attention.",
      },
    ],
    examples: {
  title: "Where Philoo Recruit can help",
  link: "Discuss your recruitment workflow →",
  cards: [
 {
  eyebrow: "Interview scheduling",
  title: "From back-and-forth emails to clear scheduling flows.",
  body: "Scheduling, reminders and status updates are prepared so recruiters lose less time on coordination.",
},
{
  eyebrow: "ATS/CRM updates",
  title: "From notes to clean data.",
  body: "Philoo Recruit helps update records, prepare follow-up and keep open actions visible.",
},
{
  eyebrow: "Candidate and client follow-up",
  title: "From reminders to structured next steps.",
  body: "Follow-up is structured with nudges, tasks and updates for recruiters to review.",
},
{
  eyebrow: "Matching and shortlist support",
  title: "From client request to first shortlist.",
body: "Philoo Recruit can structure criteria, check the database and prepare candidate lists with recruiter approval.",
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
    "Interview scheduling alone can take up to 35% of recruiter time. ATS/CRM administration can cost around 8 hours per week. That should scare most recruitment agency owners.",
  secondParagraph:
    "Every hour spent chasing feedback, updating records or coordinating interviews is an hour not spent speaking with candidates, advising clients or moving vacancies forward.",
  subtitle: "Example calculation",
  exampleLabel: "Example: manual recruitment admin",
  calculationIntro:
    "One recruiter losing 8 hours per week to ATS/CRM admin means:",
  impactLines: [
    "32 hours per month",
    "384 hours per year",
    "Over €15,000 in time value per recruiter per year",
  ],
  finalLine:
    "And that does not include the cost of mistakes, such as missed follow-ups, outdated candidate statuses, forgotten client feedback, incomplete notes, duplicate data entry, wrong availability information, or candidates being contacted too late.",
},
    services: {
  title: "Other ways we can help recruitment teams",
  intro:
    "Besides workflow automation, Philoo Recruit can help recruitment teams start practically with AI in their daily work.",
  cards: [
    {
      title: "Recruitment workflow scan",
      body:
        "We map where your team loses time and identify the best first workflow to improve.",
      price: "Price on request",
    },
    {
      title: "Recruiter AI training",
      body:
        "Practical training for recruiters on how to use AI safely in daily work, without replacing recruiter judgment.",
      price: "Price on request",
    },
    {
      title: "Custom workflow build",
      body:
        "A focused workflow around your agency’s process, tools and bottlenecks.",
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
