import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

export default function Signup() {
  const { lang, setLang, setUser } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = t.errRequired;
    if (!email.trim()) errs.email = t.errRequired;
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = t.errEmail;
    if (!password) errs.password = t.errRequired;
    else if (password.length < 6) errs.password = t.errPasswordShort;
    if (confirmPassword !== password) errs.confirmPassword = t.errPasswordMatch;
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Mocked signup — no backend yet. Swap this for a real API call later.
    setUser({ email, name });
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

          <h1>{t.signupTitle}</h1>
          <p className="sub">{t.signupSub}</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">{t.nameLabel}</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Isha Sharma" />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            <div className="field">
              <label htmlFor="email">{t.emailLabel}</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="field">
              <label htmlFor="password">{t.passwordLabel}</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">{t.confirmPasswordLabel}</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="auth-submit">{t.signupBtn}</button>
          </form>

          <p className="auth-switch">
            {t.haveAccount} <Link to="/login">{t.loginLink}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
