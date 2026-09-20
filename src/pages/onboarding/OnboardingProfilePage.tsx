// src/pages/onboarding/OnboardingProfilePage.tsx

import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useShell } from "../../app/AppShell";
import {
  completeOnboarding,
  uploadProfileImage,
} from "../../api/onboarding";
import { TextField } from "../../components/input/textinput/TextField";
import type { OnboardingRequest } from "../../types/onboarding/onboarding";
import {
  getNicknameValidationMessage,
  NICKNAME_MAX_LENGTH,
} from "../../utils/nickname";

import OnboardingLayout from "./OnboardingLayout";
import { useOnboardingDraft } from "./OnboardingContext";

import chevronLeftIcon from "../../assets/icons/chevron_left.svg";
import cameraIcon from "../../assets/icons/Shape.svg";
import defaultProfile from "../../assets/icons/Profile Image.svg";

export default function OnboardingProfilePage() {
  const navigate = useNavigate();

  const {
    draft,
    updateDraft,
    resetDraft,
  } = useOnboardingDraft();

  const { setHideFooter } = useShell();
  const submittingRef = useRef(false);

  const [nickname, setNickname] = useState(
    draft.nickname ?? "",
  );
  const [image, setImage] =
    useState<string | null>(null);
  const [file, setFile] =
    useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    setHideFooter(true);

    return () => {
      setHideFooter(false);
    };
  }, [setHideFooter]);

  /**
   * URL.createObjectURL로 생성한 미리보기 URL 정리
   */
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const trimmedNickname = nickname.trim();

  /**
   * 닉네임은 필수, 프로필 이미지는 선택
   */
  const isNextActive =
    nickname.length > 0 &&
    nickname.length <= NICKNAME_MAX_LENGTH &&
    !isSubmitting;

  const handleClose = () => {
    if (isSubmitting) return;

    navigate(-1);
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(
        "JPEG, PNG, WEBP 이미지만 업로드할 수 있습니다.",
      );

      event.target.value = "";
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
    setImage(
      URL.createObjectURL(selectedFile),
    );

    // 같은 파일을 다시 선택할 수 있도록 초기화
    event.target.value = "";
  };

  const handleNicknameChange = (
    value: string,
  ) => {
    setNickname(value);

    updateDraft({
      nickname: value,
    });

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleNext = async () => {
    if (submittingRef.current) return;

    const goal = Number(draft.goal);
    const categories = draft.categories;

    if (
      !Number.isInteger(goal) ||
      goal < 1 ||
      goal > 300
    ) {
      setErrorMessage(
        "독서 목표는 1~300 사이여야 합니다.",
      );
      return;
    }

    if (
      !categories ||
      categories.length < 1 ||
      categories.length > 2
    ) {
      setErrorMessage(
        "카테고리는 1~2개를 선택해야 합니다.",
      );
      return;
    }

    const nicknameValidationMessage = getNicknameValidationMessage(nickname);
    if (nicknameValidationMessage) {
      window.alert(nicknameValidationMessage);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      /**
       * 이미지가 선택된 경우에만 업로드
       */
      const profileImageKey = file
        ? await uploadProfileImage(file)
        : undefined;

      const payload: OnboardingRequest = {
        goal,
        categories,
        nickname: trimmedNickname,
        ...(profileImageKey
          ? { profileImageKey }
          : {}),
      };

      console.log(
        "온보딩 요청 Payload:",
        payload,
      );

      await completeOnboarding(payload);

      localStorage.setItem(
        "onboardingCompleted",
        "true",
      );

      resetDraft();

      navigate("/library", {
        replace: true,
      });
    } catch (error: unknown) {
      console.error(
        "온보딩 실패:",
        error,
      );

      const responseData = axios.isAxiosError(error)
        ? error.response?.data
        : undefined;

      console.error(
        "서버 응답:",
        responseData,
      );

      const validationResult =
        typeof responseData === "object" && responseData !== null
          ? (responseData as { result?: unknown }).result
          : undefined;

      if (
        validationResult &&
        typeof validationResult === "object"
      ) {
        const validationMessages =
          Object.values(
            validationResult,
          ).join(" ");

        setErrorMessage(
          validationMessages,
        );
      } else {
        setErrorMessage(
          typeof responseData === "object" &&
            responseData !== null &&
            typeof (responseData as { message?: unknown }).message === "string"
            ? (responseData as { message: string }).message
            : "온보딩 처리 중 오류가 발생했습니다.",
        );
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout
      step={3}
      left={
        <img
          src={chevronLeftIcon}
          alt="뒤로 가기"
          className="h-6 w-6"
        />
      }
      onClickLeft={handleClose}
      right={
        <span
          className={`text-[18px] font-medium ${
            isNextActive
              ? "text-gray-80"
              : "text-gray-40"
          }`}
        >
          {isSubmitting
            ? "처리 중..."
            : "시작"}
        </span>
      }
      onClickRight={
        isNextActive
          ? handleNext
          : undefined
      }
    >
      <p className="text-[20px] font-bold leading-[150%] text-gray-90">
        프로필 정보를 확인해주세요.
      </p>

      <p className="text-[14px] font-medium text-gray-50">
        작성 후에도 언제든지 수정하실 수 있습니다.
      </p>

      <div className="mt-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-gray-17">
            <img
              src={image ?? defaultProfile}
              alt="프로필 이미지"
              className={`h-full w-full ${
                image
                  ? "object-cover"
                  : "object-contain"
              }`}
            />
          </div>

          <label
            className={`absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-90 ${
              isSubmitting
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }`}
          >
            <img
              src={cameraIcon}
              alt="프로필 이미지 선택"
              className="h-4.25 w-4.75"
            />

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-full">
          <TextField
            title="닉네임"
            value={nickname}
            onChange={
              handleNicknameChange
            }
            placeholder="닉네임을 입력해주세요."
            maxLength={NICKNAME_MAX_LENGTH}
          />

          {errorMessage &&
            !isSubmitting && (
              <p className="mt-2 text-[13px] font-medium text-red-500">
                {errorMessage}
              </p>
            )}
        </div>
      </div>
    </OnboardingLayout>
  );
}
