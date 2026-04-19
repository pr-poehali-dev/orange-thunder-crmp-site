import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/18f4efc7-fdd5-4fe9-88d5-aaacd72b947e";

type AdminUser = {
  id: number;
  nickname: string;
  level: number;
  xp: number;
  balance: number;
  hours_played: number;
  rating: number;
  created_at: string | null;
};

function getAdminToken(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadUsers = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Token": t } });
      const data = await res.json();
      if (data.ok) {
        setUsers(data.users);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const t = await sha256(password);
      const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Token": t } });
      const data = await res.json();
      if (res.ok && data.ok) {
        setToken(t);
        setAuthed(true);
        setUsers(data.users);
        setTotal(data.total);
        sessionStorage.setItem("groza_admin_token", t);
      } else {
        setAuthError("Неверный пароль");
      }
    } catch {
      setAuthError("Ошибка соединения");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("groza_admin_token");
    if (saved) {
      fetch(ADMIN_URL, { headers: { "X-Admin-Token": saved } })
        .then(r => r.json())
        .then(d => {
          if (d.ok) {
            setToken(saved);
            setAuthed(true);
            setUsers(d.users);
            setTotal(d.total);
          } else {
            sessionStorage.removeItem("groza_admin_token");
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleDelete = async (id: number) => {
    setActionLoading(id);
    try {
      await fetch(ADMIN_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ user_id: id }),
      });
      setUsers(prev => prev.filter(u => u.id !== id));
      setTotal(prev => prev - 1);
      setDeleteConfirm(null);
      showToast("Игрок удалён");
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetBalance = async (id: number) => {
    setActionLoading(id);
    try {
      await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ action: "reset_balance", user_id: id }),
      });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, balance: 10000 } : u));
      showToast("Баланс сброшен до $10 000");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter(u =>
    u.nickname.toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--dark-bg)" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "rgba(255,107,0,0.12)", border: "2px solid rgba(255,107,0,0.3)" }}>
              <Icon name="ShieldCheck" size={32} style={{ color: "var(--orange)" }} />
            </div>
            <h1 style={{ fontFamily: "Oswald", fontSize: 28, fontWeight: 700, color: "#F5F0E8", letterSpacing: 2 }}>АДМИН-ПАНЕЛЬ</h1>
            <p style={{ color: "#B0A898", fontSize: 13, marginTop: 4 }}>ГРОЗА МОБАЙЛ — управление сервером</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.2)" }}>
            <label style={{ fontFamily: "Oswald", fontSize: 12, letterSpacing: 1, color: "#B0A898", display: "block", marginBottom: 8 }}>ПАРОЛЬ АДМИНИСТРАТОРА</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Введите пароль..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.25)", color: "#F5F0E8", fontFamily: "Roboto" }}
            />
            {authError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4" style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)" }}>
                <Icon name="AlertCircle" size={15} style={{ color: "#ff6060" }} />
                <span style={{ color: "#ff6060", fontSize: 13 }}>{authError}</span>
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-60"
              style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 2 }}
            >
              {authLoading ? "ПРОВЕРКА..." : "ВОЙТИ"}
            </button>
          </div>

          <div className="text-center mt-6">
            <a href="/" style={{ color: "#B0A898", fontSize: 13, fontFamily: "Roboto" }} className="hover:text-white transition-colors">
              ← Вернуться на сайт
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", color: "#F5F0E8" }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl font-bold animate-fade-up" style={{ background: "var(--orange)", color: "#fff", fontFamily: "Oswald", letterSpacing: 1, boxShadow: "0 8px 32px rgba(255,107,0,0.4)" }}>
          <Icon name="CheckCircle" size={16} className="inline mr-2" />
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4" style={{ background: "rgba(13,13,13,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,107,0,0.15)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--orange)" }}>
            <Icon name="ShieldCheck" size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <span style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>АДМИН-ПАНЕЛЬ</span>
            <span style={{ color: "#B0A898", fontSize: 12, marginLeft: 8 }}>ГРОЗА МОБАЙЛ</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadUsers(token)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)", color: "var(--orange)", fontFamily: "Oswald", fontSize: 13, letterSpacing: 1 }}
          >
            <Icon name="RefreshCw" size={15} />
            ОБНОВИТЬ
          </button>
          <button
            onClick={() => { sessionStorage.removeItem("groza_admin_token"); setAuthed(false); setToken(""); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", color: "#ff8080", fontFamily: "Oswald", fontSize: 13, letterSpacing: 1 }}
          >
            <Icon name="LogOut" size={15} />
            ВЫЙТИ
          </button>
          <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#B0A898", fontFamily: "Oswald", fontSize: 13, letterSpacing: 1 }}
          >
            <Icon name="ArrowLeft" size={15} />
            САЙТ
          </a>
        </div>
      </header>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего игроков", val: total, icon: "Users", color: "var(--orange)" },
            { label: "Показано", val: filtered.length, icon: "Eye", color: "#5865F2" },
            { label: "Макс. уровень", val: users.length > 0 ? Math.max(...users.map(u => u.level)) : 0, icon: "TrendingUp", color: "#22C55E" },
            { label: "Суммарный баланс", val: `$${users.reduce((s, u) => s + u.balance, 0).toLocaleString()}`, icon: "DollarSign", color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "#B0A898", fontSize: 12, fontFamily: "Roboto" }}>{s.label}</span>
                <Icon name={s.icon} size={16} fallback="Star" style={{ color: s.color }} />
              </div>
              <div style={{ fontFamily: "Oswald", fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#B0A898" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по никнейму..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.2)", color: "#F5F0E8", fontFamily: "Roboto" }}
            />
          </div>
          {search && (
            <button onClick={() => setSearch("")} style={{ color: "#B0A898" }} className="hover:text-white transition-colors">
              <Icon name="X" size={18} />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--dark-card)", border: "1px solid rgba(255,107,0,0.12)" }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,107,0,0.1)" }}>
            <span style={{ fontFamily: "Oswald", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
              ИГРОКИ {loading && <span style={{ color: "#B0A898", fontSize: 13, fontWeight: 400 }}>— загрузка...</span>}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["ID", "Никнейм", "Уровень", "Баланс", "Часов", "Рейтинг", "Дата регистрации", "Действия"].map(h => (
                    <th key={h} className="px-4 py-3 text-left" style={{ fontFamily: "Oswald", fontSize: 12, letterSpacing: 1, color: "#B0A898", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center" style={{ color: "#B0A898", fontFamily: "Roboto" }}>
                      {loading ? "Загрузка..." : search ? "Игроки не найдены" : "Нет игроков"}
                    </td>
                  </tr>
                )}
                {filtered.map((u) => (
                  <tr key={u.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseOver={e => (e.currentTarget.style.background = "rgba(255,107,0,0.04)")}
                    onMouseOut={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="px-4 py-3" style={{ color: "#B0A898", fontSize: 13 }}>#{u.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "rgba(255,107,0,0.15)", color: "var(--orange)", fontFamily: "Oswald" }}>
                          {u.nickname[0]?.toUpperCase()}
                        </div>
                        <span style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 15 }}>{u.nickname}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: "rgba(255,107,0,0.12)", color: "var(--orange)", fontFamily: "Oswald" }}>
                        LVL {u.level}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ fontFamily: "Oswald", fontWeight: 600, color: "#22C55E" }}>${u.balance.toLocaleString()}</td>
                    <td className="px-4 py-3" style={{ color: "#B0A898", fontSize: 13 }}>{u.hours_played} ч</td>
                    <td className="px-4 py-3" style={{ color: "#B0A898", fontSize: 13 }}>{u.rating > 0 ? `#${u.rating}` : "—"}</td>
                    <td className="px-4 py-3" style={{ color: "#B0A898", fontSize: 12 }}>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString("ru-RU") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResetBalance(u.id)}
                          disabled={actionLoading === u.id}
                          className="p-1.5 rounded-lg transition-all hover:scale-110"
                          title="Сбросить баланс"
                          style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}
                        >
                          <Icon name="RotateCcw" size={14} />
                        </button>
                        {deleteConfirm === u.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(u.id)}
                              disabled={actionLoading === u.id}
                              className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                              style={{ background: "rgba(255,50,50,0.2)", color: "#ff6060", fontFamily: "Oswald" }}
                            >
                              {actionLoading === u.id ? "..." : "ДА"}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 rounded-lg text-xs font-bold transition-all"
                              style={{ background: "rgba(255,255,255,0.06)", color: "#B0A898", fontFamily: "Oswald" }}
                            >
                              НЕТ
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(u.id)}
                            className="p-1.5 rounded-lg transition-all hover:scale-110"
                            title="Удалить игрока"
                            style={{ background: "rgba(255,50,50,0.12)", color: "#ff8080" }}
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
