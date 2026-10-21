import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CaseProvider } from "./context/CaseContext";
import AppLayout from "./components/AppLayout";
import StepGuard from "./components/StepGuard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Step1Query from "./pages/Step1Query";
import Step2Category from "./pages/Step2Category";
import Step3Guidance from "./pages/Step3Guidance";
import Step4Document from "./pages/Step4Document";
import Step5Tracker from "./pages/Step5Tracker";
import Complete from "./pages/Complete";

export default function App() {
  return (
    <CaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="step-1" replace />} />
            <Route path="step-1" element={<Step1Query />} />
            <Route
              path="step-2"
              element={<StepGuard step={2}><Step2Category /></StepGuard>}
            />
            <Route
              path="step-3"
              element={<StepGuard step={3}><Step3Guidance /></StepGuard>}
            />
            <Route
              path="step-4"
              element={<StepGuard step={4}><Step4Document /></StepGuard>}
            />
            <Route
              path="step-5"
              element={<StepGuard step={5}><Step5Tracker /></StepGuard>}
            />
            <Route path="/app/complete" element={<Complete />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </CaseProvider>
  );
}
