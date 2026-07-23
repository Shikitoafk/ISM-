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
    about: string;
    format: string;
    caseSection: string;
    schedule: string;
    judges: string;
    regulations: string;
    registerBtn: string;
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
      about: "About",
      format: "Format & Criteria",
      caseSection: "Case",
      schedule: "Schedule",
      judges: "Committee & Jury",
      regulations: "Regulations & Waivers",
      registerBtn: "Register Team",
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
        { name: "Elarys Erezhepuly", role: "Financial Manager", organization: "ISM Executive Board", badge: "Finance" },
        { name: "Mansur Tleubekov", role: "SMM Manager", organization: "ISM Executive Board", badge: "SMM & Media" },
        { name: "Rinat Kadylbekov", role: "Technical Manager", organization: "ISM Executive Board", badge: "Tech Manager" },
        { name: "Zhanbolat Omar", role: "Marketing Manager", organization: "ISM Executive Board", badge: "Marketing" },
        { name: "Nurmukhammed Marat", role: "Security Manager", organization: "ISM Executive Board", badge: "Security" },
        { name: "Zangar Seilkhanov", role: "HR Manager", organization: "ISM Executive Board", badge: "HR Manager" },
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
    }
  },

  RU: {
    meta: {
      shortName: "ISM",
      fullName: "ISM - International Science Movement",
      tagline: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
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
      about: "Об олимпиаде",
      format: "Формат и Критерии",
      caseSection: "Кейс",
      schedule: "Расписание",
      judges: "Комитет и Жюри",
      regulations: "Регламент и Формы",
      registerBtn: "Зарегистрировать команду",
    },
    hero: {
      badge: "ISM 2025–2026",
      title: "ISM - International Science Movement",
      subtitle: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
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
    }
  },

  KZ: {
    meta: {
      shortName: "ISM",
      fullName: "ISM - International Science Movement",
      tagline: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
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
      about: "Олимпиада туралы",
      format: "Формат пен Бағалау",
      caseSection: "Кейс",
      schedule: "Кесте",
      judges: "Комитет пен Қазылар",
      regulations: "Ережелер мен Бланктер",
      registerBtn: "Топты тіркеу",
    },
    hero: {
      badge: "ISM 2025–2026",
      title: "ISM - International Science Movement",
      subtitle: "International Interdisciplinary Olympiad in Laboratory Research and Case-based Science",
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
    }
  }
};
