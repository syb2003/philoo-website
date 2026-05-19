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
      title: "Philoo | Minder admin. Meer tijd voor wat telt.",
      description:
        "Philoo bouwt efficiënte AI automatiseringen in de systemen waar je team al mee werkt, zodat teams minder handmatig werk doen en meer tijd overhouden voor wat telt.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "pricing", label: "Waarom" },
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
      headline: ["Minder admin.", "Meer tijd voor wat telt."],
      lead: "Praktisch starten met AI en automatisering.",
      body: "Philoo helpt mkb-dienstverleners om handmatige processen te automatiseren. Klaar in enkele weken, binnen de systemen die jullie nu al gebruiken.",
      credibility: "20+ jaar ervaring in tech, data, AI en procesverbetering.",
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
  title: "Overzicht houden",
  body: "Zie wat openstaat, klaar is en opvolging nodig heeft.",
},
      {
  title: "Tijd voor wat telt",
  body: "Minder admin geeft ruimte voor klanten, opvolging en groei.",
},
    ],
    examples: {
  title: "Voorbeelden waar Philoo kan helpen",
  link: "Bespreek jouw proces →",
  cards: [
    {
  eyebrow: "Klantaanvragen & intake",
  title: "Van eerste contact naar duidelijke vervolgstap.",
  body: "Berichten uit mail, formulier, WhatsApp of andere kanalen worden samengevat, gekoppeld aan klantinformatie en klaargezet als taak, conceptreactie of interne update.",
},
   {
  eyebrow: "Contracten & documenten",
  title: "Van ontbrekende informatie naar klaar voor akkoord.",
  body: "Documenten, klantinput en concepten worden samengebracht, gecontroleerd en klaargezet voordat ondertekening blijft hangen.",
},
    {
  eyebrow: "Support & klantvragen",
  title: "Van verspreide vragen naar duidelijke opvolging.",
  body: "Vragen uit mail, formulier, WhatsApp of andere kanalen worden samengevat, beoordeeld op spoed en naar de juiste persoon gestuurd.",
},
    {
  eyebrow: "Facturen & betalingen",
  title: "Van factuur naar nette opvolging.",
  body: "Facturen worden gecontroleerd, betaalstatussen worden gevolgd en reminders worden klaargezet voordat betalingen blijven liggen.",
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
      label: "Probleem",
      title: "De verborgen kosten van handmatig werk",
      intro:
        "Sommige taken lijken niet veel werk: Een factuur controleren. Een betaalstatus checken. Een reminder klaarzetten.",
      secondParagraph:
        "Maar als dit elke dag nodig is, kost het ongemerkt veel tijd.",
      subtitle: "Voorbeeldberekening",
      exampleLabel: "Voorbeeld: facturen en betalingen opvolgen",
      calculationIntro:
        "Is iemand hier gemiddeld één uur per werkdag mee bezig? Dan kost dat al snel:",
      impactLines: [
        "22 uur per maand",
        "€1.100 aan tijdswaarde per maand",
        "€13.200 per jaar",
      ],
      finalLine:
        "En dan rekenen we gemiste opvolging, fouten en extra zoekwerk nog niet eens mee.",
      disclaimer: "De exacte waarde hangt af van volume, proces en huidige werkwijze.",
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
  body:
    "We verbeteren de vindbaarheid van je bedrijf in AI-zoekmachines, zodat ze beter begrijpen wat je doet en wanneer ze je kunnen noemen.",
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
      title: "Philoo | Less admin. More time for what matters.",
      description:
        "Philoo builds smart AI workflows inside the tools your team already uses, helping teams reduce manual work and spend more time with clients.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "pricing", label: "Impact" },
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
  headline: ["Less admin.", "More time for what matters."],
  lead: "A practical way to start with AI and automation.",
  body: "Philoo helps SMBs automate time-consuming processes inside the systems they already use. Built in weeks, not months.",
  credibility: "20+ years of experience in tech, data, AI and process improvement.",
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
  link: "Discuss your process →",
  cards: [
    {
  eyebrow: "Client inquiries & intake",
  title: "From first contact to clear next step.",
  body: "Messages from email, forms, WhatsApp or other channels are summarised, linked to customer details and prepared as a task, draft reply or internal update.",
},
{
  eyebrow: "Contracts & documents",
  title: "From scattered input to ready for approval.",
  body: "Documents, customer input and drafts are brought together, checked for missing details and prepared for approval, signing or handover.",
},
{
  eyebrow: "Support & customer questions",
  title: "From scattered questions to clear owner.",
  body: "Questions from email, forms, WhatsApp or other channels are summarised, prioritised and routed to the right person.",
},
{
  eyebrow: "Invoices & payments",
  title: "From unpaid invoice to clear follow-up.",
  body: "Open invoices are tracked, issues are flagged and reminders are prepared before payments are forgotten.",
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
    "SMBs that want less manual work.",
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
      label: "Problem",
      title: "The hidden cost of manual work",
      intro:
        "Checking an invoice may seem like a small task. So does checking payment status or preparing a reminder.",
      secondParagraph:
        "But when these tasks come back every day, the cost adds up quickly.",
      subtitle: "Example calculation",
      exampleLabel: "Example: invoice and payment follow-up",
      calculationIntro:
        "One hour per working day may not sound like much. But it already means:",
      impactLines: [
        "22 hours per month",
        "€1,100 in time value per month",
        "€13,200 per year",
      ],
      finalLine:
        "And this does not yet include missed follow-up, mistakes or extra searching.",
      disclaimer: "The exact value depends on volume, process and current way of working.",
    },
    services: {
  title: "Other services",
  intro:
    "Besides process automation, Philoo can also help in other practical ways with AI.",
  cards: [
    {
      title: "AI training",
      body:
        "No slide deck full of theory. Your team learns how to improve its own daily time-consuming processes with AI.",
      price: "Price on request",
    },
    {
      title: "AI workshop",
      body:
        "A fun, guided team session where small groups come up with AI ideas for the company.",
      price: "Price on request",
    },
    {
      title: "AI tooling advice",
      body:
        "Thinking about AI tools, but not sure which ones to use? We help you choose, set them up and make sure your team actually benefits from them.",
      price: "Price on request",
    },
    {
      title: "AI visibility",
      body:
        "We improve your company’s visibility in AI search tools, so more potential customers can find you.",
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
