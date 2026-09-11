import type { Language } from "@/lib/i18n";

export type ScoutDemoCopy = {
  label: string;
  disclosure: string;
  stageNavigation: string;
  play: string;
  pause: string;
  reducedMotion: string;
  previous: string;
  next: string;
  replay: string;
  stepOf: (current: number, total: number) => string;
  fullExample: string;
  applyFeedback: string;
  feedbackApplied: string;
  inspectProfile: string;
  bookDemo: string;
  memoryNote: string;
  composerPlaceholder: string;
  composerLabel: string;
  stages: readonly {
    nav: string;
    eyebrow: string;
    title: string;
    body: string;
  }[];
  conversation: readonly {
    speaker: "user" | "scout";
    label: string;
    text: string;
  }[];
  directionLabel: string;
  direction: readonly string[];
  refinedDirection: readonly string[];
  initialCandidate: {
    name: string;
    role: string;
    location: string;
    experienceLabel: string;
    experience: readonly string[];
    gapLabel: string;
    gap: string;
  };
  feedbackLabel: string;
  feedback: string;
  updateTitle: string;
  moreLabel: string;
  more: string;
  lessLabel: string;
  less: string;
  refinedCandidate: {
    name: string;
    role: string;
    location: string;
    reasonLabel: string;
    reason: string;
    experienceLabel: string;
    experience: readonly string[];
    evidenceLabel: string;
    evidence: string;
    unknownsLabel: string;
    unknowns: readonly string[];
    nextLabel: string;
    next: string;
  };
  staticFallbackTitle: string;
  home: {
    previewLabel: string;
    messageLabel: string;
    welcome: string;
    welcomeSupport: string;
    composer: string;
    composerLabel: string;
    processLabel: string;
    process: readonly string[];
  };
  faqTitle: string;
  faqIntro: string;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const scoutDemoCopy: Record<Language, ScoutDemoCopy> = {
  nl: {
    label: "Interactieve uitleg",
    disclosure: "Fictieve kandidaatprofielen.",
    stageNavigation: "Stappen in de demo",
    play: "Speel uitleg af",
    pause: "Pauzeer uitleg",
    reducedMotion: "Automatisch afspelen uit",
    previous: "Vorige",
    next: "Volgende",
    replay: "Opnieuw beginnen",
    stepOf: (current, total) => `Stap ${current} van ${total}`,
    fullExample: "Bekijk de volledige uitleg",
    applyFeedback: "Pas feedback toe",
    feedbackApplied: "Feedback toegepast",
    inspectProfile: "Bekijk kandidaat",
    bookDemo: "Plan een demo",
    memoryNote: "Scout neemt je feedback ook mee naar een volgende vacature.",
    composerPlaceholder: "Iemand die zelf nieuwe zakelijke klanten vindt…",
    composerLabel: "Niet-bewerkbaar invoerveld",
    stages: [
      {
        nav: "Vertel wie je zoekt",
        eyebrow: "01 · Start met je vraag",
        title: "Vertel wie je zoekt.",
        body: "Beschrijf wat iemand moet kunnen en wat belangrijk is voor je team.",
      },
      {
        nav: "Bekijk de eerste kandidaten",
        eyebrow: "02 · Bekijk de eerste selectie",
        title: "Bekijk de eerste kandidaten.",
        body: "Bekijk hun ervaring en geef aan wie je zou benaderen.",
      },
      {
        nav: "Geef feedback",
        eyebrow: "03 · Geef gerichte feedback",
        title: "Geef feedback.",
        body: "Vertel wat ontbreekt of te zwaar meeweegt.",
      },
      {
        nav: "Scout zoekt verder",
        eyebrow: "04 · Scout zoekt verder",
        title: "Scout zoekt verder.",
        body: "Scout gebruikt je reacties om verder te zoeken. Jij kiest wie je benadert.",
      },
    ],
    conversation: [
      {
        speaker: "scout",
        label: "Philoo Scout",
        text: "Wie zoek je voor je team?",
      },
    ],
    directionLabel: "Zoekrichting",
    direction: ["B2B-groei", "Zelf verkopen", "Klantmix nog open"],
    refinedDirection: ["Nieuwe klanten", "Zelf klanten zoeken", "Eerste gesprekken voeren"],
    initialCandidate: {
      name: "Kandidaat 01",
      role: "Commercieel manager",
      location: "Regio Utrecht",
      experienceLabel: "Relevante ervaring",
      experience: [
        "Commerciële ervaring met zakelijke klanten.",
        "Verantwoordelijk voor groei bij bestaande klanten.",
      ],
      gapLabel: "Wat nog niet aansluit",
      gap: "De recente rol draait vooral om teammanagement en bestaande klanten.",
    },
    feedbackLabel: "Feedback",
    feedback: "De commerciële ervaring past. We zoeken iemand die vooral zelf nieuwe klanten vindt, niet iemand die vooral een team aanstuurt.",
    updateTitle: "Scout zoekt verder met je feedback",
    moreLabel: "Meer nadruk op",
    more: "Zelf klanten zoeken en de eerste gesprekken voeren.",
    lessLabel: "Minder nadruk op",
    less: "Een team aansturen en bestaande klanten uitbreiden.",
    refinedCandidate: {
      name: "Kandidaat 02",
      role: "Commercieel specialist",
      location: "Regio Rotterdam",
      reasonLabel: "Waarom deze kandidaat in beeld komt",
      reason: "De bekende profielinformatie sluit beter aan op wat je zoekt.",
      experienceLabel: "Relevante ervaring",
      experience: [
        "Vond en benaderde in recente rollen zelf nieuwe zakelijke klanten.",
        "Voerde zelf de eerste commerciële gesprekken.",
      ],
      evidenceLabel: "Relevante ervaring",
      evidence: "De profielinformatie noemt het zelf vinden en benaderen van potentiële klanten.",
      unknownsLabel: "Nog te bespreken",
      unknowns: ["Interesse in deze vacature", "Salarisverwachting", "Beschikbaarheid"],
      nextLabel: "Jij beslist",
      next: "Jij bepaalt of deze kandidaat een gesprek waard is en wie je wilt benaderen.",
    },
    staticFallbackTitle: "Zo werkt Scout zonder animatie",
    home: {
      previewLabel: "Interface-preview",
      messageLabel: "Scout",
      welcome: "Wie zoek je voor je team?",
      welcomeSupport: "Vertel wat deze persoon moet kunnen.",
      composer: "Vertel wie je zoekt…",
      composerLabel: "Niet-bewerkbaar invoerveld",
      processLabel: "Zo werkt Scout in hoofdlijnen",
      process: ["Vertel wie je zoekt", "Bekijk kandidaten", "Geef feedback"],
    },
    faqTitle: "Veelgestelde vragen over de aanpak",
    faqIntro: "Kort antwoord op wat je invoert, wat er verandert en wat je zelf blijft beslissen.",
    faq: [
      {
        question: "Heb ik een vacaturetekst nodig?",
        answer: "Nee. Je kunt in gewone taal beginnen. Heb je al een vacaturetekst, dan kun je die wel gebruiken als extra context.",
      },
      {
        question: "Kan ik feedback over eerdere kandidaten gebruiken?",
        answer: "Ja. Concrete feedback over wat wel en niet past helpt om de zoekrichting duidelijker te maken.",
      },
      {
        question: "Wat gebeurt er als de eerste kandidaten niet goed passen?",
        answer: "Je legt uit wat ontbreekt of te zwaar weegt. Scout gebruikt die feedback om de zoekrichting aan te scherpen en andere profielen te tonen.",
      },
      {
        question: "Welke informatie staat bij een kandidaat?",
        answer: "Je ziet bekende relevante ervaring, waarom een profiel het bekijken waard is en welke belangrijke vragen nog openstaan.",
      },
      {
        question: "Betekent een plek in de selectie dat iemand interesse of tijd heeft?",
        answer: "Nee. Interesse, salarisverwachting en beschikbaarheid blijven open totdat je die met de kandidaat bespreekt.",
      },
      {
        question: "Wie beslist wie er wordt benaderd?",
        answer: "Jij beslist welke kandidaten je wilt benaderen en voert het gesprek met hen.",
      },
    ],
  },
  en: {
    label: "Interactive walkthrough",
    disclosure: "Demo with fictional data.",
    stageNavigation: "Demo stages",
    play: "Play walkthrough",
    pause: "Pause walkthrough",
    reducedMotion: "Autoplay is off",
    previous: "Previous",
    next: "Next",
    replay: "Start again",
    stepOf: (current, total) => `Stage ${current} of ${total}`,
    fullExample: "Explore the full walkthrough",
    applyFeedback: "Apply this feedback",
    feedbackApplied: "Feedback applied",
    inspectProfile: "View candidate",
    bookDemo: "Book a demo",
    memoryNote: "Scout remembers your feedback and also uses it when you start a later vacancy.",
    composerPlaceholder: "For example: someone who personally finds new business clients…",
    composerLabel: "Example of a non-editable input field",
    stages: [
      {
        nav: "Explain who you need",
        eyebrow: "01 · Start with your need",
        title: "Explain who you need.",
        body: "Describe in plain language what this person needs to be able to do.",
      },
      {
        nav: "Review the first candidates",
        eyebrow: "02 · Review the first selection",
        title: "Review the first candidates.",
        body: "See which known experience supports your brief.",
      },
      {
        nav: "Say what fits and what does not",
        eyebrow: "03 · Give focused feedback",
        title: "Say what fits and what does not.",
        body: "Explain what is missing or given too much weight.",
      },
      {
        nav: "Review the adjusted shortlist",
        eyebrow: "04 · Review the new direction",
        title: "Review the adjusted shortlist.",
        body: "Scout shows different candidates. You choose who to contact.",
      },
    ],
    conversation: [
      {
        speaker: "scout",
        label: "Philoo Scout",
        text: "Who are you looking for?",
      },
    ],
    directionLabel: "Search direction",
    direction: ["B2B growth", "Direct selling", "Client mix still open"],
    refinedDirection: ["New clients", "Finding potential clients", "First conversations"],
    initialCandidate: {
      name: "Candidate 01",
      role: "Commercial Manager",
      location: "Utrecht region",
      experienceLabel: "Relevant experience",
      experience: [
        "Commercial experience with business clients.",
        "Responsible for growth across existing accounts.",
      ],
      gapLabel: "What does not yet fit",
      gap: "The recent role centres on team management and existing accounts.",
    },
    feedbackLabel: "Feedback",
    feedback: "The commercial experience fits. We need someone who personally finds new clients, not someone who mainly manages a team.",
    updateTitle: "This changes in the search direction",
    moreLabel: "More emphasis on",
    more: "Finding potential clients and leading the first conversations.",
    lessLabel: "Less emphasis on",
    less: "Managing a team and growing existing accounts.",
    refinedCandidate: {
      name: "Candidate 02",
      role: "Business development",
      location: "Rotterdam region",
      reasonLabel: "Why this candidate appears",
      reason: "The known profile information fits the adjusted search direction more closely.",
      experienceLabel: "Relevant experience",
      experience: [
        "Personally found and approached new business clients in recent roles.",
        "Personally led the first commercial conversations.",
      ],
      evidenceLabel: "Relevant experience",
      evidence: "The profile information mentions personally finding and approaching potential clients.",
      unknownsLabel: "Still to discuss",
      unknowns: ["Interest in this vacancy", "Salary expectations", "Availability"],
      nextLabel: "You decide",
      next: "You decide whether this candidate is worth a conversation and who you want to contact.",
    },
    staticFallbackTitle: "How the demo works without animation",
    home: {
      previewLabel: "Interface preview",
      messageLabel: "Scout",
      welcome: "Who are you looking for?",
      welcomeSupport: "Tell Scout what this person needs to be able to do.",
      composer: "Describe who you need…",
      composerLabel: "Non-editable input area",
      processLabel: "How Scout works at a glance",
      process: ["Explain who you need", "Review candidates", "Give feedback"],
    },
    faqTitle: "Questions about the approach",
    faqIntro: "Short answers about what you provide, what changes and what you continue to decide.",
    faq: [
      {
        question: "Do I need a job description?",
        answer: "No. You can begin in plain language. If you already have a job description, you can use it as additional context.",
      },
      {
        question: "Can I use feedback about previous candidates?",
        answer: "Yes. Specific feedback about what fits and what does not helps make the search direction clearer.",
      },
      {
        question: "What happens when the first candidates miss the mark?",
        answer: "Explain what is missing or overemphasised. Scout uses that feedback to refine the direction and show different profiles.",
      },
      {
        question: "What information is included with a candidate?",
        answer: "You see known relevant experience, why the profile may be worth reviewing and which important questions remain open.",
      },
      {
        question: "Does appearing in the shortlist mean someone is interested or available?",
        answer: "No. Interest, salary expectations and availability remain open until you discuss them with the candidate.",
      },
      {
        question: "Who decides whom to contact?",
        answer: "You decide which candidates to contact and lead the conversation with them.",
      },
    ],
  },
};
