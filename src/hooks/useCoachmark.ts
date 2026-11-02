import { useCallback, useState, useSyncExternalStore } from "react";
import {
  hideCoachmark,
  isCoachmarkHidden,
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
  const [isFinished, setIsFinished] = useState(false);
  const [dontShowAgainChecked, setDontShowAgainChecked] = useState(false);
  const subscribe = useCallback(
    (listener: () => void) => subscribeCoachmark(userId, screen, listener),
    [screen, userId],
  );
  const getSnapshot = useCallback(
    () => isCoachmarkHidden(userId, screen),
    [screen, userId],
  );
  const isHidden = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const advance = useCallback(() => {
    if (userId === undefined) return;

    if (step >= stepCount - 1) {
      // '다시 보지 않기'는 코치마크를 끝까지 넘겼을 때만 저장한다.
      if (dontShowAgainChecked) hideCoachmark(userId, screen);
      setIsFinished(true);
      return;
    }

    setStep((current) => current + 1);
  }, [dontShowAgainChecked, screen, step, stepCount, userId]);

  return {
    isOpen: userId !== undefined && !isHidden && !isFinished,
    step,
    advance,
    dontShowAgain: {
      checked: dontShowAgainChecked,
      onChange: setDontShowAgainChecked,
    },
  };
}
