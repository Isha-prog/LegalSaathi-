import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";
import PortalShell from "../components/PortalShell";
import PortalHeroCopy from "../components/PortalHeroCopy";

const CATEGORY_ICONS = [
  // home
  <svg key="a" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>,
  // shopping bag
  <svg key="b" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  // document
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>,
  // briefcase
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
];

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M12 16v-5" /><path d="M12 8h.01" />
    </svg>
  );
}

export default function Login() {
  const { lang, setUser } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = t.errRequired;
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = t.errEmail;
    if (!password) errs.password = t.errRequired;
    else if (password.length < 6) errs.password = t.errPasswordShort;
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Mocked login — no backend yet. Swap this for a real API call later.
    setUser({ email, name: email.split("@")[0] });
    navigate("/app/step-1");
  }

  function handleGuest() {
    setUser({ email: "guest@legalsaathi.app", name: "Guest" });
    navigate("/app/step-1");
  }

  const steps = [
    { h: t.p_s1h, d: t.p_s1d },
    { h: t.p_s2h, d: t.p_s2d },
    { h: t.p_s3h, d: t.p_s3d },
    { h: t.p_s4h, d: t.p_s4d },
    { h: t.p_s5h, d: t.p_s5d },
  ];
  const ready = [t.p_r1, t.p_r2, t.p_r3, t.p_r4];
  const notices = [t.p_n1, t.p_n2, t.p_n3, t.p_n4];
  const cats = [
    { h: t.p_c1h, d: t.p_c1d, a: t.p_c1a },
    { h: t.p_c2h, d: t.p_c2d, a: t.p_c2a },
    { h: t.p_c3h, d: t.p_c3d, a: t.p_c3a },
    { h: t.p_c4h, d: t.p_c4d, a: t.p_c4a },
  ];
  const faqs = [
    { q: t.p_q1, a: t.p_a1 },
    { q: t.p_q2, a: t.p_a2 },
    { q: t.p_q3, a: t.p_a3 },
    { q: t.p_q4, a: t.p_a4 },
  ];

  return (
    <PortalShell>
      {/* HERO + LOGIN */}
      <section className="portal-hero" id="home">
        <div className="portal-hero-inner">
          <PortalHeroCopy />

          <div className="portal-card">
            <div className="portal-card-head">
              <div className="ic">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <div>
                <h2>{t.p_cardTitle}</h2>
                <div className="sub">{t.p_cardSub}</div>
              </div>
            </div>

            <div className="portal-card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="email">{t.emailLabel}</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="field" style={{ marginBottom: 8 }}>
                  <label htmlFor="password">{t.passwordLabel}</label>
                  <div className="pw-wrap">
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword((s) => !s)}>
                      {showPassword ? t.p_hide : t.p_show}
                    </button>
                  </div>
                  {errors.password && <div className="field-error">{errors.password}</div>}
                </div>

                <div className="card-row">
                  <button type="button" className="link-btn" onClick={() => setShowForgot((s) => !s)}>{t.p_forgot}</button>
                </div>
                {showForgot && <div className="forgot-note">{t.p_forgotNote}</div>}

                <button type="submit" className="auth-submit">{t.loginBtn}</button>
              </form>

              <div className="auth-divider">{t.orDivider}</div>
              <button className="guest-btn" onClick={handleGuest} type="button">{t.guestBtn}</button>

              <div className="card-register">
                {t.p_newUser}
                <Link to="/signup">{t.p_registerNow}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="portal-section" id="how">
        <h2 className="sec-title">{t.p_howTitle}</h2>
        <p className="sec-sub">{t.p_howSub}</p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-tile" key={i}>
              <div className="n">{i + 1}</div>
              <div className="h">{s.h}</div>
              <div className="d">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="two-col" id="notices" style={{ scrollMarginTop: 60 }}>
          <div className="info-card">
            <h3>{t.p_readyTitle}</h3>
            <ul className="info-list">
              {ready.map((r, i) => (
                <li key={i}><span className="bullet ok"><Check /></span>{r}</li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>{t.p_noticeTitle}</h3>
            <ul className="info-list">
              {notices.map((n, i) => (
                <li key={i}><span className="bullet note"><InfoDot /></span>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ISSUES COVERED */}
      <section className="portal-section" id="issues">
        <h2 className="sec-title">{t.p_issuesTitle}</h2>
        <p className="sec-sub">{t.p_issuesSub}</p>
        <div className="cat-grid">
          {cats.map((c, i) => (
            <div className="cat-card" key={i}>
              <div className="ic">{CATEGORY_ICONS[i]}</div>
              <div className="h">{c.h}</div>
              <div className="d">{c.d}</div>
              <span className="act">{c.a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="portal-section" id="faq">
        <h2 className="sec-title">{t.p_faqTitle}</h2>
        <div className="faq" style={{ marginTop: 26 }}>
          {faqs.map((f, i) => (
            <details key={i}>
              <summary>{f.q}</summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
