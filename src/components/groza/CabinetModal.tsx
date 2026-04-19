import Icon from "@/components/ui/icon";
import { User, ACHIEVEMENTS } from "./types";

interface CabinetModalProps {
  onClose: () => void;
  user: User | null;
  authTab: "login" | "register";
  setAuthTab: (v: "login" | "register") => void;
  authNickname: string;
  setAuthNickname: (v: string) => void;
  authPassword: string;
  setAuthPassword: (v: string) => void;
  authLoading: boolean;
  authError: string;
  setAuthError: (v: string) => void;
  handleAuth: () => void;
  handleLogout: () => void;
}

export default function CabinetModal({
  onClose,
  user,
  authTab,
  setAuthTab,
  authNickname,
  setAuthNickname,
  authPassword,
  setAuthPassword,
  authLoading,
  authError,
  setAuthError,
  handleAuth,
  handleLogout,
}: CabinetModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
          <button onClick={onClose} style={{ color: "#B0A898" }} className="hover:text-white transition-colors">
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
  );
}
