import { useCallback, useState, useSyncExternalStore } from "react";
import {
  hideCoachmark,
  isCoachmarkDismissed,
  markCoachmarkSeen,
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
    () => isCoachmarkDismissed(userId, screen),
    [screen, userId],
  );
  const isDismissed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const advance = useCallback(() => {
    if (userId === undefined) return;

    if (step >= stepCount - 1) {
      // 끝까지 넘겼을 때만 저장한다. 본 화면은 이번 로그인 동안, 체크한 화면은 이후 로그인에서도 숨긴다.
      if (dontShowAgainChecked) hideCoachmark(userId, screen);
      markCoachmarkSeen(userId, screen);
      setIsFinished(true);
      return;
    }

    setStep((current) => current + 1);
  }, [dontShowAgainChecked, screen, step, stepCount, userId]);

  return {
    isOpen: userId !== undefined && !isDismissed && !isFinished,
    step,
    advance,
    dontShowAgain: {
      checked: dontShowAgainChecked,
      onChange: setDontShowAgainChecked,
    },
  };
}
