import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";
import PortalShell from "../components/PortalShell";
import PortalHeroCopy from "../components/PortalHeroCopy";

export default function Signup() {
  const { lang, setUser } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <PortalShell>
      <section className="portal-hero" id="home">
        <div className="portal-hero-inner">
          <PortalHeroCopy />

          <div className="portal-card">
            <div className="portal-card-head">
              <div className="ic">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" /></svg>
              </div>
              <div>
                <h2>{t.p_signupCardTitle}</h2>
                <div className="sub">{t.p_signupCardSub}</div>
              </div>
            </div>

            <div className="portal-card-body">
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
                  <div className="pw-wrap">
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword((s) => !s)}>
                      {showPassword ? t.p_hide : t.p_show}
                    </button>
                  </div>
                  {errors.password && <div className="field-error">{errors.password}</div>}
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword">{t.confirmPasswordLabel}</label>
                  <input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                  {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                </div>

                <button type="submit" className="auth-submit">{t.signupBtn}</button>
              </form>

              <div className="card-register">
                {t.haveAccount}
                <Link to="/login">{t.loginLink}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}