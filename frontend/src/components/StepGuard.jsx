import { Navigate } from "react-router-dom";
import { useCase } from "../context/CaseContext";

// Prevents jumping to /app/step-4 via the URL bar before finishing step 3, etc.
export default function StepGuard({ step, children }) {
  const { unlockedStep } = useCase();
  if (step > unlockedStep) {
    return <Navigate to={`/app/step-${unlockedStep}`} replace />;
  }
  return children;
}
