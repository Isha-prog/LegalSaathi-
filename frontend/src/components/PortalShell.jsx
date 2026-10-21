import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

function BrandMark() {
  return (
    <div className="brand-mark">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V21M7 6H4L2 11C2 12.1 3.3 13 5 13C6.7 13 8 12.1 8 11L6 6H7ZM17 6H20L22 11C22 12.1 20.7 13 19 13C17.3 13 16 12.1 16 11L18 6H17ZM4.5 21H19.5" stroke="#241804" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function PortalShell({ children }) {
  const { lang, setLang } = useCase();
  const t = i18n[lang];
  const { hash, pathname } = useLocation();

  // Scroll to the section named in the URL hash (e.g. /login#how), else to top.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <div className="portal">
      <div className="portal-top">
        <div className="portal-top-inner">
          <span>{t.p_topNote}</span>
          <div className="portal-top-right">
            <a className="skip" href="#main">{t.p_skip}</a>
            <div className="lang-toggle">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">English</button>
              <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")} type="button">हिंदी</button>
            </div>
          </div>
        </div>
      </div>

      <header className="portal-header">
        <div className="portal-header-inner">
          <Link to="/login" className="portal-brand">
            <BrandMark />
            <div>
              <div className="name">LegalSaathi</div>
              <div className="tag">{t.tagline}</div>
            </div>
          </Link>
          <div className="portal-header-links">
            <Link to="/login" className="portal-link-btn">{t.p_headLogin}</Link>
            <Link to="/signup" className="portal-link-btn primary">{t.p_headRegister}</Link>
          </div>
        </div>
      </header>

      <nav className="portal-nav" aria-label="Primary">
        <div className="portal-nav-inner">
          <Link to="/login#home">{t.p_navHome}</Link>
          <Link to="/login#how">{t.p_navHow}</Link>
          <Link to="/login#issues">{t.p_navIssues}</Link>
          <Link to="/login#notices">{t.p_navNotices}</Link>
          <Link to="/login#faq">{t.p_navFaq}</Link>
        </div>
      </nav>

      <main id="main" className="portal-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="portal-footer">
        <div className="portal-footer-inner">
          <div>
            <h4>{t.p_footAbout}</h4>
            <p>{t.p_footAboutDesc}</p>
          </div>
          <div>
            <h4>{t.p_footLinks}</h4>
            <Link to="/login#how">{t.p_navHow}</Link>
            <Link to="/login#issues">{t.p_navIssues}</Link>
            <Link to="/login#notices">{t.p_navNotices}</Link>
            <Link to="/login#faq">{t.p_navFaq}</Link>
          </div>
          <div>
            <h4>{t.p_footAccount}</h4>
            <Link to="/login">{t.p_headLogin}</Link>
            <Link to="/signup">{t.p_headRegister}</Link>
          </div>
        </div>
        <div className="portal-footer-bottom">
          <span>{t.p_copy}</span>
          <span>{t.p_copyNote}</span>
        </div>
      </footer>
    </div>
  );
}