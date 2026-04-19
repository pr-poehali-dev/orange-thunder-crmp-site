import Icon from "@/components/ui/icon";
import { SCREENSHOTS, BONUSES, FAQ_ITEMS } from "./types";

interface PageSectionsProps {
  scrollTo: (id: string) => void;
  setCabinetOpen: (v: boolean) => void;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}

export default function PageSections({ scrollTo, setCabinetOpen, openFaq, setOpenFaq }: PageSectionsProps) {
  return (
    <>
      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center hero-bg noise-overlay" style={{ paddingTop: "calc(28px + 58px + 24px)" }}>
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
    </>
  );
}