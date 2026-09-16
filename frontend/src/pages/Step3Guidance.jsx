import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

export default function Step3Guidance() {
  const { lang, category, guidanceDone, setGuidanceDone, unlockUpTo } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();

  if (!category) return null;

  function toggleStep(i) {
    setGuidanceDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  function handleContinue() {
    unlockUpTo(4);
    navigate("/app/step-4");
  }

  const allDone = guidanceDone.length >= category.steps.length;

  return (
    <>
      <div className="eyebrow-row">
        <span className="step-chip">{t.stepChip3}</span>
      </div>
      <h1 className="module-title">{t.title3}</h1>
      <p className="module-lede">{t.lede3}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
        <span className="tag">{category.authority[lang]}</span>
        <span className="tag">{category.fee[lang]}</span>
        <span className="tag">{category.deadline[lang]}</span>
      </div>

      <div className="procedure-sheet">
        {category.steps.map((step, i) => {
          const done = guidanceDone.includes(i);
          return (
            <div className={`procedure-row ${done ? "done" : ""}`} key={i} onClick={() => toggleStep(i)} style={{ cursor: "pointer" }}>
              <div className="procedure-num">{done ? "✓" : i + 1}</div>
              <div className="procedure-body">
                <div className="h">{step[lang]}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="next-cta">
        <div className="l">
          <div className="h">{t.ctaH3}</div>
          <div className="s">{t.ctaS3}</div>
        </div>
        <button onClick={handleContinue}>{t.ctaBtn}</button>
      </div>

      {!allDone && (
        <p style={{ fontSize: 12.5, color: "var(--muted-2)", marginTop: 12 }}>
          {lang === "hi" ? "आप बिना सभी कदम पूरे किए भी आगे बढ़ सकते हैं।" : "You can continue without checking off every step."}
        </p>
      )}
    </>
  );
}
