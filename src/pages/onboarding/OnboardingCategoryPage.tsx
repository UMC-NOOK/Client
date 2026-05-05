// src/pages/onboarding/OnboardingCategoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import ProgressIndicator from "../../components/navigation/ProgressIndicator";
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

  // ✅ 다중 선택 상태
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
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            다음
          </span>
        }
        onClickRight={isNextActive ? handleNext : undefined}
      />

      <ProgressIndicator step={2} total={3} />

      <div className="mt-12">
        <p
          style={{
            color: "var(--Gray-gray-90, #ECECEC)",
            fontFamily: "SUIT",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "150%",
          }}
        >
          관심있는 도서 분야를 선택해주세요
        </p>

        <p
          className="mt-0"
          style={{
            overflow: "hidden",
            color: "var(--Gray-gray-50, #697198)",
            textOverflow: "ellipsis",
            fontFamily: "SUIT",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "150%",
          }}
        >
          최대 2개 선택가능합니다
        </p>
      </div>

      <div className="mt-10">
        <OnboardingCategoryForm
          value={categories}
          onChange={setCategories}
        />
      </div>
    </div>
  );
}