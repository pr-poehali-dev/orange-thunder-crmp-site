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

export default function Navbar({ activeSection, scrollTo, setCabinetOpen, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,107,0,0.15)" }}
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <span style={{ color: "var(--orange)", fontFamily: "Oswald", fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>ГРОЗА</span>
          <span style={{ fontFamily: "Oswald", fontSize: 22, fontWeight: 400, letterSpacing: 2 }}>МОБАЙЛ</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
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
          {NAV_ITEMS.map((item) => (
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
    </>
  );
}
