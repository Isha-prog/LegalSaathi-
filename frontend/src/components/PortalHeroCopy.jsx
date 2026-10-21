import { Link } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PortalHeroCopy() {
  const { lang } = useCase();
  const t = i18n[lang];

  return (
    <div>
      <span className="portal-badge">{t.p_heroBadge}</span>
      <h1>
        {t.p_heroTitle1}
        <span>{t.p_heroTitle2}</span>
      </h1>
      <p className="portal-lede">{t.p_heroLede}</p>
      <ul className="portal-points">
        <li><span className="tick"><Tick /></span>{t.p_pt1}</li>
        <li><span className="tick"><Tick /></span>{t.p_pt2}</li>
        <li><span className="tick"><Tick /></span>{t.p_pt3}</li>
      </ul>
      <Link to="/login#how" className="portal-ghost-btn">{t.p_seeHow}</Link>
    </div>
  );
}