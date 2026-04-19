import { useState, useEffect } from "react";
import Navbar from "@/components/groza/Navbar";
import PageSections from "@/components/groza/PageSections";
import CabinetModal from "@/components/groza/CabinetModal";
import { AUTH_URL, User } from "@/components/groza/types";

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
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        setCabinetOpen={setCabinetOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <PageSections
        scrollTo={scrollTo}
        setCabinetOpen={setCabinetOpen}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />

      {cabinetOpen && (
        <CabinetModal
          onClose={() => setCabinetOpen(false)}
          user={user}
          authTab={authTab}
          setAuthTab={setAuthTab}
          authNickname={authNickname}
          setAuthNickname={setAuthNickname}
          authPassword={authPassword}
          setAuthPassword={setAuthPassword}
          authLoading={authLoading}
          authError={authError}
          setAuthError={setAuthError}
          handleAuth={handleAuth}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}
