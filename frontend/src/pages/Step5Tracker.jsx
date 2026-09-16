import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

const STAGE_KEYS = ["draft", "filed", "under_process", "resolved"];

const STAGE_LABELS = {
  draft: { en: "Draft prepared", hi: "ड्राफ़्ट तैयार" },
  filed: { en: "Filed with authority", hi: "प्राधिकरण में दायर" },
  under_process: { en: "Under process", hi: "प्रक्रियाधीन" },
  resolved: { en: "Resolved", hi: "समाधान हुआ" },
};

const STAGE_DESC = {
  draft: { en: "Your document has been drafted and is ready to file.", hi: "आपका दस्तावेज़ तैयार है और दायर करने के लिए तैयार है।" },
  filed: { en: "Your case has been submitted to the relevant authority.", hi: "आपका केस संबंधित प्राधिकरण में जमा कर दिया गया है।" },
  under_process: { en: "The authority is reviewing your case.", hi: "प्राधिकरण आपके केस की समीक्षा कर रहा है।" },
  resolved: { en: "Your case has reached a resolution.", hi: "आपका केस सुलझ गया है।" },
};

export default function Step5Tracker() {
  const { lang, category, caseStatus, setCaseStatus } = useCase();
  const t = i18n[lang];

  const currentIndex = STAGE_KEYS.indexOf(caseStatus);

  function handleMarkFiled() {
    setCaseStatus("filed");
  }

  return (
    <>
      <div className="eyebrow-row">
        <span className="step-chip">{t.stepChip5}</span>
      </div>
      <h1 className="module-title">{t.title5}</h1>
      <p className="module-lede">{t.lede5}</p>

      {category && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
          <span className="tag">{category.label[lang]}</span>
          <span className="tag">{category.authority[lang]}</span>
        </div>
      )}

      <div className="ledger">
        {STAGE_KEYS.map((stage, i) => {
          const status = i < currentIndex ? "complete" : i === currentIndex ? "current" : "pending";
          return (
            <div className={`ledger-row ${status}`} key={stage}>
              <div className="rail">
                <div className="dot"></div>
                <div className="line-down"></div>
              </div>
              <div className="ledger-body">
                <div className="h">{STAGE_LABELS[stage][lang]}</div>
                <div className="s">{STAGE_DESC[stage][lang]}</div>
              </div>
              <span className={`status-pill ${status}`}>
                {status === "complete" ? "✓" : status === "current" ? "●" : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {caseStatus === "draft" && (
        <button className="btn-primary" onClick={handleMarkFiled}>
          <span className="btn-label">{t.markFiled}</span>
        </button>
      )}
    </>
  );
}
