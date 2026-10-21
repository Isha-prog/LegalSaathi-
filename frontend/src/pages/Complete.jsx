import { Navigate, useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Complete() {
  const { user, lang, setLang, unlockedStep, category, resetCase } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;
  if (unlockedStep < 5) return <Navigate to={`/app/step-${unlockedStep}`} replace />;

  function handleReview() {
    navigate("/app/step-1");
  }

  function handleNewCase() {
    resetCase();
    navigate("/app/step-1");
  }

  const journey = [
    { h: t.j1h, s: t.j1s },
    { h: t.j2h, s: t.j2s, tag: category?.label?.[lang] },
    { h: t.j3h, s: t.j3s },
    { h: t.j4h, s: t.j4s },
    { h: t.j5h, s: t.j5s },
  ];

  return (
    <div className="complete-screen">
      <div className="complete-lang">
        <div className="lang-toggle">
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>English</button>
          <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")}>हिंदी</button>
        </div>
      </div>

      <div className="complete-seal">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12.5L9.5 18L20 6" stroke="#241804" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="complete-title">{t.completeTitle}</h1>
      <p className="complete-sub">{t.completeSub}</p>

      <div className="complete-card">
        <div className="complete-card-head">
          <div className="h">{t.journeyHead}</div>
          <div className="s">{t.journeySub}</div>
        </div>
        {journey.map((item, i) => (
          <div className="journey-item" key={i}>
            <div className="journey-check"><CheckIcon /></div>
            <div className="journey-body">
              <div className="h">{item.h}</div>
              <div className="s">{item.s}</div>
              {item.tag && <div className="v">{item.tag}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="complete-actions">
        <button className="btn-secondary" onClick={handleReview}>{t.reviewBtn}</button>
        <button className="btn-primary" onClick={handleNewCase}>
          <span className="btn-label">{t.newCaseBtn}</span>
        </button>
      </div>

      <div className="complete-footer">
        <div className="name">{t.completeFooterPre}</div>
        <div>{t.completeFooterRole}</div>
      </div>
    </div>
  );
}