// src/pages/onboarding/OnboardingGoalPage.tsx
import { useMemo, useState, type ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../onboarding/OnboardingLayout";
import { useOnboardingDraft } from "./OnboardingContext";
import { useShell } from "../../app/AppShell";
import chevronLeftIcon from "../../assets/icons/chevron_left.svg";

const MAX_GOAL = 300;

function getRemainingDaysOfYear() {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const diffMs = endOfYear.getTime() - startOfToday.getTime();
  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return {
    year: today.getFullYear(),
    days: diffDays,
  };
}

export default function OnboardingGoalPage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useOnboardingDraft();
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const [goalInput, setGoalInput] = useState<string>(
    draft.goal ? String(draft.goal) : ""
  );

  const { year, days } = getRemainingDaysOfYear();

  const parsedGoal = useMemo(() => {
    if (goalInput.trim() === "") return null;
    const value = Number(goalInput);
    if (!Number.isInteger(value)) return null;
    return value;
  }, [goalInput]);

  const isNextActive =
    parsedGoal !== null && parsedGoal >= 1 && parsedGoal <= MAX_GOAL;

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");

    if (digitsOnly === "") return setGoalInput("");

    const sliced = digitsOnly.slice(0, 3);
    const numericValue = Number(sliced);

    if (numericValue > MAX_GOAL) {
      setGoalInput(String(MAX_GOAL));
      return;
    }

    setGoalInput(String(numericValue));
  };

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!isNextActive || parsedGoal === null) return;
    updateDraft({ goal: parsedGoal });
    navigate("/onboarding/category");
  };

  return (
    <OnboardingLayout
      step={1}
      left={<img src={chevronLeftIcon} className="w-6 h-6" />}
      onClickLeft={handleClose}
      right={
        <span
          className={`${
            isNextActive ? "text-gray-80" : "text-gray-40"
          } text-[18px] font-medium`}
        >
          다음
        </span>
      }
      onClickRight={isNextActive ? handleNext : undefined}
    >
      <p className="text-gray-90 text-[20px] font-bold leading-[150%] whitespace-pre-line">
        {"올해 몇 권의 책을 읽고 싶은지\n목표를 설정해주세요."}
      </p>

      <p className=" text-gray-50 text-[14px] font-medium">
        {year}년은 {days}일 남았어요.
      </p>

      <div className="mt-10 flex items-center gap-2">
        <div className="flex-1 px-4 py-3 rounded-md bg-gray-17">
          <input
            type="text"
            inputMode="numeric"
            value={goalInput}
            onChange={handleGoalChange}
            placeholder="몇"
            className="w-full bg-transparent outline-none text-[20px] font-bold text-gray-90 placeholder:text-gray-70"
          />
        </div>

        <span className="text-[20px] font-bold text-gray-80">권</span>
      </div>
    </OnboardingLayout>
  );
}