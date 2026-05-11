import type { Language } from "./i18n";

export type SectionId = "voorbeelden" | "werkwijze" | "voor-wie" | "contact";

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
    body: string;
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
  bottomCta: {
    headline: string;
    body: string;
    button: string;
  };
};

export const siteCopy = {
  nl: {
    metadata: {
      title: "Philoo | Minder admin. Meer tijd voor klanten.",
      description:
        "Philoo bouwt slimme AI-workflows in de tools die je team al kent, zodat teams minder handmatig werk doen en meer tijd overhouden voor klanten.",
    },
    nav: {
      items: [
        { id: "voorbeelden", label: "Voorbeelden" },
        { id: "werkwijze", label: "Werkwijze" },
        { id: "voor-wie", label: "Voor wie" },
        { id: "contact", label: "Contact" },
      ],
      cta: "Plan een gratis kennismaking",
      menu: "Menu openen",
      close: "Menu sluiten",
      language: "Taal wisselen",
    },
    hero: {
      headline: ["Minder admin.", "Meer tijd voor klanten."],
      body: "AI hoeft niet duur of ingewikkeld te zijn. Met Philoo heb je binnen weken een slimme workflow gemaakt in de tools die je team al kent.",
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
        body: "Automatiseer repetitieve en foutgevoelige taken.",
      },
      {
        title: "Sneller schakelen",
        body: "Acties op het juiste moment, automatisch.",
      },
      {
        title: "Meer overzicht",
        body: "Realtime inzicht in acties, statussen en voortgang.",
      },
      {
        title: "Meer tijd voor klanten",
        body: "Minder admin betekent meer aandacht voor wat telt.",
      },
    ],
    examples: {
      title: "Voorbeelden waar Philoo kan helpen",
      link: "Bespreek jouw workflow →",
      cards: [
        {
          eyebrow: "Recruitment",
          title: "Van aanvraag naar shortlist",
          body: "Vacature herkennen, kandidaten ophalen en een shortlist of vervolgvraag klaarzetten.",
        },
        {
          eyebrow: "Finance",
          title: "Van factuur naar opvolging",
          body: "Factuurgegevens herkennen, matchen met klant of project en betaalstatus bijwerken.",
        },
        {
          eyebrow: "Legal",
          title: "Van opdracht naar contract",
          body: "Opdrachtinformatie verzamelen, conceptdocument voorbereiden en revisies bewaken.",
        },
        {
          eyebrow: "Een andere sector?",
          title: "Ook binnen jouw sector kan Philoo vaak snel waarde leveren.",
          body: "Start met één concreet proces.",
        },
      ],
    },
    process: {
      title: "Hoe we werken",
      steps: [
        {
          number: "1",
          title: "Begrijpen",
          body: "We leren jullie proces en tools kennen en bepalen de grootste winstpunten.",
        },
        {
          number: "2",
          title: "Ontwerpen",
          body: "We ontwerpen een slimme automatisering die aansluit op jullie werkwijze.",
        },
        {
          number: "3",
          title: "Implementeren",
          body: "Snel en beheerst live, met aandacht voor adoptie en veiligheid.",
        },
        {
          number: "4",
          title: "Optimaliseren",
          body: "We blijven verbeteren en schalen bij als jullie organisatie meegroeit.",
        },
      ],
    },
    audience: {
      title: "Voor wie dit is",
      bullets: [
        "Teams die minder handmatig werk willen.",
        "Organisaties die meer grip op processen zoeken.",
        "Bureaus die meer tijd voor klanten willen.",
      ],
    },
    testimonial: {
      quote:
        "Philoo bracht de automatisering en operationele structuur die we misten. Ze begrepen snel hoe ons team werkte en bouwden betrouwbare automatiseringen in onder andere Notion, HubSpot, Google Sheets, Slack en Airtable. Ideeën werden snel vertaald naar werkende systemen. De communicatie was helder en de oplossingen waren stabiel, schaalbaar en direct bruikbaar. Philoo voelde als een echte partner, niet alleen als uitvoerder.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 met vijf gouden sterren",
    },
    bottomCta: {
      headline: "Benieuwd waar in jullie proces winst te behalen valt?",
      body: "We denken graag met jullie mee. Plan een vrijblijvend kennismakingsgesprek of stuur ons een mail.",
      button: "hello@philoo.nl",
    },
  },
  en: {
    metadata: {
      title: "Philoo | Less admin. More time for clients.",
      description:
        "Philoo builds smart AI workflows inside the tools your team already uses, helping teams reduce manual work and spend more time with clients.",
    },
    nav: {
      items: [
        { id: "voorbeelden", label: "Examples" },
        { id: "werkwijze", label: "How it works" },
        { id: "voor-wie", label: "Who it’s for" },
        { id: "contact", label: "Contact" },
      ],
      cta: "Book a free intro call",
      menu: "Open menu",
      close: "Close menu",
      language: "Switch language",
    },
    hero: {
      headline: ["Less admin.", "More time for clients."],
      body: "AI does not have to be expensive or complicated. With Philoo, you can have a smart workflow built inside the tools your team already uses within weeks.",
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
        body: "Automate repetitive and error-prone tasks.",
      },
      {
        title: "Move faster",
        body: "Actions at the right moment, automatically.",
      },
      {
        title: "More overview",
        body: "Realtime visibility into actions, statuses and progress.",
      },
      {
        title: "More time for clients",
        body: "Less admin means more attention for what matters.",
      },
    ],
    examples: {
      title: "Examples where Philoo can help",
      link: "Discuss your workflow →",
      cards: [
        {
          eyebrow: "Recruitment",
          title: "From request to shortlist",
          body: "Recognise the vacancy, retrieve candidates and prepare a shortlist or follow-up question.",
        },
        {
          eyebrow: "Finance",
          title: "From invoice to follow-up",
          body: "Read invoice data, match it with a client or project and update payment status.",
        },
        {
          eyebrow: "Legal",
          title: "From assignment to contract",
          body: "Collect assignment details, prepare draft documents and track revisions.",
        },
        {
          eyebrow: "Another sector?",
          title: "Philoo can often create value quickly in your sector too.",
          body: "Start with one concrete process.",
        },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        {
          number: "1",
          title: "Understand",
          body: "We learn your process and tools and identify the biggest opportunities.",
        },
        {
          number: "2",
          title: "Design",
          body: "We design a smart automation that fits your current way of working.",
        },
        {
          number: "3",
          title: "Implement",
          body: "We go live quickly and safely, with attention to adoption and reliability.",
        },
        {
          number: "4",
          title: "Optimise",
          body: "We keep improving and scale as your organisation grows.",
        },
      ],
    },
    audience: {
      title: "Who this is for",
      bullets: [
        "Teams that want less manual work.",
        "Organisations that want more grip on their processes.",
        "Firms that want more time for clients.",
      ],
    },
    testimonial: {
      quote:
        "Philoo delivered the automation and operational structure we were missing. They quickly understood how our team worked and built reliable automations across Notion, HubSpot, Google Sheets, Slack and Airtable. Ideas were translated into working systems fast. Communication was clear, and the solutions were stable, scalable and immediately useful. Philoo felt like a real partner, not just a contractor.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 with five gold stars",
    },
    bottomCta: {
      headline: "Curious where your process can save time?",
      body: "We are happy to think along. Book a free intro call or send us an email.",
      button: "hello@philoo.nl",
    },
  },
} satisfies Record<Language, SiteCopy>;
