// src/pages/onboarding/OnboardingContext.tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OnboardingDraft = {
  goal: number | null;
  categories: string[];
  nickname: string;
  profileImageKey: string;
};

type OnboardingContextValue = {
  draft: OnboardingDraft;
  updateDraft: (patch: Partial<OnboardingDraft>) => void;
  resetDraft: () => void;
};

const initialDraft: OnboardingDraft = {
  goal: null,
  categories: [],
  nickname: "",
  profileImageKey: "",
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);

  const updateDraft = (patch: Partial<OnboardingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const resetDraft = () => {
    setDraft(initialDraft);
  };

  const value = useMemo(
    () => ({
      draft,
      updateDraft,
      resetDraft,
    }),
    [draft]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingDraft() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboardingDraft must be used within OnboardingProvider"
    );
  }

  return context;
}