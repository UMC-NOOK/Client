// src/pages/onboarding/OnboardingProfilePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import ProgressIndicator from "../../components/navigation/ProgressIndicator";
import { useOnboardingDraft } from "./OnboardingContext";
import { TextField } from "../../components/input/textinput/TextField";

import chevronLeftIcon from "../../assets/icons/chevron_left.svg";
import cameraIcon from "../../assets/icons/Shape.svg";

export function OnboardingProfilePage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useOnboardingDraft();

  const [nickname, setNickname] = useState(draft.nickname ?? "");
  const [image, setImage] = useState<string | null>(null);

  const isNextActive = nickname.trim().length > 0;

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!isNextActive) return;

    updateDraft({
      nickname,
      profileImageKey: image ?? "",
    });

    localStorage.setItem("nickname", nickname);
    
    navigate("/library");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImage(preview);
  };

  return (
    <div className="px-0 pt-0">
      <TopNavigation
        className="mb-4"
        left={<img src={chevronLeftIcon} className="w-6 h-6" />}
        onClickLeft={handleClose}
        right={
          <span
            style={{
              color: isNextActive
                ? "var(--Gray-gray-80, #C5CCDB)"
                : "var(--Gray-gray-40, #525775)",
              fontFamily: "SUIT",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            시작
          </span>
        }
        onClickRight={isNextActive ? handleNext : undefined}
      />

      <ProgressIndicator step={3} total={3} />

      <div className="mt-12 px-1">
        {/* 타이틀 */}
        <p
          style={{
            color: "var(--Gray-gray-90, #ECECEC)",
            fontFamily: "SUIT",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "150%",
          }}
        >
          프로필 정보를 확인해주세요.
        </p>

        {/* 서브 텍스트 */}
        <p
          className="mt-2"
          style={{
            color: "var(--Gray-gray-50, #697198)",
            fontFamily: "SUIT",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "150%",
          }}
        >
          작성 후에도 언제든지 수정하실 수 있습니다.
        </p>

        {/* 중앙 영역 */}
        <div
          className="mt-10"
          style={{
            display: "flex",
            padding: "0 4px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
            alignSelf: "stretch",
          }}
        >
          {/* 프로필 이미지 */}
          <div className="relative">
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "80px",
                background: "var(--Gray-gray-17, #1B203B)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image && (
                <img
                  src={image}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            {/* 카메라 버튼 */}
            <label
              style={{
                position: "absolute",
                right: "0px",
                bottom: "0px",
                display: "flex",
                width: "32px",
                height: "32px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                background: "var(--Gray-gray-90, #ECECEC)",
                cursor: "pointer",
              }}
            >
              <img
                src={cameraIcon}
                alt="camera"
                style={{
                  width: "19.5px",
                  height: "17.55px",
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* 하단 영역 */}
          <div
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "48px",
              alignSelf: "stretch",
            }}
          >
            <div className="w-full">
              <div className="mb-3" />

              <TextField
                title="닉네임"
                value={nickname}
                onChange={setNickname}
                placeholder="닉네임을 입력해주세요"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}