export type User = {
  id: number;
  nickname: string;
  level: number;
  xp: number;
  balance: number;
  hours_played: number;
  rating: number;
};

export const AUTH_URL = "https://functions.poehali.dev/445cc312-ea18-48af-be1f-553563f9c1b8";

export const SCREENSHOTS = [
  {
    src: "https://cdn.poehali.dev/projects/ed3b03a7-7409-436d-b1b3-7ae08e85a353/files/b2b1c023-a683-4ef2-967e-761c528bf0e1.jpg",
    label: "Городские улицы",
  },
  {
    src: "https://cdn.poehali.dev/projects/ed3b03a7-7409-436d-b1b3-7ae08e85a353/files/6c8ca9ea-34f5-4592-a14b-df434f525044.jpg",
    label: "Ролевой геймплей",
  },
  {
    src: "https://cdn.poehali.dev/projects/ed3b03a7-7409-436d-b1b3-7ae08e85a353/files/4c69d730-36b8-47cb-8140-2328d15aaf15.jpg",
    label: "Эпические битвы",
  },
];

export const BONUSES = [
  { icon: "Gift", title: "Стартовый пак", desc: "10 000$ игровой валюты + базовый транспорт при первом входе", badge: "НОВИЧОК" },
  { icon: "Zap", title: "Ежедневный бонус", desc: "Заходи каждый день и получай накапливаемые награды до ×7 на 7-й день", badge: "ЕЖЕДНЕВНО" },
  { icon: "Trophy", title: "Топ-игрок", desc: "Попади в топ-100 по рейтингу и получи эксклюзивный скин + 50 000$", badge: "ТОП-100" },
  { icon: "Users", title: "Реферальная программа", desc: "Приглашай друзей — получи 5 000$ за каждого нового игрока", badge: "ДРУЗЬЯ" },
  { icon: "Star", title: "VIP-статус", desc: "Первые 30 дней VIP-статус бесплатно — ускоренный опыт и особые права", badge: "VIP" },
  { icon: "Shield", title: "Боевой пропуск", desc: "Выполняй задания и открывай уникальные предметы каждый сезон", badge: "СЕЗОН" },
];

export const FAQ_ITEMS = [
  { q: "На каких устройствах работает ГРОЗА МОБАЙЛ?", a: "Игра работает на Android 6.0+ и iOS 12+. Поддерживаются смартфоны и планшеты." },
  { q: "Игра бесплатная?", a: "Да, базовая игра полностью бесплатна. В игре есть опциональные платные элементы для ускорения прогресса." },
  { q: "Как получить бонусы при регистрации?", a: "После первого входа в игру бонусный пак начисляется автоматически в течение 5 минут." },
  { q: "Есть ли личный кабинет?", a: "Да! После регистрации тебе доступен личный кабинет с историей прогресса, достижениями и статистикой." },
  { q: "Как связаться с поддержкой?", a: "Напишите нам в Telegram или Discord — отвечаем в течение нескольких часов." },
];

export const ACHIEVEMENTS = [
  { name: "Первый бой", icon: "Sword", done: true },
  { name: "Богач", icon: "DollarSign", done: true },
  { name: "Топ-500", icon: "TrendingUp", done: true },
  { name: "Легенда", icon: "Crown", done: false },
];
