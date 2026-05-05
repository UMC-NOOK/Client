// src/pages/onboarding/OnboardingLayout.tsx
import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}