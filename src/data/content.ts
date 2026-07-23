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

export interface Judge {
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
    tagline: "Командная интердисциплинарная олимпиада по лабораторным исследованиям и научным кейсам",
    targetGrades: "9–11 классы",
    teamSize: "3–4 человека + руководитель",
    location: "Almaty, Satbayev University",
    prizeFundNotice: "Призовой фонд и гранты от партнеров олимпиады",
    regulationsPdfRu: "/docs/ism-regulations-ru.pdf",
    regulationsPdfKz: "/docs/ism-regulations-kz.pdf",
    regulationsPdfEn: "/docs/ism-regulations-en.pdf",
    dateAnnouncementNote: "Точные даты будут объявлены дополнительно",
  },
  
  organizers: {
    coChairs: [
      { name: "Nurislam Sailaubek", title: "Сопредседатель оргкомитета ISM" },
      { name: "Nurmukhammed Kydyrmollauly", title: "Сопредседатель оргкомитета ISM" },
    ],
    institutionalSupport: {
      name: "Oskemen Boys' Lyceum (Өскемен ұлдарға арналған лицейі)",
      role: "Организационная и институциональная поддержка",
      disclaimer: "Упоминание институциональной поддержки не создает финансовых обязательств лицея.",
    },
    finalVenue: {
      name: "Satbayev University",
      city: "г. Алматы",
      address: "ул. Сатпаева 22, кампус Satbayev University",
    }
  },

  aboutCards: [
    {
      id: "format",
      title: "Формат заданий",
      subtitle: "Кейс + Тайминговый раунд",
      description: "Отборочный этап сочетает 10-дневное открытое научное исследование (с использованием научной литературы и баз данных) и экспресс-раунд решения задач в фиксированном окне."
    },
    {
      id: "goals",
      title: "Цели олимпиады",
      subtitle: "Практика и научная этика",
      description: "Развитие лабораторных навыков, научного мышления и командного взаимодействия. Подготовка школьников к международным соревнованиям и работе в исследовательских лабораториях."
    },
    {
      id: "disciplines",
      title: "Дисциплины",
      subtitle: "Интердисциплинарный синтез",
      description: "Биология, химия и физика в интеграции с прикладной математикой, статистикой, материаловедением и инженерно-вычислительными методами."
    },
    {
      id: "team-structure",
      title: "Возраст и состав команды",
      subtitle: "3–4 участника + Наставник",
      description: "Учащиеся 9–11 классов (8 класс по заявке). Команда включает 3–4 участника, Капитана и Руководителя (учителя). Один участник может состоять только в одной команде за сезон."
    }
  ],

  formatDetails: {
    title: "Этапы и регламент проведения",
    subtitle: "Подробный регламент двух этапов олимпиады ISM",
    stages: [
      {
        id: "stage-1",
        number: "Stage I",
        name: "Online Selection Round",
        timeframe: "Середина сентября (онлайн)",
        description: "Отборочный этап на 100 баллов, проводимый дистанционно.",
        parts: [
          {
            name: "Часть (a): Research Case (50 баллов)",
            desc: "Публикуется за 10 дней до дедлайна. Разрешены научная литература и базы данных (PubMed, SciDirect, Scopus). Все источники должны содержать строгие научные ссылки."
          },
          {
            name: "Часть (b): Timed Round (50 баллов)",
            desc: "Синхронное решение междисциплинарных задач в фиксированном временном окне (обычно в субботу). Только внутрикомандное взаимодействие."
          }
        ]
      },
      {
        id: "stage-2",
        number: "Stage II",
        name: "On-Site Final Round",
        timeframe: "Конец октября (~6 дней, Алматы)",
        description: "Очный финал на базе Satbayev University.",
        parts: [
          {
            name: "Round 1: Battle Rounds",
            desc: "Научные бои и публичная защита отборочных решений. По итогам ораторских дебатов отбираются ~10 лучших команд."
          },
          {
            name: "Round 2: Practical Research Round",
            desc: "2 дня работы в лабораториях Satbayev University: физико-химический синтез, приборные измерения, обработка данных и защита научного отчета."
          }
        ]
      }
    ],
    roleRules: [
      { role: "Team Captain", rule: "Отвечает за регистрацию, координацию команды и своевременную загрузку всех официальных отчетов." },
      { role: "Speaker (Докладчик)", rule: "Презентует научно-исследовательское решение команды во время Battle Rounds." },
      { role: "Opponent (Оппонент)", rule: "Анализирует решение команды-соперника, задает критические научные вопросы и ведет полемику." }
    ],
    presentationRequirements: [
      "Формат презентаций: PDF / PPTX, строгий академический стиль",
      "Обязательное включение схемы эксперимента, графиков погрешностей и списка цитируемой литературы",
      "Ограничение времени доклада: 10–12 минут на выступление + 8 минут ответы на вопросы"
    ],
    integrityArticle8: {
      title: "Академическая честность и ИИ (Article 8)",
      text: "Согласно Статье 8 Положения ISM, использование любых генеративных ИИ-инструментов (ChatGPT, Claude, Gemini, Copilot и др.) для решения задач, написания кода, перевода или расчетов строго ЗАПРЕЩЕНО на всех этапах, за исключением случаев, когда это явно разрешено в тексте конкретного задания. Плагиат и внешняя помощь ведут к немедленной дисквалификации."
    }
  },

  currentCase: {
    title: "Научно-исследовательский кейс ISM 2024–2025",
    code: "CASE-ISM-2024-01",
    status: "Анонс / Публикация в сентябре",
    description: "Комплексная междисциплинарная задача на стыке физической химии, молекулярной биологии и функционального материаловедения. Требует теоретического моделирования, вычисления термодинамических параметров и разработки схемы лабораторного эксперимента.",
    requirements: [
      "Полный научный отчет в формате PDF (не более 15 страниц)",
      "Оформление списка литературы по стандарту ГОСТ/APA",
      "Приложение с исходными расчетами и скриптами обработки данных"
    ]
  },

  scheduleDays: [
    {
      dayNumber: "День 1",
      date: "24 Октября",
      title: "Регистрация и открытие",
      rows: [
        { time: "09:00 - 11:00", event: "Заезд участников, регистрация и выдача бейджей", location: "Главный корпус Satbayev University" },
        { time: "11:30 - 13:00", event: "Торжественное открытие олимпиады ISM", location: "Актовый зал" },
        { time: "14:30 - 16:30", event: "Жеребьевка Battle Rounds и технический брифинг капитанов", location: "Конференц-зал №2" }
      ]
    },
    {
      dayNumber: "День 2",
      date: "25 Октября",
      title: "Stage II: Battle Rounds (Отборочные бои)",
      rows: [
        { time: "09:30 - 13:00", event: "Сессия 1: Научные дебаты (Биология и Биохимия)", location: "Аудитории 301-305" },
        { time: "14:00 - 17:30", event: "Сессия 2: Научные дебаты (Физика и Материаловедение)", location: "Аудитории 301-305" }
      ]
    },
    {
      dayNumber: "День 3",
      date: "26 Октября",
      title: "Stage II: Battle Rounds (Финал дебатов)",
      rows: [
        { time: "09:30 - 13:00", event: "Финальные бои дебатного раунда", location: "Малый зал" },
        { time: "14:30 - 16:00", event: "Объявление 10 команд-финалистов практического раунда", location: "Актовый зал" },
        { time: "16:30 - 18:00", event: "Инструктаж по технике безопасности в лабораториях", location: "Лабораторный комплекс" }
      ]
    },
    {
      dayNumber: "День 4",
      date: "27 Октября",
      title: "Practical Research Round (День 1)",
      rows: [
        { time: "09:00 - 13:00", event: "Лабораторный синтез и измерение физико-химических свойств", location: "Лаборатория синтетической химии" },
        { time: "14:00 - 18:00", event: "Приборный анализ и спектрометрия", location: "Центр коллективного пользования" }
      ]
    },
    {
      dayNumber: "День 5",
      date: "28 Октября",
      title: "Practical Research Round (День 2)",
      rows: [
        { time: "09:00 - 13:00", event: "Обработка данных, метрология и написание финального отчета", location: "Коворкинг Satbayev Univ." },
        { time: "14:00 - 18:00", event: "Защита практических отчетов перед Жюри", location: "Зал ученого совета" }
      ]
    },
    {
      dayNumber: "День 6",
      date: "29 Октября",
      title: "Закрытие и Награждение",
      rows: [
        { time: "11:00 - 13:30", event: "Церемония закрытия, вручение дипломов, медалей и Grand Prix", location: "Главный актовый зал" },
        { time: "14:00 - 15:30", event: "Праздничный фуршет и отъезд участников", location: "Кампус" }
      ]
    }
  ] as ScheduleDay[],

  judges: [
    {
      name: "Nurislam Sailaubek",
      role: "Сопредседатель оргкомитета",
      organization: "International Science Movement",
      badge: "Оргкомитет"
    },
    {
      name: "Nurmukhammed Kydyrmollauly",
      role: "Сопредседатель оргкомитета",
      organization: "International Science Movement",
      badge: "Оргкомитет"
    },
    {
      name: "Д-р хим. наук Алматов А.К.",
      role: "Председатель методической комиссии",
      organization: "Satbayev University",
      badge: "Методический совет"
    },
    {
      name: "PhD Сейткалиева Б.Р.",
      role: "Эксперт по биологии и биохимии",
      organization: "Институт молекулярной биологии",
      badge: "Жюри"
    },
    {
      name: "PhD Жумаканов Е.М.",
      role: "Эксперт по экспериментальной физике",
      organization: "Satbayev University",
      badge: "Жюри"
    },
    {
      name: "Представитель Oskemen Lyceum",
      role: "Координатор институциональной поддержки",
      organization: "Oskemen Boys' Lyceum",
      badge: "Партнеры"
    }
  ] as Judge[],

  awardsTiers: [
    { tier: "Grand Prix", teamsCount: "1 команда", reward: "Кубок Абсолютного Победителя + Грант" },
    { tier: "Gold Award (I степень)", teamsCount: "1 команда", reward: "Диплом I степени + Золотые медали" },
    { tier: "Silver Awards (II степень)", teamsCount: "2 команды", reward: "Дипломы II степени + Серебряные медали" },
    { tier: "Bronze Awards (III степень)", teamsCount: "3 команды", reward: "Дипломы III степени + Бронзовые медали" },
    { tier: "Финалисты Stage II", teamsCount: "Все команды-финалисты", reward: "Официальные сертификаты участников ISM" }
  ] as AwardTier[],

  regulationsSection: {
    title: "Официальный регламент олимпиады",
    description: "Полный текст Положения о проведении олимпиады ISM содержит юридические правила, порядок формирования жюри, критерии оценивания кейсов и правила подач апелляций.",
    downloads: [
      { lang: "На русском языке (RU)", url: "/docs/ism-regulations-ru.pdf" },
      { lang: "На казахском языке (KZ)", url: "/docs/ism-regulations-kz.pdf" },
      { lang: "На английском языке (EN)", url: "/docs/ism-regulations-en.pdf" }
    ]
  }
};
