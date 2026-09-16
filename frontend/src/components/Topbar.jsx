import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

export default function Topbar() {
  const { lang, setLang, caseId } = useCase();
  const t = i18n[lang];

  return (
    <div className="topbar">
      <div className="case-id">
        <div className="k">{t.caseLabel}</div>
        <div className="v">{caseId}</div>
      </div>
      <div className="lang-toggle">
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
          English
        </button>
        <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")}>
          हिंदी
        </button>
      </div>
    </div>
  );
}
