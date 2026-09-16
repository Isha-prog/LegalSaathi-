import { NavLink, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

const STEPS = [
  { n: 1, path: "/app/step-1", labelKey: "nav1", subKey: "nav1sub" },
  { n: 2, path: "/app/step-2", labelKey: "nav2", subKey: "nav2sub" },
  { n: 3, path: "/app/step-3", labelKey: "nav3", subKey: "nav3sub" },
  { n: 4, path: "/app/step-4", labelKey: "nav4", subKey: "nav4sub" },
  { n: 5, path: "/app/step-5", labelKey: "nav5", subKey: "nav5sub" },
];

export default function Sidebar() {
  const { lang, unlockedStep, user, setUser } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V21M7 6H4L2 11C2 12.1 3.3 13 5 13C6.7 13 8 12.1 8 11L6 6H7ZM17 6H20L22 11C22 12.1 20.7 13 19 13C17.3 13 16 12.1 16 11L18 6H17ZM4.5 21H19.5" stroke="#241804" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="brand-name">LegalSaathi</div>
          <div className="brand-tag">{t.tagline}</div>
        </div>
      </div>

      <div className="nav-section-label">{t.navLabel}</div>
      <nav className="nav">
        {STEPS.map((step) => {
          const isDone = step.n < unlockedStep;
          const isLocked = step.n > unlockedStep;
          const classes = ["nav-item"];
          if (isDone) classes.push("done");
          if (isLocked) classes.push("locked");

          if (isLocked) {
            return (
              <button key={step.n} className={classes.join(" ")} disabled>
                <span className="num">{step.n}</span>
                <span>
                  <span className="label">{t[step.labelKey]}</span>
                  <div className="sub">{t[step.subKey]}</div>
                </span>
              </button>
            );
          }
          return (
            <NavLink
              key={step.n}
              to={step.path}
              className={({ isActive }) => classes.concat(isActive ? "active" : []).join(" ")}
            >
              <span className="num">{step.n}</span>
              <span>
                <span className="label">{t[step.labelKey]}</span>
                <div className="sub">{isDone ? "" : t[step.subKey]}</div>
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <div className="grounded-note">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1 }} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V11C4 16 7.4 20.4 12 22C16.6 20.4 20 16 20 11V6L12 2Z" stroke="#A8AFC6" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <span>{t.groundedNote}</span>
        </div>
        {user && (
          <div className="logout-row">
            <span style={{ fontSize: 12.5, color: "#DCE4F2" }}>{user.name || user.email}</span>
            <span style={{ color: "#5C6584" }}>·</span>
            <button onClick={handleLogout}>{t.logout}</button>
          </div>
        )}
      </div>
    </aside>
  );
}
