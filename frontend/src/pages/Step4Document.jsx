import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";
import { buildDocument } from "../data/documentTemplates";

export default function Step4Document() {
  const { lang, category, extracted, user, document: doc, setDocument, unlockUpTo } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (category && !doc) {
      const generated = buildDocument(category.key, extracted, user, lang);
      setDocument(generated);
    }
  }, [category, extracted, user, lang, doc, setDocument]);

  if (!doc) return null;

  function handleDownload() {
    window.print();
  }

  function handleContinue() {
    unlockUpTo(5);
    navigate("/app/step-5");
  }

  return (
    <>
      <div className="eyebrow-row">
        <span className="step-chip">{t.stepChip4}</span>
      </div>
      <h1 className="module-title">{t.title4}</h1>
      <p className="module-lede">{t.lede4}</p>

      <div className="doc-actions">
        <button className="btn-secondary" onClick={() => setEditing((e) => !e)}>
          {editing ? (lang === "hi" ? "संपादन पूर्ण" : "Done editing") : t.editBtn}
        </button>
        <button className="btn-secondary" onClick={handleDownload}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3V15M12 15L7 10M12 15L17 10M4 19H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {t.downloadBtn}
        </button>
      </div>

      <div className="letter-sheet" id="printable-letter">
        <div className="l-date">{doc.date}</div>
        <div className="l-to" style={{ whiteSpace: "pre-line" }}>{doc.to}</div>
        <div className="l-subject">{doc.subject}</div>
        <div
          ref={bodyRef}
          contentEditable={editing}
          suppressContentEditableWarning
          style={{ outline: editing ? "1px dashed var(--brass)" : "none", borderRadius: 4, padding: editing ? 6 : 0 }}
        >
          {doc.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="l-sign" style={{ whiteSpace: "pre-line" }}>{doc.signOff}</div>
      </div>

      <div className="next-cta">
        <div className="l">
          <div className="h">{t.ctaH4}</div>
          <div className="s">{t.ctaS4}</div>
        </div>
        <button onClick={handleContinue}>{t.ctaBtn}</button>
      </div>
    </>
  );
}
