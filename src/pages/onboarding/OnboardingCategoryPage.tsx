// src/pages/onboarding/OnboardingCategoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../onboarding/OnboardingLayout";
import OnboardingCategoryForm from "../../components/onboarding/OnboardingCategoryForm";
import { useOnboardingDraft } from "./OnboardingContext";
import { useShell } from "../../app/AppShell";
import chevronLeftIcon from "../../assets/icons/chevron_left.svg";

export function OnboardingCategoryPage() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const navigate = useNavigate();
  const { draft, updateDraft } = useOnboardingDraft();

  const [categories, setCategories] = useState<string[]>(
    draft.categories ?? []
  );

  const isNextActive = categories.length >= 1;

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!isNextActive) return;
    updateDraft({ categories });
    navigate("/onboarding/profile");
  };

  return (
    <OnboardingLayout
      step={2}
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
      <p className="text-gray-90 text-[20px] font-bold leading-[150%]">
        관심 있는 도서 분야를 선택해주세요.
      </p>

      <p className=" text-gray-50 text-[14px] font-medium">
        최대 2개 선택 가능합니다.
      </p>

      <div className="mt-8 mb-10">
        <OnboardingCategoryForm
          value={categories}
          onChange={setCategories}
        />
      </div>
    </OnboardingLayout>
  );
}
