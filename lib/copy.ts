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
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryPrice: string;
    primaryDescription: string;
    includedLine: string;
    secondaryLabel: string;
    secondaryPrice: string;
    secondaryDescription: string;
    smallNote: string;
    roiLabel: string;
    exampleTitle: string;
    exampleDescription: string;
    paybackLine: string;
    roiLines: string[];
    finalNote: string;
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
      title: "Philoo | Minder admin. Meer tijd voor klanten.",
      description:
        "Philoo bouwt efficiënte AI automatiseringen in de systemen waar je team al mee werkt, zodat teams minder handmatig werk doen en meer tijd overhouden voor wat telt.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "voorbeelden", label: "Voorbeelden" },
        { id: "werkwijze", label: "Werkwijze" },
        { id: "voor-wie", label: "Voor wie" },
        { id: "pricing", label: "Tarieven" },
        { id: "services", label: "Overige diensten" },
        { id: "contact", label: "Contact" },
      ],
      cta: "Plan een gratis kennismaking",
      menu: "Menu openen",
      close: "Menu sluiten",
      language: "Taal wisselen",
    },
    hero: {
      headline: ["Minder admin.", "Meer tijd voor wat telt."],
      lead: "Praktisch starten met AI en automatisering.",
      body: "Philoo helpt mkb-dienstverleners om tijdrovende processen te automatiseren. Klaar in enkele weken, binnen de systemen die jullie nu al gebruiken.",
      credibility: "20+ jaar ervaring in tech, data, AI en procesverbetering bij internationale bedrijven.",
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
        body: "Minder admin betekent meer aandacht voor klanten.",
      },
    ],
    examples: {
      title: "Voorbeelden waar Philoo kan helpen",
      link: "Bespreek jouw aanvraag →",
      cards: [
        {
          eyebrow: "Klantvragen behandelen",
          title: "Van volle inbox naar snelle eerste reactie.",
          body: "Binnenkomende mails of formulieren worden herkend, samengevat en klaargezet met een conceptantwoord of vervolgstap.",
        },
        {
          eyebrow: "Aanvragen opvolgen",
          title: "Van losse aanvraag naar duidelijke opvolging.",
          body: "Nieuwe aanvragen worden automatisch samengevat, gekoppeld aan de juiste persoon en klaargezet als taak of vervolgmail.",
        },
        {
          eyebrow: "Offertes opvolgen",
          title: "Van verzonden offerte naar nette opvolging.",
          body: "Openstaande offertes worden bijgehouden en klaargezet met een vriendelijke opvolgmail of taak.",
        },
        {
          eyebrow: "Betalingen bewaken",
          title: "Van openstaande factuur naar vriendelijke reminder.",
          body: "Openstaande betalingen worden herkend, gecontroleerd en opgevolgd met een vriendelijke reminder.",
        },
      ],
    },
    process: {
      title: "Hoe we werken",
      steps: [
        {
          number: "1",
          title: "Begrijpen",
          body: "We leren jullie processen kennen en bepalen de grootste winstpunten.",
        },
        {
          number: "2",
          title: "Ontwerpen",
          body: "We kiezen één proces en bepalen wat de automatisering wel en niet doet.",
        },
        {
          number: "3",
          title: "Implementeren",
          body: "We bouwen, testen en zetten de automatisering live in jullie systemen.",
        },
        {
          number: "4",
          title: "Optimaliseren",
          body: "Na livegang kijken we mee, verwerken we feedback en doen we kleine optimalisaties.",
        },
      ],
    },
    audience: {
      title: "Voor wie dit is",
      bullets: [
        "Mkb-dienstverleners die minder handmatig werk willen.",
        "Organisaties die meer overzicht zoeken in hun processen.",
        "Bedrijven die met AI willen starten zonder groot IT-project of groot budget.",
      ],
    },
    testimonial: {
      quote:
        "Philoo bracht de automatisering en operationele structuur die we misten. Ze begrepen snel hoe ons team werkte en bouwden betrouwbare automatiseringen in onder andere Notion, HubSpot, Google Sheets, Slack en Airtable. Ideeën werden snel vertaald naar werkende systemen. De communicatie was helder en de oplossingen waren stabiel, schaalbaar en direct bruikbaar. Philoo voelde als een echte partner, niet alleen als uitvoerder.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 met vijf gouden sterren",
    },
    pricing: {
      title: "prijzen",
      subtitle: "Per automatisering",
      primaryLabel: "Workflow",
      primaryPrice: "vanaf €4.995 excl. btw",
      primaryDescription: "Voor één volledige automatisering binnen bestaande tools.",
      includedLine:
        "Inclusief intake, ontwerp, bouw, test, overdracht, documentatie en 1 maand support voor aftercare, optimalisatie en kleine aanpassingen.",
      secondaryLabel: "Uitbreiding bestaande automatisering",
      secondaryPrice: "vanaf €750 excl. btw",
      secondaryDescription:
        "Voor een extra stap, koppeling of kleine uitbreiding.",
      smallNote: "AI Tooling en gebruikskosten lopen via de eigen accounts van de klant.",
      roiLabel: "Voorbeeldberekening",
      exampleTitle: "Voorbeeld: klantvragen sneller behandelen",
      exampleDescription:
        "Binnenkomende klantvragen worden automatisch samengevat en klaargezet met een conceptantwoord of vervolgstap.",
      paybackLine: "Terugverdientijd: ongeveer 7 maanden",
      roiLines: [
        "20 uur minder handmatig werk per maand",
        "× €40 waarde per uur",
        "= €800 waarde per maand",
        "− €100 AI tool- en gebruikskosten per maand",
        "= €700 netto waarde per maand",
      ],
      finalNote: "",
      disclaimer: "Gebaseerd op een investering van €4.995. De exacte besparing hangt af van volume, proces en huidige werkwijze.",
    },
    services: {
      title: "Overige diensten",
      intro:
        "Naast het automatiseren van processen helpt Philoo ook met praktische AI-training, tooling en vindbaarheid.",
      cards: [
        {
          title: "AI-training",
          body: "Geen PowerPoint-sessie, maar praktisch aan de slag: iedereen leert hoe je een eigen proces efficiënter maakt met AI.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-hackathon",
          body: "Een praktische workshop waarin teams samen AI-oplossingen maken die direct bruikbaar zijn in het bedrijf.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-tooling implementeren",
          body: "Denk je na over AI-tools, maar wil je eerst goed advies? We helpen met kiezen, inrichten en praktisch gebruiken.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-vindbaarheid",
          body: "We verbeteren je content voor AI-zoekmachines zoals ChatGPT, Perplexity en Gemini, zodat je bedrijf beter herkend en genoemd kan worden.",
          price: "Prijs op aanvraag",
        },
      ],
    },
    bottomCta: {
      headline: "Benieuwd waar in jullie bedrijf winst te behalen valt?",
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
        { id: "home", label: "Home" },
        { id: "voorbeelden", label: "Examples" },
        { id: "werkwijze", label: "How it works" },
        { id: "voor-wie", label: "Who it’s for" },
        { id: "pricing", label: "Pricing" },
        { id: "services", label: "Other services" },
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
        body: "Automate tasks that keep coming back.",
      },
      {
        title: "Move faster",
        body: "Instant replies, actions and reminders.",
      },
      {
        title: "More control",
        body: "See what is open, done and still needs attention.",
      },
      {
        title: "Fewer mistakes",
        body: "Reduce manual errors",
      },
    ],
    examples: {
      title: "Examples where Philoo can help",
      link: "Discuss your workflow →",
      cards: [
        {
          eyebrow: "Customer questions",
          title: "From full inbox to fast response.",
          body: "Incoming emails or forms are recognised, summarised and prepared with a draft reply or next step.",
        },
        {
          eyebrow: "New requests",
          title: "From new request to clear next step.",
          body: "New requests are summarised, assigned to the right person and prepared as a task or follow-up email.",
        },
        {
          eyebrow: "Quote follow-up",
          title: "From sent quote to polite follow-up.",
          body: "Open quotes are tracked and prepared with a friendly follow-up email or task.",
        },
        {
          eyebrow: "Payment reminders",
          title: "From overdue invoice to friendly reminder.",
          body: "Open payments are found, checked and followed up with a friendly reminder.",
        },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        {
          number: "1",
          title: "Understand",
          body: "We look at your process, tools and manual tasks.",
        },
        {
          number: "2",
          title: "Design",
          body: "We choose one workflow and define how the automation should look like.",
        },
        {
          number: "3",
          title: "Build",
          body: "We build, test and launch it in your systems.",
        },
        {
          number: "4",
          title: "Improve",
          body: "After launch, we review feedback and make small improvements.",
        },
      ],
    },
   audience: {
  title: "Who this is for",
  bullets: [
    "Service SMBs that want less manual work.",
    "Organisations that need more overview of their processes.",
    "Companies that want to start with AI without a large IT project or budget.",
  ],
},
    testimonial: {
      quote:
        "Philoo delivered the automation and operational structure we were missing. They quickly understood how our team worked and built reliable automations across Notion, HubSpot, Google Sheets, Slack and Airtable. Ideas were translated into working systems fast. Communication was clear, and the solutions were stable, scalable and immediately useful. Philoo felt like a real partner, not just a contractor.",
      attribution: "Owner recruitment agency",
      ratingLabel: "5.0 with five gold stars",
    },
   pricing: {
  title: "Pricing",
  subtitle: "Per automation",

  primaryLabel: "Workflow",
  primaryPrice: "From €4,995 excl. VAT",
  primaryDescription: "One complete automation in your existing tools.",

  includedLine:
    "Includes intake, design, build, testing, handover, documentation and 1 month of support for small improvements.",

  secondaryLabel: "Workflow extension",
  secondaryPrice: "From €750 excl. VAT",
  secondaryDescription:
    "For an extra step, check, reminder, email, integration or small change in an existing workflow.",

  smallNote:
    "Tool and usage costs run through the client’s own accounts.",

  roiLabel: "Example calculation",
  exampleTitle: "Example: faster customer replies",
  exampleDescription:
    "Customer requests are summarised and prepared with a draft reply or next step.",

  roiLines: [
    "20 hours less manual work per month",
    "× €40 value per hour",
    "= €800 value per month",
    "− €100 tool and usage costs per month",
    "= €700 net value per month",
  ],

  paybackLine: "Payback period: around 7 months",

  finalNote: "",
  disclaimer:
    "Based on an investment of €4,995. The exact saving depends on volume, process and current way of working.",
},
    services: {
  title: "Other services",
  intro:
    "Besides process automation, Philoo can also help in other practical ways with AI.",
  cards: [
    {
      title: "AI training",
      body:
        "No slide deck full of theory. Your team learns how to improve one real process with AI.",
      price: "Price on request",
    },
    {
      title: "AI workshop",
      body:
        "A live guided session to find useful AI ideas and test the best ones with your team.",
      price: "Price on request",
    },
    {
      title: "AI tooling advice",
      body:
        "Thinking about AI tools, but not sure what fits? We help you choose, set up and use them well.",
      price: "Price on request",
    },
    {
      title: "AI visibility",
      body:
        "We improve your company’s visibility in AI search tools, so they better understand what you do and when to mention you.",
      price: "Price on request",
    },
  ],
},
    bottomCta: {
      headline: "Ready to find your first automation opportunity?",
      body: "We are happy to think along. Book a free intro call or send us an email.",
      button: "hello@philoo.nl",
    },
  },
} satisfies Record<Language, SiteCopy>;
