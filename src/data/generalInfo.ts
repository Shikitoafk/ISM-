import { Language } from "./translations";

type GeneralInfo = {
  badge: string;
  title: string;
  intro: string;
  highlights: { value: string; label: string }[];
  overviewTitle: string;
  overview: string;
  disciplinesTitle: string;
  disciplines: string[];
  eligibilityTitle: string;
  eligibility: string[];
  stagesTitle: string;
  stages: { number: string; title: string; text: string }[];
  scoringTitle: string;
  scoring: { title: string; text: string }[];
  battleTitle: string;
  battleText: string;
  roles: { title: string; text: string }[];
  calendarTitle: string;
  calendar: { date: string; title: string; text: string }[];
  integrityTitle: string;
  integrity: string[];
  regulations: string;
};

export const generalInfo: Record<Language, GeneralInfo> = {
  EN: {
    badge: "ISM 2026 · General Information",
    title: "International Science Movement",
    intro: "An international team-based interdisciplinary olympiad in laboratory research, scientific cases and scientific battles.",
    highlights: [{ value: "3–4", label: "students per team" }, { value: "24 → 8", label: "on-site progression" }, { value: "EN", label: "competition language" }, { value: "UTC+5", label: "official time" }],
    overviewTitle: "What is ISM?",
    overview: "ISM challenges teams to investigate, reason and communicate like scientists. The competition combines biology, chemistry and physics with mathematics, statistics, materials science, engineering analysis and other interdisciplinary methods.",
    disciplinesTitle: "What teams do",
    disciplines: ["Solve research cases and defend solutions", "Tackle olympiad-level STEM problems", "Present, oppose and review in Scientific Battles", "Conduct laboratory research, process data and defend findings"],
    eligibilityTitle: "Who can participate",
    eligibility: ["Students in grades 9–11", "Grade 12 students in a 12-year education system", "Grade 8 only by exceptional Organizing Committee decision", "A team has 3–4 active members and appoints a captain"],
    stagesTitle: "Competition path",
    stages: [{ number: "01", title: "Online Selection", text: "Research case solution and defense plus two proctored STEM problem-solving rounds. The top 24 teams advance." }, { number: "02", title: "On-Site Qualification", text: "24 teams complete four Scientific Battle rounds and an on-site STEM problem-solving round. The top 8 advance." }, { number: "03", title: "Final Research Round", text: "Eight finalist teams undertake laboratory research, process data and publicly defend their results." }],
    scoringTitle: "How results are formed",
    scoring: [{ title: "Online Selection", text: "70% research case and defense · 30% two problem-solving rounds" }, { title: "Qualification Round", text: "80% four Scientific Battle rounds · 20% on-site problem-solving round" }, { title: "Scientific Battle", text: "One complete round: Presenter up to 30 · Opponent up to 20 · Reviewer up to 10" }],
    battleTitle: "Scientific Battles",
    battleText: "Three teams meet in each battle and rotate through all roles. One battle lasts up to 60 minutes; a complete group round of three battles lasts up to 180 minutes.",
    roles: [{ title: "Presenter", text: "Explains and defends the solution, methods, evidence and conclusions." }, { title: "Opponent", text: "Critically analyses the work, asks substantive questions and proposes improvements." }, { title: "Reviewer", text: "Assesses both sides, identifies unresolved issues and gives a neutral conclusion." }],
    calendarTitle: "Preliminary calendar · 2026",
    calendar: [{ date: "11 Oct", title: "Online research case published", text: "Released through official ISM resources." }, { date: "17–18 Oct", title: "Online problem-solving rounds", text: "Two 2-hour proctored rounds on Formative." }, { date: "25 Oct", title: "Arrival and accommodation", text: "Registration, check-in and briefing." }, { date: "26–28 Oct", title: "Qualification Round", text: "Scientific Battles and on-site STEM round for 24 teams." }, { date: "29–30 Oct", title: "Final Research Round", text: "Laboratory research for 8 finalist teams." }, { date: "1 Nov", title: "Closing and awards", text: "Official closing ceremony." }],
    integrityTitle: "Important rules",
    integrity: ["All competitive work must be the independent work of the registered team.", "Generative AI is prohibited unless a task explicitly permits a defined tool in writing.", "Sources, methods and data must be cited and verifiable.", "English is the official language of all competitive stages.", "Safety instructions and required personal protective equipment are mandatory in laboratory work."],
    regulations: "Read the full regulations",
  },
  RU: {
    badge: "ISM 2026 · Общая информация",
    title: "International Science Movement",
    intro: "Международная командная междисциплинарная олимпиада по лабораторным исследованиям, научным кейсам и научным боям.",
    highlights: [{ value: "3–4", label: "участника в команде" }, { value: "24 → 8", label: "отбор в очном финале" }, { value: "EN", label: "язык соревнования" }, { value: "UTC+5", label: "официальное время" }],
    overviewTitle: "Что такое ISM?",
    overview: "ISM предлагает командам исследовать, рассуждать и выступать как учёные. Олимпиада объединяет биологию, химию и физику с математикой, статистикой, материаловедением, инженерным анализом и другими междисциплинарными методами.",
    disciplinesTitle: "Что делают команды",
    disciplines: ["Решают исследовательские кейсы и защищают решения", "Решают олимпиадные задачи по STEM", "Выступают, оппонируют и рецензируют в научных боях", "Проводят лабораторные исследования, обрабатывают данные и защищают результаты"],
    eligibilityTitle: "Кто может участвовать",
    eligibility: ["Учащиеся 9–11 классов", "Учащиеся 12 класса в 12-летней системе образования", "Учащиеся 8 класса — только по отдельному решению оргкомитета", "В команде 3–4 активных участника, один из них — капитан"],
    stagesTitle: "Путь команды",
    stages: [{ number: "01", title: "Онлайн-отбор", text: "Решение и защита исследовательского кейса, а также два прокторируемых STEM-тура. В очный этап проходят 24 команды." }, { number: "02", title: "Очный квалификационный раунд", text: "24 команды проходят четыре раунда научных боёв и очный STEM-тур. В финал выходят 8 команд." }, { number: "03", title: "Финальный исследовательский раунд", text: "Восемь финалистов проводят лабораторное исследование, обрабатывают данные и публично защищают результаты." }],
    scoringTitle: "Как формируются результаты",
    scoring: [{ title: "Онлайн-отбор", text: "70% — кейс и его защита · 30% — два тура задач" }, { title: "Квалификационный раунд", text: "80% — четыре раунда научных боёв · 20% — очный тур задач" }, { title: "Научный бой", text: "Полный раунд: Докладчик до 30 · Оппонент до 20 · Рецензент до 10 баллов" }],
    battleTitle: "Научные бои",
    battleText: "В одном бою участвуют три команды, которые меняются ролями. Один бой длится до 60 минут; полный групповой раунд из трёх боёв — до 180 минут.",
    roles: [{ title: "Докладчик", text: "Представляет и защищает решение, методы, доказательства и выводы." }, { title: "Оппонент", text: "Критически анализирует работу, задаёт содержательные вопросы и предлагает улучшения." }, { title: "Рецензент", text: "Оценивает обе стороны, отмечает нерешённые вопросы и формулирует нейтральный вывод." }],
    calendarTitle: "Предварительный календарь · 2026",
    calendar: [{ date: "11 окт", title: "Публикация онлайн-кейса", text: "Публикуется на официальных ресурсах ISM." }, { date: "17–18 окт", title: "Онлайн-туры задач", text: "Два 2-часовых тура на Formative с прокторингом." }, { date: "25 окт", title: "Заезд и размещение", text: "Регистрация, заселение и организационный брифинг." }, { date: "26–28 окт", title: "Квалификационный раунд", text: "Научные бои и очный STEM-тур для 24 команд." }, { date: "29–30 окт", title: "Финальный исследовательский раунд", text: "Лабораторное исследование для 8 команд-финалистов." }, { date: "1 ноя", title: "Закрытие и награждение", text: "Официальная церемония закрытия." }],
    integrityTitle: "Важные правила",
    integrity: ["Все конкурсные работы должны быть самостоятельной работой зарегистрированной команды.", "Генеративный ИИ запрещён, если задание письменно не разрешает конкретный инструмент.", "Источники, методы и данные должны быть указаны и проверяемы.", "Официальный язык всех конкурсных этапов — английский.", "В лаборатории обязательны инструкции по безопасности и необходимые средства защиты."],
    regulations: "Открыть полный регламент",
  },
  KZ: {
    badge: "ISM 2026 · Жалпы ақпарат",
    title: "International Science Movement",
    intro: "Зертханалық зерттеулер, ғылыми кейстер және ғылыми сайыстар бойынша халықаралық командалық пәнаралық олимпиада.",
    highlights: [{ value: "3–4", label: "топтағы қатысушы" }, { value: "24 → 8", label: "офлайн финал іріктеуі" }, { value: "EN", label: "жарыс тілі" }, { value: "UTC+5", label: "ресми уақыт" }],
    overviewTitle: "ISM деген не?",
    overview: "ISM топтарға ғалымдар секілді зерттеуге, дәлелдеуге және сөйлеуге мүмкіндік береді. Олимпиада биология, химия және физиканы математикамен, статистикамен, материалтанумен, инженерлік талдаумен және басқа пәнаралық әдістермен біріктіреді.",
    disciplinesTitle: "Топтар не істейді",
    disciplines: ["Зерттеу кейстерін шешіп, шешімдерін қорғайды", "STEM бойынша олимпиадалық тапсырмаларды орындайды", "Ғылыми сайыстарда баяндайды, оппонент болады және рецензиялайды", "Зертханалық зерттеу жүргізіп, деректерді өңдеп, нәтижесін қорғайды"],
    eligibilityTitle: "Кім қатыса алады",
    eligibility: ["9–11 сынып оқушылары", "12 жылдық білім беру жүйесіндегі 12 сынып оқушылары", "8 сынып оқушылары — тек ұйымдастыру комитетінің ерекше шешімімен", "Топта 3–4 белсенді қатысушы болады, олардың бірі — капитан"],
    stagesTitle: "Топтың жолы",
    stages: [{ number: "01", title: "Онлайн іріктеу", text: "Зерттеу кейсін шешу және қорғау, сондай-ақ прокторингпен екі STEM туры. Офлайн кезеңге 24 топ өтеді." }, { number: "02", title: "Офлайн іріктеу раунды", text: "24 топ төрт ғылыми сайыс раундынан және офлайн STEM турынан өтеді. Финалға 8 топ шығады." }, { number: "03", title: "Финалдық зерттеу раунды", text: "Сегіз финалист зертханалық зерттеу жүргізіп, деректерді өңдеп, нәтижесін көпшілік алдында қорғайды." }],
    scoringTitle: "Нәтижелер қалай есептеледі",
    scoring: [{ title: "Онлайн іріктеу", text: "70% — кейс және оны қорғау · 30% — екі тапсырмалар туры" }, { title: "Іріктеу раунды", text: "80% — төрт ғылыми сайыс раунды · 20% — офлайн тапсырмалар туры" }, { title: "Ғылыми сайыс", text: "Толық раунд: Баяндамашы 30-ға дейін · Оппонент 20-ға дейін · Рецензент 10-ға дейін" }],
    battleTitle: "Ғылыми сайыстар",
    battleText: "Бір сайысқа үш топ қатысып, рөлдерін ауыстырады. Бір сайыс 60 минутқа дейін, ал үш сайыстан тұратын толық топтық раунд 180 минутқа дейін созылады.",
    roles: [{ title: "Баяндамашы", text: "Шешімді, әдістерді, дәлелдерді және қорытындыларды таныстырады әрі қорғайды." }, { title: "Оппонент", text: "Жұмысты сыни талдайды, мазмұнды сұрақтар қояды және жақсарту жолдарын ұсынады." }, { title: "Рецензент", text: "Екі тарапты бағалайды, шешілмеген мәселелерді көрсетіп, бейтарап қорытынды жасайды." }],
    calendarTitle: "Алдын ала күнтізбе · 2026",
    calendar: [{ date: "11 қаз", title: "Онлайн кейстің жариялануы", text: "ISM ресми ресурстарында жарияланады." }, { date: "17–18 қаз", title: "Онлайн тапсырмалар туры", text: "Formative платформасында прокторингпен екі 2 сағаттық тур." }, { date: "25 қаз", title: "Келу және орналастыру", text: "Тіркелу, орналасу және ұйымдастыру брифингі." }, { date: "26–28 қаз", title: "Іріктеу раунды", text: "24 топқа арналған ғылыми сайыстар мен офлайн STEM туры." }, { date: "29–30 қаз", title: "Финалдық зерттеу раунды", text: "8 финалист топқа арналған зертханалық зерттеу." }, { date: "1 қар", title: "Жабылу және марапаттау", text: "Ресми жабылу салтанаты." }],
    integrityTitle: "Маңызды ережелер",
    integrity: ["Барлық конкурс жұмысы тіркелген топтың дербес жұмысы болуы тиіс.", "Егер тапсырма нақты құралды жазбаша рұқсат етпесе, генеративті ИИ қолдануға тыйым салынады.", "Дереккөздер, әдістер және деректер көрсетіліп, тексерілуі керек.", "Барлық жарыс кезеңдерінің ресми тілі — ағылшын тілі.", "Зертханада қауіпсіздік нұсқаулары мен міндетті қорғаныс құралдарын сақтау қажет."],
    regulations: "Толық ережені ашу",
  },
};
