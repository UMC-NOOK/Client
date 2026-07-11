// src/pages/onboarding/OnboardingProfilePage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../onboarding/OnboardingLayout";
import { useOnboardingDraft } from "./OnboardingContext";
import { TextField } from "../../components/input/textinput/TextField";

import { completeOnboarding } from "../../api/onboarding";
import { uploadSingleImage } from "../../api/image";

import { useShell } from "../../app/AppShell";

import chevronLeftIcon from "../../assets/icons/chevron_left.svg";
import cameraIcon from "../../assets/icons/Shape.svg";
import defaultProfile from "../../assets/icons/Profile Image.svg"; // ✅ 추가

export function OnboardingProfilePage() {
  const navigate = useNavigate();
  const { draft } = useOnboardingDraft();
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const [nickname, setNickname] = useState(draft.nickname ?? "");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const isNextActive = nickname.trim().length > 0;

  const handleClose = () => navigate(-1);

  const handleNext = async () => {
    try {
      if (!draft.goal || !draft.categories?.length) return;
      if (!nickname.trim()) return;

      let imageKey = "";

      if (file) {
        imageKey = await uploadSingleImage(file, "profile");
      }

      await completeOnboarding({
        goal: draft.goal,
        categories: draft.categories,
        nickname,
        profileImageKey: imageKey,
      });

      navigate("/library");
    } catch (e) {
      console.error("❌ 온보딩 실패", e);
    }
  };

  return (
    <OnboardingLayout
      step={3}
      left={<img src={chevronLeftIcon} className="w-6 h-6" />}
      onClickLeft={handleClose}
      right={
        <span
          className={`${
            isNextActive ? "text-gray-80" : "text-gray-40"
          } text-[18px] font-medium`}
        >
          시작
        </span>
      }
      onClickRight={isNextActive ? handleNext : undefined}
    >
      <p className="text-gray-90 text-[20px] font-bold leading-[150%]">
        프로필 정보를 확인해주세요.
      </p>

      <p className="text-gray-50 text-[14px] font-medium">
        작성 후에도 언제든지 수정하실 수 있습니다.
      </p>

      <div className="mt-10 flex flex-col items-center gap-8">
        {/* 🔥 프로필 이미지 */}
        <div className="relative">
          <div className="w-30 h-30 rounded-full bg-gray-17 overflow-hidden flex items-center justify-center">
            <img
              src={image ?? defaultProfile}
              className={`w-full h-full ${
                image ? "object-cover" : "object-contain "
              }`}
            />
          </div>

          <label className="absolute right-0 bottom-0 w-8 h-8 rounded-full bg-gray-90 flex items-center justify-center cursor-pointer">
            <img src={cameraIcon} className="w-4.75 h-4.25" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFile(f);
                setImage(URL.createObjectURL(f));
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* 닉네임 */}
        <div className="w-full">
          <TextField
            title="닉네임"
            value={nickname}
            onChange={setNickname}
            placeholder="닉네임을 입력해주세요."
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}