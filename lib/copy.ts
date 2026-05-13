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
        "Philoo bouwt slimme AI-workflows in de tools die je team al kent, zodat teams minder handmatig werk doen en meer tijd overhouden voor klanten.",
    },
    nav: {
      items: [
        { id: "home", label: "Home" },
        { id: "voorbeelden", label: "Voorbeelden" },
        { id: "werkwijze", label: "Werkwijze" },
        { id: "voor-wie", label: "Voor wie" },
        { id: "pricing", label: "Pricing" },
        { id: "services", label: "Overige diensten" },
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
          body: "Bijhouden welke offertes nog openstaan en automatisch een vriendelijke opvolgmail of taak klaarzetten.",
        },
        {
          eyebrow: "Betalingen bewaken",
          title: "Van openstaande factuur naar vriendelijke reminder.",
          body: "Openstaande betalingen herkennen, status controleren en een nette reminder klaarzetten.",
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
    pricing: {
      title: "Pricing",
      subtitle: "Per automatisering",
      primaryLabel: "Workflow",
      primaryPrice: "vanaf €4.995 excl. btw",
      primaryDescription: "Voor één volledige automatisering binnen bestaande tools.",
      includedLine:
        "Inclusief intake, ontwerp, bouw, test, overdracht, documentatie en 1 maand support voor aftercare, optimalisatie en kleine aanpassingen.",
      secondaryLabel: "Uitbreiding bestaande workflow",
      secondaryPrice: "vanaf €750 excl. btw",
      secondaryDescription:
        "Voor een extra stap, check, reminder, mail, koppeling of kleine uitbreiding binnen een bestaande workflow.",
      smallNote: "Tooling en gebruikskosten lopen via de eigen accounts van de klant.",
      roiLabel: "Voorbeeldberekening",
      exampleTitle: "Voorbeeld: klantvragen sneller behandelen",
      exampleDescription:
        "Binnenkomende klantvragen worden automatisch samengevat en klaargezet met een conceptantwoord of vervolgstap.",
      paybackLine: "Terugverdientijd: ongeveer 7 maanden",
      roiLines: [
        "20 uur minder handmatig werk per maand",
        "× €40 waarde per uur",
        "= €800 waarde per maand",
        "− €100 tool- en gebruikskosten per maand",
        "= €700 netto waarde per maand",
      ],
      finalNote: "",
      disclaimer: "Gebaseerd op een investering van €4.995. De exacte besparing hangt af van volume, proces en huidige werkwijze.",
    },
    services: {
      title: "Overige diensten",
      intro:
        "Naast workflow-automatisering helpt Philoo mkb-dienstverleners ook met praktische AI-training, tooling en vindbaarheid.",
      cards: [
        {
          title: "AI-training",
          body: "Praktische sessies waarin teams leren hoe ze AI slim gebruiken in hun dagelijkse werk.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-hackathon",
          body: "Een korte, begeleide sessie om kansrijke AI-use-cases te vinden en direct te testen.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI-tooling implementeren",
          body: "Hulp bij het kiezen, inrichten en toepassen van AI-tools binnen jullie bestaande werkwijze.",
          price: "Prijs op aanvraag",
        },
        {
          title: "AI SEO & vindbaarheid",
          body: "Optimalisatie van websitecontent voor betere vindbaarheid in Google en AI-zoekmachines.",
          price: "Prijs op aanvraag",
        },
      ],
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
          eyebrow: "Customer request handling",
          title: "From full inbox to fast first response.",
          body: "Incoming emails or forms are recognised, summarised and prepared with a draft reply or next step.",
        },
        {
          eyebrow: "Request follow-up",
          title: "From loose request to clear follow-up.",
          body: "New requests are automatically summarised, assigned to the right person and prepared as a task or follow-up email.",
        },
        {
          eyebrow: "Quote follow-up",
          title: "From sent quote to polite follow-up.",
          body: "Track which quotes are still open and automatically prepare a friendly follow-up email or task.",
        },
        {
          eyebrow: "Payment reminders",
          title: "From overdue invoice to friendly reminder.",
          body: "Detect open payments, check status and prepare a clear reminder.",
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
    pricing: {
      title: "Pricing",
      subtitle: "Per automation",
      primaryLabel: "Workflow",
      primaryPrice: "from €4,995 excl. VAT",
      primaryDescription: "For one complete automation inside your existing tools.",
      includedLine:
        "Includes intake, design, build, testing, handover, documentation and 1 month of support for aftercare, optimisation and small adjustments.",
      secondaryLabel: "Extension of existing workflow",
      secondaryPrice: "from €750 excl. VAT",
      secondaryDescription:
        "For an extra step, check, reminder, email, integration or small extension inside an existing workflow.",
      smallNote: "Tooling and usage costs run through the client’s own accounts.",
      roiLabel: "Example calculation",
      exampleTitle: "Example: handling customer requests faster",
      exampleDescription:
        "Incoming customer requests are automatically summarised and prepared with a draft reply or next step.",
      paybackLine: "Payback period: around 7 months",
      roiLines: [
        "20 hours less manual work per month",
        "× €40 value per hour",
        "= €800 value per month",
        "− €100 tool and usage costs per month",
        "= €700 net value per month",
      ],
      finalNote: "",
      disclaimer: "Based on an investment of €4,995. The exact saving depends on volume, process and current way of working.",
    },
    services: {
      title: "Other services",
      intro:
        "Besides workflow automation, Philoo also helps service SMBs with practical AI training, tooling and visibility.",
      cards: [
        {
          title: "AI training",
          body: "Practical sessions that help teams use AI effectively in their daily work.",
          price: "Price on request",
        },
        {
          title: "AI hackathon",
          body: "A short, guided session to identify promising AI use cases and test them quickly.",
          price: "Price on request",
        },
        {
          title: "AI tooling implementation",
          body: "Support with choosing, setting up and applying AI tools inside your existing way of working.",
          price: "Price on request",
        },
        {
          title: "AI SEO & visibility",
          body: "Optimising website content for better visibility in Google and AI search engines.",
          price: "Price on request",
        },
      ],
    },
    bottomCta: {
      headline: "Curious where your process can save time?",
      body: "We are happy to think along. Book a free intro call or send us an email.",
      button: "hello@philoo.nl",
    },
  },
} satisfies Record<Language, SiteCopy>;
