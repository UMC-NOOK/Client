// src/pages/onboarding/OnboardingContext.tsx

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type OnboardingDraft = {
  goal: number | null;
  categories: string[];
  nickname: string;
  profileImageKey?: string;
};

type OnboardingContextValue = {
  draft: OnboardingDraft;
  updateDraft: (
    patch: Partial<OnboardingDraft>,
  ) => void;
  resetDraft: () => void;
};

const STORAGE_KEY = "onboardingDraft";

const initialDraft: OnboardingDraft = {
  goal: null,
  categories: [],
  nickname: "",
};

function loadInitialDraft(): OnboardingDraft {
  try {
    const savedDraft =
      sessionStorage.getItem(STORAGE_KEY);

    if (!savedDraft) {
      return initialDraft;
    }

    const parsed = JSON.parse(
      savedDraft,
    ) as Partial<OnboardingDraft>;

    return {
      goal:
        typeof parsed.goal === "number"
          ? parsed.goal
          : null,
      categories: Array.isArray(parsed.categories)
        ? parsed.categories
        : [],
      nickname:
        typeof parsed.nickname === "string"
          ? parsed.nickname
          : "",
      profileImageKey:
        typeof parsed.profileImageKey === "string"
          ? parsed.profileImageKey
          : undefined,
    };
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return initialDraft;
  }
}

const OnboardingContext =
  createContext<OnboardingContextValue | null>(
    null,
  );

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [draft, setDraft] =
    useState<OnboardingDraft>(loadInitialDraft);

  const updateDraft = useCallback(
    (patch: Partial<OnboardingDraft>) => {
      setDraft((previous) => {
        const nextDraft = {
          ...previous,
          ...patch,
        };

        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(nextDraft),
        );

        return nextDraft;
      });
    },
    [],
  );

  const resetDraft = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);

    setDraft({
      goal: null,
      categories: [],
      nickname: "",
    });
  }, []);

  const value = useMemo(
    () => ({
      draft,
      updateDraft,
      resetDraft,
    }),
    [draft, updateDraft, resetDraft],
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
      "useOnboardingDraft must be used within OnboardingProvider",
    );
  }

  return context;
}