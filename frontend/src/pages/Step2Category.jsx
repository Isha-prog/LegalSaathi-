import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";
import { CATEGORIES, classify } from "../data/categories";

export default function Step2Category() {
  const { lang, extracted, category, setCategory, unlockUpTo } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      const result = classify(extracted);
      setCategory(result);
    }
  }, [extracted, category, setCategory]);

  if (!category) return null;

  const cat = category;

  function handleContinue() {
    unlockUpTo(3);
    navigate("/app/step-3");
  }

  function handlePickAlternate(key) {
    setCategory(CATEGORIES[key]);
  }

  return (
    <>
      <div className="eyebrow-row">
        <span className="step-chip">{t.stepChip2}</span>
      </div>
      <h1 className="module-title">{t.title2}</h1>
      <p className="module-lede">{t.lede2}</p>

      <div className="verdict-panel">
        <div className={`verdict-stamp ${cat.level}`}>
          {cat.level === "high" && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
          {cat.level === "medium" && (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 8V13M12 17H12.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
          {cat.level === "low" && (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 9V13M12 17H12.01M10.3 3.9L2.5 17.5C2.1 18.2 2.6 19 3.4 19H20.6C21.4 19 21.9 18.2 21.5 17.5L13.7 3.9C13.3 3.2 12.3 3.2 11.9 3.9L10.3 3.9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </div>
        <div className="verdict-body">
          <div className="cat-label">{cat.level === "high" ? "MATCHED CATEGORY" : cat.level === "medium" ? "LIKELY CATEGORY" : "UNCLEAR MATCH"}</div>
          <h2>{cat.label[lang]}</h2>
          <div className="conf-row">
            <span className="conf-pct">{t.confLabel}: {cat.confidence}%</span>
            <div className="conf-bar">
              <div className={`conf-bar-fill ${cat.level !== "high" ? cat.level : ""}`} style={{ width: `${cat.confidence}%` }}></div>
            </div>
          </div>
          <p>{cat.authority[lang]} · {cat.fee[lang]} · {cat.deadline[lang]}</p>
        </div>
      </div>

      {cat.level !== "high" && (
        <div className="escalate-note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: "none", marginTop: 1 }}><path d="M12 9V13M12 17H12.01M10.3 3.9L2.5 17.5C2.1 18.2 2.6 19 3.4 19H20.6C21.4 19 21.9 18.2 21.5 17.5L13.7 3.9C13.3 3.2 12.3 3.2 11.9 3.9L10.3 3.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>{t.escalateNote}</span>
        </div>
      )}

      <div className="category-alt">
        {t.altCategoryPre}
        <select
          onChange={(e) => e.target.value && handlePickAlternate(e.target.value)}
          value=""
          style={{ border: "none", background: "none", color: "var(--brass-dark)", fontWeight: 600, textDecoration: "underline", fontSize: 13, cursor: "pointer" }}
        >
          <option value="">{t.altCategoryLink}</option>
          {Object.values(CATEGORIES).filter(c => c.key !== cat.key).map(c => (
            <option key={c.key} value={c.key}>{c.label[lang]}</option>
          ))}
        </select>
      </div>

      <div className="source-card">
        <div className="k">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6V11C4 16 7.4 20.4 12 22C16.6 20.4 20 16 20 11V6L12 2Z" stroke="var(--muted)" strokeWidth="1.4" strokeLinejoin="round" /></svg>
          {t.sourceLabel}
        </div>
        <div className="statute">{cat.statute[lang]}</div>
      </div>

      <div className="next-cta">
        <div className="l">
          <div className="h">{t.ctaH2}</div>
          <div className="s">{t.ctaS2}</div>
        </div>
        <button onClick={handleContinue}>{t.ctaBtn}</button>
      </div>
    </>
  );
}
