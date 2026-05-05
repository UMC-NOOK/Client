// src/pages/onboarding/OnboardingGoalPage.tsx
import { useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import ProgressIndicator from "../../components/navigation/ProgressIndicator";
import { useOnboardingDraft } from "./OnboardingContext";
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

    if (digitsOnly === "") {
      setGoalInput("");
      return;
    }

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
    <div className="px-0 pt-0">
      <TopNavigation
        className="mb-4"
        left={
          <img
            src={chevronLeftIcon}
            alt="뒤로가기"
            className="w-6 h-6 object-contain"
          />
        }
        onClickLeft={handleClose}
        right={
          <span
            style={{
              color: isNextActive
                ? "var(--Gray-gray-80, #C5CCDB)"
                : "var(--Gray-gray-40, #525775)",
              textAlign: "center",
              fontFamily: "SUIT",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            다음
          </span>
        }
        onClickRight={isNextActive ? handleNext : undefined}
      />

      <ProgressIndicator step={1} total={3} />

      <div className="mt-12">
        <p
          style={{
            color: "var(--Gray-gray-90, #ECECEC)",
            fontFamily: "SUIT",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%",
            whiteSpace: "pre-line",
          }}
        >
          {"올해 몇 권의 책을 읽고 싶은지\n목표를 설정해주세요."}
        </p>

        <p
          className="mt-0"
          style={{
            overflow: "hidden",
            color: "var(--Gray-gray-50, #697198)",
            textOverflow: "ellipsis",
            fontFamily: "SUIT",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "150%",
          }}
        >
          {year}년은 {days}일 남았어요.
        </p>
      </div>

      <div
        className="mt-10 flex items-center self-stretch"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-round-12, 10px)",
          alignSelf: "stretch",
        }}
      >
        <div
          className="flex-1"
          style={{
            display: "flex",
            padding:
              "var(--spacing-round-12, 12px) var(--spacing-round-16, 16px)",
            alignItems: "center",
            gap: "var(--spacing-round-8, 8px)",
            alignSelf: "stretch",
            borderRadius: "var(--spacing-round-8, 8px)",
            background: "var(--Gray-gray-17, #1B203B)",
          }}
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={goalInput}
            onChange={handleGoalChange}
            placeholder="몇"
            aria-label="독서 목표 권수"
            className="w-full flex-1 border-none bg-transparent outline-none placeholder:text-[#A2A7C3]"
            style={{
              flex: "1 0 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              display: "-webkit-box",
              color:
                goalInput.trim() === ""
                  ? "var(--Gray-gray-70, #A2A7C3)"
                  : "var(--Gray-gray-90, #EFF4FF)",
              fontFamily: "SUIT",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%",
              padding: 0,
            }}
          />
        </div>

        <span
          style={{
            color: "var(--Gray-gray-80, #C5CCDB)",
            fontFamily: "SUIT",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%",
          }}
        >
          권
        </span>
      </div>
    </div>
  );
}