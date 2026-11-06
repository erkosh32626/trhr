/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as topojson from 'topojson-client';
import worldAtlas50m from 'world-atlas/countries-50m.json';
import { motion } from 'motion/react';
import {
  Globe2,
  AlertTriangle,
  Flame,
  CloudLightning,
  ShieldAlert,
  TrendingDown,
  HeartPulse,
  Users,
  Coins,
  Sprout,
  Cpu,
  Recycle,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Sparkles,
  ArrowUpRight,
  Activity,
  MapPin,
  BarChart3,
  Radio,
  BookOpen,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Literary & Academic Presentation Content (Pure Kazakh, Zero Parentheses)
// ---------------------------------------------------------------------------

interface HotspotRegion {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lon: number;
  ipcPhase: string;
  affectedCount: string;
  populationShare: string;
  calorieDeficit: string;
  primaryDriver: string;
  description: string;
  speakerNarrative: string;
  keyFacts: string[];
  accentColor: string;
  hexColor: number;
}

const HOTSPOT_REGIONS: HotspotRegion[] = [
  {
    id: 'central-africa',
    name: 'Орталық Африка',
    subtitle: 'Сахель белдеуі, Судан, Конго және Сахараның оңтүстік аймағы',
    lat: 8.5,
    lon: 21.5,
    ipcPhase: 'Төтенше гуманитарлық апат деңгейі',
    affectedCount: '64.8 млн адам',
    populationShare: 'Аймақ халқының 38 пайызы',
    calorieDeficit: 'Тәулігіне 1 420 килокалория',
    primaryDriver: 'Ұзаққа созылған қарулы қақтығыстар, көпжылдық құрғақшылық және топырақ деградациясы',
    description:
      'Орталық Африка мен Сахель белдеуіндегі егістік алқаптарының алпыс бес пайызы ауыр топырақ эрозиясы мен шөлейттенуге ұшыраған. Судан, Конго Демократиялық Республикасы және Чад бассейніндегі ішкі әскери қақтығыстар аймақтық сауда жолдарын үзіп, миллиондаған отбасыны дәстүрлі егіншілік пен мал шаруашылығынан толықтай айырды.',
    speakerNarrative:
      'Сахараның оңтүстігіндегі мемлекеттерде аштық табиғи климаттық өзгерістер мен саяси тұрақсыздықтың қатар келуінен ушығып отыр. Құнарлы жерлердің тозуы, Чад көлі экожүйесінің тартылуы және гуманитарлық керуендерге жасалатын кедергілер жергілікті халықтың өз-өзін азықпен қамтамасыз ету мүмкіндігін жойды.',
    keyFacts: [
      'Судан мен Конго мемлекеттерінде жиырма бес миллионнан астам адам күнделікті гуманитарлық азық-түлік көмегіне тікелей тәуелді болып отыр, ал миллиондаған шаруа өз егістік жерін тастап кетуге мәжбүр болды.',
      'Ауыл шаруашылығы алқаптары, астық сақтау қоймалары мен суару инфрақұрылымының жетпіс екі пайызы қарулы қақтығыстар мен қаржы тапшылығы салдарынан толықтай істен шыққан.',
      'Тұщы су көздерінің тартылуы мен жайылымдардың күйіп кетуі ірі қара мал басының қырық пайызға қысқаруына және көшпелі қауымдастықтардың күйзелуіне алып келді.',
    ],
    accentColor: '#ef4444',
    hexColor: 0xef4444,
  },
  {
    id: 'afghanistan',
    name: 'Ауғанстан',
    subtitle: 'Оңтүстік-Орталық Азияның таулы аграрлық белдеуі',
    lat: 33.9,
    lon: 67.7,
    ipcPhase: 'Төтенше азық-түлік дағдарысы',
    affectedCount: '15.8 млн адам',
    populationShare: 'Ел халқының 36 пайызы',
    calorieDeficit: 'Тәулігіне 1 560 килокалория',
    primaryDriver: 'Экономикалық оқшаулану, қаржы жүйесінің тоқырауы және созылмалы қуаңшылық',
    description:
      'Гиндукуш тау жоталарындағы мұздықтар мен қар қорының азаюы өзен арналарын тарылтып, елдегі негізгі дақыл саналатын бидай өндірісін күрт төмендетті. Қаржы-банк жүйесінің тоқырауы мен жаппай жұмыссыздық салдарынан ауыл-аймақтағы отбасылар табысының сексен бес пайызын тек қарапайым ұн мен нан алуға жұмсайды.',
    speakerNarrative:
      'Ауғанстандағы азық-түлік тапшылығы — табиғи су тапшылығы мен макроэкономикалық дағдарыстың тікелей салдары. Қала базарларында азық-түлік тауарлары болғанымен, халықтың төлем қабілетінің күйреуі миллиондаған адамды, әсіресе қыс айларында, аштық құрсауында қалдыруда.',
    keyFacts: [
      'Бес жасқа толмаған үш бүтін оннан екі миллион бала және сегіз жүз мыңнан астам ана жіті тамақ жетіспеушілігі мен анемиядан ауыр зардап шегуде.',
      'Елдегі дәстүрлі жер асты кәріз жүйелері мен ирригациялық суару каналдарының елу төрт пайызы соңғы жылдардағы қуаңшылықтан құрғап қалған.',
      'Импорттық бидай ұны, өсімдік майы және отын бағасы соңғы төрт жылда екі еседен астам қымбаттап, кедей отбасылардың қолжетімділік шегінен асып кетті.',
    ],
    accentColor: '#f97316',
    hexColor: 0xf97316,
  },
  {
    id: 'haiti',
    name: 'Гаити',
    subtitle: 'Кариб теңізі бассейні және Антиль аралдары аймағы',
    lat: 18.9,
    lon: -72.3,
    ipcPhase: 'Апатты азық-түлік тапшылығы',
    affectedCount: '5.4 млн адам',
    populationShare: 'Ел халқының 48 пайызы',
    calorieDeficit: 'Тәулігіне 1 490 килокалория',
    primaryDriver: 'Көлік-логистикалық блокада, гиперинфляция және жойқын тропикалық дауылдар',
    description:
      'Батыс жарты шардағы ең күрделі гуманитарлық дағдарыс ошағы. Теңіз порттары мен негізгі күре жолдардың қарулы топтар тарапынан жабылуы шаруалардың өз өнімін қалаларға жеткізуіне және сырттан келетін күріш пен дәнді дақылдар тасымалына толық тосқауыл қойды.',
    speakerNarrative:
      'Гаити мемлекеті тұтынатын барлық азық-түліктің жартысынан астамы сыртқы импортқа тәуелді. Ормандардың жаппай оталуы мен тропикалық циклондар тау беткейлеріндегі құнарлы топырақ қабатын шайып кетіп, ұлттық агроөнеркәсіпті терең әрі ұзақмерзімді күйзеліске ұшыратты.',
    keyFacts: [
      'Күнделікті тұтыну себетінің нарықтық бағасы бір жылдың ішінде алпыс екі пайызға шарықтап, халықтың тең жартысын күніне бір мезгіл ғана тамақтануға мәжбүр етті.',
      'Астана мен ауыл шаруашылығы провинцияларын байланыстыратын ішкі азық-түлік логистикасы мен сауда тізбегі толықтай дерлік үзілген.',
      'Тропикалық су тасқындары, құрғақшылық және топырақ эрозиясы ауыл шаруашылығы жерлерінің табиғи өнімділігін үш есеге дейін кемітті.',
    ],
    accentColor: '#a855f7',
    hexColor: 0xa855f7,
  },
  {
    id: 'yemen',
    name: 'Йемен',
    subtitle: 'Таяу Шығыс және Арабия түбегінің оңтүстік жағалауы',
    lat: 15.5,
    lon: 48.5,
    ipcPhase: 'Созылмалы гуманитарлық апат',
    affectedCount: '17.6 млн адам',
    populationShare: 'Ел халқының 53 пайызы',
    calorieDeficit: 'Тәулігіне 1 380 килокалория',
    primaryDriver: 'Теңіз порттарының шектелуі, әскери қимылдар және жерасты су қорының сарқылуы',
    description:
      'Йемен негізгі азық-түлік түрлерінің тоқсан пайызға жуығын теңіз жолдары арқылы шетелден тасымалдайды. Ұлттық валютаның құнсыздануы, порт инфрақұрылымының зақымдануы және жанармай тапшылығы халықтың елу үш пайызын созылмалы аштық шегіне жеткізді.',
    speakerNarrative:
      'Йемендегі ахуал геосаяси дағдарыс пен экологиялық су тапшылығының қаншалықты ауыр зардап әкелетінін айқын көрсетеді. Дизель отыны бағасының өсуі ауылдардағы су сорғылары мен астық диірмендерінің жұмысын тоқтатып, миллиондаған баланы ауыр дистрофияға ұшыратты.',
    keyFacts: [
      'Бес жасқа дейінгі балалардың қырық тоғыз пайызында созылмалы тамақ пен микроэлемент жетіспеушілігінен физикалық және бой өсу дамуы тежелген.',
      'Жерасты тұщы су горизонттарының деңгейі жыл сайын алты метрге дейін төмендеп, миллиондаған тұрғынды таза ауыз су мен суармалы егіншіліктен айыруда.',
      'Теңіз тасымалы мен сақтандыру шығындарының өсуі ішкі нарықтағы бидай, күріш және қант бағасын соғысқа дейінгі кезеңмен салыстырғанда үш есеге өсірді.',
    ],
    accentColor: '#f59e0b',
    hexColor: 0xf59e0b,
  },
];

interface RootCauseCardData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  sharePercent: number;
  impactMetric: string;
  impactLabel: string;
  summary: string;
  mechanisms: string[];
  glowColor: string;
}

const ROOT_CAUSES: RootCauseCardData[] = [
  {
    id: 'climate',
    number: '01',
    title: 'Климаттық катаклизмдер',
    subtitle: 'Қуаңшылық, аптап ыстық және биосфера деградациясы',
    sharePercent: 36,
    impactMetric: '21% өнім кемуі',
    impactLabel:
      'Тропикалық және субтропикалық белдеулердегі аграрлық өнімділіктің климаттық факторлардан құлдырауы',
    summary:
      'Ғаламдық орташа температураның көтерілуі жауын-шашын теңгерімін түбегейлі өзгертті. Құнарлы алқаптар шөлейттеніп, өзен бассейндері тартылуда, ал дәстүрлі егіншілік маусымдары тосын климаттық ауытқулар мен аптап ыстық толқындарына төтеп бере алмай отыр.',
    mechanisms: [
      'Тұщы су бассейндерінің тартылуы, тау мұздықтарының еруі және құрғақ аймақтардағы суармалы егістік топырақтың жаппай екіншілік тұздануы.',
      'Көпжылдық төтенше құрғақшылық толқындары мен егінді шайып кететін жойқын муссондық су тасқындарының бір мезгілде жиілеуі.',
      'Атмосферадағы көмірқышқыл газы концентрациясының артуынан бидай, күріш және жүгері дәніндегі ақуыз, темір және мырыш мөлшерінің он бес пайызға дейін кемуі.',
    ],
    glowColor: 'rgba(249, 115, 22, 0.28)',
  },
  {
    id: 'conflict',
    number: '02',
    title: 'Соғыс пен геосаясат',
    subtitle: 'Жаһандық логистика күйреуі және сауда тізбегінің үзілуі',
    sharePercent: 42,
    impactMetric: '65% ашыққандар',
    impactLabel:
      'Тікелей әскери қақтығыстар, блокада және саяси тұрақсыздық орын алған аймақтарда өмір сүреді',
    summary:
      'Қарулы қақтығыстар құнарлы егістік жерлерді миналанған аймаққа айналдырып, астық элеваторлары, су бөгеттері мен теңіз порттарын жояды. Геосаяси текетірестер мен көлік дәліздерінің жабылуы әлемдік нарыққа астық пен минералды тыңайтқыш жеткізуді тежейді.',
    mechanisms: [
      'Стратегиялық теңіз бұғаздары, астық терминалдары мен құрлықаралық теміржол дәліздерінің әскери блокадаға алынуы және логистикалық тізбектің үзілуі.',
      'Әлемдік нарықтағы азот, фосфор және калий тыңайтқыштары тасымалының отыз сегіз пайызға қысқарып, келесі маусымдағы егін шығымдылығын құлдыратуы.',
      'Ауыл халқының өз егістік алқаптары мен мал шаруашылығын тастап, ішкі және сыртқы босқын ретінде қоныс аударуға мәжбүр болуы.',
    ],
    glowColor: 'rgba(239, 68, 68, 0.28)',
  },
  {
    id: 'inflation',
    number: '03',
    title: 'Инфляция мен кедейлік',
    subtitle: 'Азық-түлік қымбатшылығы және әлеуметтік-экономикалық теңсіздік',
    sharePercent: 22,
    impactMetric: '3.1 млрд адам',
    impactLabel:
      'Күнделікті салауатты әрі құнарлы тамақтану рационын сатып алуға қаржылық мүмкіндігі жетпейді',
    summary:
      'Әлемдік қоймаларда астық қоры жеткілікті болғанымен, дамушы елдердегі гиперинфляция, валюта девальвациясы мен сыртқы мемлекеттік қарыз халықтың сатып алу қабілетін жойды. Бүгінгі тапшылық — өнімнің табиғатта жоқтығы емес, оның қаржылық қолжетімсіздігі.',
    mechanisms: [
      'Төмен табысты мемлекеттердегі отбасылар айлық табысының сексен пайызына дейінгі бөлігін тек ең арзан көмірсулы тағам алуға жұмсайды.',
      'Ұлттық валюталардың құнсыздануы мен сыртқы қарыз жүктемесі импортталатын бидай, күріш және өсімдік майының ішкі бағасын екі-үш есеге өсіруде.',
      'Энергия тасымалдаушылар, теңіз фрахты және логистикалық сақтандыру тарифтерінің өсуі соңғы тұтынушыға ауыр экономикалық салмақ салады.',
    ],
    glowColor: 'rgba(168, 85, 247, 0.28)',
  },
];

interface ConsequenceItem {
  id: string;
  title: string;
  tag: string;
  statValue: string;
  statUnit: string;
  headline: string;
  description: string;
  cascadeSteps: { label: string; metric: string; detail: string }[];
  color: string;
}

const CONSEQUENCES: ConsequenceItem[] = [
  {
    id: 'health',
    title: 'Денсаулық және балалар дистрофиясы',
    tag: 'БИОЛОГИЯЛЫҚ ЖӘНЕ ГЕНЕТИКАЛЫҚ ЗАҚЫМ',
    statValue: '148.1',
    statUnit: 'млн балада физикалық даму тежелген',
    headline:
      'Созылмалы аштық пен ақуыз тапшылығы келер ұрпақтың когнитивті және физикалық әлеуетін қайтымсыз төмендетеді',
    description:
      'Бала өмірінің алғашқы мың күніндегі ақуыз, май қышқылдары мен дәрумен тапшылығы орталық жүйке жүйесі мен ми нейрондарының қалыптасуын тежейді. Қазіргі сәтте әлемде қырық бес миллион бала өміріне тікелей қауіп төндіретін ауыр дистрофия күйінде өмір сүруде, бұл тұтас мемлекеттердің болашақ демографиялық және зияткерлік қорын әлсіретеді.',
    cascadeSteps: [
      {
        label: 'Жіті салмақ тапшылығы',
        metric: '45.0 млн бала',
        detail:
          'Иммундық қорғаныстың толық әлсіреуі салдарынан бес жасқа дейінгі балалар өлімінің қырық бес пайызы тікелей тамақ жетіспеушілігі мен жұқпалы аурулардың асқынуынан болады.',
      },
      {
        label: 'Микроэлементтік жасырын аштық',
        metric: '2.0 млрд адам',
        detail:
          'Темір, мырыш, йод және А дәруменінің созылмалы жетіспеушілігі жаппай қаназдық, эндокриндік бұзылыстар мен ана мен бала өлімінің негізгі себебіне айналды.',
      },
      {
        label: 'Интеллектуалдық әлеует шығыны',
        metric: '22% табыс кемуі',
        detail:
          'Ерте балалық шақта созылмалы тапшылық көрген ұрпақтың оқу үлгерімі, есте сақтау қабілеті және ересек өмірдегі еңбек өнімділігі жиырма екі пайызға дейін төмендейді.',
      },
    ],
    color: '#ef4444',
  },
  {
    id: 'migration',
    title: 'Мәжбүрлі көші-қон толқыны',
    tag: 'ДЕМОГРАФИЯЛЫҚ ЖӘНЕ ГЕОСАЯСИ ТҰРАҚСЫЗДЫҚ',
    statValue: '114+',
    statUnit: 'млн мәжбүрлі қоныс аударушы',
    headline:
      'Құнарсыз жер, су тапшылығы мен аштық миллиондаған адамды тарихи мекенін тастап кетуге мәжбүрлейді',
    description:
      'Ауыл шаруашылығы мен су жүйесі күйреген аймақтардан ірі қалалар мен көршілес мемлекеттерге бағытталған толассыз көші-қон урбанизация инфрақұрылымын шамадан тыс жүктейді. Бұл үрдіс еңбек нарығындағы теңсіздікті күшейтіп, су мен құнарлы жер үшін жаңа әлеуметтік-саяси қақтығыстарды туындатуда.',
    cascadeSteps: [
      {
        label: 'Аграрлық дағдарыстық урбанизация',
        metric: '3.4 есе өсім',
        detail:
          'Құрғақшылық белдеуіндегі шаруалар мен малшылардың мегаполис шетіндегі ауыз су мен санитариясы жоқ қорғалмаған аудандарға жаппай қоныс аударуы.',
      },
      {
        label: 'Климаттық көші-қон болжамы',
        metric: '216 млн адам',
        detail:
          'Егер экожүйе деградациясы тоқтатылмаса, 2050 жылға қарай тұщы су мен егістік жердің сарқылуынан өз елінің ішінде көшуге мәжбүр болатын халық саны.',
      },
      {
        label: 'Ресурстық шиеленістер',
        metric: '28% қақтығыс өсімі',
        detail:
          'Сиреп бара жатқан құнарлы жайылым мен өзен алқаптары үшін отырықшы егіншілік және көшпелі мал шаруашылығы қауымдастықтары арасындағы қақтығыстардың жиілеуі.',
      },
    ],
    color: '#f97316',
  },
  {
    id: 'economy',
    title: 'Экономикалық күйреу тұзағы',
    tag: 'МАКРОЭКОНОМИКАЛЫҚ ТОҚЫРАУ',
    statValue: '$3.5',
    statUnit: 'трлн жылдық әлемдік шығын',
    headline:
      'Аштық кедейлікті тереңдетеді, ал кедейлік жаңа аштық циклін қайта іске қосатын тұйық шеңбер қалыптастырады',
    description:
      'Тамақ тапшылығынан еңбекке қабілетті халықтың физикалық және зияткерлік өнімділігі құлдырайды, денсаулық сақтау жүйесіне түсетін салмақ еселеп өседі, ал дамушы мемлекеттер ұлттық бюджетін білім, ғылым және инфрақұрылымның орнына тек төтенше азық импортына жұмсауға мәжбүр болады.',
    cascadeSteps: [
      {
        label: 'Ұлттық ішкі өнім шығыны',
        metric: '11% дейін құлдырау',
        detail:
          'Африка мен Оңтүстік Азияның аграрлық мемлекеттері созылмалы тамақ жетіспеушілігі мен еңбек өнімділігінің төмендеуінен жыл сайын ішкі жалпы өнімнің он бір пайызына дейін жоғалтады.',
      },
      {
        label: 'Еңбек ресурстарының әлсіреуі',
        metric: '1.6 млрд жұмысшы',
        detail:
          'Күнделікті калория мен темір тапшылығы ауыл шаруашылығы мен өндіріс саласындағы жұмысшылардың еңбек өнімділігін жиырма пайызға дейін кемітеді.',
      },
      {
        label: 'Мемлекеттік борыш спиралі',
        metric: '60 астам мемлекет',
        detail:
          'Төмен табысты елдер өз агроөнеркәсібін жаңғыртудың орнына сыртқы валюталық несиелер мен қымбат астық импортын төлеуге тәуелді болып отыр.',
      },
    ],
    color: '#a855f7',
  },
];

// ---------------------------------------------------------------------------
// Interactive 3D Tilt & Radial Spotlight Glass Card Component
// ---------------------------------------------------------------------------

interface TiltGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  active?: boolean;
  tiltIntensity?: number;
}

const TiltGlassCard: React.FC<TiltGlassCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(245, 158, 11, 0.22)',
  onClick,
  active = false,
  tiltIntensity = 7,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const pctX = (relX / rect.width) * 100;
    const pctY = (relY / rect.height) * 100;

    const rotY = ((relX / rect.width - 0.5) * 2) * tiltIntensity;
    const rotX = -((relY / rect.height - 0.5) * 2) * tiltIntensity;

    setSpotlight({ x: pctX, y: pctY, opacity: 1 });
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const InteractiveTag = onClick ? 'button' : 'div';

  return (
    <InteractiveTag
      ref={cardRef as any}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
        transition: spotlight.opacity
          ? 'transform 80ms cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative text-left rounded-3xl hyper-glass overflow-hidden transition-colors duration-300 ${
        active
          ? 'border-amber-400/50 ring-1 ring-amber-400/30'
          : 'border-white/15 hover:border-white/25'
      } ${onClick ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400' : ''} ${className}`}
    >
      {/* Dynamic Cursor Radial Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(480px circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, rgba(255,255,255,0.06) 40%, transparent 75%)`,
        }}
      />
      {/* Top Prismatic Edge Glint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </InteractiveTag>
  );
};

// ---------------------------------------------------------------------------
// Animated Counter Component
// ---------------------------------------------------------------------------

const AnimatedNumber: React.FC<{
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  formatWithSpaces?: boolean;
}> = ({ target, decimals = 0, suffix = '', prefix = '', formatWithSpaces = false }) => {
  const [val, setVal] = useState(target);

  useEffect(() => {
    let raf = 0;
    const duration = 320;
    const startVal = target * 0.88;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(startVal + (target - startVal) * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const formatted = (() => {
    if (formatWithSpaces) {
      return Math.round(val)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return val.toFixed(decimals);
  })();

  return (
    <span className="font-mono-tabular">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Deterministic Fractal Noise & Natural Earth 50m Cartographic Renderer
// ---------------------------------------------------------------------------

function hash2D(ix: number, iy: number): number {
  const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function valueNoise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2D(ix, iy);
  const b = hash2D(ix + 1, iy);
  const c = hash2D(ix, iy + 1);
  const d = hash2D(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm2D(x: number, y: number): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    v += amp * valueNoise2D(x * freq, y * freq);
    freq *= 2.05;
    amp *= 0.5;
  }
  return v;
}

// Draw a GeoJSON ring with antimeridian unwrapping so +/-180 crossings never streak
function traceUnwrappedRing(
  ctx: CanvasRenderingContext2D,
  ring: number[][],
  W: number,
  H: number,
  offsetX: number
) {
  if (!ring || ring.length < 2) return;
  let prevLon = ring[0][0];
  for (let i = 0; i < ring.length; i++) {
    let lon = ring[i][0];
    const lat = ring[i][1];
    while (lon - prevLon > 180) lon -= 360;
    while (lon - prevLon < -180) lon += 360;
    prevLon = lon;
    const px = ((lon + 180) / 360) * W + offsetX;
    const py = ((90 - lat) / 180) * H;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
}

function drawGeoJSONGeometry(
  ctx: CanvasRenderingContext2D,
  geom: any,
  W: number,
  H: number,
  mode: 'fill' | 'stroke'
) {
  if (!geom) return;
  const offsets = [-W, 0, W];

  const drawPolygonRings = (rings: number[][][]) => {
    for (const off of offsets) {
      ctx.beginPath();
      for (const ring of rings) {
        traceUnwrappedRing(ctx, ring, W, H, off);
        if (mode === 'fill') ctx.closePath();
      }
      if (mode === 'fill') ctx.fill('evenodd');
      else ctx.stroke();
    }
  };

  if (geom.type === 'Polygon') {
    drawPolygonRings(geom.coordinates);
  } else if (geom.type === 'MultiPolygon') {
    for (const poly of geom.coordinates) {
      drawPolygonRings(poly);
    }
  } else if (geom.type === 'MultiLineString') {
    for (const off of offsets) {
      ctx.beginPath();
      for (const line of geom.coordinates) {
        traceUnwrappedRing(ctx, line, W, H, off);
      }
      ctx.stroke();
    }
  } else if (geom.type === 'GeometryCollection') {
    for (const g of geom.geometries) {
      drawGeoJSONGeometry(ctx, g, W, H, mode);
    }
  }
}

// Cache generated Earth canvases at module scope so slide switches are instantaneous
let cachedEarthCanvases: {
  colorCanvas: HTMLCanvasElement;
  bumpCanvas: HTMLCanvasElement;
  roughCanvas: HTMLCanvasElement;
} | null = null;

function getOrBuildEarthCanvases() {
  if (cachedEarthCanvases) return cachedEarthCanvases;

  const W = 1440;
  const H = 720;

  const topology = worldAtlas50m as any;
  const landFeature = topojson.feature(topology, topology.objects.land) as any;
  const countriesMesh = topojson.mesh(
    topology,
    topology.objects.countries,
    (a: any, b: any) => a !== b
  );

  // 1. Render High-Precision 1:50m Natural Earth Landmask + Continental Shelf Halo
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = W;
  maskCanvas.height = H;
  const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true })!;
  mCtx.fillStyle = '#000000';
  mCtx.fillRect(0, 0, W, H);

  mCtx.shadowColor = 'rgba(0, 120, 255, 0.95)';
  mCtx.shadowBlur = 16;
  mCtx.fillStyle = '#ffffff';
  if (landFeature.type === 'FeatureCollection') {
    for (const feat of landFeature.features) {
      drawGeoJSONGeometry(mCtx, feat.geometry, W, H, 'fill');
    }
  } else {
    drawGeoJSONGeometry(mCtx, landFeature.geometry || landFeature, W, H, 'fill');
  }
  mCtx.shadowBlur = 0;

  const maskPixels = mCtx.getImageData(0, 0, W, H).data;

  // 2. Build Satellite Albedo, Topographic Bump, and Specular Roughness Canvases
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = W;
  colorCanvas.height = H;
  const cCtx = colorCanvas.getContext('2d')!;
  const colorImg = cCtx.createImageData(W, H);
  const cData = colorImg.data;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = W;
  bumpCanvas.height = H;
  const bCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bCtx.createImageData(W, H);
  const bData = bumpImg.data;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = W;
  roughCanvas.height = H;
  const rCtx = roughCanvas.getContext('2d')!;
  const roughImg = rCtx.createImageData(W, H);
  const rData = roughImg.data;

  for (let y = 0; y < H; y++) {
    const v = y / H;
    const lat = 90 - v * 180;
    const absLat = Math.abs(lat);

    for (let x = 0; x < W; x++) {
      const u = x / W;
      const lon = u * 360 - 180;
      const idx = (y * W + x) * 4;
      const isLand = maskPixels[idx] > 128;
      const shelfFactor = maskPixels[idx + 2] / 255;

      const n1 = fbm2D(u * 20, v * 10);
      const n2 = fbm2D(u * 48 + 19, v * 24 + 37);

      if (isLand) {
        // Authentic NASA Blue Marble / Dark Satellite Biome Synthesis
        const tropicalWeight = Math.exp(-Math.pow(absLat / 15, 2));
        // Sahara, Arabia, Central Asia, Outback arid belt
        const isSaharaArabiaBelt =
          lat > 10 && lat < 36 && lon > -18 && lon < 75
            ? Math.exp(-Math.pow((lat - 23) / 10, 2))
            : Math.exp(-Math.pow((absLat - 25) / 11, 2)) * 0.65;
        const polarWeight = Math.max(0, (absLat - 65) / 20);

        const elevation = Math.pow(n1 * 0.62 + n2 * 0.38, 1.3);

        // Rich emerald-forest & temperate satellite tones
        let r = 22 + tropicalWeight * 12 + n2 * 22;
        let g = 52 + tropicalWeight * 34 + n1 * 28;
        let b = 48 + n1 * 18;

        // Blend Golden-Ochre Desert Belt (Sahara, Arabia, Karakum, Gobi, Outback)
        const dW = Math.min(1, isSaharaArabiaBelt * (0.65 + n1 * 0.55));
        r = r * (1 - dW) + (134 + n2 * 45) * dW;
        g = g * (1 - dW) + (98 + n2 * 32) * dW;
        b = b * (1 - dW) + (64 + n2 * 20) * dW;

        // Blend High Mountain Ranges (Himalayas, Hindu Kush, Andes, Rockies, Ethiopian Highlands)
        if (elevation > 0.54) {
          const mW = Math.min(1, (elevation - 0.54) * 2.5);
          r = r * (1 - mW) + 148 * mW;
          g = g * (1 - mW) + 142 * mW;
          b = b * (1 - mW) + 136 * mW;
        }

        // Polar Ice & Snow Caps (Greenland, Antarctica, Arctic)
        if (polarWeight > 0) {
          const pW = Math.min(1, polarWeight);
          r = r * (1 - pW) + 215 * pW;
          g = g * (1 - pW) + 226 * pW;
          b = b * (1 - pW) + 238 * pW;
        }

        cData[idx] = Math.min(255, r);
        cData[idx + 1] = Math.min(255, g);
        cData[idx + 2] = Math.min(255, b);
        cData[idx + 3] = 255;

        const bumpVal = Math.min(255, Math.floor(115 + elevation * 140));
        bData[idx] = bumpVal;
        bData[idx + 1] = bumpVal;
        bData[idx + 2] = bumpVal;
        bData[idx + 3] = 255;

        const roughVal = Math.floor(195 + n2 * 45);
        rData[idx] = roughVal;
        rData[idx + 1] = roughVal;
        rData[idx + 2] = roughVal;
        rData[idx + 3] = 255;
      } else {
        // Deep Satellite Ocean Bathymetry + Turquoise Coastal Shallows
        const abyss = 0.65 + 0.35 * n1;
        const r = Math.floor(5 * abyss + shelfFactor * 14);
        const g = Math.floor(18 * abyss + shelfFactor * 54);
        const b = Math.floor(42 * abyss + shelfFactor * 92);

        cData[idx] = r;
        cData[idx + 1] = g;
        cData[idx + 2] = b;
        cData[idx + 3] = 255;

        const oceanBump = Math.floor(42 + n2 * 14);
        bData[idx] = oceanBump;
        bData[idx + 1] = oceanBump;
        bData[idx + 2] = oceanBump;
        bData[idx + 3] = 255;

        const oceanRough = Math.floor(45 + shelfFactor * 28);
        rData[idx] = oceanRough;
        rData[idx + 1] = oceanRough;
        rData[idx + 2] = oceanRough;
        rData[idx + 3] = 255;
      }
    }
  }

  cCtx.putImageData(colorImg, 0, 0);
  bCtx.putImageData(bumpImg, 0, 0);
  rCtx.putImageData(roughImg, 0, 0);

  // 3. Draw Crisp Natural Earth Country Borders & Coastlines
  cCtx.strokeStyle = 'rgba(226, 232, 240, 0.22)';
  cCtx.lineWidth = 0.75;
  drawGeoJSONGeometry(cCtx, countriesMesh, W, H, 'stroke');

  cCtx.strokeStyle = 'rgba(125, 211, 252, 0.42)';
  cCtx.lineWidth = 0.95;
  if (landFeature.type === 'FeatureCollection') {
    for (const feat of landFeature.features) {
      drawGeoJSONGeometry(cCtx, feat.geometry, W, H, 'stroke');
    }
  } else {
    drawGeoJSONGeometry(cCtx, landFeature.geometry || landFeature, W, H, 'stroke');
  }

  // 4. Crisis Heatmap Glow at Exact Geographic Epocenters
  const crisisGlows = [
    { lon: 21.5, lat: 8.5, r: 58, color: 'rgba(239, 68, 68, 0.52)' },
    { lon: 48.5, lat: 15.5, r: 44, color: 'rgba(245, 158, 11, 0.56)' },
    { lon: 67.7, lat: 33.9, r: 46, color: 'rgba(249, 115, 22, 0.52)' },
    { lon: -72.3, lat: 18.9, r: 36, color: 'rgba(168, 85, 247, 0.56)' },
    { lon: 46.2, lat: 5.1, r: 40, color: 'rgba(239, 68, 68, 0.44)' },
    { lon: 82.0, lat: 24.5, r: 44, color: 'rgba(245, 158, 11, 0.40)' },
  ];

  for (const cg of crisisGlows) {
    const cx = ((cg.lon + 180) / 360) * W;
    const cy = ((90 - cg.lat) / 180) * H;
    const grad = cCtx.createRadialGradient(cx, cy, 2, cx, cy, cg.r);
    grad.addColorStop(0, cg.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    cCtx.fillStyle = grad;
    cCtx.beginPath();
    cCtx.arc(cx, cy, cg.r, 0, Math.PI * 2);
    cCtx.fill();
  }

  cachedEarthCanvases = { colorCanvas, bumpCanvas, roughCanvas };
  return cachedEarthCanvases;
}

// ---------------------------------------------------------------------------
// 3D Interactive Cyber Globe Component (Natural Earth 50m Satellite PBR Globe)
// ---------------------------------------------------------------------------

interface CyberGlobe3DProps {
  focusedRegionId?: string;
  onSelectRegion?: (id: string) => void;
  compact?: boolean;
}

const CyberGlobe3D: React.FC<CyberGlobe3DProps> = ({
  focusedRegionId,
  onSelectRegion,
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const manualRotVelRef = useRef({ x: 0, y: 0 });
  const focusedIdRef = useRef<string | undefined>(focusedRegionId);

  useEffect(() => {
    focusedIdRef.current = focusedRegionId;
    if (focusedRegionId) {
      const found = HOTSPOT_REGIONS.find((r) => r.id === focusedRegionId);
      if (found) {
        const latRad = THREE.MathUtils.degToRad(found.lat);
        const lonRad = THREE.MathUtils.degToRad(found.lon);
        targetRotRef.current = {
          x: Math.max(-0.55, Math.min(0.55, latRad * 0.65)),
          y: -lonRad - Math.PI * 0.5,
        };
      }
    } else {
      targetRotRef.current = null;
    }
  }, [focusedRegionId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = Math.max(container.clientWidth, 360);
    const height = Math.max(container.clientHeight, 360);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.04, compact ? 5.25 : 5.05);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x060a14, 1.35);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.85);
    sunLight.position.set(5.5, 3.2, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.75);
    rimLight.position.set(-5.5, -2.5, -4.5);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -1.92;
    globeGroup.rotation.x = 0.2;
    scene.add(globeGroup);

    const RADIUS = 1.52;

    const { colorCanvas, bumpCanvas, roughCanvas } = getOrBuildEarthCanvases();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const colorTex = new THREE.CanvasTexture(colorCanvas);
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.anisotropy = maxAniso;

    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.anisotropy = maxAniso;

    const roughTex = new THREE.CanvasTexture(roughCanvas);
    roughTex.anisotropy = maxAniso;

    // Part 1: Natural Earth 50m Satellite PBR Globe
    const coreGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      map: colorTex,
      bumpMap: bumpTex,
      bumpScale: 0.045,
      roughnessMap: roughTex,
      roughness: 0.82,
      metalness: 0.18,
      envMapIntensity: 0.28,
      color: 0xffffff,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Part 2: Fresnel Atmospheric Limb Halo (Custom GLSL Shader for Realistic Orbital Glow)
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.028, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float rim = 1.0 - max(0.0, dot(normal, viewDir));
          float fresnel = pow(rim, 3.6) * smoothstep(1.0, 0.82, rim);
          vec3 col = mix(vec3(0.22, 0.74, 0.97), vec3(0.96, 0.62, 0.04), rim * 0.35);
          gl_FragColor = vec4(col, fresnel * 0.52);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    atmoMesh.renderOrder = 3;
    globeGroup.add(atmoMesh);

    // Part 3: Outer Orbital Telemetry Rings
    const orbitalRingGeo = new THREE.TorusGeometry(RADIUS * 1.22, 0.005, 12, 120);
    const orbitalRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
    });
    const orbitalRing1 = new THREE.Mesh(orbitalRingGeo, orbitalRingMat);
    orbitalRing1.rotation.x = Math.PI * 0.42;
    orbitalRing1.rotation.y = 0.25;
    globeGroup.add(orbitalRing1);

    const orbitalRing2Geo = new THREE.TorusGeometry(RADIUS * 1.29, 0.0035, 12, 120);
    const orbitalRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
    });
    const orbitalRing2 = new THREE.Mesh(orbitalRing2Geo, orbitalRing2Mat);
    orbitalRing2.rotation.x = -Math.PI * 0.35;
    orbitalRing2.rotation.z = 0.4;
    globeGroup.add(orbitalRing2);

    const latLonToVec3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Part 4: 3D Great-Circle Logistics Supply Arcs
    const arcPairs: [[number, number], [number, number], number][] = [
      [[8.5, 21.5], [15.5, 48.5], 0xef4444],
      [[15.5, 48.5], [33.9, 67.7], 0xf59e0b],
      [[8.5, 21.5], [18.9, -72.3], 0xa855f7],
      [[46.5, 31.0], [15.5, 48.5], 0x38bdf8],
    ];

    for (const [[lat1, lon1], [lat2, lon2], hex] of arcPairs) {
      const p1 = latLonToVec3(lat1, lon1, RADIUS * 1.004);
      const p2 = latLonToVec3(lat2, lon2, RADIUS * 1.004);
      const dist = p1.distanceTo(p2);
      const mid = p1
        .clone()
        .add(p2)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(RADIUS + dist * 0.26);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.006, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.65,
      });
      globeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
    }

    // Part 5: Crisis Radar Beacons at Exact Country Coordinates
    const radarRings: { ring: THREE.Mesh; pillar: THREE.Mesh; phase: number; id: string }[] = [];
    const _up = new THREE.Vector3(0, 1, 0);

    const beaconPoints = [
      ...HOTSPOT_REGIONS.map((h) => ({
        id: h.id,
        lat: h.lat,
        lon: h.lon,
        color: h.hexColor,
        height: 0.24,
      })),
      { id: 'somalia', lat: 5.1, lon: 46.2, color: 0xef4444, height: 0.15 },
      { id: 'sahel-mali', lat: 15.0, lon: -2.0, color: 0xf97316, height: 0.15 },
      { id: 'south-asia-2', lat: 24.5, lon: 82.0, color: 0xf59e0b, height: 0.14 },
    ];

    beaconPoints.forEach((bp, idx) => {
      const pos = latLonToVec3(bp.lat, bp.lon, RADIUS * 1.003);
      const normal = pos.clone().normalize();

      const beaconGroup = new THREE.Group();
      beaconGroup.position.copy(pos);
      beaconGroup.quaternion.setFromUnitVectors(_up, normal);

      const dotGeo = new THREE.SphereGeometry(0.036, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: bp.color });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      beaconGroup.add(dotMesh);

      const pillarGeo = new THREE.CylinderGeometry(0.006, 0.016, bp.height, 12);
      pillarGeo.translate(0, bp.height / 2, 0);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: bp.color,
        transparent: true,
        opacity: 0.88,
      });
      const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
      beaconGroup.add(pillarMesh);

      const ringGeo = new THREE.RingGeometry(0.042, 0.076, 24);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: bp.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = 0.01;
      beaconGroup.add(ringMesh);

      globeGroup.add(beaconGroup);
      radarRings.push({
        ring: ringMesh,
        pillar: pillarMesh,
        phase: idx * 0.9,
        id: bp.id,
      });
    });

    // Part 6: Grounding Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 60);
    sGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
    sGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.45)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 3.8),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.65,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.92;
    scene.add(shadowPlane);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const domEl = renderer.domElement;
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      targetRotRef.current = null;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
      globeGroup.rotation.y += dx * 0.007;
      globeGroup.rotation.x = THREE.MathUtils.clamp(
        globeGroup.rotation.x + dy * 0.006,
        -0.75,
        0.75
      );
      manualRotVelRef.current = { x: dy * 0.002, y: dx * 0.003 };
    };
    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', onResize);

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = now / 1000;

      if (!isDraggingRef.current) {
        if (targetRotRef.current) {
          globeGroup.rotation.x = THREE.MathUtils.damp(
            globeGroup.rotation.x,
            targetRotRef.current.x,
            4.2,
            dt
          );
          globeGroup.rotation.y = THREE.MathUtils.damp(
            globeGroup.rotation.y,
            targetRotRef.current.y,
            4.2,
            dt
          );
        } else {
          globeGroup.rotation.y += dt * 0.22 + manualRotVelRef.current.y;
          globeGroup.rotation.x = THREE.MathUtils.damp(globeGroup.rotation.x, 0.2, 2.0, dt);
          manualRotVelRef.current.y *= 0.94;
        }
      }

      orbitalRing1.rotation.z = elapsed * 0.18;
      orbitalRing2.rotation.y = -elapsed * 0.14;

      for (const item of radarRings) {
        const cycle = (elapsed * 1.4 + item.phase) % 1;
        const isFocused = focusedIdRef.current === item.id;
        const scaleMult = isFocused ? 3.2 : 2.1;
        const s = 1 + cycle * scaleMult;
        item.ring.scale.set(s, 1, s);
        (item.ring.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.85;
        item.pillar.scale.y = isFocused
          ? 1.45 + Math.sin(elapsed * 5) * 0.2
          : 1 + Math.sin(elapsed * 3 + item.phase) * 0.15;
      }

      renderer.render(scene, camera);
      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      colorTex.dispose();
      bumpTex.dispose();
      roughTex.dispose();
      renderer.dispose();
    };
  }, [compact]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-gradient-to-tr from-red-500/20 via-amber-500/15 to-purple-500/20 blur-3xl"
      />
      <div
        ref={mountRef}
        data-testid="cyber-globe-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Интерактивті 3D Жер шары"
      />
      {onSelectRegion && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hyper-glass-pill z-20">
          <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {HOTSPOT_REGIONS.map((reg) => {
            const isSelected = focusedRegionId === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => onSelectRegion(reg.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {reg.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main 6-Slide Presentation Application
// ---------------------------------------------------------------------------

const SLIDE_META = [
  { index: 0, code: '01', shortTitle: 'Мұқаба', fullTitle: 'Ғаламдық аштық анатомиясы' },
  { index: 1, code: '02', shortTitle: 'Статистика', fullTitle: 'Әлемдік статистика' },
  { index: 2, code: '03', shortTitle: 'Дағдарыс ошақтары', fullTitle: 'Критикалық аймақтар' },
  { index: 3, code: '04', shortTitle: '3 Түпті себеп', fullTitle: 'Дағдарыс факторлары' },
  { index: 4, code: '05', shortTitle: 'Салдары', fullTitle: 'Мультипликативті салдары' },
  { index: 5, code: '06', shortTitle: 'Шешімдер', fullTitle: 'Инновация және Түйін' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('central-africa');
  const [statYear, setStatYear] = useState<'2019' | '2022' | '2026'>('2026');
  const [activeCauseId, setActiveCauseId] = useState<string>('conflict');
  const [activeConsequenceId, setActiveConsequenceId] = useState<string>('health');

  const [enabledSolutions, setEnabledSolutions] = useState<{
    agritech: boolean;
    zeroWaste: boolean;
    fairDistribution: boolean;
  }>({
    agritech: true,
    zeroWaste: true,
    fairDistribution: true,
  });

  const lastWheelTimeRef = useRef<number>(0);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= SLIDE_META.length || nextIndex === currentSlide) return;
      setDirection(nextIndex > currentSlide ? 1 : -1);
      setCurrentSlide(nextIndex);
    },
    [currentSlide]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDE_META.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastWheelTimeRef.current < 750) return;
    if (Math.abs(e.deltaY) < 32) return;
    lastWheelTimeRef.current = now;
    if (e.deltaY > 0) nextSlide();
    else prevSlide();
  };

  const activeHotspot =
    HOTSPOT_REGIONS.find((r) => r.id === selectedHotspotId) || HOTSPOT_REGIONS[0];
  const activeCause = ROOT_CAUSES.find((c) => c.id === activeCauseId) || ROOT_CAUSES[0];
  const activeConsequence =
    CONSEQUENCES.find((c) => c.id === activeConsequenceId) || CONSEQUENCES[0];

  const statByYear = {
    '2019': {
      hungryMillions: 613000000,
      insecureBillions: 1.9,
      worldPercent: 7.9,
      childrenMillions: 38.2,
      priceIndex: 95.1,
      contextNote:
        'Жаһандық логистикалық дағдарыс, пандемиялық шектеулер мен климаттық ауытқулар күшейгенге дейінгі тарихи кезең көрсеткіші.',
    },
    '2022': {
      hungryMillions: 712000000,
      insecureBillions: 2.3,
      worldPercent: 8.9,
      childrenMillions: 43.4,
      priceIndex: 143.7,
      contextNote:
        'Әлемдік жеткізу тізбегінің үзілуі, энергия тасымалдаушылардың қымбаттауы мен астық бағасының тарихи максимумына жеткен кезеңі.',
    },
    '2026': {
      hungryMillions: 735000000,
      insecureBillions: 2.4,
      worldPercent: 9.2,
      childrenMillions: 45.0,
      priceIndex: 128.4,
      contextNote:
        'Климаттық катаклизмдер, тыңайтқыш тапшылығы мен аймақтық қарулы қақтығыстардың созылмалы сипат алған қазіргі кезеңі.',
    },
  }[statYear];

  const rescuedMillions =
    (enabledSolutions.agritech ? 285 : 0) +
    (enabledSolutions.zeroWaste ? 310 : 0) +
    (enabledSolutions.fairDistribution ? 140 : 0);

  return (
    <div
      onWheel={handleWheel}
      data-slide-index={currentSlide}
      className="relative w-screen h-screen overflow-hidden bg-[#05070e] text-slate-100 flex flex-col justify-between select-none"
    >
      {/* Ambient Floating Neon Light Blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-28 -left-24 w-[520px] h-[520px] rounded-full bg-orange-500/18 blur-[130px] transition-transform duration-1000"
          style={{
            transform: `translate3d(${currentSlide * 35}px, ${(currentSlide % 2) * 30}px, 0)`,
          }}
        />
        <div
          className="absolute top-1/4 right-[-120px] w-[560px] h-[560px] rounded-full bg-red-600/16 blur-[140px] transition-transform duration-1000"
          style={{
            transform: `translate3d(${-currentSlide * 28}px, ${(currentSlide % 3) * -25}px, 0)`,
          }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-600/16 blur-[150px] transition-transform duration-1000"
          style={{
            transform: `translate3d(${(currentSlide - 2) * 30}px, 0, 0)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Top Frosted Glass Navigation Bar */}
      <header className="relative z-30 flex items-center justify-between gap-6 px-8 pt-5 pb-2 shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3.5 py-1.5 rounded-full hyper-glass-pill text-xs font-bold tracking-wider text-amber-300 border border-amber-400/30 whitespace-nowrap">
            1-ТОП · ҒЫЛЫМИ ЗЕРТТЕУ
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-200 hidden sm:inline whitespace-nowrap">
            Ғаламдық азық-түлік қауіпсіздігі
          </span>
        </div>

        <nav
          aria-label="Слайдтар навигациясы"
          className="flex items-center gap-1.5 p-1.5 rounded-full hyper-glass-pill"
        >
          {SLIDE_META.map((s) => {
            const isActive = currentSlide === s.index;
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => goToSlide(s.index)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/30 via-orange-500/25 to-red-500/30 text-white border border-amber-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <span className="font-mono-tabular text-[11px] text-amber-400/90 mr-1.5">
                  {s.code}
                </span>
                {s.shortTitle}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => goToSlide(currentSlide === 5 ? 0 : currentSlide + 1)}
            className="px-4 py-2 rounded-full hyper-glass-pill text-xs font-semibold text-amber-200 hover:text-white hover:border-amber-400/50 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{currentSlide === 5 ? 'Басына оралу' : 'Келесі тарау'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Main Viewport Stage */}
      <main className="relative z-20 flex-1 w-full max-w-[1400px] mx-auto px-8 py-2 flex items-center justify-center overflow-hidden">
          {/* =============================================================== */}
          {/* SLIDE 1: НЕГІЗГІ МҰҚАБА                                          */}
          {/* =============================================================== */}
          {currentSlide === 0 && (
            <motion.section
              key="slide-1"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full grid grid-cols-12 gap-6 items-center"
            >
              <div className="col-span-7 flex flex-col justify-center space-y-3.5">
                <div className="inline-flex items-center gap-2.5 self-start px-4 py-1.5 rounded-full hyper-glass-pill">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold tracking-wide text-amber-200">
                    1-ТОП · ҒЫЛЫМИ-САРАПТАМАЛЫҚ БАЯНДАМА
                  </span>
                </div>

                <h1 className="font-display font-black text-4xl lg:text-[44px] leading-[1.08] tracking-tight glass-text-gradient text-balance">
                  Ғаламдық аштық:{' '}
                  <span className="amber-glass-text">
                    Азық-түлік дағдарысының анатомиясы
                  </span>
                </h1>

                <div className="space-y-2 text-xs lg:text-[13.5px] text-slate-200/95 leading-relaxed max-w-2xl font-normal">
                  <p>
                    Жиырма бірінші ғасырда адамзат биотехнология, ғарыштық агромониторинг,
                    роботтандырылған егіншілік және гендік инженерия саласында бұрын-соңды болмаған
                    ғылыми жетістіктерге жетті. Алайда осы өркениеттік өрлеуге қарамастан, бүгінгі
                    таңда Жер бетіндегі әрбір он бірінші тұрғын созылмалы аштық құрсауында өмір
                    сүріп, күнделікті тіршілікке қажетті ең төменгі қуат мөлшеріне жете алмай келеді.
                  </p>
                  <p className="text-slate-300/95">
                    Қазіргі жаһандық азық-түлік тапшылығы — табиғат ресурстарының таусылуынан ғана
                    емес, климаттық катаклизмдердің, геосаяси қарулы қақтығыстардың, теңіз сауда
                    дәліздері блокадасының және макроэкономикалық теңсіздіктің бір мезгілде
                    тоғысуынан туындаған күрделі жүйелік дағдарыс.
                  </p>
                  <p className="text-slate-300/90">
                    Біздің зерттеу жұмысымыздың мақсаты — әлемдік азық-түлік тапшылығының түпкі
                    географиялық ошақтарын, оны туындатушы іргелі экономикалық және экологиялық
                    себептерді, сондай-ақ дағдарысты еңсерудің инновациялық жолдарын ғылыми негізде
                    жан-жақты талдау.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3.5 pt-0.5">
                  <TiltGlassCard
                    glowColor="rgba(239, 68, 68, 0.25)"
                    onClick={() => goToSlide(1)}
                    className="p-3.5"
                  >
                    <div className="text-xs font-semibold text-amber-300 mb-0.5">
                      Созылмалы аштық ауқымы
                    </div>
                    <div className="text-2xl font-black font-mono-tabular text-white tracking-tight">
                      735 МЛН+
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-snug">
                      Күн сайын жеткілікті қуат пен құнарлы тағамға қолы жетпейтін, созылмалы тамақ
                      жетіспеушілігіне ұшыраған әлем халқы.
                    </div>
                  </TiltGlassCard>

                  <TiltGlassCard
                    glowColor="rgba(249, 115, 22, 0.25)"
                    onClick={() => goToSlide(2)}
                    className="p-3.5"
                  >
                    <div className="text-xs font-semibold text-amber-300 mb-0.5">
                      Критикалық эпицентрлер
                    </div>
                    <div className="text-2xl font-black font-mono-tabular text-amber-300 tracking-tight">
                      4 АЙМАҚ
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-snug">
                      Орталық Африка, Ауғанстан, Гаити және Йемендегі гуманитарлық апат шегіне
                      жеткен ең күрделі географиялық белдеулер.
                    </div>
                  </TiltGlassCard>

                  <TiltGlassCard
                    glowColor="rgba(168, 85, 247, 0.25)"
                    onClick={() => goToSlide(3)}
                    className="p-3.5"
                  >
                    <div className="text-xs font-semibold text-purple-300 mb-0.5">
                      Негізгі қозғаушы күштер
                    </div>
                    <div className="text-2xl font-black font-mono-tabular text-purple-300 tracking-tight">
                      3 ФАКТОР
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-snug">
                      Климаттық құрғақшылық пен топырақ эрозиясы, әскери-логистикалық блокада және
                      жаһандық азық-түлік инфляциясы.
                    </div>
                  </TiltGlassCard>
                </div>

                <div className="flex items-center gap-3.5 pt-0.5">
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-950 font-bold text-sm tracking-tight shadow-lg shadow-orange-500/25 hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Баяндаманы бастау</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(2)}
                    className="px-5 py-2.5 rounded-full hyper-glass-pill text-xs font-semibold text-slate-200 hover:text-white hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Globe2 className="w-4 h-4 text-amber-400" />
                    <span>Дағдарыс ошақтары</span>
                  </button>
                </div>
              </div>

              <div className="col-span-5 h-[525px] relative">
                <div className="w-full h-full rounded-[32px] hyper-glass p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between z-20 px-2 pt-1">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-bold tracking-wide text-slate-200">
                        ЖАҺАНДЫҚ АШТЫҚ БЕЛДЕУІ
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full hyper-glass-pill text-[11px] font-mono-tabular text-amber-300">
                      3D ГЕО-МОДЕЛЬ
                    </span>
                  </div>

                  <div className="h-[335px] w-full relative">
                    <CyberGlobe3D
                      focusedRegionId={selectedHotspotId}
                      onSelectRegion={(id) => setSelectedHotspotId(id)}
                    />
                  </div>

                  <div className="z-20 px-3.5 py-2.5 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-slate-400">
                          Таңдалған дағдарыс аймағы:{' '}
                          <span className="text-amber-300 font-bold">{activeHotspot.name}</span>
                        </div>
                        <div className="text-xs text-slate-200 font-semibold">
                          {activeHotspot.affectedCount} · {activeHotspot.ipcPhase}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => goToSlide(2)}
                        className="px-3 py-1 rounded-full hyper-glass-pill text-[11px] font-semibold text-amber-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Талдау →
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {activeHotspot.speakerNarrative}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* =============================================================== */}
          {/* SLIDE 2: ӘЛЕМДІК СТАТИСТИКА                                     */}
          {/* =============================================================== */}
          {currentSlide === 1 && (
            <motion.section
              key="slide-2"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-center space-y-3.5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300 mb-1.5">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>02-ТАРАУ · ӘЛЕМДІК СТАТИСТИКА ЖӘНЕ ДИНАМИКА</span>
                  </div>
                  <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight glass-text-gradient">
                    Сандар сөйлейді: Гуманитарлық тапшылық масштабы
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 mr-1 font-medium">Кезеңдер динамикасы:</span>
                  <div className="flex items-center gap-1 p-1 rounded-full hyper-glass-pill">
                    {(['2019', '2022', '2026'] as const).map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setStatYear(yr)}
                        className={`px-3.5 py-1 rounded-full text-xs font-mono-tabular font-bold transition-all cursor-pointer whitespace-nowrap ${
                          statYear === yr
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {yr} жыл
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <TiltGlassCard
                  glowColor="rgba(239, 68, 68, 0.28)"
                  className="col-span-5 p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-red-300">
                      СОЗЫЛМАЛЫ АШТЫҚ ДЕҢГЕЙІ
                    </span>
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>

                  <div className="my-2">
                    <div className="font-display font-black text-4xl lg:text-[42px] leading-none tracking-tight text-white">
                      <AnimatedNumber
                        target={statByYear.hungryMillions}
                        formatWithSpaces
                        suffix="+"
                      />
                    </div>
                    <div className="text-sm font-bold text-amber-300 mt-1.5">
                      Күн сайын аш құрсақ ұйықтайтын адамдар саны
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    Соңғы жеті жыл ішінде әлемде тұрақты түрде тойып тамақтанбайтын адамдар саны{' '}
                    <span className="text-white font-bold">122 миллионға</span> көбейді. Бұл —
                    Еуропаның бірнеше ірі мемлекетінің халқымен тең көрсеткіш және адамзаттың
                    аштықты жою жолындағы он бес жылдық еңбегін кері шегерген ауыр демографиялық
                    соққы.
                  </p>
                </TiltGlassCard>

                <TiltGlassCard
                  glowColor="rgba(249, 115, 22, 0.28)"
                  className="col-span-4 p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300">
                      АЗЫҚ-ТҮЛІК ТАПШЫЛЫҒЫ
                    </span>
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="my-2">
                    <div className="font-display font-black text-4xl lg:text-[42px] leading-none tracking-tight amber-glass-text">
                      <AnimatedNumber
                        target={statByYear.insecureBillions}
                        decimals={1}
                        suffix=" млрд"
                      />
                    </div>
                    <div className="text-sm font-bold text-slate-100 mt-1.5">
                      Құнарлы тағамға қолы жетпейтін халық саны
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    Жер шарының әрбір үшінші тұрғыны құрамында ақуызы, дәрумені мен минералдары
                    жеткілікті сапалы тағаммен тұрақты қамтамасыз етілмеген. Олардың басым бөлігі
                    тек арзан дәнді дақылдармен ғана қоректенуге мәжбүр.
                  </p>
                </TiltGlassCard>

                <TiltGlassCard
                  glowColor="rgba(168, 85, 247, 0.28)"
                  className="col-span-3 p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-purple-300">
                      ӘЛЕМДІК ҮЛЕС
                    </span>
                    <Globe2 className="w-5 h-5 text-purple-400" />
                  </div>

                  <div className="my-2">
                    <div className="font-display font-black text-4xl lg:text-[42px] leading-none tracking-tight text-white">
                      <AnimatedNumber target={statByYear.worldPercent} decimals={1} suffix="%" />
                    </div>
                    <div className="text-sm font-bold text-purple-300 mt-1.5">
                      Жер шары халқының үлесі
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 via-red-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${statByYear.worldPercent * 4.5}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-300 leading-snug">
                      Әлемдік демографиялық өсіммен қатар азық-түлік тапшылығының ауқымы да кеңейіп,
                      кедей және бай елдер арасындағы алшақтық тереңдей түсуде.
                    </div>
                  </div>
                </TiltGlassCard>

                <TiltGlassCard
                  glowColor="rgba(245, 158, 11, 0.2)"
                  className="col-span-7 p-4 px-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Құрлықтар бойынша аштық ауыртпалығының географиялық бөлінісі
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">{statByYear.contextNote}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full hyper-glass-pill text-[11px] font-mono-tabular text-amber-300 shrink-0">
                      {statYear} жылғы есеп
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-semibold text-slate-300">Азия құрлығы</div>
                      <div className="text-xl font-black font-mono-tabular text-amber-300 mt-0.5">
                        402 млн адам
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-snug">
                        Әлемдегі барлық ашыққан халықтың елу бес пайызы Оңтүстік және Оңтүстік-Шығыс
                        Азияның тығыз қоныстанған аграрлық белдеулерінде шоғырланған.
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-semibold text-slate-300">Африка құрлығы</div>
                      <div className="text-xl font-black font-mono-tabular text-red-400 mt-0.5">
                        282 млн адам
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-snug">
                        Құрлықтағы әрбір бесінші тұрғын тікелей азық-түлік тапшылығын бастан кешуде,
                        бұл әлем бойынша ең жоғары салыстырмалы көрсеткіш саналады.
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-semibold text-slate-300">Латын Америкасы</div>
                      <div className="text-xl font-black font-mono-tabular text-purple-300 mt-0.5">
                        43.2 млн адам
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-snug">
                        Азық-түлік инфляциясы, әлеуметтік теңсіздік және Кариб бассейніндегі
                        тропикалық циклондардан қатты зардап шеккен аймақ.
                      </div>
                    </div>
                  </div>
                </TiltGlassCard>

                <TiltGlassCard
                  glowColor="rgba(239, 68, 68, 0.22)"
                  className="col-span-5 p-4 px-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-orange-300">
                      МОЛШЫЛЫҚ ДӘУІРІНДЕГІ ПАРАДОКС
                    </span>
                    <span className="text-xs font-mono-tabular text-slate-300">
                      Баға индексі: {statByYear.priceIndex}
                    </span>
                  </div>

                  <div className="my-1.5">
                    <div className="text-sm lg:text-base font-bold text-white leading-snug">
                      Әлемде өндірілетін барлық азық-түліктің{' '}
                      <span className="text-amber-300">үштен бірі</span> — жылына 1.3 миллиард тонна
                      өнім тұтынушы дастарқанына жетпей ысырап болады
                    </div>
                    <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                      Жер шарының қазіргі аграрлық қуаты он миллиард адамды еркін асырауға жетеді.
                      Алайда дамушы елдерде тоңазытқыш қоймалар мен тасымал жолдарының жоқтығынан,
                      ал дамыған елдерде тұтынушылық ысырапшылдықтан өнім жойылып, соның кесірінен{' '}
                      <span className="text-white font-bold">
                        {statByYear.childrenMillions} миллион бала
                      </span>{' '}
                      ауыр дистрофияға ұшырап отыр.
                    </p>
                  </div>
                </TiltGlassCard>
              </div>
            </motion.section>
          )}

          {/* =============================================================== */}
          {/* SLIDE 3: ДАҒДАРЫС ОШАҚТАРЫ                                      */}
          {/* =============================================================== */}
          {currentSlide === 2 && (
            <motion.section
              key="slide-3"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-center space-y-3"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-red-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>03-ТАРАУ · ГЕОГРАФИЯЛЫҚ ДАҒДАРЫС ОШАҚТАРЫ</span>
                  </div>
                  <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight glass-text-gradient">
                    Аштық деңгейі ең жоғары төрт аймақтық эпицентр
                  </h2>
                </div>
                <div className="text-xs font-medium text-amber-200/90">
                  Халықаралық азық-түлік қауіпсіздігі классификациясының төтенше белдеулері
                </div>
              </div>

              <div className="grid grid-cols-12 gap-5 items-stretch h-[515px]">
                <div className="col-span-4 flex flex-col justify-between gap-2.5">
                  {HOTSPOT_REGIONS.map((region) => {
                    const isSelected = region.id === selectedHotspotId;
                    return (
                      <TiltGlassCard
                        key={region.id}
                        active={isSelected}
                        glowColor={`${region.accentColor}44`}
                        onClick={() => setSelectedHotspotId(region.id)}
                        className="p-3.5 flex-1 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-base text-white">
                            {region.name}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-tabular font-bold ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950'
                                : 'hyper-glass-pill text-slate-200'
                            }`}
                          >
                            {region.affectedCount}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 truncate">{region.subtitle}</div>
                        <div className="flex items-center justify-between text-[11px] text-amber-300/90 pt-0.5">
                          <span>{region.populationShare}</span>
                          <span className="font-mono-tabular">
                            {region.lat.toFixed(1)}° Е, {region.lon.toFixed(1)}° Б
                          </span>
                        </div>
                      </TiltGlassCard>
                    );
                  })}
                </div>

                <div className="col-span-3 rounded-3xl hyper-glass p-3 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between px-2 pt-1 z-10">
                    <span className="text-[11px] font-bold text-slate-200">
                      ГЕОГРАФИЯЛЫҚ КООРДИНАТ
                    </span>
                    <span className="text-[11px] font-mono-tabular text-amber-300">
                      {activeHotspot.lat}° / {activeHotspot.lon}°
                    </span>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    <CyberGlobe3D focusedRegionId={selectedHotspotId} compact />
                  </div>
                  <div className="text-center text-[11px] text-slate-300 pb-1">
                    {activeHotspot.name} аймағының спутниктік проекциясы
                  </div>
                </div>

                <TiltGlassCard
                  glowColor="rgba(245, 158, 11, 0.25)"
                  className="col-span-5 p-4 px-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full hyper-glass-pill text-[11px] font-bold text-amber-300">
                        {activeHotspot.ipcPhase}
                      </span>
                      <span className="text-[11px] font-mono-tabular font-semibold text-red-300">
                        {activeHotspot.affectedCount} · {activeHotspot.calorieDeficit}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl text-white tracking-tight">
                      {activeHotspot.name}: Аймақтық талдау
                    </h3>
                    <p className="text-[11.5px] text-amber-200 font-semibold mt-0.5 leading-snug">
                      Басты себеп: {activeHotspot.primaryDriver}
                    </p>

                    <p className="text-[11.5px] text-slate-200 leading-snug mt-1.5">
                      {activeHotspot.description}
                    </p>
                    <p className="text-[11.5px] text-slate-300 leading-snug mt-1">
                      {activeHotspot.speakerNarrative}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11.5px] font-bold text-amber-300">
                      Негізгі деректер мен дәйектер:
                    </div>
                    {activeHotspot.keyFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-[11px] text-slate-100 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/10 leading-snug"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </TiltGlassCard>
              </div>
            </motion.section>
          )}

          {/* =============================================================== */}
          {/* SLIDE 4: 3 ТҮПТІ СЕБЕП                                          */}
          {/* =============================================================== */}
          {currentSlide === 3 && (
            <motion.section
              key="slide-4"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-center space-y-3.5"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300 mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>04-ТАРАУ · АЗЫҚ-ТҮЛІК ТАПШЫЛЫҒЫНЫҢ ТҮПТІ СЕБЕПТЕРІ</span>
                  </div>
                  <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight glass-text-gradient">
                    Жаһандық дағдарысты туындатушы үш іргелі фактор
                  </h2>
                </div>
                <div className="text-xs font-medium text-amber-200/90">
                  Табиғи, геосаяси және макроэкономикалық факторлардың өзара байланысы
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {ROOT_CAUSES.map((cause) => {
                  const isActive = cause.id === activeCauseId;
                  return (
                    <TiltGlassCard
                      key={cause.id}
                      active={isActive}
                      glowColor={cause.glowColor}
                      tiltIntensity={9}
                      onClick={() => setActiveCauseId(cause.id)}
                      className="p-5 flex flex-col justify-between h-[350px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-mono-tabular font-bold text-amber-300">
                            {cause.number}-ФАКТОР · ҮЛЕСІ {cause.sharePercent}%
                          </span>
                          {cause.id === 'climate' && (
                            <CloudLightning className="w-5 h-5 text-amber-400" />
                          )}
                          {cause.id === 'conflict' && (
                            <ShieldAlert className="w-5 h-5 text-red-400" />
                          )}
                          {cause.id === 'inflation' && (
                            <TrendingDown className="w-5 h-5 text-purple-400" />
                          )}
                        </div>

                        <h3 className="font-display font-black text-2xl text-white tracking-tight">
                          {cause.title}
                        </h3>
                        <p className="text-xs font-semibold text-amber-200 mt-1">
                          {cause.subtitle}
                        </p>

                        <p className="text-xs text-slate-200 leading-relaxed mt-2.5">
                          {cause.summary}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2.5 border-t border-white/10">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xl font-black font-mono-tabular text-white">
                            {cause.impactMetric}
                          </span>
                          <span className="text-[11px] text-amber-300 font-bold">
                            Негізгі көрсеткіш
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 leading-snug">
                          {cause.impactLabel}
                        </div>
                      </div>
                    </TiltGlassCard>
                  );
                })}
              </div>

              <div className="rounded-3xl hyper-glass p-4 px-6 flex items-center justify-between gap-6">
                <div className="shrink-0 max-w-xs">
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Тереңдетілген ғылыми талдау</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {activeCause.title} · Әсер ету үлесі {activeCause.sharePercent}%
                  </div>
                  <div className="text-xs text-slate-300 mt-1 leading-snug">
                    Фактордың агроөнеркәсіп пен жаһандық нарыққа тигізетін тікелей механизмдері:
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-1">
                  {activeCause.mechanisms.map((mech, i) => (
                    <div
                      key={i}
                      className="px-3.5 py-2.5 rounded-2xl bg-slate-950/55 border border-white/10 text-xs text-slate-100 flex items-start gap-2 leading-snug"
                    >
                      <span className="font-mono-tabular font-bold text-amber-400 shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* =============================================================== */}
          {/* SLIDE 5: МУЛЬТИПЛИКАТИВТІ САЛДАРЫ                               */}
          {/* =============================================================== */}
          {currentSlide === 4 && (
            <motion.section
              key="slide-5"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-center space-y-3.5"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-purple-300 mb-1.5">
                    <Activity className="w-3.5 h-3.5 text-purple-400" />
                    <span>05-ТАРАУ · АШТЫҚТЫҢ МУЛЬТИПЛИКАТИВТІ САЛДАРЫ</span>
                  </div>
                  <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight glass-text-gradient">
                    Денсаулық, көші-қон және экономикалық күйреу тізбегі
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 p-1.5 rounded-full hyper-glass-pill">
                  {CONSEQUENCES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveConsequenceId(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        activeConsequenceId === item.id
                          ? 'bg-gradient-to-r from-amber-500 to-red-500 text-slate-950'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {item.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {CONSEQUENCES.map((c) => {
                  const isSelected = c.id === activeConsequenceId;
                  return (
                    <TiltGlassCard
                      key={c.id}
                      active={isSelected}
                      glowColor={`${c.color}40`}
                      onClick={() => setActiveConsequenceId(c.id)}
                      className="p-5 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold tracking-wider text-amber-300">
                          {c.tag}
                        </span>
                        {c.id === 'health' && <HeartPulse className="w-4 h-4 text-red-400" />}
                        {c.id === 'migration' && <Users className="w-4 h-4 text-orange-400" />}
                        {c.id === 'economy' && <Coins className="w-4 h-4 text-purple-400" />}
                      </div>

                      <h3 className="font-display font-bold text-lg text-white">{c.title}</h3>

                      <div className="my-2 flex items-baseline gap-2">
                        <span className="font-display font-black text-3xl font-mono-tabular text-white">
                          {c.statValue}
                        </span>
                        <span className="text-xs font-medium text-slate-200">{c.statUnit}</span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">{c.headline}</p>
                    </TiltGlassCard>
                  );
                })}
              </div>

              <div className="rounded-3xl hyper-glass p-5 px-6 grid grid-cols-12 gap-6 items-center">
                <div className="col-span-5 space-y-2">
                  <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300">
                    ЖҮЙЕЛІК ЗАРДАПТАР ТАЛДАУЫ
                  </span>
                  <h3 className="font-display font-black text-2xl text-white tracking-tight pt-1">
                    {activeConsequence.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeConsequence.description}
                  </p>
                </div>

                <div className="col-span-7 grid grid-cols-3 gap-3.5">
                  {activeConsequence.cascadeSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-white/12 flex flex-col justify-between space-y-2"
                    >
                      <div className="text-xs font-bold text-slate-200">{step.label}</div>
                      <div className="text-lg font-black font-mono-tabular text-amber-300">
                        {step.metric}
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* =============================================================== */}
          {/* SLIDE 6: ШЕШІМДЕР МЕН ТҮЙІН                                     */}
          {/* =============================================================== */}
          {currentSlide === 5 && (
            <motion.section
              key="slide-6"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-center space-y-3.5"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300 mb-1.5">
                    <Sprout className="w-3.5 h-3.5 text-amber-400" />
                    <span>06-ТАРАУ · СТРАТЕГИЯЛЫҚ ШЕШІМДЕР МЕН ҚОРЫТЫНДЫ</span>
                  </div>
                  <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight glass-text-gradient">
                    Агротехнологиялық революция және жүйелік жаңғыру
                  </h2>
                </div>

                <div className="px-4 py-2 rounded-full hyper-glass-pill flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-200">
                    Кешенді шешімдердің жиынтық әлеуеті:
                  </span>
                  <span className="text-base font-black font-mono-tabular text-amber-300">
                    {rescuedMillions} млн адамды аштықтан құтқару
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <TiltGlassCard
                  active={enabledSolutions.agritech}
                  glowColor="rgba(245, 158, 11, 0.26)"
                  onClick={() =>
                    setEnabledSolutions((s) => ({ ...s, agritech: !s.agritech }))
                  }
                  className="p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300">
                        01 · АГРОТЕХНОЛОГИЯЛЫҚ СЕРПІЛІС
                      </span>
                      <Cpu className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      Тік фермалар және жасанды интеллект
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed mt-2">
                      Гидропоника мен аэропоника негізіндегі көпқабатты тік фермалар тұщы суды{' '}
                      <span className="text-white font-bold">95 пайызға үнемдейді</span>, құнарлы
                      топырақты қажет етпейді және климаттық ауа райына тәуелсіз жылына он екі рет
                      тұрақты өнім береді.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                      Сонымен қатар ғарыштық спутниктік мониторинг пен нейрондық алгоритмдер топырақ
                      ылғалдылығын талдап, құрғақшылық пен шегіртке қаупін алты ай бұрын дәл
                      болжайды.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-xs">
                    <span className="font-mono-tabular text-amber-300 font-bold">
                      285 миллион адамды азықпен қамту
                    </span>
                    <span className="text-slate-300 font-medium">Бірінші бағыт</span>
                  </div>
                </TiltGlassCard>

                <TiltGlassCard
                  active={enabledSolutions.zeroWaste}
                  glowColor="rgba(239, 68, 68, 0.26)"
                  onClick={() =>
                    setEnabledSolutions((s) => ({ ...s, zeroWaste: !s.zeroWaste }))
                  }
                  className="p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-red-300">
                        02 · ИНФРАҚҰРЫЛЫМДЫҚ ЖАҢҒЫРУ
                      </span>
                      <Recycle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      Азық-түлік ысырабын тоқтату
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed mt-2">
                      Дамушы аймақтарда күн энергиясымен жұмыс істейтін{' '}
                      <span className="text-white font-bold">автономды тоңазытқыш қоймалар</span>{' '}
                      мен герметикалық элеваторлар желісін салу арқылы егін жинау мен тасымалдау
                      кезінде шіріп кететін өнім шығынын екі есеге қысқарту.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                      Цифрлық логистикалық тізбек пен азық-түлік банктерін дамыту жыл сайын қоқысқа
                      тасталатын 1.3 миллиард тонна тағамды тапшылық көріп отырған өңірлерге
                      бағыттауға мүмкіндік береді.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-xs">
                    <span className="font-mono-tabular text-red-300 font-bold">
                      310 миллион адамды азықпен қамту
                    </span>
                    <span className="text-slate-300 font-medium">Екінші бағыт</span>
                  </div>
                </TiltGlassCard>

                <TiltGlassCard
                  active={enabledSolutions.fairDistribution}
                  glowColor="rgba(168, 85, 247, 0.26)"
                  onClick={() =>
                    setEnabledSolutions((s) => ({
                      ...s,
                      fairDistribution: !s.fairDistribution,
                    }))
                  }
                  className="p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-purple-300">
                        03 · ЭКОНОМИКАЛЫҚ ТЕНДІК
                      </span>
                      <Globe2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      Аймақтық аграрлық дербестік
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed mt-2">
                      Ыстыққа, құрғақшылыққа және тұзды топыраққа төзімді биоинженерлік тұқым
                      қорларын жергілікті шаруаларға қолжетімді ету және тамшылатып суару жүйелерін
                      субсидиялау арқылы импортқа тәуелділікті жою.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                      Халықаралық құқық аясында астық пен тыңайтқыш тасымалдайтын теңіз дәліздерін
                      әскери блокададан қорғау және әлемдік биржалардағы алыпсатарлық қымбатшылықты
                      шектеу.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-xs">
                    <span className="font-mono-tabular text-purple-300 font-bold">
                      140 миллион адамды азықпен қамту
                    </span>
                    <span className="text-slate-300 font-medium">Үшінші бағыт</span>
                  </div>
                </TiltGlassCard>
              </div>

              <TiltGlassCard
                glowColor="rgba(245, 158, 11, 0.32)"
                className="p-5 px-7 flex items-center justify-between gap-6"
              >
                <div className="space-y-1.5 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hyper-glass-pill text-xs font-bold text-amber-300">
                    <span>1-ТОПТЫҢ ҚОРЫТЫНДЫ ТҮЙІН СӨЗІ</span>
                  </div>
                  <blockquote className="font-display font-black text-2xl lg:text-[28px] tracking-tight amber-glass-text">
                    «Аштық — табиғаттың емес, жүйенің қателігі»
                  </blockquote>
                  <p className="text-xs lg:text-[13px] text-slate-200 leading-relaxed">
                    Бүгінгі өркениетте Жер бетіндегі сегіз миллиард халықты толыққанды әрі құнарлы
                    тамақтандыруға жететін ғылыми әлеует те, табиғи ресурс та, озық агротехнология
                    да жеткілікті. Адамзаттың алдындағы басты тарихи міндет — өндірілген игілікті
                    әділ бөлу, жаһандық сауда мен логистиканы соғыс құралына айналдырмау және
                    табиғат экожүйесімен үйлесімді тұрақты аграрлық жүйе қалыптастыру.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <div className="px-4 py-2 rounded-2xl bg-slate-950/60 border border-white/15 text-right">
                    <div className="text-[11px] text-slate-400">Зерттеуші ұжым</div>
                    <div className="text-sm font-bold text-white mt-0.5">1-ТОП БАЯНДАМАШЫЛАРЫ</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToSlide(0)}
                    className="px-4 py-2 rounded-full hyper-glass-pill text-xs font-semibold text-amber-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Бастапқы бетке оралу ↺
                  </button>
                </div>
              </TiltGlassCard>
            </motion.section>
          )}
      </main>

      {/* Bottom Frosted Glass Control Dock */}
      <footer className="relative z-30 flex items-center justify-between px-8 pb-5 pt-2 shrink-0">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full hyper-glass-pill">
          <span className="font-mono-tabular text-xs font-bold text-amber-400">
            0{currentSlide + 1} / 06
          </span>
          <span className="text-white/25">·</span>
          <span className="text-xs font-semibold text-slate-200">
            {SLIDE_META[currentSlide].fullTitle}
          </span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full hyper-glass-pill">
          {SLIDE_META.map((s) => {
            const active = s.index === currentSlide;
            return (
              <button
                key={s.code}
                type="button"
                aria-label={`${s.index + 1}-слайд: ${s.fullTitle}`}
                onClick={() => goToSlide(s.index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active
                    ? 'w-8 bg-gradient-to-r from-amber-400 to-red-500'
                    : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Алдыңғы слайд"
            className={`px-4 py-2 rounded-full hyper-glass-pill text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'text-slate-200 hover:text-white hover:border-white/30'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Алдыңғы</span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === SLIDE_META.length - 1}
            aria-label="Келесі слайд"
            className={`px-4 py-2 rounded-full hyper-glass-pill text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              currentSlide === SLIDE_META.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'text-amber-200 hover:text-white border-amber-400/30 hover:border-amber-400/60'
            }`}
          >
            <span>Келесі</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
