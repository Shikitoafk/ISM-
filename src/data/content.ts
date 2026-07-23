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

export const OLYMPIAD_CONTENT = {
  meta: {
    shortName: "ISM",
    fullName: 'Team Interdisciplinary Olympiad in Laboratory Research and Case-Based Science "ISM" (International Science Movement)',
    tagline: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science",
    targetGrades: "Grades 9–11 (12)",
    teamSize: "3–4 members + Team Advisor",
    location: "Almaty, Satbayev University",
    contactEmail: "info.ism.olympiad@gmail.com",
    contactPhone: "+7 702 861 8611",
    contactAddress: "Oskemen, Bilim Innovation Lyceum, Likhareva 5",
    awardsNotice: "Official Cups, Medals & Certificates",
    regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
    regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
    regulationsPdfEn: "/docs/ism-regulations-en.pdf",
    dateAnnouncementNote: "Exact tournament dates will be announced soon",
  },
  
  organizers: {
    coChairs: [
      { name: "Nurislam Sailaubek", title: "Co-Chair of the Organizing Committee" },
      { name: "Nurmukhammed Kydyrmollauly", title: "Co-Chair of the Organizing Committee" },
    ],
    committeeMembers: [
      { name: "Nurislam Sailaubek", role: "Co-Chair of Organizing Committee", organization: "ISM Executive Board", badge: "Co-Chair" },
      { name: "Nurmukhammed Kydyrmollauly", role: "Co-Chair of Organizing Committee", organization: "ISM Executive Board", badge: "Co-Chair" },
      { name: "Khassen Khassan", role: "Project Manager", organization: "ISM Executive Board", badge: "Project Manager" },
      { name: "Elarys Yerezhepuly", role: "Financial Manager", organization: "ISM Executive Board", badge: "Finance" },
      { name: "Mansur Tleubekov", role: "SMM Manager", organization: "ISM Executive Board", badge: "SMM & Media" },
      { name: "Rinat Kadylbekov", role: "Technical Manager", organization: "ISM Executive Board", badge: "Tech Manager" },
      { name: "Omar Zhanbolat", role: "Marketing Manager", organization: "ISM Executive Board", badge: "Marketing" },
      { name: "Nurmukhammed Marat", role: "Security Manager", organization: "ISM Executive Board", badge: "Security" },
      { name: "Zangar Seiilkhanov", role: "HR Manager", organization: "ISM Executive Board", badge: "HR Manager" },
    ] as CommitteeMember[],
    juryInfo: {
      title: "Scientific Committee & Jury",
      description: "Panel of academic experts, professors, and laboratory researchers from Satbayev University and partner scientific institutions. Full jury roster to be announced prior to Stage I."
    },
    institutionalSupport: {
      name: "Oskemen Bilim Innovation Lyceum",
      role: "Organizational & Institutional Support",
      disclaimer: "Mention of institutional support does not create financial obligations for the lyceum.",
    },
    finalVenue: {
      name: "Satbayev University",
      city: "Almaty, Kazakhstan",
      address: "22 Satpaev Street, Satbayev University Campus",
    }
  },

  aboutCards: [
    {
      id: "format",
      title: "Task Format",
      subtitle: "Research Case + Timed Round",
      description: "Stage I combines a 10-day open scientific research round (utilizing scientific databases & literature) with a timed interdisciplinary problem-solving round."
    },
    {
      id: "goals",
      title: "Olympiad Goals",
      subtitle: "Laboratory & Integrity",
      description: "Developing experimental laboratory skills, rigorous evidence-based thinking, and scientific communication to prepare students for international competitions."
    },
    {
      id: "disciplines",
      title: "Disciplines",
      subtitle: "Interdisciplinary Synthesis",
      description: "Biology, Chemistry, and Physics integrated with applied mathematics, statistics, materials science, and engineering computational methods."
    },
    {
      id: "team-structure",
      title: "Age & Team Structure",
      subtitle: "3–4 Members + Advisor",
      description: "High school students in Grades 9–11 (12). Each team consists of 3–4 members, 1 Team Captain, and 1 Advisor (Teacher). One team per student per season."
    }
  ],

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
            name: "Part (a): Research Case (50 points)",
            desc: "Published ~10 days prior to submission deadline. Scientific literature and databases (PubMed, SciDirect, Scopus) are allowed. Full academic citations required."
          },
          {
            name: "Part (b): Timed Round (50 points)",
            desc: "Synchronous interdisciplinary problem-solving in a fixed time window (typically Saturday). Strictly team-internal collaboration."
          }
        ]
      },
      {
        id: "stage-2",
        number: "Stage II",
        name: "On-Site Final Round",
        timeframe: "Late October (~6 days, Almaty)",
        description: "On-site final round hosted at Satbayev University campus.",
        parts: [
          {
            name: "Round 1: Battle Rounds",
            desc: "Scientific debates and public defense of research case solutions. Top ~10 teams advance to the practical laboratory round."
          },
          {
            name: "Round 2: Practical Research Round",
            desc: "2 days of hands-on work in Satbayev University laboratories: chemical synthesis, physical measurement, data processing, and report defense."
          }
        ]
      }
    ],
    roleRules: [
      { role: "Team Captain", rule: "Responsible for team registration, official communication, and timely submission of all reports." },
      { role: "Speaker", rule: "Presents the team's research solution during the Battle Rounds debates." },
      { role: "Opponent", rule: "Analyzes the opposing team's solution, asks critical scientific questions, and leads debate." }
    ],
    presentationRequirements: [
      "Presentation Format: PDF / PPTX, strict academic formatting style",
      "Mandatory inclusion of experimental schemes, error graphs, and cited reference list",
      "Speech Time Limit: 10–12 minutes presentation + 8 minutes Q&A discussion"
    ],
    integrityArticle8: {
      title: "Academic Integrity & Generative AI Policy (Article 8)",
      text: "According to Article 8 of the ISM Regulations, the use of any generative AI tools (ChatGPT, Claude, Gemini, Copilot, etc.) for solving tasks, writing code, translation, or calculations is strictly PROHIBITED across all stages, unless explicitly permitted in the text of a specific problem statement. Plagiarism and external assistance lead to immediate team disqualification."
    }
  },

  currentCase: {
    title: "ISM 2024–2025 Research Case",
    code: "CASE-ISM-2024-01",
    status: "Announcement / Release in September",
    description: "Complex interdisciplinary task combining physical chemistry, molecular biology, and functional materials science. Requires theoretical modeling, thermodynamic calculations, and experimental protocol design.",
    requirements: [
      "Full research report in PDF format (max 15 pages)",
      "Standard academic citation formatting (APA/IEEE/GOST)",
      "Appendix containing raw calculations and data processing scripts"
    ]
  },

  scheduleDays: [
    {
      dayNumber: "Day 1",
      date: "October 24",
      title: "Arrival, Registration & Opening Ceremony",
      rows: [
        { time: "09:00 - 11:00", event: "Arrival of teams, registration & badge distribution", location: "Satbayev University Main Building" },
        { time: "11:30 - 13:00", event: "Grand Opening Ceremony of ISM Olympiad", location: "Main Assembly Hall" },
        { time: "14:30 - 16:30", event: "Battle Rounds draw & Captains' technical briefing", location: "Conference Hall #2" }
      ]
    },
    {
      dayNumber: "Day 2",
      date: "October 25",
      title: "Stage II: Battle Rounds (Preliminary Debates)",
      rows: [
        { time: "09:30 - 13:00", event: "Session 1: Scientific Debates (Biology & Biochemistry)", location: "Rooms 301-305" },
        { time: "14:00 - 17:30", event: "Session 2: Scientific Debates (Physics & Materials Science)", location: "Rooms 301-305" }
      ]
    },
    {
      dayNumber: "Day 3",
      date: "October 26",
      title: "Stage II: Battle Rounds (Final Debates)",
      rows: [
        { time: "09:30 - 13:00", event: "Final Debate Rounds", location: "Small Hall" },
        { time: "14:30 - 16:00", event: "Announcement of 10 Finalist Teams for Practical Round", location: "Main Assembly Hall" },
        { time: "16:30 - 18:00", event: "Laboratory Safety & Equipment Orientation", location: "Laboratory Complex" }
      ]
    },
    {
      dayNumber: "Day 4",
      date: "October 27",
      title: "Practical Research Round (Day 1)",
      rows: [
        { time: "09:00 - 13:00", event: "Laboratory synthesis & physical-chemical measurements", location: "Synthetic Chemistry Lab" },
        { time: "14:00 - 18:00", event: "Instrumental analysis & spectrometry", location: "Advanced Research Center" }
      ]
    },
    {
      dayNumber: "Day 5",
      date: "October 28",
      title: "Practical Research Round (Day 2)",
      rows: [
        { time: "09:00 - 13:00", event: "Data processing, error analysis & final report preparation", location: "Coworking Space" },
        { time: "14:00 - 18:00", event: "Defense of practical reports before the Jury", location: "Academic Boardroom" }
      ]
    },
    {
      dayNumber: "Day 6",
      date: "October 29",
      title: "Closing Ceremony & Awards Presentation",
      rows: [
        { time: "11:00 - 13:30", event: "Closing Ceremony, Diplomas, Medals & Grand Prix Trophy", location: "Main Assembly Hall" },
        { time: "14:00 - 15:30", event: "Farewell reception & team departures", location: "Campus Grounds" }
      ]
    }
  ] as ScheduleDay[],

  awardsTiers: [
    { tier: "Grand Prix", teamsCount: "1 Team", reward: "Grand Prix Trophy & Absolute Winner Cup" },
    { tier: "Gold Award (I Degree)", teamsCount: "1 Team", reward: "Diploma I Degree + Gold Medals" },
    { tier: "Silver Awards (II Degree)", teamsCount: "2 Teams", reward: "Diplomas II Degree + Silver Medals" },
    { tier: "Bronze Awards (III Degree)", teamsCount: "3 Teams", reward: "Diplomas III Degree + Bronze Medals" },
    { tier: "Stage II Finalists", teamsCount: "All Finalist Teams", reward: "Official ISM Finalist Certificates" }
  ] as AwardTier[],

  regulationsSection: {
    title: "Official Olympiad Regulations",
    description: "The full text of the ISM Regulations contains rules, jury composition protocols, case evaluation criteria, and appeal procedures.",
    downloads: [
      { lang: "English Version (EN)", url: "/docs/ism-regulations-en.pdf" },
      { lang: "Russian Version (RU)", url: "/docs/ism-regulations-ru.pdf" },
      { lang: "Kazakh Version (KZ)", url: "/docs/ism-regulations-kz.pdf" }
    ]
  }
};
