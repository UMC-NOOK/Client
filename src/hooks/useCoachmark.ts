import { useCallback, useState, useSyncExternalStore } from "react";
import {
  completeCoachmark,
  isCoachmarkCompleted,
  subscribeCoachmark,
  type CoachmarkScreen,
} from "../utils/coachmarkStorage";

type UseCoachmarkParams = {
  userId: number | undefined;
  screen: CoachmarkScreen;
  stepCount: number;
};

export function useCoachmark({ userId, screen, stepCount }: UseCoachmarkParams) {
  const [step, setStep] = useState(0);
  const subscribe = useCallback(
    (listener: () => void) => subscribeCoachmark(userId, screen, listener),
    [screen, userId],
  );
  const getSnapshot = useCallback(
    () => isCoachmarkCompleted(userId, screen),
    [screen, userId],
  );
  const isCompleted = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const advance = useCallback(() => {
    if (userId === undefined) return;

    if (step >= stepCount - 1) {
      completeCoachmark(userId, screen);
      return;
    }

    setStep((current) => current + 1);
  }, [screen, step, stepCount, userId]);

  return {
    isOpen: userId !== undefined && !isCompleted,
    step,
    advance,
  };
}
