import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  setCabinetOpen: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "download", label: "Скачать" },
  { id: "screenshots", label: "Скриншоты" },
  { id: "bonuses", label: "Бонусы" },
  { id: "contacts", label: "Контакты" },
  { id: "faq", label: "FAQ" },
];

const ONLINE_COUNT = 847 + Math.floor(Math.random() * 60);

export default function Navbar({ activeSection, scrollTo, setCabinetOpen, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [online, setOnline] = useState(ONLINE_COUNT);
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const ps = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 8 + i * 12,
      delay: i * 0.4,
      size: 3 + Math.random() * 4,
    }));
    setParticles(ps);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-1.5 overflow-hidden"
        style={{ background: "linear-gradient(90deg, #8B2500, #FF6B00, #FF8C00, #FF6B00, #8B2500)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }}
      >
        <span style={{ fontFamily: "Oswald", fontSize: 11, letterSpacing: 2, color: "#fff", fontWeight: 700 }}>
          🔥 НОВЫЙ СЕЗОН ОТКРЫТ — РЕГИСТРИРУЙСЯ И ПОЛУЧИ VIP БЕСПЛАТНО
        </span>
        <span style={{ fontFamily: "Roboto", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>|</span>
        <span style={{ fontFamily: "Roboto", fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: 0.5 }}>
          ОНЛАЙН: <strong style={{ color: "#fff" }}>{online.toLocaleString()}</strong>
        </span>
      </div>

      {/* Main navbar */}
      <nav
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: 28,
          background: scrolled
            ? "rgba(10,10,10,0.97)"
            : "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.0) 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(4px)",
          borderBottom: scrolled ? "1px solid rgba(255,107,0,0.2)" : "none",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Orange fire line at bottom when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
            <div style={{ height: "100%", background: "linear-gradient(90deg, transparent 0%, var(--orange) 30%, #FF8C00 50%, var(--orange) 70%, transparent 100%)", animation: "shimmer 2s linear infinite", backgroundSize: "200% 100%" }} />
          </div>
        )}

        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group relative"
          >
            {/* Fire particles behind logo */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #FF6B00, #FF3D00)",
                  boxShadow: "0 0 16px rgba(255,107,0,0.6), 0 0 32px rgba(255,107,0,0.3)",
                }}
              />
              {particles.map(p => (
                <div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    bottom: "100%",
                    background: "#FF8C00",
                    opacity: 0.8,
                    animation: `floatUp 1.8s ease-in infinite`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
              <span className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 700, color: "#fff" }}>⚡</span>
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="transition-all group-hover:tracking-widest"
                style={{
                  fontFamily: "Oswald",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: "var(--orange)",
                  textShadow: "0 0 12px rgba(255,107,0,0.6)",
                  transition: "letter-spacing 0.3s ease",
                }}
              >
                ГРОЗА
              </span>
              <span style={{ fontFamily: "Oswald", fontSize: 11, fontWeight: 400, letterSpacing: 5, color: "#B0A898" }}>
                МОБАЙЛ
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all group"
                  style={{
                    fontFamily: "Roboto",
                    letterSpacing: 0.5,
                    color: isActive ? "#fff" : "#9A9087",
                    background: isActive ? "rgba(255,107,0,0.12)" : "transparent",
                  }}
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = "#9A9087"; e.currentTarget.style.background = "transparent"; } }}
                >
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: 20, height: 2, background: "var(--orange)", boxShadow: "0 0 6px rgba(255,107,0,0.8)" }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Online badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E", animation: "pulse 2s infinite" }}
              />
              <span style={{ fontFamily: "Oswald", fontSize: 12, color: "#22C55E", letterSpacing: 1 }}>
                {online.toLocaleString()} онлайн
              </span>
            </div>

            {/* Cabinet button */}
            <button
              onClick={() => setCabinetOpen(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm overflow-hidden group transition-all hover:scale-105"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 1.5 }}
            >
              {/* Shine sweep */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-20deg)" }}
              />
              <Icon name="User" size={16} />
              КАБИНЕТ
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: mobileMenuOpen ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.06)", color: "var(--orange)", border: "1px solid rgba(255,107,0,0.2)" }}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed left-0 right-0 z-30"
          style={{
            top: 28 + 58,
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,107,0,0.15)",
            animation: "fadeInUp 0.2s ease",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-3 text-left px-4 py-3 rounded-xl text-base font-medium transition-all"
                  style={{
                    fontFamily: "Roboto",
                    color: isActive ? "#fff" : "#9A9087",
                    background: isActive ? "rgba(255,107,0,0.1)" : "transparent",
                    borderLeft: `3px solid ${isActive ? "var(--orange)" : "transparent"}`,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="h-px my-2" style={{ background: "rgba(255,107,0,0.1)" }} />
            <button
              onClick={() => { setCabinetOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 1.5 }}
            >
              <Icon name="User" size={18} />
              ЛИЧНЫЙ КАБИНЕТ
            </button>
            <div
              className="flex items-center justify-center gap-2 py-2 rounded-lg mt-1"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
              <span style={{ fontFamily: "Oswald", fontSize: 13, color: "#22C55E", letterSpacing: 1 }}>
                {online.toLocaleString()} игроков онлайн
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CSS for float animation */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-18px) scale(0.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
