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
    primarySubtext: string;
    secondaryLabel: string;
    secondaryPrice: string;
    secondarySubtext: string;
    description: string;
    roiLabel: string;
    roiIntro: string;
    roiLines: string[];
    finalNote: string;
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
          eyebrow: "Betalingen bewaken",
          title: "Van openstaande factuur naar nette reminder.",
          body: "Openstaande betalingen herkennen, status controleren en automatisch een vriendelijke reminder klaarzetten.",
        },
        {
          eyebrow: "Facturen verwerken",
          title: "Van factuur naar controle, verwerking en boeking.",
          body: "Factuurgegevens uitlezen, matchen met klant of project en klaarzetten voor verwerking.",
        },
        {
          eyebrow: "Offertes opvolgen",
          title: "Van verzonden offerte naar slimme follow-up.",
          body: "Bijhouden welke offertes openstaan en automatisch een opvolgmail of taak klaarzetten.",
        },
        {
          eyebrow: "Klantvragen behandelen",
          title: "Van klantvraag naar samenvatting, actie en conceptantwoord.",
          body: "Binnenkomende mails of formulieren samenvatten, prioriteit bepalen en een conceptantwoord klaarzetten.",
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
      primaryLabel: "Eerste automatisering",
      primaryPrice: "€4.995 excl. btw",
      primarySubtext: "Voor één concrete workflow.",
      secondaryLabel: "Vanaf automatisering 2",
      secondaryPrice: "vanaf €5.995 excl. btw",
      secondarySubtext: "Voor een nieuwe volledige workflow bij dezelfde klant.",
      description:
        "Inclusief intake, ontwerp, bouw, test, overdracht, documentatie en 1 maand support voor optimalisatie en kleine aanpassingen.",
      roiLabel: "Voorbeeldberekening",
      roiIntro: "Bij een investering van €4.995 is de terugverdientijd ongeveer 13 maanden.",
      roiLines: [
        "10 uur minder handmatig werk per maand",
        "× €50 waarde per uur",
        "× 12 maanden",
        "= €6.000 waarde per jaar",
        "− €1.200 geschatte AI-toolkosten per jaar",
        "= €4.800 netto waarde per jaar",
      ],
      finalNote:
        "De waarde zit niet alleen in lagere kosten. De vrijgekomen tijd gaat terug naar klanten, opvolging en werk dat omzet oplevert.",
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
          eyebrow: "Payment reminders",
          title: "From overdue invoice to friendly reminder.",
          body: "Detect open payments, check status and prepare a clear reminder automatically.",
        },
        {
          eyebrow: "Invoice processing",
          title: "From invoice to check, processing and booking.",
          body: "Read invoice data, match it with a client or project and prepare it for processing.",
        },
        {
          eyebrow: "Quote follow-up",
          title: "From sent quote to smart follow-up.",
          body: "Track open quotes and automatically prepare a follow-up email or task.",
        },
        {
          eyebrow: "Customer request handling",
          title: "From customer request to summary, action and draft reply.",
          body: "Summarise incoming emails or forms, determine priority and prepare a draft response.",
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
      primaryLabel: "First automation",
      primaryPrice: "€4,995 excl. VAT",
      primarySubtext: "For one concrete workflow.",
      secondaryLabel: "From automation 2",
      secondaryPrice: "from €5,995 excl. VAT",
      secondarySubtext: "For a new full workflow with the same client.",
      description:
        "Including intake, design, build, testing, handover, documentation and 1 month of support for optimisation and small adjustments.",
      roiLabel: "Example calculation",
      roiIntro: "With an investment of €4,995, the payback period is around 13 months.",
      roiLines: [
        "10 hours less manual work per month",
        "× €50 value per hour",
        "× 12 months",
        "= €6,000 value per year",
        "− €1,200 estimated AI tool costs per year",
        "= €4,800 net value per year",
      ],
      finalNote:
        "The value is not only in lower costs. The freed-up time goes back to clients, follow-up and work that drives revenue.",
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
