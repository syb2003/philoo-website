import type { Language } from "./i18n";

export type SectionId =
  | "home"
  | "voorbeelden"
  | "case-study"
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
    guideLink?: {
      label: string;
      href: string;
    };
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
  clientCase: {
    eyebrow: string;
    clientLabel: string;
    title: string;
    intro: string;
    beforeAfter: {
      before: {
        title: string;
        items: string[];
        outcome: string;
      };
      after: {
        title: string;
        items: string[];
        outcome: string;
      };
    };
    shortlistReadyText: string;
    emailPreview: {
      ariaLabel: string;
      columns: {
        from: string;
        subject: string;
        time: string;
      };
      preparedEmail: {
        sender: string;
        subject: string;
        preview: string;
        time: string;
      };
      requestEmail: {
        sender: string;
        subject: string;
        preview: string;
        time: string;
      };
    };
    resultsTitle: string;
    metrics: Array<{
      label?: string;
      value: string;
      supportingText?: string;
    }>;
    testimonialHeader: {
      eyebrow: string;
      title: string;
    };
    quote: string;
    attribution: string;
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
        { id: "case-study", label: "Klantverhaal" },
        { id: "werkwijze", label: "Werkwijze" },
        { id: "voor-wie", label: "Voor wie" },
        { id: "services", label: "Overige diensten" },
        { id: "contact", label: "Contact" },
      ],
      guideLink: {
        label: "Gids: meer plaatsingen?",
        href: "/meer-plaatsingen-met-hetzelfde-team",
      },
      cta: "Plan een gratis kennismaking",
      menu: "Menu openen",
      close: "Menu sluiten",
      language: "Taal wisselen",
    },
    hero: {
      headline: ["Minder administratie.", "Meer plaatsingen."],
      lead: "Philoo Recruit helpt recruitmentbureaus aan meer plaatsingen in minder tijd door handmatig werk te automatiseren.",
      body: "AI neemt het operationale werk over zodat recruiters meer tijd hebben voor kandidaten en klanten.",
      credibility: "Live in weken. Tijdelijk geen setup kosten. Vast maandelijks tariefief.",
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
    clientCase: {
      eyebrow: "Klantverhaal",
      clientLabel: "Recruitmentbureau uit Groningen",
      title: "Van vacatureaanvraag naar een onderbouwde voorselectie",
      intro: "Wat we in 3 weken bij deze klant hebben ingericht:",
      beforeAfter: {
        before: {
          title: "Voorheen: handmatig uitzoeken",
          items: [
            "Vacatureaanvraag lezen en eisen overnemen",
            "CRM en LinkedIn doorzoeken",
            "Kandidaten vergelijken en toelichten",
          ],
          outcome: "Circa 5 uur handmatig werk per vacature",
        },
        after: {
          title: "Nu live: voorbereiding staat klaar",
          items: [
            "Criteria automatisch vastgelegd",
            "CRM én externe bronnen doorzocht",
            "Eerste voorselectie met onderbouwing klaargezet",
          ],
          outcome: "0 uur handmatige voorbereiding",
        },
      },
      shortlistReadyText: "De voorselectie staat klaar. De recruiter beslist wie naar de klant gaat.",
      emailPreview: {
        ariaLabel: "Voorbeeld van een inbox met een voorbereide voorselectie",
        columns: {
          from: "Van",
          subject: "Onderwerp",
          time: "Tijd",
        },
        preparedEmail: {
          sender: "Philoo",
          subject: "Voorselectie: Business Intelligence Analyst",
          preview: "Hi, de voorselectie voor Business Intelligence Analyst is klaar.",
          time: "06:10",
        },
        requestEmail: {
          sender: "S J",
          subject: "Vacature Business Intelligence Analyst",
          preview: "Hi, kunnen jullie iemand op korte termijn voorstellen voor deze rol?",
          time: "06:09",
        },
      },
      resultsTitle: "Wat levert het op?",
      metrics: [
        {
          label: "Tijdwinst",
          value: "± 5 uur",
          supportingText: "Minder voorbereiding per aanvraag",
        },
        {
          label: "Uitkomst",
          value: "125 × 5 uur × €35",
          supportingText: "Op basis van 125 vacatures per jaar met een intern tarief van €35 per recruiteruur",
        },
        {
          label: "Effect per jaar",
          value: "€21.875",
          supportingText:
            "Berekende bruto waarde van capaciteit, waarbij de vrijgekomen tijd kan worden besteed aan kandidaten en klanten",
        },
      ],
      testimonialHeader: {
        eyebrow: "Klant aan het woord",
        title: "Wat dit recruitmentbureau zegt",
      },
      quote:
        "Philoo hielp ons om ons matchingproces veel slimmer in te richten. Het vinden van goede kandidaten kost nu minder tijd, waardoor we sneller kunnen schakelen en meer plaatsingen per recruiter aankunnen.",
      attribution: "Recruitmentbureau uit Groningen",
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
        { id: "case-study", label: "Case study" },
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
      credibility: "Live in weeks. Temporarily no setup fee. Fixed monthly price.",
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
    clientCase: {
      eyebrow: "Case study",
      clientLabel: "Recruitment agency in Groningen",
      title: "From job request to a well-supported shortlist",
      intro: "What we set up for this client in 3 weeks:",
      beforeAfter: {
        before: {
          title: "Before: manual research",
          items: [
            "Read the job request and extract the requirements",
            "Search the CRM and LinkedIn",
            "Compare candidates and write the rationale",
          ],
          outcome: "Around 5 hours of manual work per vacancy",
        },
        after: {
          title: "Now live: preparation ready",
          items: [
            "Requirements captured automatically",
            "CRM and external sources searched",
            "Candidate selection prepared with clear reasoning",
          ],
          outcome: "0 hours of manual preparation",
        },
      },
      shortlistReadyText: "The selection is ready. The recruiter decides who is presented to the client.",
      emailPreview: {
        ariaLabel: "Example inbox with a prepared candidate selection",
        columns: {
          from: "From",
          subject: "Subject",
          time: "Time",
        },
        preparedEmail: {
          sender: "Philoo",
          subject: "Shortlist: Business Intelligence Analyst",
          preview: "Hi, the candidate shortlist for the Business Intelligence Analyst role is ready.",
          time: "06:10",
        },
        requestEmail: {
          sender: "S J",
          subject: "Business Intelligence Analyst vacancy",
          preview: "Hi, can you introduce someone for this role at short notice?",
          time: "06:09",
        },
      },
      resultsTitle: "What does this deliver?",
      metrics: [
        {
          label: "Time saved",
          value: "± 5 hours",
          supportingText: "Less preparation per request",
        },
        {
          label: "Outcome",
          value: "125 × 5 hours × €35",
          supportingText: "Based on 125 vacancies per year and an internal hourly rate of €35 per recruiter",
        },
        {
          label: "Annual impact",
          value: "€21,875",
          supportingText: "Estimated gross value of released capacity that can be spent on candidates and clients",
        },
      ],
      testimonialHeader: {
        eyebrow: "Client perspective",
        title: "What this recruitment agency says",
      },
      quote:
        "Philoo helped us redesign our matching process so it works far more efficiently. Finding strong candidates now takes less time, helping us move faster and handle more placements per recruiter.",
      attribution: "Recruitment agency in Groningen",
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
