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

export interface ContentStructure {
  meta: {
    shortName: string;
    fullName: string;
    tagline: string;
    targetGrades: string;
    teamSize: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    awardsNotice: string;
    regulationsPdfRu: string;
    regulationsPdfKz: string;
    regulationsPdfEn: string;
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
    titleSub: string;
    description: string;
    targetLabel: string;
    teamSizeLabel: string;
    venueLabel: string;
    registerBtn: string;
    regulationsBtn: string;
  };
  organizers: {
    coChairs: { name: string; title: string }[];
    committeeMembers: CommitteeMember[];
    juryInfo: {
      title: string;
      description: string;
    };
    institutionalSupport: {
      name: string;
      role: string;
      disclaimer: string;
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
      shortName: "ISM 2026",
      fullName: 'Team Interdisciplinary Olympiad in Laboratory Research and Case-Based Science "ISM 2026" (International Science Movement)',
      tagline: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science",
      targetGrades: "Grades 9–11 (12)",
      teamSize: "3–4 members + Team Advisor",
      location: "Almaty, Satbayev University",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Oskemen, Bilim Innovation Lyceum",
      awardsNotice: "Official Cups, Medals & Certificates",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      dateAnnouncementNote: "Exact tournament dates will be announced soon",
    },
    nav: {
      about: "About",
      format: "Format",
      caseSection: "Case",
      schedule: "Schedule",
      judges: "Committee & Jury",
      regulations: "Regulations",
      registerBtn: "Register Team",
    },
    hero: {
      badge: "International Science Movement | ISM 2025–2026",
      title: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science",
      titleSub: '"ISM"',
      description: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science in Biology, Chemistry, and Physics.",
      targetLabel: "Target",
      teamSizeLabel: "Team Size",
      venueLabel: "Venue",
      registerBtn: "Register Team",
      regulationsBtn: "Olympiad Regulations (PDF)",
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
        { name: "Elarys Erezhepuly", role: "Financial Manager", organization: "ISM Executive Board", badge: "Finance" },
        { name: "Mansur Tleubekov", role: "SMM Manager", organization: "ISM Executive Board", badge: "SMM & Media" },
        { name: "Rinat Kadylbekov", role: "Technical Manager", organization: "ISM Executive Board", badge: "Tech Manager" },
        { name: "Zhanbolat Omar", role: "Marketing Manager", organization: "ISM Executive Board", badge: "Marketing" },
        { name: "Nurmukhammed Marat", role: "Security Manager", organization: "ISM Executive Board", badge: "Security" },
        { name: "Zangar Seilkhanov", role: "HR Manager", organization: "ISM Executive Board", badge: "HR Manager" },
      ],
      juryInfo: {
        title: "Scientific Committee & Jury",
        description: "Panel of academic experts, professors, and laboratory researchers from Satbayev University and partner scientific institutions. Full jury roster to be announced prior to Stage I."
      },
      institutionalSupport: {
        name: "Oskemen Boys' Lyceum",
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
              desc: "Synchronous interdisciplinary problem-solving in a fixed time window. Strictly team-internal collaboration."
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
      title: "ISM 2025–2026 Research Case",
      code: "CASE-ISM-2026-01",
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
    ],
    awardsTiers: [
      { tier: "Grand Prix", teamsCount: "1 Team", reward: "Grand Prix Trophy & Absolute Winner Cup" },
      { tier: "Gold Award (I Degree)", teamsCount: "1 Team", reward: "Diploma I Degree + Gold Medals" },
      { tier: "Silver Awards (II Degree)", teamsCount: "2 Teams", reward: "Diplomas II Degree + Silver Medals" },
      { tier: "Bronze Awards (III Degree)", teamsCount: "3 Teams", reward: "Diplomas III Degree + Bronze Medals" },
      { tier: "Stage II Finalists", teamsCount: "All Finalist Teams", reward: "Official ISM Finalist Certificates" }
    ],
    regulationsSection: {
      title: "Official Olympiad Regulations",
      description: "The full text of the ISM Regulations contains rules, jury composition protocols, case evaluation criteria, and appeal procedures.",
      downloads: [
        { lang: "English Version (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Russian Version (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Kazakh Version (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    }
  },

  RU: {
    meta: {
      shortName: "ISM 2026",
      fullName: 'Командная Междисциплинарная Олимпиада по Лабораторным Исследованиям и Кейсам "ISM 2026" (International Science Movement)',
      tagline: "Командная Междисциплинарная Олимпиада по Лабораторным Исследованиям и Кейсам",
      targetGrades: "9–11 (12) классы",
      teamSize: "3–4 участника + Руководитель команды",
      location: "Алматы, Satbayev University",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Усть-Каменогорск, Bilim Innovation Lyceum",
      awardsNotice: "Официальные Кубки, Медали и Дипломы",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      dateAnnouncementNote: "Точные даты турнира будут объявлены в ближайшее время",
    },
    nav: {
      about: "Об олимпиаде",
      format: "Формат",
      caseSection: "Кейс",
      schedule: "Расписание",
      judges: "Комитет и Жюри",
      regulations: "Регламент",
      registerBtn: "Зарегистрировать команду",
    },
    hero: {
      badge: "Халықаралық Ғылыми Қозғалыс | ISM 2025–2026",
      title: "Командная Междисциплинарная Олимпиада по Лабораторным Исследованиям и Кейсам",
      titleSub: '"ISM"',
      description: "Командная Междисциплинарная Олимпиада по лабораторным исследованиям и научным кейсам по Биологии, Химии и Физике.",
      targetLabel: "Участники",
      teamSizeLabel: "Состав команды",
      venueLabel: "Место проведения",
      registerBtn: "Зарегистрировать команду",
      regulationsBtn: "Регламент олимпиады (PDF)",
    },
    organizers: {
      coChairs: [
        { name: "Нурислам Сайлаубек", title: "Сопредседатель Оргкомитета" },
        { name: "Нурмухаммед Кыдырмоллаулы", title: "Сопредседатель Оргкомитета" },
      ],
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
        description: "Коллегия академических экспертов, профессоров и лабораторных исследователей Satbayev University и партнерских научных институтов."
      },
      institutionalSupport: {
        name: "Oskemen Boys' Lyceum",
        role: "Организационная и институциональная поддержка",
        disclaimer: "Упоминание поддержки не создает финансовых обязательств для лицея.",
      },
      finalVenue: {
        name: "Satbayev University",
        city: "Алматы, Казахстан",
        address: "ул. Сатпаева 22, Кампус Satbayev University",
      }
    },
    aboutCards: [
      {
        id: "format",
        title: "Формат заданий",
        subtitle: "Исследовательский кейс + Олимпиадный тур",
        description: "I этап сочетает 10-дневный открытый исследовательский тур (работа с международными научными базами данных) и синхронное решение междисциплинарных задач."
      },
      {
        id: "goals",
        title: "Цели олимпиады",
        subtitle: "Практика и Научная этика",
        description: "Развитие навыков работы в химико-биологических и физических лабораториях, критического мышления и презентации научных результатов."
      },
      {
        id: "disciplines",
        title: "Дисциплины",
        subtitle: "Междисциплинарный синтез",
        description: "Биология, Химия и Физика в интеграции с прикладной математикой, статистикой, материаловедением и компьютерным моделированием."
      },
      {
        id: "team-structure",
        title: "Возраст и Состав",
        subtitle: "3–4 Участника + Руководитель",
        description: "Учащиеся 9–11 (12) классов. В составе команды: 3–4 участника, 1 Капитан и 1 Руководитель (учитель/наставник)."
      }
    ],
    formatDetails: {
      title: "Формат и Регламент Турнира",
      subtitle: "Подробная структура двух этапов олимпиады ISM",
      stages: [
        {
          id: "stage-1",
          number: "I Этап",
          name: "Онлайн-Отборочный Тур",
          timeframe: "Середина Сентября (Дистанционно)",
          description: "Отборочный этап (максимум 100 баллов), проводимый в онлайн-формате.",
          parts: [
            {
              name: "Часть (a): Исследовательский кейс (50 баллов)",
              desc: "Публикуется за ~10 дней до дедлайна. Разрешено использование научной литературы и баз данных (PubMed, SciDirect, Scopus). Требуется академическое цитирование."
            },
            {
              name: "Часть (b): Синхронный тур (50 баллов)",
              desc: "Решение междисциплинарных задач в фиксированное время. Исключительно внутрикомандная работа."
            }
          ]
        },
        {
          id: "stage-2",
          number: "II Этап",
          name: "Очный Финал",
          timeframe: "Конец Октября (~6 дней, Алматы)",
          description: "Очный финальный этап на базе кампуса Satbayev University.",
          parts: [
            {
              name: "Раунд 1: Научные бои (Battle Rounds)",
              desc: "Научные дискуссии и публичная защита решений исследовательского кейса. Топ-10 команд проходят в лабораторный тур."
            },
            {
              name: "Раунд 2: Практический лабораторный тур",
              desc: "2 дня работы в лабораториях Satbayev University: химический синтез, физические измерения, обработка данных и защита отчета."
            }
          ]
        }
      ],
      roleRules: [
        { role: "Капитан команды", rule: "Отвечает за регистрацию команды, официальную коммуникацию и своевременную сдачу отчетов." },
        { role: "Докладчик", rule: "Презентует решение кейса команды в ходе научных боев." },
        { role: "Оппонент", rule: "Анализирует решение оппонирующей команды, задает критические вопросы и ведет научный диалог." }
      ],
      presentationRequirements: [
        "Формат презентации: PDF / PPTX, строгий академический стиль",
        "Обязательное наличие схем экспериментов, графиков погрешностей и списка литературы",
        "Регламент выступления: 10–12 минут доклад + 8 минут сессия вопросов и ответов"
      ],
      integrityArticle8: {
        title: "Академическая честность и политика ИИ (Статья 8)",
        text: "Согласно Статье 8 Регламента ISM, использование любых инструментов генеративного ИИ (ChatGPT, Claude, Gemini, Copilot и др.) для решения задач, написания кода или расчетов строго ЗАПРЕЩЕНО на всех этапах. Плагиат ведет к немедленной дисквалификации команды."
      }
    },
    currentCase: {
      title: "Исследовательский Кейс ISM 2025–2026",
      code: "CASE-ISM-2026-01",
      status: "Публикация в Сентябре",
      description: "Комплексная междисциплинарная задача на стыке физической химии, молекулярной биологии и материаловедения. Требует теоретического моделирования, термодинамических расчетов и разработки экспериментального протокола.",
      requirements: [
        "Полный исследовательский отчет в формате PDF (макс. 15 страниц)",
        "Оформление списка литературы по стандартам APA/IEEE/ГОСТ",
        "Приложение с исходными расчетами и скриптами обработки"
      ]
    },
    scheduleDays: [
      {
        dayNumber: "День 1",
        date: "24 Октября",
        title: "Заезд, Регистрация и Открытие",
        rows: [
          { time: "09:00 - 11:00", event: "Заезд команд, регистрация и выдача бейджей", location: "Главный корпус Satbayev University" },
          { time: "11:30 - 13:00", event: "Торжественная церемония открытия ISM", location: "Актовый зал" },
          { time: "14:30 - 16:30", event: "Жеребьевка научных боев и брифинг капитанов", location: "Конференц-зал №2" }
        ]
      },
      {
        dayNumber: "День 2",
        date: "25 Октября",
        title: "II Этап: Научные бои (Отборочные)",
        rows: [
          { time: "09:30 - 13:00", event: "Сессия 1: Дискуссии (Биология и Биохимия)", location: "Кабинеты 301-305" },
          { time: "14:00 - 17:30", event: "Сессия 2: Дискуссии (Физика и Материаловедение)", location: "Кабинеты 301-305" }
        ]
      },
      {
        dayNumber: "День 3",
        date: "26 Октября",
        title: "II Этап: Научные бои (Финальные бои)",
        rows: [
          { time: "09:30 - 13:00", event: "Финальные раунды научных боев", location: "Малый зал" },
          { time: "14:30 - 16:00", event: "Объявление 10 команд-финалистов практического тура", location: "Актовый зал" },
          { time: "16:30 - 18:00", event: "Инструктаж по технике безопасности в лабораториях", location: "Лабораторный комплекс" }
        ]
      },
      {
        dayNumber: "День 4",
        date: "27 Октября",
        title: "Практический лабораторный тур (День 1)",
        rows: [
          { time: "09:00 - 13:00", event: "Лабораторный синтез и физико-химические измерения", location: "Лаборатория синтеза" },
          { time: "14:00 - 18:00", event: "Инструментальный анализ и спектрометрия", location: "Центр научных исследований" }
        ]
      },
      {
        dayNumber: "День 5",
        date: "28 Октября",
        title: "Практический лабораторный тур (День 2)",
        rows: [
          { time: "09:00 - 13:00", event: "Обработка данных, анализ погрешностей и подготовка отчета", location: "Коворкинг" },
          { time: "14:00 - 18:00", event: "Защита практических отчетов перед Жюри", location: "Зал Ученого совета" }
        ]
      },
      {
        dayNumber: "День 6",
        date: "29 Октября",
        title: "Церемония закрытия и Награждение",
        rows: [
          { time: "11:00 - 13:30", event: "Церемония закрытия, вручение дипломов, медалей и Гран-при", location: "Актовый зал" },
          { time: "14:00 - 15:30", event: "Фуршет и отъезд команд", location: "Территория кампуса" }
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
      title: "Официальный Регламент Олимпиады",
      description: "Полный текст Регламента ISM содержит правила, состав жюри, критерии оценивания кейсов и порядок апелляций.",
      downloads: [
        { lang: "Английская версия (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Русская версия (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Казахская версия (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    }
  },

  KZ: {
    meta: {
      shortName: "ISM 2026",
      fullName: 'Зертханалық Зерттеулер мен Кейстер бойынша Коммандалық Пәнаралық Олимпиада "ISM 2026"',
      tagline: "Зертханалық Зерттеулер мен Кейстер бойынша Коммандалық Пәнаралық Олимпиада",
      targetGrades: "9–11 (12) сыныптар",
      teamSize: "3–4 қатысушы + Топ жетекшісі",
      location: "Алматы, Satbayev University",
      contactEmail: "info.ism.olympiad@gmail.com",
      contactPhone: "+7 702 861 8611",
      contactAddress: "Өскемен, Bilim Innovation Lyceum",
      awardsNotice: "Ресми кубоктар, медальдар және дипломдар",
      regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
      regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
      regulationsPdfEn: "/docs/ism-regulations-en.pdf",
      dateAnnouncementNote: "Турнирдің нақты мерзімдері жақында жарияланады",
    },
    nav: {
      about: "Олимпиада туралы",
      format: "Формат",
      caseSection: "Кейс",
      schedule: "Кесте",
      judges: "Комитет пен Қазылар",
      regulations: "Ережелер",
      registerBtn: "Топты тіркеу",
    },
    hero: {
      badge: "Халықаралық Ғылыми Қозғалыс | ISM 2025–2026",
      title: "Зертханалық Зерттеулер мен Кейстер бойынша Коммандалық Пәнаралық Олимпиада",
      titleSub: '"ISM"',
      description: "Биология, Химия және Физика пәндері бойынша зертханалық зерттеулер мен ғылыми кейстерге арналған командалық олимпиада.",
      targetLabel: "Қатысушылар",
      teamSizeLabel: "Топ құрамы",
      venueLabel: "Өтетін орны",
      registerBtn: "Топты тіркеу",
      regulationsBtn: "Олимпиада ережесі (PDF)",
    },
    organizers: {
      coChairs: [
        { name: "Нұрислам Сайлаубек", title: "Ұйымдастыру комитетінің тең төрағасы" },
        { name: "Нұрмұхаммед Қыдырмоллаұлы", title: "Ұйымдастыру комитетінің тең төрағасы" },
      ],
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
        description: "Satbayev University профессорлары, ғылыми сарапшылары мен зертханашыларынан құралған қазылар алқасы."
      },
      institutionalSupport: {
        name: "Oskemen Boys' Lyceum",
        role: "Ұйымдастырушылық және институционалдық қолдау",
        disclaimer: "Колледж тарапынан қолдау көрсетілуі лицей үшін қаржылық міндеттемелер тудырмайды.",
      },
      finalVenue: {
        name: "Satbayev University",
        city: "Алматы, Қазақстан",
        address: "Сәтбаев көшесі 22, Satbayev University кампусы",
      }
    },
    aboutCards: [
      {
        id: "format",
        title: "Тапсырма форматы",
        subtitle: "Зерттеу кейсі + Синхронды тур",
        description: "I кезең 10 күндік ашық ғылыми зерттеу туры мен пәнаралық есептерді шешудің синхронды турын біріктіреді."
      },
      {
        id: "goals",
        title: "Олимпиада мақсаты",
        subtitle: "Зертхана және Ғылыми әдеп",
        description: "Оқушылардың зертханалық дағдыларын, ғылыми ойлауын және нәтижелерді қорғау қабілетін дамыту."
      },
      {
        id: "disciplines",
        title: "Пәндер",
        subtitle: "Пәнаралық синтез",
        description: "Биология, Химия және Физика пәндерінің қолданбалы математика, статистика және материалтанумен интеграциясы."
      },
      {
        id: "team-structure",
        title: "Жас мөлшері мен Құрамы",
        subtitle: "3–4 Қатысушы + Жетекші",
        description: "9–11 (12) сынып оқушылары. Топ құрамында: 3–4 қатысушы, 1 Капитан және 1 Жетекші (мұғалім)."
      }
    ],
    formatDetails: {
      title: "Турнир форматы мен Ережесі",
      subtitle: "ISM олимпиадасының екі кезеңінің толық құрылымы",
      stages: [
        {
          id: "stage-1",
          number: "I Кезең",
          name: "Онлайн іріктеу туры",
          timeframe: "Қыркүйек ортасы (Онлайн)",
          description: "100 балдық іріктеу кезеңі қашықтан өткізіледі.",
          parts: [
            {
              name: "(a) бөлігі: Зерттеу кейсі (50 балл)",
              desc: "Тапсырма мерзімге 10 күн қалғанда жарияланады. Ғылыми әдебиеттер мен дерекқорларды (PubMed, Scopus) пайдалануға рұқсат етіледі."
            },
            {
              name: "(b) бөлігі: Синхронды тур (50 балл)",
              desc: "Белгіленген уақытта пәнаралық тапсырмаларды топпен шешу."
            }
          ]
        },
        {
          id: "stage-2",
          number: "II Кезең",
          name: "Офлайн Финал",
          timeframe: "Қазан соңы (~6 күн, Алматы)",
          description: "Satbayev University кампусында өтетін финалдық кезең.",
          parts: [
            {
              name: "1-раунд: Ғылыми жекпе-жектер (Battle Rounds)",
              desc: "Кейс шешімдерін ғылыми пікірталаста қорғау. Үздік 10 команда зертханалық турға өтеді."
            },
            {
              name: "2-раунд: Практикалық зертханалық тур",
              desc: "Satbayev University зертханаларында 2 күндік практикалық жұмыс: химиялық синтез, физикалық өлшеулер және есепті қорғау."
            }
          ]
        }
      ],
      roleRules: [
        { role: "Топ капитаны", rule: "Тіркелуге, ресми байланысқа және есептерді уақытылы тапсыруға жауапты." },
        { role: "Баяндамашы", rule: "Ғылыми жекпе-жекте топтың кейс шешімін ұсынады." },
        { role: "Оппонент", rule: "Қарсыластар шешімін талдап, сұрақтар қояды және пікірталасты жүргізеді." }
      ],
      presentationRequirements: [
        "Презентация форматы: PDF / PPTX, академикалық стиль",
        "Эксперимент схемалары мен дереккөздер тізімі міндетті",
        "Уақыт регламенті: 10–12 минут баяндама + 8 минут сұрақ-жауап"
      ],
      integrityArticle8: {
        title: "Академиялық адалдық және ЖИ саясаты (8-бап)",
        text: "ISM ережелерінің 8-бабына сәйкес, кез келген генеративті ЖИ құралдарын (ChatGPT, Claude, Gemini т.б.) пайдалануға қатаң ТЫЙЫМ САЛЫНАДЫ. Плагиат топты жарыстан шеттетуге әкеледі."
      }
    },
    currentCase: {
      title: "ISM 2025–2026 Зерттеу Кейсі",
      code: "CASE-ISM-2026-01",
      status: "Қыркүйек айында жарияланады",
      description: "Физикалық химия, молекулалық биология және материалтану тоғысындағы кешенді пәнаралық тапсырма.",
      requirements: [
        "PDF форматындағы толық ғылыми есеп (макс. 15 бет)",
        "Академиялық сілтемелер форматы (APA/IEEE/ГОСТ)",
        "Есептеулер мен деректерді өңдеу скрипттері бар қосымша"
      ]
    },
    scheduleDays: [
      {
        dayNumber: "1-күн",
        date: "24 Қазан",
        title: "Келу, Тіркелу және Ашылу салтанаты",
        rows: [
          { time: "09:00 - 11:00", event: "Командалардың келуі, тіркеу және бейдждерді тарату", location: "Satbayev University Бас ғимараты" },
          { time: "11:30 - 13:00", event: "ISM Олимпиадасының ашылу салтанаты", location: "Ақ зал" },
          { time: "14:30 - 16:30", event: "Жедебе тастау және капитандар нұсқаулығы", location: "Конференция залы №2" }
        ]
      },
      {
        dayNumber: "2-күн",
        date: "25 Қазан",
        title: "II Кезең: Ғылыми жекпе-жектер (Іріктеу)",
        rows: [
          { time: "09:30 - 13:00", event: "1-сессия: Пікірталас (Биология мен Биохимия)", location: "301-305 бөлмелер" },
          { time: "14:00 - 17:30", event: "2-сессия: Пікірталас (Физика мен Материалтану)", location: "301-305 бөлмелер" }
        ]
      },
      {
        dayNumber: "3-күн",
        date: "26 Қазан",
        title: "II Кезең: Ғылыми жекпе-жектер (Финалдық раундтар)",
        rows: [
          { time: "09:30 - 13:00", event: "Финалдық жекпе-жектер", location: "Кіші зал" },
          { time: "14:30 - 16:00", event: "Практикалық турға өткен 10 финалист топты хабарлау", location: "Ақ зал" },
          { time: "16:30 - 18:00", event: "Зертханалық қауіпсіздік нұсқаулығы", location: "Зертхана кешені" }
        ]
      },
      {
        dayNumber: "4-күн",
        date: "27 Қазан",
        title: "Практикалық зертханалық тур (1-күн)",
        rows: [
          { time: "09:00 - 13:00", event: "Зертханалық синтез және физико-химиялық өлшеулер", location: "Синтез зертханасы" },
          { time: "14:00 - 18:00", event: "Аспаптық талдау мен спектрометрия", location: "Ғылыми зерттеу орталығы" }
        ]
      },
      {
        dayNumber: "5-күн",
        date: "28 Қазан",
        title: "Практикалық зертханалық тур (2-күн)",
        rows: [
          { time: "09:00 - 13:00", event: "Деректерді өңдеу және есеп дайындау", location: "Коворкинг" },
          { time: "14:00 - 18:00", event: "Практикалық есептерді Қазылар алдында қорғау", location: "Ғылыми кеңес залы" }
        ]
      },
      {
        dayNumber: "6-күн",
        date: "29 Қазан",
        title: "Жабылу салтанаты мен Марапаттау",
        rows: [
          { time: "11:00 - 13:30", event: "Марапаттау, дипломдар мен медалдар тапсыру", location: "Ақ зал" },
          { time: "14:00 - 15:30", event: "Қоштасу фуршеті мен топтардың қайтуы", location: "Кампус аумағы" }
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
      title: "Олимпиаданың ресми Ережесі",
      description: "ISM Ережелерінің толық матнінде қазылар құрамы, бағалау критерийлері мен шағымдану тәртібі көрсетілген.",
      downloads: [
        { lang: "Ағылшын нұсқасы (EN)", url: "/docs/ism-regulations-en.pdf" },
        { lang: "Орыс нұсқасы (RU)", url: "/docs/ism-regulations-ru.pdf" },
        { lang: "Қазақ нұсқасы (KZ)", url: "/docs/ism-regulations-kz.pdf" }
      ]
    }
  }
};
