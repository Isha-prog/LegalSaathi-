import { createContext, useContext, useState } from "react";

const CaseContext = createContext(null);

const STEP_KEYS = ["step1", "step2", "step3", "step4", "step5"];

export function CaseProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email } — mocked until backend is connected
  const [caseId] = useState("New — not yet filed");
  const [lang, setLang] = useState("en");

  // how far the user has progressed through the 5-step pipeline
  const [unlockedStep, setUnlockedStep] = useState(1);

  const [queryText, setQueryText] = useState("");
  const [extracted, setExtracted] = useState(null); // { issue, amount, party, time }
  const [category, setCategory] = useState(null); // { label, confidence, level, statute }
  const [guidanceDone, setGuidanceDone] = useState([]); // indices of completed procedure steps
  const [document, setDocument] = useState(null); // { type, body }
  const [caseStatus, setCaseStatus] = useState("draft"); // draft | filed | under_process | resolved

  function unlockUpTo(step) {
    setUnlockedStep((prev) => Math.max(prev, step));
  }

  const value = {
    user, setUser,
    caseId,
    lang, setLang,
    unlockedStep, unlockUpTo,
    queryText, setQueryText,
    extracted, setExtracted,
    category, setCategory,
    guidanceDone, setGuidanceDone,
    document, setDocument,
    caseStatus, setCaseStatus,
  };

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCase() {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCase must be used inside <CaseProvider>");
  return ctx;
}

export { STEP_KEYS };
