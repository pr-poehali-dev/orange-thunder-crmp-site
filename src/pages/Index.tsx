import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/445cc312-ea18-48af-be1f-553563f9c1b8";

type User = {
  id: number;
  nickname: string;
  level: number;
  xp: number;
  balance: number;
  hours_played: number;
  rating: number;
};

const SCREENSHOTS = [
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

const BONUSES = [
  { icon: "Gift", title: "Стартовый пак", desc: "10 000$ игровой валюты + базовый транспорт при первом входе", badge: "НОВИЧОК" },
  { icon: "Zap", title: "Ежедневный бонус", desc: "Заходи каждый день и получай накапливаемые награды до ×7 на 7-й день", badge: "ЕЖЕДНЕВНО" },
  { icon: "Trophy", title: "Топ-игрок", desc: "Попади в топ-100 по рейтингу и получи эксклюзивный скин + 50 000$", badge: "ТОП-100" },
  { icon: "Users", title: "Реферальная программа", desc: "Приглашай друзей — получи 5 000$ за каждого нового игрока", badge: "ДРУЗЬЯ" },
  { icon: "Star", title: "VIP-статус", desc: "Первые 30 дней VIP-статус бесплатно — ускоренный опыт и особые права", badge: "VIP" },
  { icon: "Shield", title: "Боевой пропуск", desc: "Выполняй задания и открывай уникальные предметы каждый сезон", badge: "СЕЗОН" },
];

const FAQ_ITEMS = [
  { q: "На каких устройствах работает ГРОЗА МОБАЙЛ?", a: "Игра работает на Android 6.0+ и iOS 12+. Поддерживаются смартфоны и планшеты." },
  { q: "Игра бесплатная?", a: "Да, базовая игра полностью бесплатна. В игре есть опциональные платные элементы для ускорения прогресса." },
  { q: "Как получить бонусы при регистрации?", a: "После первого входа в игру бонусный пак начисляется автоматически в течение 5 минут." },
  { q: "Есть ли личный кабинет?", a: "Да! После регистрации тебе доступен личный кабинет с историей прогресса, достижениями и статистикой." },
  { q: "Как связаться с поддержкой?", a: "Напишите нам в Telegram или Discord — отвечаем в течение нескольких часов." },
];

const ACHIEVEMENTS = [
  { name: "Первый бой", icon: "Sword", done: true },
  { name: "Богач", icon: "DollarSign", done: true },
  { name: "Топ-500", icon: "TrendingUp", done: true },
  { name: "Легенда", icon: "Crown", done: false },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth state
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authNickname, setAuthNickname] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("groza_token");
    if (token) {
      fetch(AUTH_URL, { headers: { "X-Session-Token": token } })
        .then(r => r.json())
        .then(d => { if (d.ok) setUser(d.user); else localStorage.removeItem("groza_token"); })
        .catch(() => {});
    }
  }, []);

  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: authTab, nickname: authNickname, password: authPassword }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem("groza_token", data.token);
        setUser(data.user);
        setAuthNickname("");
        setAuthPassword("");
      } else {
        setAuthError(data.error || "Ошибка");
      }
    } catch {
      setAuthError("Ошибка соединения");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("groza_token");
    setUser(null);
    setAuthError("");
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", color: "#F5F0E8" }}>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,107,0,0.15)" }}
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <span style={{ color: "var(--orange)", fontFamily: "Oswald", fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>ГРОЗА</span>
          <span style={{ fontFamily: "Oswald", fontSize: 22, fontWeight: 400, letterSpacing: 2 }}>МОБАЙЛ</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {[
            { id: "home", label: "Главная" },
            { id: "download", label: "Скачать" },
            { id: "screenshots", label: "Скриншоты" },
            { id: "bonuses", label: "Бонусы" },
            { id: "contacts", label: "Контакты" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="animated-link text-sm font-medium transition-colors"
              style={{ fontFamily: "Roboto", letterSpacing: 1, color: activeSection === item.id ? "var(--orange)" : "#B0A898" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setCabinetOpen(true)}
            className="px-4 py-2 rounded text-sm font-bold transition-all hover:scale-105"
            style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 1 }}
          >
            КАБИНЕТ
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--orange)" }}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed top-[65px] left-0 right-0 z-40 flex flex-col gap-1 p-4"
          style={{ background: "rgba(13,13,13,0.98)", borderBottom: "1px solid rgba(255,107,0,0.2)" }}
        >
          {[
            { id: "home", label: "Главная" },
            { id: "download", label: "Скачать" },
            { id: "screenshots", label: "Скриншоты" },
            { id: "bonuses", label: "Бонусы" },
            { id: "contacts", label: "Контакты" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left px-4 py-3 rounded text-base font-medium"
              style={{ fontFamily: "Oswald", letterSpacing: 1, color: "#F5F0E8", borderLeft: `3px solid ${activeSection === item.id ? "var(--orange)" : "transparent"}` }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setCabinetOpen(true); setMobileMenuOpen(false); }}
            className="mt-2 px-4 py-3 rounded text-base font-bold"
            style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 1 }}
          >
            ЛИЧНЫЙ КАБИНЕТ
          </button>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center hero-bg noise-overlay pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)" }} />
          <div className="absolute top-2/3 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.08), transparent)" }} />
          <div className="absolute w-96 h-96 rounded-full -top-20 -right-20 opacity-10" style={{ background: "radial-gradient(circle, var(--orange), transparent)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-up delay-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 shimmer-badge" style={{ border: "1px solid rgba(255,107,0,0.4)" }}>
            <span style={{ color: "var(--orange)", fontSize: 12, fontFamily: "Roboto", fontWeight: 700, letterSpacing: 2 }}>⚡ CRMP СЕРВЕР #1 В MOBILE</span>
          </div>

          <h1
            className="animate-fade-up delay-2 fire-glow mb-4 leading-none"
            style={{ fontFamily: "Oswald", fontSize: "clamp(52px, 10vw, 120px)", fontWeight: 700, color: "var(--orange)", letterSpacing: -1 }}
          >
            ГРОЗА
          </h1>
          <h1
            className="animate-fade-up delay-3 mb-8 leading-none"
            style={{ fontFamily: "Oswald", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 400, color: "#F5F0E8", letterSpacing: 4 }}
          >
            МОБАЙЛ
          </h1>

          <p className="animate-fade-up delay-4 text-lg mb-3 max-w-2xl mx-auto" style={{ color: "#B0A898", fontFamily: "Roboto", lineHeight: 1.7 }}>
            Лучший <strong style={{ color: "#F5F0E8" }}>CRMP ролевой сервер</strong> для мобильных устройств. Живи жизнью персонажа, строй карьеру, участвуй в эпических битвах и получай эксклюзивные бонусы.
          </p>
          <p className="animate-fade-up delay-5 text-base mb-10" style={{ color: "var(--orange-light)", fontFamily: "Roboto", fontWeight: 600 }}>
            🎁 Бонус для новых игроков — 10 000$ игровой валюты при регистрации!
          </p>

          <div className="animate-fade-up delay-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollTo("download")}
              className="pulse-btn flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2, minWidth: 220 }}
            >
              <Icon name="Download" size={22} />
              СКАЧАТЬ ИГРУ
            </button>
            <button
              onClick={() => setCabinetOpen(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
              style={{ border: "2px solid var(--orange)", color: "var(--orange)", fontFamily: "Oswald", letterSpacing: 2, background: "transparent", minWidth: 220 }}
            >
              <Icon name="User" size={22} />
              КАБИНЕТ ИГРОКА
            </button>
          </div>

          <div className="animate-fade-up delay-6 flex flex-wrap justify-center gap-10 mt-16">
            {[
              { val: "50 000+", label: "Игроков" },
              { val: "3 года", label: "Работаем" },
              { val: "24/7", label: "Онлайн" },
              { val: "100+", label: "Заданий" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "Oswald", fontSize: 32, fontWeight: 700, color: "var(--orange)" }}>{s.val}</div>
                <div style={{ fontFamily: "Roboto", fontSize: 13, color: "#B0A898", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <Icon name="ChevronDown" size={24} style={{ color: "var(--orange)" }} />
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== DOWNLOAD ===== */}
      <section id="download" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span style={{ color: "var(--orange)", fontFamily: "Roboto", fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>НАЧНИ ИГРАТЬ</span>
            <h2 style={{ fontFamily: "Oswald", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: 8 }}>СКАЧАТЬ ИГРУ</h2>
            <p style={{ color: "#B0A898", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}>Доступно для Android и iOS. Бесплатно — установи за 2 минуты.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="game-card rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.15)" }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,107,0,0.1)", border: "2px solid rgba(255,107,0,0.3)" }}>
                <Icon name="Smartphone" size={40} style={{ color: "var(--orange)" }} />
              </div>
              <h3 style={{ fontFamily: "Oswald", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Google Play</h3>
              <p style={{ color: "#B0A898", marginBottom: 20, lineHeight: 1.6, fontSize: 14 }}>Android 6.0 и выше. Размер: ~180 МБ</p>
              <div className="flex items-center gap-1 mb-5">
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "var(--orange)", fontSize: 18 }}>{s}</span>)}
                <span style={{ color: "#B0A898", fontSize: 13, marginLeft: 6 }}>4.8 (12 500 отзывов)</span>
              </div>
              <button
                className="w-full py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2 }}
              >
                <Icon name="Download" size={18} className="inline mr-2" />
                СКАЧАТЬ APK
              </button>
            </div>

            <div className="game-card rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.15)" }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,107,0,0.1)", border: "2px solid rgba(255,107,0,0.3)" }}>
                <Icon name="Monitor" size={40} style={{ color: "var(--orange)" }} />
              </div>
              <h3 style={{ fontFamily: "Oswald", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>App Store</h3>
              <p style={{ color: "#B0A898", marginBottom: 20, lineHeight: 1.6, fontSize: 14 }}>iOS 12.0 и выше. Размер: ~165 МБ</p>
              <div className="flex items-center gap-1 mb-5">
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "var(--orange)", fontSize: 18 }}>{s}</span>)}
                <span style={{ color: "#B0A898", fontSize: 13, marginLeft: 6 }}>4.7 (8 900 отзывов)</span>
              </div>
              <button
                className="w-full py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "transparent", border: "2px solid var(--orange)", color: "var(--orange)", fontFamily: "Oswald", letterSpacing: 2 }}
              >
                <Icon name="Download" size={18} className="inline mr-2" />
                СКАЧАТЬ IPA
              </button>
            </div>
          </div>

          <div className="text-center mb-4">
            <span style={{ color: "#B0A898", fontFamily: "Roboto", fontSize: 13, letterSpacing: 1 }}>НАШИ СООБЩЕСТВА</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: "MessageCircle", label: "Telegram", color: "#229ED9", bg: "rgba(34,158,217,0.1)", border: "rgba(34,158,217,0.3)" },
              { icon: "Hash", label: "Discord", color: "#5865F2", bg: "rgba(88,101,242,0.1)", border: "rgba(88,101,242,0.3)" },
              { icon: "Play", label: "VK Play", color: "#0077FF", bg: "rgba(0,119,255,0.1)", border: "rgba(0,119,255,0.3)" },
              { icon: "Youtube", label: "YouTube", color: "#FF0000", bg: "rgba(255,0,0,0.1)", border: "rgba(255,0,0,0.3)" },
              { icon: "Music", label: "TikTok", color: "#69C9D0", bg: "rgba(105,201,208,0.1)", border: "rgba(105,201,208,0.3)" },
            ].map((s) => (
              <button
                key={s.label}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: "Oswald", fontSize: 15, letterSpacing: 1 }}
              >
                <Icon name={s.icon} size={18} fallback="Link" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== SCREENSHOTS ===== */}
      <section id="screenshots" className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--dark-bg) 0%, #100C07 50%, var(--dark-bg) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span style={{ color: "var(--orange)", fontFamily: "Roboto", fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>ИГРОВОЙ МИР</span>
            <h2 style={{ fontFamily: "Oswald", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: 8 }}>СКРИНШОТЫ</h2>
            <p style={{ color: "#B0A898", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}>Живые кадры из игрового процесса нашего сервера</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SCREENSHOTS.map((shot, i) => (
              <div key={i} className="screenshot-card rounded-2xl overflow-hidden cursor-pointer" style={{ border: "1px solid rgba(255,107,0,0.15)" }}>
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  <img src={shot.src} alt={shot.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <span style={{ fontFamily: "Oswald", fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: 1 }}>{shot.label}</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded" style={{ background: "rgba(255,107,0,0.8)", fontFamily: "Oswald", fontSize: 11, letterSpacing: 1, color: "#fff" }}>
                    CRMP
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              className="px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ border: "2px solid rgba(255,107,0,0.4)", color: "var(--orange)", fontFamily: "Oswald", letterSpacing: 2, background: "transparent" }}
            >
              <Icon name="Image" size={18} className="inline mr-2" />
              ВСЕ СКРИНШОТЫ
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== BONUSES ===== */}
      <section id="bonuses" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span style={{ color: "var(--orange)", fontFamily: "Roboto", fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>СПЕЦИАЛЬНО ДЛЯ ТЕБЯ</span>
            <h2 style={{ fontFamily: "Oswald", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: 8 }}>БОНУСНАЯ СИСТЕМА</h2>
            <p style={{ color: "#B0A898", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}>Получай ценные награды каждый день — мы ценим каждого игрока</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BONUSES.map((b, i) => (
              <div key={i} className="game-card rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.12)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)" }}>
                    <Icon name={b.icon} size={22} fallback="Gift" style={{ color: "var(--orange)" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 700 }}>{b.title}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "rgba(255,107,0,0.15)", color: "var(--orange)", letterSpacing: 1 }}>{b.badge}</span>
                    </div>
                    <p style={{ color: "#B0A898", fontSize: 14, lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(255,60,0,0.05) 100%)", border: "1px solid rgba(255,107,0,0.25)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--orange), transparent)" }} />
            <h3 style={{ fontFamily: "Oswald", fontSize: 32, fontWeight: 700, color: "var(--orange)", marginBottom: 8 }}>🎁 БОНУС ПРИ РЕГИСТРАЦИИ</h3>
            <p style={{ color: "#F5F0E8", fontSize: 16, marginBottom: 20, lineHeight: 1.6 }}>Зарегистрируйся прямо сейчас и получи <strong style={{ color: "var(--orange)" }}>10 000$ игровой валюты</strong> + VIP-статус на 30 дней бесплатно</p>
            <button
              onClick={() => setCabinetOpen(true)}
              className="px-10 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 pulse-btn"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2 }}
            >
              ПОЛУЧИТЬ БОНУС
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CONTACTS ===== */}
      <section id="contacts" className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--dark-bg) 0%, #100C07 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span style={{ color: "var(--orange)", fontFamily: "Roboto", fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>СВЯЗАТЬСЯ</span>
            <h2 style={{ fontFamily: "Oswald", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: 8 }}>КОНТАКТЫ</h2>
            <p style={{ color: "#B0A898", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}>Мы всегда на связи — пишите, поможем!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: "MessageCircle", title: "Telegram", subtitle: "@grozamobile", desc: "Быстрый ответ в Telegram-чате", color: "#229ED9", bg: "rgba(34,158,217,0.08)", border: "rgba(34,158,217,0.2)" },
              { icon: "Hash", title: "Discord", subtitle: "discord.gg/grozamobile", desc: "Наш официальный Discord сервер", color: "#5865F2", bg: "rgba(88,101,242,0.08)", border: "rgba(88,101,242,0.2)" },
              { icon: "Mail", title: "E-mail", subtitle: "support@grozamobile.ru", desc: "Вопросы по аккаунту и багам", color: "var(--orange)", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.2)" },
              { icon: "Play", title: "VK Группа", subtitle: "vk.com/grozamobile", desc: "Новости, акции и анонсы", color: "#0077FF", bg: "rgba(0,119,255,0.08)", border: "rgba(0,119,255,0.2)" },
            ].map((c) => (
              <div key={c.title} className="game-card rounded-2xl p-6 flex items-start gap-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <Icon name={c.icon} size={24} fallback="Link" style={{ color: c.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: "Oswald", fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ color: c.color, fontFamily: "Roboto", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.subtitle}</div>
                  <div style={{ color: "#B0A898", fontSize: 13 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.15)" }}>
            <h3 style={{ fontFamily: "Oswald", fontSize: 24, fontWeight: 700, marginBottom: 20, color: "var(--orange)" }}>НАПИСАТЬ НАМ</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                placeholder="Ваш никнейм"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.2)", color: "#F5F0E8", fontFamily: "Roboto" }}
              />
              <input
                placeholder="Контакт (TG, Discord)"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.2)", color: "#F5F0E8", fontFamily: "Roboto" }}
              />
            </div>
            <textarea
              rows={4}
              placeholder="Ваш вопрос или предложение..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none mb-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.2)", color: "#F5F0E8", fontFamily: "Roboto" }}
            />
            <button
              className="px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2, fontSize: 16 }}
            >
              <Icon name="Send" size={18} className="inline mr-2" />
              ОТПРАВИТЬ
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span style={{ color: "var(--orange)", fontFamily: "Roboto", fontSize: 12, letterSpacing: 3, fontWeight: 700 }}>ВОПРОСЫ И ОТВЕТЫ</span>
            <h2 style={{ fontFamily: "Oswald", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginTop: 8 }}>FAQ</h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{ background: "var(--dark-card)", border: `1px solid ${openFaq === i ? "rgba(255,107,0,0.4)" : "rgba(255,107,0,0.12)"}` }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between px-6 py-5 gap-4">
                  <span style={{ fontFamily: "Oswald", fontSize: 17, fontWeight: 600, color: openFaq === i ? "var(--orange)" : "#F5F0E8" }}>
                    {item.q}
                  </span>
                  <div className="flex-shrink-0">
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      style={{ color: "var(--orange)" }}
                    />
                  </div>
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ color: "#B0A898", lineHeight: 1.7, fontSize: 15, borderTop: "1px solid rgba(255,107,0,0.1)", paddingTop: 16 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(255,107,0,0.15)", background: "rgba(0,0,0,0.4)" }}>
        <div style={{ fontFamily: "Oswald", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          <span style={{ color: "var(--orange)" }}>ГРОЗА</span> МОБАЙЛ
        </div>
        <p style={{ color: "#B0A898", fontSize: 13, marginBottom: 16 }}>CRMP Mobile Server © 2024. Все права защищены.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {["Telegram", "Discord", "VK", "YouTube", "TikTok"].map((s) => (
            <button
              key={s}
              style={{ color: "#B0A898", fontFamily: "Roboto", fontSize: 13, transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseOut={e => (e.currentTarget.style.color = "#B0A898")}
            >{s}</button>
          ))}
        </div>
      </footer>

      {/* ===== ЛИЧНЫЙ КАБИНЕТ ===== */}
      {cabinetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && setCabinetOpen(false)}
        >
          <div className="w-full max-w-md rounded-2xl overflow-hidden animate-fade-up" style={{ background: "var(--dark-card2)", border: "1px solid rgba(255,107,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,107,0,0.15)", background: "linear-gradient(135deg, rgba(255,107,0,0.08), transparent)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--orange)" }}>
                  <Icon name="User" size={20} style={{ color: "#fff" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 700 }}>ЛИЧНЫЙ КАБИНЕТ</div>
                  <div style={{ color: "#B0A898", fontSize: 12 }}>{user ? `Игрок: ${user.nickname}` : "Войди или зарегистрируйся"}</div>
                </div>
              </div>
              <button onClick={() => setCabinetOpen(false)} style={{ color: "#B0A898" }} className="hover:text-white transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>

            {/* AUTH FORM */}
            {!user ? (
              <div className="p-6">
                {/* Tabs */}
                <div className="flex rounded-xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,107,0,0.15)" }}>
                  {(["login", "register"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setAuthTab(tab); setAuthError(""); }}
                      className="flex-1 py-3 font-bold transition-all"
                      style={{
                        fontFamily: "Oswald", letterSpacing: 1, fontSize: 15,
                        background: authTab === tab ? "var(--orange)" : "transparent",
                        color: authTab === tab ? "#fff" : "#B0A898",
                      }}
                    >
                      {tab === "login" ? "ВОЙТИ" : "РЕГИСТРАЦИЯ"}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label style={{ fontFamily: "Oswald", fontSize: 12, letterSpacing: 1, color: "#B0A898", display: "block", marginBottom: 6 }}>НИКНЕЙМ</label>
                    <input
                      value={authNickname}
                      onChange={e => setAuthNickname(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAuth()}
                      placeholder="Введи никнейм..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.25)", color: "#F5F0E8", fontFamily: "Roboto" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "Oswald", fontSize: 12, letterSpacing: 1, color: "#B0A898", display: "block", marginBottom: 6 }}>ПАРОЛЬ</label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAuth()}
                      placeholder="Не менее 6 символов..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.25)", color: "#F5F0E8", fontFamily: "Roboto" }}
                    />
                  </div>

                  {authError && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.25)" }}>
                      <Icon name="AlertCircle" size={16} style={{ color: "#ff6060", flexShrink: 0 }} />
                      <span style={{ color: "#ff6060", fontSize: 13 }}>{authError}</span>
                    </div>
                  )}

                  <button
                    onClick={handleAuth}
                    disabled={authLoading}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-60 disabled:scale-100"
                    style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2 }}
                  >
                    {authLoading
                      ? "ЗАГРУЗКА..."
                      : authTab === "login" ? "ВОЙТИ В КАБИНЕТ" : "СОЗДАТЬ АККАУНТ"
                    }
                  </button>

                  {authTab === "register" && (
                    <p style={{ color: "#B0A898", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                      При регистрации ты получаешь <span style={{ color: "var(--orange)", fontWeight: 700 }}>10 000$ игровой валюты</span> + VIP на 30 дней 🎁
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* PROFILE */
              <div className="p-6">
                <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.15)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "Oswald", fontSize: 15, color: "#B0A898" }}>УРОВЕНЬ</span>
                    <span style={{ fontFamily: "Oswald", fontSize: 22, fontWeight: 700, color: "var(--orange)" }}>LVL {user.level}</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 mb-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${Math.min(100, (user.xp % 1000) / 10)}%`, background: "linear-gradient(90deg, var(--orange), #FF8C00)" }} />
                  </div>
                  <div style={{ color: "#B0A898", fontSize: 12 }}>{user.xp} XP — продолжай играть для повышения уровня</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Баланс", val: `$${user.balance.toLocaleString()}`, icon: "DollarSign" },
                    { label: "Часов", val: `${user.hours_played} ч`, icon: "Clock" },
                    { label: "Рейтинг", val: user.rating > 0 ? `#${user.rating}` : "—", icon: "TrendingUp" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Icon name={s.icon} size={16} fallback="Star" style={{ color: "var(--orange)", margin: "0 auto 6px" }} />
                      <div style={{ fontFamily: "Oswald", fontSize: 14, fontWeight: 700 }}>{s.val}</div>
                      <div style={{ color: "#B0A898", fontSize: 11 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontFamily: "Oswald", fontSize: 14, letterSpacing: 1, color: "#B0A898", marginBottom: 12 }}>ДОСТИЖЕНИЯ</div>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl" style={{ background: a.done ? "rgba(255,107,0,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${a.done ? "rgba(255,107,0,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                      <Icon name={a.icon} size={20} fallback="Star" style={{ color: a.done ? "var(--orange)" : "#555" }} />
                      <span style={{ fontSize: 10, textAlign: "center", color: a.done ? "#F5F0E8" : "#555", lineHeight: 1.3 }}>{a.name}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontFamily: "Oswald", fontSize: 14, letterSpacing: 1, color: "#B0A898", marginBottom: 12 }}>ПОСЛЕДНИЕ АКТИВНОСТИ</div>
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    { text: "Аккаунт создан, бонус зачислен!", time: "При регистрации", icon: "Gift" },
                    { text: "Стартовый пак получен", time: "10 000$ игровой валюты", icon: "CheckCircle" },
                    { text: "VIP-статус активирован", time: "30 дней бесплатно", icon: "Star" },
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <Icon name={h.icon} size={15} fallback="Circle" style={{ color: "var(--orange)", flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 13, color: "#F5F0E8" }} className="truncate">{h.text}</div>
                        <div style={{ fontSize: 11, color: "#B0A898" }}>{h.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.25)", color: "#ff8080", fontFamily: "Oswald", letterSpacing: 1 }}
                >
                  <Icon name="LogOut" size={16} className="inline mr-2" />
                  ВЫЙТИ ИЗ АККАУНТА
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}