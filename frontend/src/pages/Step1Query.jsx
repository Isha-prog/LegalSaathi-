import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";
import { i18n } from "../i18n";

function extract(text, lang) {
  const t = text.toLowerCase();

  const amountMatch = text.match(/₹\s?[\d,]+/);
  const amount = amountMatch ? [amountMatch[0].replace(/\s/, "")] : [];

  let issue = [];
  let issueKeys = [];
  if (/landlord|deposit|rent|tenant|flat|eviction/.test(t)) { issue.push(lang === "hi" ? "किराया / जमा राशि विवाद" : "Tenancy / deposit dispute"); issueKeys.push("tenancy"); }
  if (/refund|seller|product|defect|broken|warranty/.test(t)) { issue.push(lang === "hi" ? "उपभोक्ता शिकायत" : "Consumer complaint"); issueKeys.push("consumer"); }
  if (/rti|information act|no reply|no response/.test(t)) { issue.push(lang === "hi" ? "RTI में देरी" : "RTI delay"); issueKeys.push("rti"); }
  if (/salary|wage|employer|termination|fired/.test(t)) { issue.push(lang === "hi" ? "वेतन / नौकरी विवाद" : "Wage / employment dispute"); issueKeys.push("employment"); }
  if (issue.length === 0 && text.trim().length > 0) { issue.push(lang === "hi" ? "सामान्य शिकायत" : "General grievance"); issueKeys.push("general"); }

  let party = [];
  if (/landlord/.test(t)) party.push(lang === "hi" ? "मकान मालिक" : "Landlord");
  if (/seller|shop|store|company/.test(t)) party.push(lang === "hi" ? "विक्रेता / दुकान" : "Seller / shop");
  if (/employer|office/.test(t)) party.push(lang === "hi" ? "नियोक्ता" : "Employer");
  if (/rti/.test(t) && /authority|department|office/.test(t)) party.push(lang === "hi" ? "सरकारी विभाग" : "Government department");

  let time = [];
  const dayMatch = text.match(/(\d+)\s*(day|days|din)/i);
  const monthMatch = text.match(/(\d+)\s*(month|months|mahine)/i);
  if (dayMatch) time.push(lang === "hi" ? `${dayMatch[1]} दिन` : `${dayMatch[1]} days`);
  else if (monthMatch) time.push(lang === "hi" ? `${monthMatch[1]} महीने` : `${monthMatch[1]} months`);

  return { issue, issueKeys, amount, party, time };
}

function TagRow({ items, emptyLabel }) {
  if (!items || items.length === 0) {
    return <div className="tag-row"><span className="tag empty">{emptyLabel}</span></div>;
  }
  return (
    <div className="tag-row">
      {items.map((it, i) => <span className="tag" key={i}>{it}</span>)}
    </div>
  );
}

export default function Step1Query() {
  const { lang, queryText, setQueryText, extracted, setExtracted, unlockUpTo } = useCase();
  const t = i18n[lang];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  function handleExampleClick(text) {
    setQueryText(text);
  }

  function handleAnalyze() {
    if (queryText.trim().length < 8) {
      setShake(true);
      setTimeout(() => setShake(false), 900);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const data = extract(queryText, lang);
      setExtracted(data);
      setLoading(false);
      unlockUpTo(2);
    }, 900);
  }

  function handleContinue() {
    navigate("/app/step-2");
  }

  return (
    <>
      <div className="eyebrow-row">
        <span className="step-chip">{t.stepChip1}</span>
      </div>
      <h1 className="module-title">{t.title1}</h1>
      <p className="module-lede">{t.lede1}</p>

      <div className="examples-row">
        <button className="example-chip" onClick={() => handleExampleClick(t.ex1)}>{t.ex1}</button>
        <button className="example-chip" onClick={() => handleExampleClick(t.ex2)}>{t.ex2}</button>
        <button className="example-chip" onClick={() => handleExampleClick(t.ex3)}>{t.ex3}</button>
      </div>

      <div className="query-panel">
        <textarea
          id="queryInput"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder={t.placeholder1}
          style={{ borderColor: shake ? "var(--rose)" : "" }}
        />
        <div className="query-panel-foot">
          <span className="hint-text">{t.hint1}</span>
          <button className={`btn-primary ${loading ? "loading" : ""}`} onClick={handleAnalyze} disabled={loading}>
            <span className="spinner"></span>
            <span className="btn-label">{t.analyzeBtn}</span>
          </button>
        </div>
      </div>

      {extracted && (
        <div className="page-fade" style={{ marginTop: 34 }}>
          <div className="seal-row">
            <div className="seal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="txt">
              <div className="h">{t.resultH}</div>
              <div className="s">{t.resultS}</div>
            </div>
          </div>

          <div className="extract-grid">
            <div className="extract-card">
              <div className="k">{t.k1}</div>
              <TagRow items={extracted.issue} emptyLabel={t.notFound} />
            </div>
            <div className="extract-card">
              <div className="k">{t.k2}</div>
              <TagRow items={extracted.amount} emptyLabel={t.notFound} />
            </div>
            <div className="extract-card">
              <div className="k">{t.k3}</div>
              <TagRow items={extracted.party} emptyLabel={t.notFound} />
            </div>
            <div className="extract-card">
              <div className="k">{t.k4}</div>
              <TagRow items={extracted.time} emptyLabel={t.notFound} />
            </div>
          </div>

          <div className="next-cta">
            <div className="l">
              <div className="h">{t.ctaH1}</div>
              <div className="s">{t.ctaS1}</div>
            </div>
            <button onClick={handleContinue}>{t.ctaBtn}</button>
          </div>
        </div>
      )}
    </>
  );
}
