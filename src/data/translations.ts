export type Language = "EN" | "RU" | "KZ";

export interface ScheduleRow {
  time: string;
  event: string;
  location: string;
  notes?: string;
}

export interface ScheduleDay {
  dayNumber: string;
  date: string;
  title: string;
  rows: ScheduleRow[];
}

export interface CommitteeMember {
  name: string;
  role: string;
  organization: string;
  badge?: string;
}

export interface AwardTier {
  tier: string;
  teamsCount: string;
  reward: string;
  winnerTeamPlaceholder?: string;
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  description: string;
}

export interface WaiverDoc {
  title: string;
  description: string;
  url: string;
}

export interface ContentStructure {
  meta: {
    shortName: string;
    fullName: string;
    tagline: string;
    targetGrades: string;
    teamSize: string;
    disciplines: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    awardsNotice: string;
    regulationsPdfRu: string;
    regulationsPdfKz: string;
    regulationsPdfEn: string;
    parentalConsentPdf: string;
    participantConsentPdf: string;
    dateAnnouncementNote: string;
  };
  nav: {
    home: string;
    about: string;
    format: string;
    caseSection: string;
    schedule: string;
    judges: string;
    regulations: string;
    team: string;
    rules: string;
    registerBtn: string;
  };
  statsBar: {
    disciplinesCount: string;
    disciplinesLabel: string;
    teamSizeCount: string;
    teamSizeLabel: string;
    stagesCount: string;
    stagesLabel: string;
    targetCount: string;
    targetLabel: string;
    venueCount: string;
    venueLabel: string;
  };
  partners: {
    title: string;
    subtitle: string;
    emptySlot: string;
    list: string[];
  };
  cta: {
    title: string;
    description: string;
    registerBtn: string;
    rulesBtn: string;
  };
  rulesPage: {
    badge: string;
    title: string;
    subtitle: string;
    teamTitle: string;
    teamRequirements: string[];
    stage1Title: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Desc: string;
    integrityTitle: string;
    integrityDesc: string;
    downloadsTitle: string;
    fullRulesLink: string;
  };
  teamPage: {
    badge: string;
    title: string;
    subtitle: string;
    organizersTitle: string;
    organizersSubtitle: string;
    partnersTitle: string;
  };
  registrationPage: {
    badge: string;
    title: string;
    subtitle: string;
    closedTitle: string;
    closedDesc: string;
    contactNotice: string;
    statusOpen: string;
    statusClosed: string;
    checkingStatus: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    targetLabel: string;
    teamSizeLabel: string;
    venueLabel: string;
    registerBtn: string;
    regulationsBtn: string;
  };
  organizers: {
    committeeMembers: CommitteeMember[];
    juryInfo: {
      title: string;
      description: string;
    };
    finalVenue: {
      name: string;
      city: string;
      address: string;
    };
  };
  aboutCards: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  evaluationCriteria: {
    title: string;
    subtitle: string;
    items: EvaluationCriterion[];
  };
  labSafety: {
    title: string;
    subtitle: string;
    rules: string[];
    disclaimer: string;
  };
  waivers: {
    title: string;
    subtitle: string;
    docs: WaiverDoc[];
  };
  formatDetails: {
    title: string;
    subtitle: string;
    stages: {
      id: string;
      number: string;
      name: string;
      timeframe: string;
      description: string;
      parts: {
        name: string;
        desc: string;
      }[];
    }[];
    roleRules: { role: string; rule: string }[];
    presentationRequirements: string[];
    integrityArticle8: {
      title: string;
      text: string;
    };
  };
  currentCase: {
    title: string;
    code: string;
    status: string;
    description: string;
    requirements: string[];
  };
  scheduleDays: ScheduleDay[];
  awardsTiers: AwardTier[];
  regulationsSection: {
    title: string;
    description: string;
    downloads: { lang: string; url: string }[];
  };
  aboutSection: {
    missionParagraph: string;
    targetAudienceLabel: string;
  };
  footer: {
    navTitle: string;
    contactsTitle: string;
    downloadRegulations: string;
    copyright: string;
    locationNote: string;
    brandName: string;
  };
  formatSection: {
    badge1: string;
    badge2: string;
    badge3: string;
    subtitle3: string;
    fullRulesLink: string;
    stage1Fallback: string;
    stage2Fallback: string;
  };
  scheduleSectionUI: {
    title: string;
    subtitle: string;
    colTime: string;
    colEvent: string;
    colVenue: string;
  };
  judgesSectionUI: {
    eyebrow: string;
    subtitle: string;
    committeeTitle: string;
  };
  rulesPageItems: {
    stage1Items: string[];
    stage2Items: string[];
    integrityItems: string[];
    downloadSubtitle: string;
  };
  teamJury: {
    juryTitle: string;
  };
  caseSectionUI: {
    stageNotice: string;
    submissionTitle: string;
    releaseNotice: string;
    downloadTitle: string;
    downloadSubtitle: string;
  };
  awardsSectionUI: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tableTitle: string;
    colTier: string;
    colTeams: string;
    colDiploma: string;
    colWinner: string;
    tbd: string;
    resultsNote: string;
  };
  regulationsSectionUI: {
    downloadFormBtn: string;
    disclaimerLabel: string;
  };
  registrationFormUI: {
    eyebrow: string;
    title: string;
    subtitle: string;
    section1Title: string;
    teamNameLabel: string;
    teamNamePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    schoolLabel: string;
    schoolPlaceholder: string;
    section2Title: string;
    captainBadge: string;
    captainNameLabel: string;
    captainNamePlaceholder: string;
    captainEmailLabel: string;
    captainEmailPlaceholder: string;
    captainPhoneLabel: string;
    captainPhonePlaceholder: string;
    gradeLabel: string;
    grades: string[];
    section3Title: string;
    supervisorNameLabel: string;
    supervisorNamePlaceholder: string;
    supervisorEmailLabel: string;
    supervisorEmailPlaceholder: string;
    supervisorPhoneLabel: string;
    supervisorPhonePlaceholder: string;
    section4Title: string;
    addFifthMember: string;
    memberRequiredLabel: string;
    memberOptionalLabel: string;
    memberNumberLabel: string;
    fullNamePlaceholder: string;
    fifthMemberPlaceholder: string;
    removeFifthMemberTitle: string;
    consentData: string;
    consentLabSafety: string;
    submitting: string;
    errors: {
      consentRequired: string;
      labSafetyRequired: string;
      supervisorRequired: string;
      memberRequired: string;
      fifthMemberRequired: string;
      submitSuccess: string;
      submitError: string;
      dbError: string;
    };
    memberRoles: {
      required2: string;
      required3: string;
      required4: string;
      optional5: string;
    };
  };
}

export const TRANSLATIONS: Record<Language, ContentStructure> = {
  EN: {
    meta: {
      shortName: "ISM",
      fullName: "ISM - International Science Movement",
      tagline: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
      targetGrades: "Grades 9–11 (12)",
      teamSize: "4 Required + 1 Optional Member + Team Supervisor",
      disciplines: "Biology, Chemistry, Physics, Mathematics & Computer Science",
      location: "Oskemen, Bilim Innovation Lyceum, Likhareva 5",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Oskemen, Bilim Innovation Lyceum, Likhareva 5",
      awardsNotice: "Official Cups, Medals & Certificates",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      parentalConsentPdf: "/docs/parental-consent.pdf",
      participantConsentPdf: "/docs/participant-consent.pdf",
      dateAnnouncementNote: "Tournament Period: October 25 – November 1",
    },
    nav: {
      home: "Home",
      about: "About",
      format: "Format",
      caseSection: "Case",
      schedule: "Schedule",
      judges: "Committee & Jury",
      regulations: "Regulations",
      team: "Team",
      rules: "Rules",
      registerBtn: "Registration",
    },
    statsBar: {
      disciplinesCount: "STEM",
      disciplinesLabel: "STEM",
      teamSizeCount: "4–5",
      teamSizeLabel: "Members per Team",
      stagesCount: "2",
      stagesLabel: "Tournament Stages",
      targetCount: "9–11",
      targetLabel: "High School Grades",
      venueCount: "Oskemen",
      venueLabel: "Host City & Campus",
    },
    partners: {
      title: "Partners & Sponsors",
      subtitle: "Supported by leading educational and scientific organizations",
      emptySlot: "Partner logos will appear here",
      list: [],
    },
    cta: {
      title: "Ready to Test Your Scientific Potential?",
      description: "Assemble a team of 4-5 high school students and represent your school at the international stage of ISM.",
      registerBtn: "Register Team Now",
      rulesBtn: "View Official Rules →",
    },
    rulesPage: {
      badge: "Official Regulations",
      title: "Rules & Tournament Requirements",
      subtitle: "Everything you need to know about team structure, evaluation criteria, and academic integrity.",
      teamTitle: "1. Team Requirements & Composition",
      teamRequirements: [
        "Team must consist of 4 core members (Grade 9–11) + 1 optional member.",
        "Each team must appoint a Captain and have an official Team Supervisor/Leader.",
        "All team members must represent the same school or educational lyceum.",
        "Interdisciplinary balance (Biology, Chemistry, Physics, Math, CS) is strongly recommended."
      ],
      stage1Title: "2. Stage I — Qualification & Case Defence",
      stage1Desc: "Online research stage requiring teams to solve a real-world interdisciplinary scientific case and submit a comprehensive technical report.",
      stage2Title: "3. Stage II — Final Laboratory Research",
      stage2Desc: "On-site practical laboratory tournament hosted in Oskemen, featuring hands-on experiments, data analysis, and oral defense.",
      integrityTitle: "4. Academic Integrity & Safety",
      integrityDesc: "Strict adherence to scientific honesty, lab safety procedures, and ethical standards. Plagiarism results in disqualification.",
      downloadsTitle: "Official Regulations (PDF Downloads)",
      fullRulesLink: "Full Rules →",
    },
    teamPage: {
      badge: "Organizers & Steering Committee",
      title: "Meet the ISM Team",
      subtitle: "Dedicated scientific mentors, project managers, and committee chairs driving the movement.",
      organizersTitle: "Organizing Committee",
      organizersSubtitle: "Co-chairs, managers, and scientific leaders of the International Science Movement.",
      partnersTitle: "Our Partners & Supporters",
    },
    registrationPage: {
      badge: "Team Registration",
      title: "ISM Olympiad Team Application",
      subtitle: "Register your team of 4-5 students for the ISM International Science Olympiad.",
      closedTitle: "Registration is Currently Closed",
      closedDesc: "Team registration for the current stage of ISM is closed or has not opened yet. Please check back later or contact the organizing committee.",
      contactNotice: "For inquiries regarding registration or late submissions, contact:",
      statusOpen: "Registration Open",
      statusClosed: "Registration Closed",
      checkingStatus: "Checking registration status...",
    },
    hero: {
      badge: "ISM 2025–2026",
      title: "ISM - International Science Movement",
      subtitle: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
      description: "Premier team science olympiad integrating Biology, Chemistry, Physics, Mathematics, and Computer Science (Informatics).",
      targetLabel: "Target",
      teamSizeLabel: "Team Composition",
      venueLabel: "Venue",
      registerBtn: "Register Team",
      regulationsBtn: "Regulations (PDF)",
    },
    organizers: {
      committeeMembers: [
        { name: "Nurislam Sailaubek", role: "Co-Chair of Organizing Committee", organization: "ISM Executive Board", badge: "Co-Chair" },
        { name: "Nurmukhammed Kydyrmollauly", role: "Co-Chair of Organizing Committee", organization: "ISM Executive Board", badge: "Co-Chair" },
        { name: "Khassen Khassan", role: "Project Manager", organization: "ISM Executive Board", badge: "Project Manager" },
        { name: "Yelarys Yerezhepuly", role: "Financial Manager", organization: "ISM Executive Board", badge: "Finance" },
        { name: "Mansur Tleubekov", role: "SMM Manager", organization: "ISM Executive Board", badge: "SMM & Media" },
        { name: "Rinat Kadylbekov", role: "Technical Manager", organization: "ISM Executive Board", badge: "Tech Manager" },
        { name: "Omar Zhanbolat", role: "Marketing Manager", organization: "ISM Executive Board", badge: "Marketing" },
        { name: "Nurmukhammed Marat", role: "Security Manager", organization: "ISM Executive Board", badge: "Security" },
        { name: "Zangar Seiilkhanov", role: "HR Manager", organization: "ISM Executive Board", badge: "HR Manager" },
      ],
      juryInfo: {
        title: "Scientific Committee & Jury",
        description: "Panel of academic experts, researchers, and professors from partner scientific institutions."
      },
      finalVenue: {
        name: "Oskemen, Bilim Innovation Lyceum",
        city: "Oskemen, Kazakhstan",
        address: "Likhareva 5, Oskemen",
      }
    },
    aboutCards: [
      {
        id: "format",
        title: "Task Format",
        subtitle: "Research Case + Laboratory Round",
        description: "Combining remote scientific research case analysis with hands-on laboratory experimentation and synchronous problem solving."
      },
      {
        id: "goals",
        title: "Olympiad Goals",
        subtitle: "Laboratory & Data Integrity",
        description: "Developing practical experimental skills, analytical rigor, evidence-based reasoning, and academic debate capabilities."
      },
      {
        id: "disciplines",
        title: "Disciplines",
        subtitle: "5 Core Scientific Fields",
        description: "Biology, Chemistry, Physics, Mathematics, and Computer Science (Informatics) combined into integrated research tasks."
      },
      {
        id: "team-structure",
        title: "Team Structure",
        subtitle: "4 Required + 1 Optional + Supervisor",
        description: "4 core student members (Required), 1 optional 5th member, and 1 mandatory Team Supervisor (Teacher/Mentor)."
      }
    ],
    evaluationCriteria: {
      title: "General Evaluation Criteria",
      subtitle: "Jury assessment principles for scientific reports, debates, and practical rounds",
      items: [
        {
          id: "ethics",
          title: "Ethics & Mutual Respect",
          description: "Professional academic conduct, respectful debate culture, adherence to sportsmanship, and fair play throughout the tournament."
        },
        {
          id: "presentation",
          title: "Presentation Formatting & Visual Quality",
          description: "Clarity, logical structure of slides, precise graphics, error charts, and adherence to scientific formatting standards."
        },
        {
          id: "speaker",
          title: "Speaker Performance & Q&A Defense",
          description: "Clear public speech, deep understanding of the research topic, and convincing, evidence-based responses during jury Q&A."
        },
        {
          id: "experiment",
          title: "Experiment Precision & Scientific Literature",
          description: "Rigorous experimental protocol design, accurate data processing, uncertainty analysis, and thorough citations from peer-reviewed literature."
        },
        {
          id: "questions",
          title: "Quality of Opponent & Reviewer Questions",
          description: "Constructive scientific criticism and deep analytical inquiries. Question quality and relevance are prioritized over question volume."
        }
      ]
    },
    labSafety: {
      title: "Laboratory Safety Regulations",
      subtitle: "Mandatory safety protocols for all participants during the practical round",
      rules: [
        "Mandatory personal protective equipment (PPE): standard lab coats and protective safety goggles required inside all laboratory zones at all times.",
        "Strict adherence to chemical handling, waste disposal, and physical equipment operating procedures.",
        "Prohibition of unapproved experiments, food, or unauthorized device usage inside experimental workspaces."
      ],
      disclaimer: "By participating in the practical round, each student and team supervisor confirms full personal responsibility for adhering strictly to laboratory safety instructions."
    },
    waivers: {
      title: "Waiver Forms & Official Consents",
      subtitle: "Mandatory forms to be completed and submitted prior to Stage II",
      docs: [
        {
          title: "Parental Consent Form",
          description: "Official consent for minors to participate in the on-site tournament stage and travel.",
          url: "/docs/parental-consent.pdf"
        },
        {
          title: "Participant Consent Form",
          description: "Individual participant agreement regarding regulations, data processing, and photo/video rights.",
          url: "/docs/participant-consent.pdf"
        }
      ]
    },
    formatDetails: {
      title: "Tournament Format & Guidelines",
      subtitle: "Comprehensive structure of the two stages of the ISM Olympiad",
      stages: [
        {
          id: "stage-1",
          number: "Stage I",
          name: "Online Selection Round",
          timeframe: "Mid-September (Online)",
          description: "Selection round scored out of 100 points, conducted remotely.",
          parts: [
            {
              name: "Part (a): Research Case",
              desc: "Published ~10 days prior to submission. Scientific literature and databases (PubMed, SciDirect, Scopus) allowed."
            },
            {
              name: "Part (b): Timed Round",
              desc: "Synchronous interdisciplinary problem-solving in a fixed time window."
            }
          ]
        },
        {
          id: "stage-2",
          number: "Stage II",
          name: "On-Site Final Round",
          timeframe: "October 25 – November 1 (Oskemen)",
          description: "On-site final round hosted at Oskemen Bilim Innovation Lyceum.",
          parts: [
            {
              name: "Round 1: Scientific Battle Rounds",
              desc: "Public defense of research case solutions and academic debates."
            },
            {
              name: "Round 2: Practical Research Round",
              desc: "2 days of hands-on work in laboratories."
            }
          ]
        }
      ],
      roleRules: [
        { role: "Team Captain", rule: "Responsible for team registration, communication, and report submissions." },
        { role: "Speaker", rule: "Presents the team's research solution during debate sessions." },
        { role: "Opponent", rule: "Analyzes opposing team's report, asks targeted scientific questions, and leads debate." }
      ],
      presentationRequirements: [
        "Presentation Format: PDF / PPTX in academic style",
        "Mandatory experimental schemes, error graphs, and cited references",
        "Speech Time Limit: 10–12 minutes presentation + 8 minutes Q&A discussion"
      ],
      integrityArticle8: {
        title: "Academic Integrity & Generative AI Policy (Article 8)",
        text: "The use of generative AI tools (ChatGPT, Claude, Gemini, Copilot, etc.) for solving tasks or calculations is strictly PROHIBITED across all stages, unless explicitly permitted in problem statements."
      }
    },
    currentCase: {
      title: "ISM 2025–2026 Research Case",
      code: "CASE-ISM-2026-01",
      status: "Release in September",
      description: "Complex interdisciplinary task combining physical chemistry, molecular biology, materials science, mathematics, and computational modeling.",
      requirements: [
        "Full research report in PDF format (max 15 pages)",
        "Standard academic citation formatting (APA/IEEE/GOST)",
        "Appendix containing raw calculations and data processing scripts"
      ]
    },
    scheduleDays: [
      {
        dayNumber: "Day 1",
        date: "October 25",
        title: "Arrival & Check-in",
        rows: [
          { time: "09:00 - 18:00", event: "Arrival of teams, hotel/campus check-in, registration & badge distribution", location: "Main Building" },
          { time: "18:30 - 20:00", event: "Welcome dinner & informal team orientation", location: "Dining Hall" }
        ]
      },
      {
        dayNumber: "Day 2",
        date: "October 26",
        title: "Opening Ceremony & Technical Briefing",
        rows: [
          { time: "10:00 - 12:00", event: "Grand Opening Ceremony of ISM Olympiad", location: "Main Assembly Hall" },
          { time: "14:00 - 16:00", event: "Battle Rounds draw & Captains' & Supervisors' technical briefing", location: "Conference Hall #1" },
          { time: "16:30 - 18:00", event: "Campus & laboratory facility orientation tour", location: "Laboratory Complex" }
        ]
      },
      {
        dayNumber: "Day 3",
        date: "October 27",
        title: "Stage II: Battle Rounds (Session 1)",
        rows: [
          { time: "09:30 - 13:00", event: "Scientific Debates (Biology, Chemistry & Biochemistry)", location: "Rooms 301-305" },
          { time: "14:30 - 18:00", event: "Scientific Debates (Physics, Math & Computer Science)", location: "Rooms 301-305" }
        ]
      },
      {
        dayNumber: "Day 4",
        date: "October 28",
        title: "Battle Rounds (Session 2) & Finalists Announcement",
        rows: [
          { time: "09:30 - 13:00", event: "Final Battle Round debates & jury deliberations", location: "Small Assembly Hall" },
          { time: "15:00 - 16:30", event: "Announcement of finalist teams advancing to Practical Round", location: "Main Assembly Hall" },
          { time: "17:00 - 18:30", event: "Practical Laboratory Safety briefing & gear check", location: "Research Center" }
        ]
      },
      {
        dayNumber: "Day 5",
        date: "October 29",
        title: "Practical Laboratory Research Round (Day 1)",
        rows: [
          { time: "09:00 - 13:00", event: "Experimental laboratory measurements & chemical-physical synthesis", location: "Chemistry Lab" },
          { time: "14:00 - 18:00", event: "Instrumental data collection & spectrometry analysis", location: "Physics Lab" }
        ]
      },
      {
        dayNumber: "Day 6",
        date: "October 30",
        title: "Practical Laboratory Research Round (Day 2)",
        rows: [
          { time: "09:00 - 13:00", event: "Computational modeling & statistical data processing", location: "IT Center" },
          { time: "14:00 - 18:00", event: "Final experimental report writing & chart preparation", location: "Coworking Space" }
        ]
      },
      {
        dayNumber: "Day 7",
        date: "October 31",
        title: "Practical Report Defense & Jury Review",
        rows: [
          { time: "09:30 - 13:30", event: "Public defense of practical laboratory reports before the Jury", location: "Academic Boardroom" },
          { time: "15:00 - 17:30", event: "Scientific workshop & campus excursion", location: "Labs" }
        ]
      },
      {
        dayNumber: "Day 8",
        date: "November 1",
        title: "Closing Ceremony & Team Departures",
        rows: [
          { time: "11:00 - 13:30", event: "Grand Closing Ceremony, Medals, Diplomas & Trophy Presentation", location: "Main Assembly Hall" },
          { time: "14:00 - 16:00", event: "Farewell reception & official team departures", location: "Campus Grounds" }
        ]
      }
    ],
    awardsTiers: [
      { tier: "Grand Prix", teamsCount: "1 Team", reward: "Grand Prix Trophy & Absolute Winner Cup" },
      { tier: "Gold Award (I Degree)", teamsCount: "1 Team", reward: "Diploma I Degree + Gold Medals" },
      { tier: "Silver Awards (II Degree)", teamsCount: "2 Teams", reward: "Diplomas II Degree + Silver Medals" },
      { tier: "Bronze Awards (III Degree)", teamsCount: "3 Teams", reward: "Diplomas III Degree + Bronze Medals" },
      { tier: "Stage II Finalists", teamsCount: "All Finalist Teams", reward: "Official ISM Finalist Certificates" }
    ],
    regulationsSection: {
      title: "Official Olympiad Regulations & Documents",
      description: "Access the official ISM Regulations, tournament guidelines, consent forms, and safety rules.",
      downloads: [
        { lang: "English Version (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Russian Version (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Kazakh Version (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    },
    aboutSection: {
      missionParagraph: "The International Science Movement (ISM) brings together high school students across Biology, Chemistry, Physics, Mathematics, and Computer Science to solve complex real-world scientific problems in laboratory and case settings.",
      targetAudienceLabel: "Target Audience",
    },
    footer: {
      navTitle: "Navigation",
      contactsTitle: "Contacts & Info",
      downloadRegulations: "Download Regulations (PDF)",
      copyright: "All rights reserved.",
      locationNote: "Bilim Innovation Lyceum • Oskemen, Kazakhstan",
      brandName: "International Science Movement",
    },
    formatSection: {
      badge1: "ONLINE STAGE",
      badge2: "MAIN EVENT • OSKEMEN",
      badge3: "ETHICS & STANDARDS",
      subtitle3: "SCIENTIFIC HONESTY",
      fullRulesLink: "Full Rules \u2192",
      stage1Fallback: "Stage I",
      stage2Fallback: "Stage II",
    },
    scheduleSectionUI: {
      title: "Tournament Schedule",
      subtitle: "8-day official program for the on-site final round in Oskemen.",
      colTime: "Time",
      colEvent: "Event / Activity",
      colVenue: "Venue",
    },
    judgesSectionUI: {
      eyebrow: "Leadership & Governance",
      subtitle: "The executive committee and scientific jury governing the ISM Olympiad.",
      committeeTitle: "ISM Executive Board & Organizing Committee",
    },
    rulesPageItems: {
      stage1Items: [
        "Timeframe: September \u2013 October 2025",
        "Format: Online interdisciplinary case research",
        "Submission: Comprehensive PDF report + source code/calculations",
        "Evaluation: Peer & Jury review based on methodology and rigor"
      ],
      stage2Items: [
        "Timeframe: October 25 \u2013 November 1, 2025",
        "Venue: Bilim Innovation Lyceum, Oskemen",
        "Format: On-site laboratory experiments & physical measurements",
        "Defense: Oral presentation before the Academic Board"
      ],
      integrityItems: [
        "Zero tolerance for plagiarism or AI-generated unauthorized fabrication",
        "Mandatory lab safety equipment and protocol adherence during Stage II",
        "Strict adherence to anti-cheating and peer-collusion rules",
        "Disqualification upon violation of Article 8 Academic Integrity Code"
      ],
      downloadSubtitle: "Download the official tournament regulations document in your preferred language.",
    },
    teamJury: {
      juryTitle: "Academic Jury & Panel of Experts",
    },
    caseSectionUI: {
      stageNotice: "Stage I tasks are published ~10 days prior to the submission deadline. Below is an overview of the case format.",
      submissionTitle: "Submission Guidelines & Formatting:",
      releaseNotice: "The exact release date for the Stage I Research Case will be announced on the website.",
      downloadTitle: "Download ISM Regulations & Guidelines (3 Languages)",
      downloadSubtitle: "Official tournament documents are available in PDF format",
    },
    awardsSectionUI: {
      eyebrow: "Awards & Results",
      title: "Tournament Tiers & Official Medals",
      subtitle: "Official recognition structure for the top-performing teams of the ISM Olympiad.",
      tableTitle: "Official ISM Season Awards Structure",
      colTier: "Tier / Category",
      colTeams: "Teams Count",
      colDiploma: "Diploma & Medals",
      colWinner: "Winning Team",
      tbd: "TBD (To Be Announced)",
      resultsNote: "Official tournament results will be published after the completion of the final round.",
    },
    regulationsSectionUI: {
      downloadFormBtn: "Download Form (PDF)",
      disclaimerLabel: "Important Disclaimer: ",
    },
    registrationFormUI: {
      eyebrow: "Application Form",
      title: "Register Team for ISM",
      subtitle: "Form to be submitted by the Team Captain. Required team structure: 4 Core Members (Captain + 3 Members) + 1 Optional 5th Member + 1 Team Supervisor.",
      section1Title: "1. Team & Institution Information",
      teamNameLabel: "Team Name *",
      teamNamePlaceholder: 'e.g., "Quantum Catalyst"',
      cityLabel: "City / Location *",
      cityPlaceholder: 'e.g., "Almaty"',
      schoolLabel: "Full School / Institution Name *",
      schoolPlaceholder: 'e.g., "Specialized Lyceum No. 165"',
      section2Title: "2. Team Captain (Member #1 - Required)",
      captainBadge: "Captain",
      captainNameLabel: "Captain Full Name *",
      captainNamePlaceholder: "First & Last Name",
      captainEmailLabel: "Captain Email *",
      captainEmailPlaceholder: "captain@example.com",
      captainPhoneLabel: "Captain Phone / Contact *",
      captainPhonePlaceholder: "+7 (707) 000-00-00",
      gradeLabel: "Grade Level *",
      grades: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
      section3Title: "3. Team Supervisor / Advisor (Mandatory Role)",
      supervisorNameLabel: "Supervisor Full Name *",
      supervisorNamePlaceholder: "Teacher Full Name",
      supervisorEmailLabel: "Supervisor Email *",
      supervisorEmailPlaceholder: "teacher@school.edu",
      supervisorPhoneLabel: "Supervisor Phone / Contact *",
      supervisorPhonePlaceholder: "+7 (777) 000-00-00",
      section4Title: "4. Core Team Members (3 Required Members)",
      addFifthMember: "Add Optional 5th Member",
      memberRequiredLabel: "(Required)",
      memberOptionalLabel: "(Optional)",
      memberNumberLabel: "Member #",
      fullNamePlaceholder: "Full Name",
      fifthMemberPlaceholder: "Full Name (Optional 5th Member)",
      removeFifthMemberTitle: "Remove optional 5th member",
      consentData: "I confirm agreement to personal data processing and guarantee compliance with ISM Regulations, including Article 8 Academic Integrity Rules (strict prohibition of generative AI).",
      consentLabSafety: "I confirm that all team members will strictly comply with Laboratory Safety Regulations (mandatory PPE, lab coats, safety goggles) and acknowledge personal responsibility for laboratory conduct.",
      submitting: "Submitting Registration...",
      errors: {
        consentRequired: "Please confirm your agreement to personal data processing and Article 8 Academic Integrity Rules.",
        labSafetyRequired: "Please confirm compliance with Laboratory Safety Regulations (mandatory PPE & personal liability).",
        supervisorRequired: "Please complete all fields for the Team Supervisor / Teacher.",
        memberRequired: "Please enter the Full Name for Required Team Member #",
        fifthMemberRequired: "Please enter the Full Name for Optional Team Member #5 or remove the 5th member.",
        submitSuccess: "Team registration successfully submitted! Confirmation instructions sent to Captain and Supervisor emails.",
        submitError: "Registration error:",
        dbError: "Database connection error. Please check Supabase credentials.",
      },
      memberRoles: {
        required2: "Required Member #2",
        required3: "Required Member #3",
        required4: "Required Member #4",
        optional5: "Optional Member #5",
      },
    }
  },

  RU: {
    meta: {
      shortName: "ISM",
      fullName: "ISM — International Science Movement",
      tagline: "Международная междисциплинарная олимпиада по лабораторным исследованиям и кейс-науке",
      targetGrades: "9–11 (12) классы",
      teamSize: "4 Обязательных + 1 Опциональный участник + Руководитель",
      disciplines: "Биология, Химия, Физика, Математика и Информатика",
      location: "Усть-Каменогорск, Bilim Innovation Lyceum, Лихарева 5",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Усть-Каменогорск, Bilim Innovation Lyceum, ул. Лихарева 5",
      awardsNotice: "Официальные Кубки, Медали и Сертификаты",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      parentalConsentPdf: "/docs/parental-consent.pdf",
      participantConsentPdf: "/docs/participant-consent.pdf",
      dateAnnouncementNote: "Период турнира: 25 октября – 1 ноября",
    },
    nav: {
      home: "Главная",
      about: "Об олимпиаде",
      format: "Формат",
      caseSection: "Кейс",
      schedule: "Расписание",
      judges: "Комитет и Жюри",
      regulations: "Регламент",
      team: "Команда",
      rules: "Правила",
      registerBtn: "Регистрация",
    },
    statsBar: {
      disciplinesCount: "STEM",
      disciplinesLabel: "STEM",
      teamSizeCount: "4–5",
      teamSizeLabel: "Участников в команде",
      stagesCount: "2",
      stagesLabel: "Этапа турнира",
      targetCount: "9–11",
      targetLabel: "Классы обучения",
      venueCount: "Усть-Каменогорск",
      venueLabel: "Город проведения",
    },
    partners: {
      title: "Партнёры и Спонсоры",
      subtitle: "При поддержке ведущих образовательных и научных организаций",
      emptySlot: "Здесь появятся логотипы партнёров",
      list: [],
    },
    cta: {
      title: "Готовы проверить свой научный потенциал?",
      description: "Соберите команду из 4-5 школьников и представьте свою школу на международной олимпиаде ISM.",
      registerBtn: "Зарегистрировать команду",
      rulesBtn: "Читать правила →",
    },
    rulesPage: {
      badge: "Официальный регламент",
      title: "Правила и требования турнира",
      subtitle: "Всё, что вам нужно знать о составе команд, критериях оценивания и академической честности.",
      teamTitle: "1. Требования к команде",
      teamRequirements: [
        "Команда состоит из 4 основных участников (9–11 классы) + 1 опционального участника.",
        "В каждой команде назначается Капитан и Руководитель (наставник).",
        "Все участники должны представлять одно учебное заведение.",
        "Рекомендуется междисциплинарный баланс (Биология, Химия, Физика, Математика, Информатика)."
      ],
      stage1Title: "2. Stage I — Отборочный этап и кейс",
      stage1Desc: "Онлайн-этап решения междисциплинарного кейса с подготовкой детального исследовательского отчёта.",
      stage2Title: "3. Stage II — Финальные лабораторные работы",
      stage2Desc: "Очный практический тур в г. Усть-Каменогорск: лабораторные эксперименты, обработка данных и защита перед жюри.",
      integrityTitle: "4. Академическая честность и безопасность",
      integrityDesc: "Строгое соблюдение научной честности и техники безопасности в лабораториях. Плагиат влечёт дисквалификацию.",
      downloadsTitle: "Официальный регламент (PDF)",
      fullRulesLink: "Полные правила →",
    },
    teamPage: {
      badge: "Оргкомитет и жюри",
      title: "Организаторы ISM",
      subtitle: "Научные менторы, менеджеры проектов и сопредседатели, создающие международное движение.",
      organizersTitle: "Организационный комитет",
      organizersSubtitle: "Руководители, менеджеры и научные эксперты International Science Movement.",
      partnersTitle: "Наши партнёры",
    },
    registrationPage: {
      badge: "Регистрация команды",
      title: "Заявка на участие в ISM",
      subtitle: "Зарегистрируйте свою команду из 4-5 участников для участия в международной олимпиаде.",
      closedTitle: "Регистрация в настоящее время закрыта",
      closedDesc: "Приём заявок на текущий этап олимпиады ISM завершён либо ещё не открылся. Следите за обновлениями или свяжитесь с оргкомитетом.",
      contactNotice: "По вопросам регистрации и индивидуальным обращениям:",
      statusOpen: "Регистрация открыта",
      statusClosed: "Регистрация закрыта",
      checkingStatus: "Проверка статуса регистрации...",
    },
    hero: {
      badge: "ISM 2025–2026",
      title: "ISM — International Science Movement",
      subtitle: "Международная междисциплинарная олимпиада по лабораторным исследованиям и кейс-науке",
      description: "Престижная международная командная олимпиада, объединяющая Биологию, Химию, Физику, Математику и Информатику.",
      targetLabel: "Участники",
      teamSizeLabel: "Состав команды",
      venueLabel: "Место проведения",
      registerBtn: "Зарегистрировать команду",
      regulationsBtn: "Регламент (PDF)",
    },
    organizers: {
      committeeMembers: [
        { name: "Нурислам Сайлаубек", role: "Сопредседатель Оргкомитета", organization: "Исполнительный комитет ISM", badge: "Сопредседатель" },
        { name: "Нурмухаммед Кыдырмоллаулы", role: "Сопредседатель Оргкомитета", organization: "Исполнительный комитет ISM", badge: "Сопредседатель" },
        { name: "Хасен Хассан", role: "Проектный менеджер", organization: "Исполнительный комитет ISM", badge: "Project Manager" },
        { name: "Еларыс Ережепулы", role: "Финансовый менеджер", organization: "Исполнительный комитет ISM", badge: "Finance" },
        { name: "Мансур Тлеубеков", role: "SMM Менеджер", organization: "Исполнительный комитет ISM", badge: "SMM & Media" },
        { name: "Ринат Кадылбеков", role: "Технический менеджер", organization: "Исполнительный комитет ISM", badge: "Tech Manager" },
        { name: "Жанболат Омар", role: "Маркетинг менеджер", organization: "Исполнительный комитет ISM", badge: "Marketing" },
        { name: "Нурмухаммед Марат", role: "Менеджер по безопасности", organization: "Исполнительный комитет ISM", badge: "Security" },
        { name: "Зангар Сейлханов", role: "HR Менеджер", organization: "Исполнительный комитет ISM", badge: "HR Manager" },
      ],
      juryInfo: {
        title: "Научный комитет и Жюри",
        description: "Коллегия академических экспертов, исследователей и преподавателей партнерских институтов."
      },
      finalVenue: {
        name: "Усть-Каменогорск, Bilim Innovation Lyceum",
        city: "Усть-Каменогорск, Казахстан",
        address: "ул. Лихарева 5",
      }
    },
    aboutCards: [
      {
        id: "format",
        title: "Формат заданий",
        subtitle: "Исследовательский кейс + Лабораторный тур",
        description: "Сочетание дистанционного анализа исследовательского кейса с работой в научных лабораториях."
      },
      {
        id: "goals",
        title: "Цели олимпиады",
        subtitle: "Практика и Научная этика",
        description: "Развитие навыков работы в лабораториях, аналитического мышления, аргументации и научной дискуссии."
      },
      {
        id: "disciplines",
        title: "Дисциплины",
        subtitle: "5 Ключевых Предметов",
        description: "Биология, Химия, Физика, Математика и Информатика в комплексных междисциплинарных задачах."
      },
      {
        id: "team-structure",
        title: "Состав команды",
        subtitle: "4 Обязательных + 1 Опциональный + Руководитель",
        description: "4 основных участника-школьника (Обязательно), 1 опциональный 5-й участник и 1 Руководитель команды (Учитель/Наставник)."
      }
    ],
    evaluationCriteria: {
      title: "Общие Критерии Оценивания",
      subtitle: "Принципы оценки докладов, научных боев и практического тура жюри",
      items: [
        {
          id: "ethics",
          title: "Этика и Взаимное Уважение",
          description: "Академическая культура, уважительное ведение дискуссии, соблюдение спортивного поведения и фэйр-плей на турнире."
        },
        {
          id: "presentation",
          title: "Оформление Презентации и Наглядность",
          description: "Логичность структуры, качество графиков, анализ погрешностей и соответствие научным стандартам оформления."
        },
        {
          id: "speaker",
          title: "Выступление Докладчика и Защита в Q&A",
          description: "Четкая устная речь, глубокое понимание темы и аргументированные ответы на вопросы жюри и оппонентов."
        },
        {
          id: "experiment",
          title: "Точность Эксперимента и Работа с Литературой",
          description: "Качество экспериментального протокола, точность обработки данных и корректное цитирование научных источников."
        },
        {
          id: "questions",
          title: "Качество Вопросов Оппонента и Рецензента",
          description: "Конструктивная научная критика и аналитические вопросы. Качество и глубина вопросов имеют приоритет перед их количеством."
        }
      ]
    },
    labSafety: {
      title: "Правила Техники Безопасности в Лаборатории",
      subtitle: "Обязательные нормы безопасности для всех участников во время практического тура",
      rules: [
        "Обязательное использование средств индивидуальной защиты: лабораторный халат и защитные очки обязательны во всех зонах лабораторий.",
        "Строгое соблюдение инструкций по работе с химическими реактивами, приборами и отходами.",
        "Категорический запрет на несанкционированные эксперименты, приемы пищи и использование посторонних устройств в лаборатории."
      ],
      disclaimer: "Принимая участие в практическом туре, каждый участник и руководитель команды подтверждают личную ответственность за строгое соблюдение правил техники безопасности."
    },
    waivers: {
      title: "Документы и Согласия (Forms & Waivers)",
      subtitle: "Обязательные бланки для заполнения и представления перед II Этапом",
      docs: [
        {
          title: "Согласие родителей (Parental Consent)",
          description: "Официальное согласие родителей на участие несовершеннолетнего школьника в очном этапе турнира.",
          url: "/docs/parental-consent.pdf"
        },
        {
          title: "Согласие участника (Participant Consent)",
          description: "Персональное согласие участника на соблюдение регламента, обработку данных и фото/видеосъемку.",
          url: "/docs/participant-consent.pdf"
        }
      ]
    },
    formatDetails: {
      title: "Формат и Регламент Турнира",
      subtitle: "Структура двух этапов олимпиады ISM",
      stages: [
        {
          id: "stage-1",
          number: "I Этап",
          name: "Онлайн-Отборочный Тур",
          timeframe: "Середина Сентября (Дистанционно)",
          description: "Отборочный этап, проводимый в онлайн-формате.",
          parts: [
            {
              name: "Часть (a): Исследовательский кейс",
              desc: "Публикуется за ~10 дней до дедлайна. Разрешено использование научной литературы и баз данных (PubMed, Scopus)."
            },
            {
              name: "Часть (b): Синхронный тур",
              desc: "Решение междисциплинарных задач в фиксированное время."
            }
          ]
        },
        {
          id: "stage-2",
          number: "II Этап",
          name: "Очный Финал",
          timeframe: "25 Октября – 1 Ноября (Усть-Каменогорск)",
          description: "Очный финал на базе Oskemen Bilim Innovation Lyceum.",
          parts: [
            {
              name: "Раунд 1: Научные бои",
              desc: "Публичная защита решений кейсов и научные дискуссии."
            },
            {
              name: "Раунд 2: Практический лабораторный тур",
              desc: "2 дня работы в лабораториях."
            }
          ]
        }
      ],
      roleRules: [
        { role: "Капитан команды", rule: "Отвечает за регистрацию команды, официальную связь и сдачу отчетов." },
        { role: "Докладчик", rule: "Презентует решение кейса команды в ходе научных боев." },
        { role: "Оппонент", rule: "Анализирует решение оппонента, задает точечные научные вопросы и ведет дискуссию." }
      ],
      presentationRequirements: [
        "Формат презентации: PDF / PPTX в академическом стиле",
        "Обязательное наличие схем экспериментов, графиков погрешностей и списка литературы",
        "Регламент: 10–12 минут доклад + 8 минут сессия вопросов и ответов"
      ],
      integrityArticle8: {
        title: "Академическая честность и политика ИИ (Статья 8)",
        text: "Использование любых инструментов генеративного ИИ (ChatGPT, Claude, Gemini и др.) для решения задач строго ЗАПРЕЩЕНО на всех этапах."
      }
    },
    currentCase: {
      title: "Исследовательский Кейс ISM 2025–2026",
      code: "CASE-ISM-2026-01",
      status: "Публикация в Сентябре",
      description: "Междисциплинарная задача на стыке физической химии, молекулярной биологии, материаловедения, математики и программирования.",
      requirements: [
        "Полный исследовательский отчет в формате PDF (макс. 15 страниц)",
        "Оформление списка литературы по стандартам APA/IEEE/ГОСТ",
        "Приложение с исходными расчетами и скриптами обработки"
      ]
    },
    scheduleDays: [
      {
        dayNumber: "День 1",
        date: "25 Октября",
        title: "Заселение и Регистрация (Check-in)",
        rows: [
          { time: "09:00 - 18:00", event: "Заезд команд, заселение, регистрация и выдача бейджей", location: "Главный корпус BIL" },
          { time: "18:30 - 20:00", event: "Приветственный ужин и ориентационная встреча", location: "Столовая" }
        ]
      },
      {
        dayNumber: "День 2",
        date: "26 Октября",
        title: "Открытие и Технический Брифинг",
        rows: [
          { time: "10:00 - 12:00", event: "Торжественная церемония открытия олимпиады ISM", location: "Актовый зал" },
          { time: "14:00 - 16:00", event: "Жеребьевка научных боев и инструктаж капитанов и руководителей", location: "Конференц-зал №1" },
          { time: "16:30 - 18:00", event: "Ознакомительная экскурсия по кампусу и лабораториям", location: "Лаборатории" }
        ]
      },
      {
        dayNumber: "День 3",
        date: "27 Октября",
        title: "II Этап: Научные бои (Сессия 1)",
        rows: [
          { time: "09:30 - 13:00", event: "Научные бои (Биология, Химия и Биохимия)", location: "Кабинеты 301-305" },
          { time: "14:30 - 18:00", event: "Научные бои (Физика, Математика и Информатика)", location: "Кабинеты 301-305" }
        ]
      },
      {
        dayNumber: "День 4",
        date: "28 Октября",
        title: "Научные бои (Сессия 2) и Объявление Финалистов",
        rows: [
          { time: "09:30 - 13:00", event: "Финальные бои отборочного этапа и работа жюри", location: "Малый зал" },
          { time: "15:00 - 16:30", event: "Объявление команд-финалистов практического тура", location: "Актовый зал" },
          { time: "17:00 - 18:30", event: "Инструктаж по технике безопасности в лабораториях", location: "Центр исследований" }
        ]
      },
      {
        dayNumber: "День 5",
        date: "29 Октября",
        title: "Практический лабораторный тур (День 1)",
        rows: [
          { time: "09:00 - 13:00", event: "Экспериментальные измерения и физико-химический синтез", location: "Лаборатория синтеза" },
          { time: "14:00 - 18:00", event: "Спектрометрия и инструментальный анализ", location: "Лаборатория физики" }
        ]
      },
      {
        dayNumber: "День 6",
        date: "30 Октября",
        title: "Практический лабораторный тур (День 2)",
        rows: [
          { time: "09:00 - 13:00", event: "Математическое моделирование и компьютерная обработка данных", location: "IT-центр" },
          { time: "14:00 - 18:00", event: "Подготовка итогового практического отчета и графиков", location: "Коворкинг" }
        ]
      },
      {
        dayNumber: "День 7",
        date: "31 Октября",
        title: "Защита практических отчетов перед Жюри",
        rows: [
          { time: "09:30 - 13:30", event: "Публичная защита практических отчетов перед Жюри", location: "Конференц-зал" },
          { time: "15:00 - 17:30", event: "Научный мастер-класс и экскурсия", location: "Лаборатории" }
        ]
      },
      {
        dayNumber: "День 8",
        date: "1 Ноября",
        title: "Закрытие и Отъезд команд",
        rows: [
          { time: "11:00 - 13:30", event: "Церемония закрытия, вручение медалей, дипломов и кубка", location: "Актовый зал" },
          { time: "14:00 - 16:00", event: "Фуршет и официальный отъезд команд", location: "Кампус" }
        ]
      }
    ],
    awardsTiers: [
      { tier: "Гран-при", teamsCount: "1 Команда", reward: "Кубок абсолютного победителя Гран-при" },
      { tier: "Золотые награды (I Степени)", teamsCount: "1 Команда", reward: "Диплом I Степени + Золотые медали" },
      { tier: "Серебряные награды (II Степени)", teamsCount: "2 Команды", reward: "Дипломы II Степени + Серебряные медали" },
      { tier: "Бронзовые награды (III Степени)", teamsCount: "3 Команды", reward: "Дипломы III Степени + Бронзовые медали" },
      { tier: "Финалисты II Этапа", teamsCount: "Все финалисты", reward: "Официальные сертификаты финалистов ISM" }
    ],
    regulationsSection: {
      title: "Официальный Регламент и Документы",
      description: "Ознакомьтесь с Регламентом ISM, правилами турнира, бланками согласий и правилами техники безопасности.",
      downloads: [
        { lang: "Английская версия (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Русская версия (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Казахская версия (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    },
    aboutSection: {
      missionParagraph: "International Science Movement (ISM) объединяет старшеклассников в области Биологии, Химии, Физики, Математики и Информатики для решения сложных научных задач в лабораторных и кейсовых форматах.",
      targetAudienceLabel: "Целевая аудитория",
    },
    footer: {
      navTitle: "Навигация",
      contactsTitle: "Контакты",
      downloadRegulations: "Скачать регламент (PDF)",
      copyright: "Все права защищены.",
      locationNote: "Bilim Innovation Lyceum • Усть-Каменогорск, Казахстан",
      brandName: "International Science Movement",
    },
    formatSection: {
      badge1: "ОНЛАЙН ЭТАП",
      badge2: "ОСНОВНОЙ ТУРНИР • УСТЬ-КАМЕНОГОРСК",
      badge3: "ЭТИКА И СТАНДАРТЫ",
      subtitle3: "НАУЧНАЯ ЧЕСТНОСТЬ",
      fullRulesLink: "Полные правила \u2192",
      stage1Fallback: "Этап I",
      stage2Fallback: "Этап II",
    },
    scheduleSectionUI: {
      title: "Расписание турнира",
      subtitle: "8-дневная официальная программа очного финала в Усть-Каменогорске.",
      colTime: "Время",
      colEvent: "Событие / Активность",
      colVenue: "Место",
    },
    judgesSectionUI: {
      eyebrow: "Руководство и управление",
      subtitle: "Исполнительный комитет и научное жюри олимпиады ISM.",
      committeeTitle: "Исполнительный совет ISM и Оргкомитет",
    },
    rulesPageItems: {
      stage1Items: [
        "Сроки: сентябрь \u2013 октябрь 2025",
        "Формат: онлайн-исследование междисциплинарного кейса",
        "Подача: PDF-отчёт + исходный код/вычисления",
        "Оценка: рецензирование жюри по методологии и строгости"
      ],
      stage2Items: [
        "Сроки: 25 октября \u2013 1 ноября 2025",
        "Место: Bilim Innovation Lyceum, Усть-Каменогорск",
        "Формат: очные лабораторные эксперименты и измерения",
        "Защита: устная презентация перед учёным советом"
      ],
      integrityItems: [
        "Нулевая терпимость к плагиату и несанкционированному использованию ИИ",
        "Обязательное соблюдение ТБ и использование защитного оборудования",
        "Строгое соблюдение правил против сговора и мошенничества",
        "Дисквалификация за нарушение Статьи 8 Кодекса академической честности"
      ],
      downloadSubtitle: "Скачайте официальный регламент турнира на предпочтительном языке.",
    },
    teamJury: {
      juryTitle: "Академическое жюри и экспертная комиссия",
    },
    caseSectionUI: {
      stageNotice: "Задания I этапа публикуются примерно за 10 дней до дедлайна. Ниже — обзор формата кейса.",
      submissionTitle: "Требования к оформлению и подаче:",
      releaseNotice: "Точная дата публикации кейса I этапа будет объявлена на сайте.",
      downloadTitle: "Скачать Регламент ISM (3 языка)",
      downloadSubtitle: "Официальные документы турнира доступны в формате PDF",
    },
    awardsSectionUI: {
      eyebrow: "Награды и результаты",
      title: "Категории наград и медали",
      subtitle: "Структура официальных наград для лучших команд олимпиады ISM.",
      tableTitle: "Официальная структура наград сезона ISM",
      colTier: "Категория",
      colTeams: "Кол-во команд",
      colDiploma: "Дипломы и медали",
      colWinner: "Команда-победитель",
      tbd: "Будет объявлено",
      resultsNote: "Официальные результаты турнира будут опубликованы после завершения финального тура.",
    },
    regulationsSectionUI: {
      downloadFormBtn: "Скачать бланк (PDF)",
      disclaimerLabel: "Важное уведомление: ",
    },
    registrationFormUI: {
      eyebrow: "Форма заявки",
      title: "Регистрация команды на ISM",
      subtitle: "Форму заполняет капитан команды. Состав: 4 основных участника (капитан + 3) + 1 опциональный 5-й + 1 руководитель команды.",
      section1Title: "1. Информация о команде и учреждении",
      teamNameLabel: "Название команды *",
      teamNamePlaceholder: 'напр., "Quantum Catalyst"',
      cityLabel: "Город / Местоположение *",
      cityPlaceholder: 'напр., "Алматы"',
      schoolLabel: "Полное название школы / учреждения *",
      schoolPlaceholder: 'напр., "Специализированный лицей №165"',
      section2Title: "2. Капитан команды (Участник №1 — обязательно)",
      captainBadge: "Капитан",
      captainNameLabel: "ФИО капитана *",
      captainNamePlaceholder: "Имя и фамилия",
      captainEmailLabel: "Email капитана *",
      captainEmailPlaceholder: "captain@example.com",
      captainPhoneLabel: "Телефон / контакт капитана *",
      captainPhonePlaceholder: "+7 (707) 000-00-00",
      gradeLabel: "Класс *",
      grades: ["9 класс", "10 класс", "11 класс", "12 класс"],
      section3Title: "3. Руководитель команды / наставник (обязательно)",
      supervisorNameLabel: "ФИО руководителя *",
      supervisorNamePlaceholder: "ФИО учителя",
      supervisorEmailLabel: "Email руководителя *",
      supervisorEmailPlaceholder: "teacher@school.edu",
      supervisorPhoneLabel: "Телефон / контакт руководителя *",
      supervisorPhonePlaceholder: "+7 (777) 000-00-00",
      section4Title: "4. Основные участники команды (3 обязательных)",
      addFifthMember: "Добавить 5-го участника (опц.)",
      memberRequiredLabel: "(Обязательно)",
      memberOptionalLabel: "(Опционально)",
      memberNumberLabel: "Участник №",
      fullNamePlaceholder: "ФИО",
      fifthMemberPlaceholder: "ФИО (5-й участник, опционально)",
      removeFifthMemberTitle: "Удалить 5-го участника",
      consentData: "Подтверждаю согласие на обработку персональных данных и гарантирую соблюдение Регламента ISM, включая Статью 8 об академической честности (строгий запрет генеративного ИИ).",
      consentLabSafety: "Подтверждаю, что все участники команды будут строго соблюдать правила лабораторной безопасности (СИЗ, халаты, защитные очки) и несут личную ответственность за поведение в лаборатории.",
      submitting: "Отправка регистрации...",
      errors: {
        consentRequired: "Подтвердите согласие на обработку персональных данных и Статью 8 об академической честности.",
        labSafetyRequired: "Подтвердите соблюдение правил лабораторной безопасности (СИЗ и личная ответственность).",
        supervisorRequired: "Заполните все поля для руководителя команды / учителя.",
        memberRequired: "Введите ФИО обязательного участника команды №",
        fifthMemberRequired: "Введите ФИО 5-го участника или удалите его из заявки.",
        submitSuccess: "Регистрация команды успешно отправлена! Инструкции отправлены на email капитана и руководителя.",
        submitError: "Ошибка регистрации:",
        dbError: "Ошибка подключения к базе данных. Проверьте настройки Supabase.",
      },
      memberRoles: {
        required2: "Обязательный участник №2",
        required3: "Обязательный участник №3",
        required4: "Обязательный участник №4",
        optional5: "Опциональный участник №5",
      },
    }
  },

  KZ: {
    meta: {
      shortName: "ISM",
      fullName: "ISM — International Science Movement",
      tagline: "Зертханалық зерттеулер мен кейс-ғылымы бойынша халықаралық пәнаралық олимпиада",
      targetGrades: "9–11 (12) сыныптар",
      teamSize: "4 Міндетті + 1 Қосымша қатысушы + Жетекші",
      disciplines: "Биология, Химия, Физика, Математика және Информатика",
      location: "Өскемен, Bilim Innovation Lyceum, Лихарев көшесі 5",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Өскемен, Bilim Innovation Lyceum, Лихарев көшесі 5",
      awardsNotice: "Ресми кубоктар, медальдар және дипломдар",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      parentalConsentPdf: "/docs/parental-consent.pdf",
      participantConsentPdf: "/docs/participant-consent.pdf",
      dateAnnouncementNote: "Турнир мерзімі: 25 қазан – 1 қараша",
    },
    nav: {
      home: "Басты бет",
      about: "Олимпиада туралы",
      format: "Формат",
      caseSection: "Кейс",
      schedule: "Кесте",
      judges: "Комитет мен Қазылар",
      regulations: "Ережелер",
      team: "Команда",
      rules: "Ережелер",
      registerBtn: "Тіркелу",
    },
    statsBar: {
      disciplinesCount: "STEM",
      disciplinesLabel: "STEM",
      teamSizeCount: "4–5",
      teamSizeLabel: "Топтағы қатысушы",
      stagesCount: "2",
      stagesLabel: "Турнир кезеңі",
      targetCount: "9–11",
      targetLabel: "Оқу сыныптары",
      venueCount: "Өскемен",
      venueLabel: "Өтетін қала мен кампус",
    },
    partners: {
      title: "Серіктестер мен Демеушілер",
      subtitle: "Үздік білім беру және ғылыми ұйымдардың қолдауымен",
      emptySlot: "Серіктестер логотиптері осында орналасады",
      list: [],
    },
    cta: {
      title: "Ғылыми әлеуетіңізді тексеруге дайынсыз ба?",
      description: "4-5 оқушыдан тұратын топ жинап, мектебіңізді ISM халықаралық олимпиадасында таныстырыңыз.",
      registerBtn: "Топты тіркеу",
      rulesBtn: "Ережелерді оқу →",
    },
    rulesPage: {
      badge: "Ресми ережелер",
      title: "Турнир ережелері мен талаптары",
      subtitle: "Топ құрамы, бағалау критерийлері және академиялық адалдық туралы толық ақпарат.",
      teamTitle: "1. Топқа қойылатын талаптар",
      teamRequirements: [
        "Топ 4 негізгі қатысушыдан (9–11 сыныптар) + 1 қосымша қатысушыдан тұрады.",
        "Әр топта капитан мен жетекші (мұғалім) тағайындалады.",
        "Барлық қатысушылар бір білім беру ұйымының оқушылары болуы тиіс.",
        "Пәнаралық тепе-теңдік (Биология, Химия, Физика, Математика, Информатика) ұсынылады."
      ],
      stage1Title: "2. Stage I — Сұрыптау кезеңі және кейс",
      stage1Desc: "Пәнаралық кейсті шешу және егжей-тегжейлі зерттеу есебін дайындау онлайн кезеңі.",
      stage2Title: "3. Stage II — Финалдық зертханалық жұмыстар",
      stage2Desc: "Өскемен қаласындағы практикалық тур: зертханалық эксперименттер, деректерді өңдеу және қорғау.",
      integrityTitle: "4. Академиялық адалдық және қауіпсіздік",
      integrityDesc: "Ғылыми адалдық пен зертханалық қауіпсіздік ережелерін қатаң сақтау. Плагиат дисквалификацияға әкеледі.",
      downloadsTitle: "Ресми ережелер (PDF)",
      fullRulesLink: "Толық ережелер →",
    },
    teamPage: {
      badge: "Ұйымдастыру комитеті",
      title: "ISM Ұйымдастырушылары",
      subtitle: "Халықаралық қозғалысты дамытушы ғылыми менторлар, жоба менеджерлері мен төрағалар.",
      organizersTitle: "Ұйымдастыру комитеті",
      organizersSubtitle: "International Science Movement басшылары мен ғылыми сарапшылары.",
      partnersTitle: "Біздің серіктестер",
    },
    registrationPage: {
      badge: "Топты тіркеу",
      title: "ISM Олимпиадасына өтінім",
      subtitle: "Халықаралық олимпиадаға қатысу үшін 4-5 оқушыдан тұратын топты тіркеңіз.",
      closedTitle: "Тіркелу қазіргі уақытта жабық",
      closedDesc: "ISM олимпиадасының ағымдағы кезеңіне өтінім қабылдау аяқталды немесе әлі ашылған жоқ. Жаңалықтарды бақылаңыз.",
      contactNotice: "Тіркелу бойынша сұрақтар мен жеке өтініштер үшін:",
      statusOpen: "Тіркелу ашық",
      statusClosed: "Тіркелу жабық",
      checkingStatus: "Тіркелу мәртебесі тексерілуде...",
    },
    hero: {
      badge: "ISM 2025–2026",
      title: "ISM — International Science Movement",
      subtitle: "Зертханалық зерттеулер мен кейс-ғылымы бойынша халықаралық пәнаралық олимпиада",
      description: "Биология, Химия, Физика, Математика және Информатика пәндерін біріктіретін халықаралық олимпиада.",
      targetLabel: "Қатысушылар",
      teamSizeLabel: "Топ құрамы",
      venueLabel: "Өтетін орны",
      registerBtn: "Топты тіркеу",
      regulationsBtn: "Ережелер (PDF)",
    },
    organizers: {
      committeeMembers: [
        { name: "Нұрислам Сайлаубек", role: "Ұйымдастыру комитетінің тең төрағасы", organization: "ISM Атқарушы кеңесі", badge: "Тең төраға" },
        { name: "Нұрмұхаммед Қыдырмоллаұлы", role: "Ұйымдастыру комитетінің тең төрағасы", organization: "ISM Атқарушы кеңесі", badge: "Тең төраға" },
        { name: "Хасен Хассан", role: "Жоба менеджері", organization: "ISM Атқарушы кеңесі", badge: "Project Manager" },
        { name: "Еларыс Ережепұлы", role: "Қаржы менеджері", organization: "ISM Атқарушы кеңесі", badge: "Finance" },
        { name: "Мансұр Тлеубеков", role: "SMM Менеджері", organization: "ISM Атқарушы кеңесі", badge: "SMM & Media" },
        { name: "Ринат Кадылбеков", role: "Техникалық менеджер", organization: "ISM Атқарушы кеңесі", badge: "Tech Manager" },
        { name: "Жанболат Омар", role: "Маркетинг менеджері", organization: "ISM Атқарушы кеңесі", badge: "Marketing" },
        { name: "Нұрмұхаммед Марат", role: "Қауіпсіздік менеджері", organization: "ISM Атқарушы кеңесі", badge: "Security" },
        { name: "Занғар Сейілханов", role: "HR Менеджері", organization: "ISM Атқарушы кеңесі", badge: "HR Manager" },
      ],
      juryInfo: {
        title: "Ғылыми Комитет және Қазылар алқасы",
        description: "Серіктес институттардың профессорлары мен ғылыми сарапшылары."
      },
      finalVenue: {
        name: "Өскемен, Bilim Innovation Lyceum",
        city: "Өскемен, Қазақстан",
        address: "Лихарев көшесі 5",
      }
    },
    aboutCards: [
      {
        id: "format",
        title: "Тапсырма форматы",
        subtitle: "Зерттеу кейсі + Зертханалық тур",
        description: "Зерттеу кейсін қашықтан талдау мен зертханадағы практикалық жұмысты ұштастыру."
      },
      {
        id: "goals",
        title: "Олимпиада мақсаты",
        subtitle: "Практика және Ғылыми әдеп",
        description: "Зертханалық дағдыларды, аналитикалық ойлауды және ғылыми пікірталасты дамыту."
      },
      {
        id: "disciplines",
        title: "Пәндер",
        subtitle: "5 Негізгі Ғылыми Бағыт",
        description: "Биология, Химия, Физика, Математика және Информатика интеграциясы."
      },
      {
        id: "team-structure",
        title: "Топ құрамы",
        subtitle: "4 Міндетті + 1 Қосымша + Жетекші",
        description: "4 негізгі оқушы (Міндетті), 1 қосымша қатысушы және 1 Топ жетекшісі (Мұғалім)."
      }
    ],
    evaluationCriteria: {
      title: "Жалпы Бағалау Критерийлері",
      subtitle: "Қазылар алқасының ғылыми жекпе-жектер мен практикалық турды бағалау ережелері",
      items: [
        {
          id: "ethics",
          title: "Әдеп пен Өзара Құрмет",
          description: "Академиялық мәдениет, пікірталас әдебі және спорттық адалдықты сақтау."
        },
        {
          id: "presentation",
          title: "Презентация Сапасы мен Рәсімделуі",
          description: "Слайдтар құрылымының логикасы, графиктер сапасы және ғылыми стандарттарға сәйкестігі."
        },
        {
          id: "speaker",
          title: "Баяндамашы Сөзі мен Сұрақтарға Жауап",
          description: "Шешендік дағды, тақырыпты терең түсіну және негізделген жауаптар."
        },
        {
          id: "experiment",
          title: "Эксперимент Дәлдігі мен Әдебиетпен Жұмыс",
          description: "Эксперимент хаттамасының сапасы, деректерді өңдеу дәлдігі және ғылыми сілтемелер."
        },
        {
          id: "questions",
          title: "Оппонент пен Рецензент Сұрақтарының Сапасы",
          description: "Конструктивті ғылыми сын. Сұрақтардың санынан гөрі олардың тереңдігі мен мазмұны маңызды."
        }
      ]
    },
    labSafety: {
      title: "Зертханалық Қауіпсіздік Ережелері",
      subtitle: "Практикалық тур кезінде барлық қатысушылар үшін міндетті ережелер",
      rules: [
        "Жеке қорғаныс құралдарын (ЖҚҚ) міндетті түрде кию: зертхана халаты мен қорғаныш көзілдіріктер.",
        "Реактивтер мен аспаптармен жұмыс істеу нұсқауларын қатаң сақтау.",
        "Рұқсат етілмеген эксперименттер жүргізуге және зертханада тамақтануға тыйым салынады."
      ],
      disclaimer: "Практикалық турға қатысу арқылы әрбір оқушы мен топ жетекшісі қауіпсіздік ережелерін сақтауға жеке жауапкершілік алады."
    },
    waivers: {
      title: "Ресми Бланктер мен Келісімдер",
      subtitle: "II Кезеңге дейін толтырылуы міндетті бланкілер",
      docs: [
        {
          title: "Ата-аналар келісімі (Parental Consent)",
          description: "Кәмелетке толмаған оқушының офлайн турнирге қатысуына ата-анасының ресми келісімі.",
          url: "/docs/parental-consent.pdf"
        },
        {
          title: "Қатысушы келісімі (Participant Consent)",
          description: "Қатысушының ережелерді сақтау және деректерді өңдеуге ресми келісімі.",
          url: "/docs/participant-consent.pdf"
        }
      ]
    },
    formatDetails: {
      title: "Турнир форматы мен Ережесі",
      subtitle: "ISM олимпиадасының екі кезеңінің толық құрылымы",
      stages: [
        {
          id: "stage-1",
          number: "I Кезең",
          name: "Онлайн іріктеу туры",
          timeframe: "Қыркүйек ортасы (Онлайн)",
          description: "Іріктеу кезеңі қашықтан өткізіледі.",
          parts: [
            {
              name: "(a) бөлігі: Зерттеу кейсі",
              desc: "Тапсырма 10 күн бұрын жарияланады. Ғылыми әдебиеттер мен дерекқорларды пайдалануға болады."
            },
            {
              name: "(b) бөлігі: Синхронды тур",
              desc: "Белгіленген уақытта пәнаралық тапсырмаларды топпен шешу."
            }
          ]
        },
        {
          id: "stage-2",
          number: "II Кезең",
          name: "Офлайн Финал",
          timeframe: "25 Қазан – 1 Қараша (Өскемен)",
          description: "Oskemen Bilim Innovation Lyceum базесінде өтетін финалдық кезең.",
          parts: [
            {
              name: "1-раунд: Ғылыми жекпе-жектер",
              desc: "Кейс шешімдерін ғылыми пікірталаста қорғау."
            },
            {
              name: "2-раунд: Практикалық зертханалық тур",
              desc: "Зертханаларда 2 күндік практикалық жұмыс."
            }
          ]
        }
      ],
      roleRules: [
        { role: "Топ капитаны", rule: "Тіркелуге, байланысқа және есептерді тапсыруға жауапты." },
        { role: "Баяндамашы", rule: "Ғылыми жекпе-жекте топтың кейс шешімін ұсынады." },
        { role: "Оппонент", rule: "Қарсыластар шешімін талдап, сұрақтар қояды." }
      ],
      presentationRequirements: [
        "Презентация форматы: PDF / PPTX, академикалық стиль",
        "Эксперимент схемалары мен дереккөздер тізімі міндетті",
        "Уақыт регламенті: 10–12 минут баяндама + 8 минут сұрақ-жауап"
      ],
      integrityArticle8: {
        title: "Академиялық адалдық және ЖИ саясаты (8-бап)",
        text: "Кез келген генеративті ЖИ құралдарын (ChatGPT, Claude, Gemini т.б.) пайдалануға қатаң ТЫЙЫМ САЛЫНАДЫ."
      }
    },
    currentCase: {
      title: "ISM 2025–2026 Зерттеу Кейсі",
      code: "CASE-ISM-2026-01",
      status: "Қыркүйекте жарияланады",
      description: "Физикалық химия, молекулалық биология, материалтану, математика және бағдарламалау тоғысындағы кешенді тапсырма.",
      requirements: [
        "PDF форматындағы толық ғылыми есеп (макс. 15 бет)",
        "Академиялық сілтемелер форматы (APA/IEEE/ГОСТ)",
        "Есептеулер мен деректерді өңдеу скрипттері бар қосымша"
      ]
    },
    scheduleDays: [
      {
        dayNumber: "1-күн",
        date: "25 Қазан",
        title: "Келу және Орналасу (Check-in)",
        rows: [
          { time: "09:00 - 18:00", event: "Командалардың келуі, қонақүйге заселение және тіркеу", location: "Бас ғимарат" },
          { time: "18:30 - 20:00", event: "Қарсы алу кешкі асы мен танысу", location: "Асхана" }
        ]
      },
      {
        dayNumber: "2-күн",
        date: "26 Қазан",
        title: "Ашылу салтанаты мен Нұсқаулық",
        rows: [
          { time: "10:00 - 12:00", event: "ISM олимпиадасының ашылу салтанаты", location: "Ақ зал" },
          { time: "14:00 - 16:00", event: "Жедебе тастау және капитандар нұсқаулығы", location: "Конференция залы №1" },
          { time: "16:30 - 18:00", event: "Кампус пен зертханаларға экскурсия", location: "Зертханалар" }
        ]
      },
      {
        dayNumber: "3-күн",
        date: "27 Қазан",
        title: "II Кезең: Ғылыми жекпе-жектер (1-сессия)",
        rows: [
          { time: "09:30 - 13:00", event: "Ғылыми бои (Биология, Химия және Биохимия)", location: "301-305 бөлмелер" },
          { time: "14:30 - 18:00", event: "Ғылыми бои (Физика, Математика және Информатика)", location: "301-305 бөлмелер" }
        ]
      },
      {
        dayNumber: "4-күн",
        date: "28 Қазан",
        title: "Ғылыми жекпе-жектер және Финалисттерді жариялау",
        rows: [
          { time: "09:30 - 13:00", event: "Іріктеу кезеңінің соңғы боилары", location: "Кіші зал" },
          { time: "15:00 - 16:30", event: "Практикалық турға өткен финалисттерді хабарлау", location: "Ақ зал" },
          { time: "17:00 - 18:30", event: "Зертханалық қауіпсіздік нұсқаулығы", location: "Ғылыми орталық" }
        ]
      },
      {
        dayNumber: "5-күн",
        date: "29 Қазан",
        title: "Практикалық зертханалық тур (1-күн)",
        rows: [
          { time: "09:00 - 13:00", event: "Эксперименттік өлшеулер мен синтез", location: "Синтез зертханасы" },
          { time: "14:00 - 18:00", event: "Спектрометрия мен аспаптық талдау", location: "Физика зертханасы" }
        ]
      },
      {
        dayNumber: "6-күн",
        date: "30 Қазан",
        title: "Практикалық зертханалық тур (2-күн)",
        rows: [
          { time: "09:00 - 13:00", event: "Математикалық модельдеу және деректерді өңдеу", location: "IT-орталық" },
          { time: "14:00 - 18:00", event: "Практикалық есепті дайындау", location: "Коворкинг" }
        ]
      },
      {
        dayNumber: "7-күн",
        date: "31 Қазан",
        title: "Практикалық есептерді қорғау",
        rows: [
          { time: "09:30 - 13:30", event: "Практикалық есептерді Қазылар алдында қорғау", location: "Конференция залы" },
          { time: "15:00 - 17:30", event: "Ғылыми шеберлік-сыныбы мен экскурсия", location: "Зертханалар" }
        ]
      },
      {
        dayNumber: "8-күн",
        date: "1 Қараша",
        title: "Жабылу салтанаты мен Қайту",
        rows: [
          { time: "11:00 - 13:30", event: "Жабылу салтанаты, медалдар мен кубок тапсыру", location: "Ақ зал" },
          { time: "14:00 - 16:00", event: "Фуршет және командалардың қайтуы", location: "Кампус" }
        ]
      }
    ],
    awardsTiers: [
      { tier: "Гран-при", teamsCount: "1 Топ", reward: "Гран-при кубогы мен Абсолют жеңімпаз кубогы" },
      { tier: "Алтын марапаттар (I Дәрежелі)", teamsCount: "1 Топ", reward: "I Дәрежелі Диплом + Алтын медальдар" },
      { tier: "Күміс марапаттар (II Дәрежелі)", teamsCount: "2 Топ", reward: "II Дәрежелі Дипломдар + Күміс медальдар" },
      { tier: "Қола марапаттар (III Дәрежелі)", teamsCount: "3 Топ", reward: "III Дәрежелі Дипломдар + Қола медальдар" },
      { tier: "II Кезең финалисттері", teamsCount: "Барлық финалист топтар", reward: "ISM ресми финалист сертификаттары" }
    ],
    regulationsSection: {
      title: "Ресми Ережелер мен Бланктер",
      description: "ISM Ережелерімен, бланкілермен және қауіпсіздік нормаларымен танысыңыз.",
      downloads: [
        { lang: "Ағылшын нұсқасы (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Русская версия (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Казахская версия (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    },
    aboutSection: {
      missionParagraph: "International Science Movement (ISM) жоғары сынып оқушыларын Биология, Химия, Физика, Математика және Информатика салаларында күрделі ғылыми мәселелерді зертханалық және кейстік форматта шешуге біріктіреді.",
      targetAudienceLabel: "Мақсатты аудитория",
    },
    footer: {
      navTitle: "Навигация",
      contactsTitle: "Байланыстар",
      downloadRegulations: "Ережелерді жүктеу (PDF)",
      copyright: "Барлық құқықтар қорғалған.",
      locationNote: "Bilim Innovation Lyceum • Өскемен, Қазақстан",
      brandName: "International Science Movement",
    },
    formatSection: {
      badge1: "ОНЛАЙН КЕЗЕҢ",
      badge2: "НЕГІЗГІ ТУРНИР • ӨСКЕМЕН",
      badge3: "ЭТИКА МЕН СТАНДАРТТАР",
      subtitle3: "ҒЫЛЫМИ АДАЛДЫҚ",
      fullRulesLink: "Толық ережелер \u2192",
      stage1Fallback: "I Кезең",
      stage2Fallback: "II Кезең",
    },
    scheduleSectionUI: {
      title: "Турнир кестесі",
      subtitle: "Өскемендегі очно финалдық 8 күндік ресми бағдарлама.",
      colTime: "Уақыт",
      colEvent: "Оқиға / Белсенділік",
      colVenue: "Орын",
    },
    judgesSectionUI: {
      eyebrow: "Басшылық және басқару",
      subtitle: "ISM олимпиадасының атқарушы комитеті мен ғылыми қазылар алқасы.",
      committeeTitle: "ISM атқарушы кеңесі және Ұйымдастыру комитеті",
    },
    rulesPageItems: {
      stage1Items: [
        "Мерзімі: қыркүйек \u2013 қазан 2025",
        "Формат: пәнаралық кейсті онлайн зерттеу",
        "Тапсыру: PDF есебі + бастапқы код/есептеулер",
        "Бағалау: қазылардың әдістеме және қатаңдық бойынша сараптамасы"
      ],
      stage2Items: [
        "Мерзімі: 25 қазан \u2013 1 қараша 2025",
        "Орын: Bilim Innovation Lyceum, Өскемен",
        "Формат: очно зертханалық эксперименттер және өлшеулер",
        "Қорғау: ғылыми кеңес алдында ауызша презентация"
      ],
      integrityItems: [
        "Плагиат пен рұқсатсыз ИИ қолдануға нөлдік төзімділік",
        "Қауіпсіздік жабдықтарын міндетті пайдалану",
        "Алдау мен күмәнді сөзережелерін қатаң сақтау",
        "8-бап Академиялық адалдық кодексін бұзғанда дисквалификация"
      ],
      downloadSubtitle: "Турнирдың ресми ережелер құжатын қалаулы тілде жүктеңіз.",
    },
    teamJury: {
      juryTitle: "Академиялық қазылар мен сарапшылар комиссиясы",
    },
    caseSectionUI: {
      stageNotice: "I кезең тапсырмалары тапсыру мерзімінен ~10 күн бұрын жарияланады. Төменде кейс форматы.",
      submissionTitle: "Тапсыру талаптары мен форматтау:",
      releaseNotice: "I кезең кейсінің нақты жариялану күні сайтта хабарланады.",
      downloadTitle: "ISM ережелерін жүктеу (3 тілде)",
      downloadSubtitle: "Турнирдің ресми құжаттары PDF форматында қол жетімді",
    },
    awardsSectionUI: {
      eyebrow: "Марапаттар мен нәтижелер",
      title: "Турнир санаттары мен ресми медальдар",
      subtitle: "ISM олимпиадасының үздік командалары үшін ресми марапат құрылымы.",
      tableTitle: "ISM маусымының ресми марапат құрылымы",
      colTier: "Санат",
      colTeams: "Командалар саны",
      colDiploma: "Дипломдар мен медальдар",
      colWinner: "Жеңімпаз команда",
      tbd: "Хабарланатын болады",
      resultsNote: "Турнирдің ресми нәтижелері финалдық тур аяқталғаннан кейін жарияланады.",
    },
    regulationsSectionUI: {
      downloadFormBtn: "Бланкті жүктеу (PDF)",
      disclaimerLabel: "Маңызды ескерту: ",
    },
    registrationFormUI: {
      eyebrow: "Өтінім формасы",
      title: "ISM-ге топты тіркеу",
      subtitle: "Форманы топ кapitany толтырады. Құрамы: 4 негізгі қатысушы (капитан + 3) + 1 қосымша 5-ші + 1 топ жетекшісі.",
      section1Title: "1. Топ және мекеме туралы ақпарат",
      teamNameLabel: "Топ атауы *",
      teamNamePlaceholder: 'мыс., "Quantum Catalyst"',
      cityLabel: "Қала / Орналасқан жері *",
      cityPlaceholder: 'мыс., "Алматы"',
      schoolLabel: "Мектеп / мекеменің толық атауы *",
      schoolPlaceholder: 'мыс., "№165 мамандандырылған лицей"',
      section2Title: "2. Топ кapitany (Қатысушы №1 — міндетті)",
      captainBadge: "Капитан",
      captainNameLabel: "Капитанның толық аты *",
      captainNamePlaceholder: "Аты-жөні",
      captainEmailLabel: "Капитан email *",
      captainEmailPlaceholder: "captain@example.com",
      captainPhoneLabel: "Капитан телефоны / байланыс *",
      captainPhonePlaceholder: "+7 (707) 000-00-00",
      gradeLabel: "Сынып *",
      grades: ["9 сынып", "10 сынып", "11 сынып", "12 сынып"],
      section3Title: "3. Топ жетекшісі / куратор (міндетті)",
      supervisorNameLabel: "Жетекшінің толық аты *",
      supervisorNamePlaceholder: "Мұғалімнің аты-жөні",
      supervisorEmailLabel: "Жетекші email *",
      supervisorEmailPlaceholder: "teacher@school.edu",
      supervisorPhoneLabel: "Жетекші телефоны / байланыс *",
      supervisorPhonePlaceholder: "+7 (777) 000-00-00",
      section4Title: "4. Негізгі топ мүшелері (3 міндетті)",
      addFifthMember: "5-ші қатысушыны қосу (қосымша)",
      memberRequiredLabel: "(Міндетті)",
      memberOptionalLabel: "(Қосымша)",
      memberNumberLabel: "Қатысушы №",
      fullNamePlaceholder: "Толық аты",
      fifthMemberPlaceholder: "Толық аты (5-ші қатысушы, қосымша)",
      removeFifthMemberTitle: "5-ші қатысушыны жою",
      consentData: "Жеке деректерді өңдеуге келісімімді растаймын және ISM Ережелерін, соның ішінде 8-бап академиялық адалдық ережесін (генеративті ИИ-ді қатаң тыйым салу) сақтайтынымды кепілдендіремін.",
      consentLabSafety: "Барлық топ мүшелері зертханалық қауіпсіздік ережелерін (ҚҚҚ, халат, қорғаныш көзілдірігі) қатаң сақтайтынын және зертханадағы мінез-құлық үшін жеке жауапкершілікті мойындайтынымды растаймын.",
      submitting: "Тіркелу жіберілуде...",
      errors: {
        consentRequired: "Жеке деректерді өңдеуге және 8-бап академиялық адалдық ережесіне келісіміңізді растаңыз.",
        labSafetyRequired: "Зертханалық қауіпсіздік ережелерін (ҚҚҚ және жеке жауапкершілік) растаңыз.",
        supervisorRequired: "Топ жетекшісі / мұғалімнің барлық өрістерін толтырыңыз.",
        memberRequired: "Міндетті топ мүшесінің №",
        fifthMemberRequired: "5-ші қатысушының толық атын енгізіңіз немесе оны өтінімнен жойыңыз.",
        submitSuccess: "Топ тіркелуі сәтті жіберілді! Нұсқаулар капитан мен жетекші email-іне жіберілді.",
        submitError: "Тіркелу қатесі:",
        dbError: "Дерекқорға қосылу қатесі. Supabase баптауларын тексеріңіз.",
      },
      memberRoles: {
        required2: "Міндетті қатысушы №2",
        required3: "Міндетті қатысушы №3",
        required4: "Міндетті қатысушы №4",
        optional5: "Қосымша қатысушы №5",
      },
    }
  }
};
