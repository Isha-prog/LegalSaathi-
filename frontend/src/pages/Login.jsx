import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

export default function Login() {
  const { lang, setLang, setUser } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="auth-screen">
      <div className="auth-side">
        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V21M7 6H4L2 11C2 12.1 3.3 13 5 13C6.7 13 8 12.1 8 11L6 6H7ZM17 6H20L22 11C22 12.1 20.7 13 19 13C17.3 13 16 12.1 16 11L18 6H17ZM4.5 21H19.5" stroke="#241804" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="brand-name" style={{ color: "#F7F5F0" }}>LegalSaathi</div>
            <div className="brand-tag">{t.tagline}</div>
          </div>
        </div>

        <p className="auth-quote">
          {t.quote}<span>{t.quoteHighlight}</span>
        </p>

        <p className="foot-note">{t.footNote}</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <div className="lang-toggle" style={{ marginBottom: 26, width: "fit-content" }}>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">English</button>
            <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")} type="button">हिंदी</button>
          </div>

          <h1>{t.loginTitle}</h1>
          <p className="sub">{t.loginSub}</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">{t.emailLabel}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="field">
              <label htmlFor="password">{t.passwordLabel}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <button type="submit" className="auth-submit">{t.loginBtn}</button>
          </form>

          <div className="auth-divider">{t.orDivider}</div>
          <button className="guest-btn" onClick={handleGuest} type="button">{t.guestBtn}</button>

          <p className="auth-switch">
            {t.noAccount} <Link to="/signup">{t.signupLink}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
