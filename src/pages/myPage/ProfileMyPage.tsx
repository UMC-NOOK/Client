import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadSingleImage } from "../../api/image";
import defaultProfile from "../../assets/icons/Profile Image.svg";
import camera from "../../assets/icons/camera-black.svg";
import chevron_left from "../../assets/icons/chevron_left.svg";
import Icon from "../../components/action/Button/Icon";
import Solid from "../../components/action/Button/Solid";
import InformationSection from "../../components/content/InformationText/InformationSection";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import LoadingState from "../../components/feedback/LoadingState";
import { usePatchProfile } from "../../hooks/mutations/mypage/usePatchProfile";
import { useUserMe } from "../../hooks/queries/useUserMe";

function extractProfileImageKey(profileImageUrl?: string | null) {
  if (!profileImageUrl) return undefined;

  try {
    const pathname = new URL(profileImageUrl).pathname;
    const key = decodeURIComponent(pathname).replace(/^\/+/, "");

    return key || undefined;
  } catch {
    return undefined;
  }
}

export default function ProfileMyPage() {
  const navigate = useNavigate();
  const { data: userMe, isLoading: isUserMeLoading } = useUserMe();
  const patchProfileMutation = usePatchProfile();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(defaultProfile);
  const isEmailInvalid =
    email.length > 0 && !/^[^\s@]+@(naver\.com|gmail\.com)$/i.test(email);
  const isSaveActive =
    nickname !== (userMe?.nickName ?? "") || profileFile !== null;

  useEffect(() => {
    if (userMe?.nickName) setNickname(userMe.nickName);
    if (userMe?.email) setEmail(userMe.email);

    if (!profileFile) {
      setProfilePreview(userMe?.profileImageUrl || defaultProfile);
    }
  }, [profileFile, userMe?.email, userMe?.nickName, userMe?.profileImageUrl]);

  useEffect(() => {
    return () => {
      if (profilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  const handleProfileChange = (file?: File) => {
    if (!file) return;

    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const trimmedNickname = nickname.trim();
    const isNicknameChanged = trimmedNickname !== (userMe?.nickName ?? "");

    if (/^\s/.test(nickname)) {
      window.alert("닉네임 앞에는 공백을 사용할 수 없어요.");
      return;
    }

    if (/\s$/.test(nickname)) {
      window.alert("닉네임 뒤에는 공백을 사용할 수 없어요.");
      return;
    }

    if (
      isNicknameChanged &&
      (trimmedNickname.length < 2 || trimmedNickname.length > 20)
    ) {
      window.alert("닉네임은 2자 이상 20자 이하로 입력해주세요.");
      return;
    }

    if (
      isNicknameChanged &&
      !/^[\p{Script=Hangul}A-Za-z0-9 ]+$/u.test(trimmedNickname)
    ) {
      window.alert("닉네임은 영문, 숫자, 한글, 띄어쓰기만 사용할 수 있어요.");
      return;
    }

    if (!isNicknameChanged && !profileFile) {
      return;
    }

    try {
      const profileImageKey = profileFile
        ? await uploadSingleImage(profileFile, "profile")
        : undefined;
      const existingProfileImageKey =
        userMe?.profileImageKey ??
        extractProfileImageKey(userMe?.profileImageUrl);

      patchProfileMutation.mutate(
        {
          nickName: isNicknameChanged
            ? trimmedNickname
            : userMe?.nickName,
          profileImageKey:
            profileImageKey ?? existingProfileImageKey,
        },
        {
          onSuccess: () => navigate(-1),
          onError: (error) => {
            console.error("프로필 수정에 실패했습니다.", error);
            window.alert("프로필 수정에 실패했어요. 다시 시도해주세요.");
          },
        },
      );
    } catch (error) {
      console.error("프로필 이미지 업로드에 실패했습니다.", error);
      window.alert("프로필 이미지 업로드에 실패했어요.");
    }
  };

  if (isUserMeLoading || patchProfileMutation.isPending) {
    return <LoadingState variant="fullscreen" />;
  }

  return (
    <div className="flex w-full flex-col gap-10">
        <div className="w-full">
            <TopNavigation
            left={
                <Icon size="m">
                <img src={chevron_left} alt="" />
                </Icon>
            }
            center={
                <p className="text-title-18-m">프로필 수정</p>
            }
            onClickLeft={() => navigate(-1)}
            leftPadding="p-0"
            />
        </div>
      {/* 프로필 */}
        <div className="flex flex-col gap-12"> 
            {/* 프로필 */}
            <label className="relative h-30 w-30 cursor-pointer self-center">
              <div className="h-full w-full overflow-hidden rounded-full">
                <img
                  src={profilePreview}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <img src={camera} alt="" className="h-5 w-5" />
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label="프로필 사진 변경"
                className="sr-only"
                onChange={(event) =>
                  handleProfileChange(event.currentTarget.files?.[0])
                }
              />
            </label>
            {/*닉네임*/}
            <div className="w-full [&_.text-label-14-sb]:!text-label-13-sb">
                <InformationSection
                  flow="vertical"
                  top="닉네임"
                  bottom={
                  <input
                    type="text"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    maxLength={20}
                    placeholder="닉네임을 입력해주세요."
                    className="w-full rounded-md bg-gray-17 px-4 py-3 text-body-14-r text-gray-90 outline-none placeholder:text-gray-50"
                  />
                  }
                />
            </div>
            {/*이메일*/}
            <div className="w-full [&_.text-label-14-sb]:!text-label-13-sb">
                <InformationSection
                  flow="vertical"
                  top="이메일"
                  bottom={
                    <span className="flex w-full flex-col gap-2">
                      <input
                        type="email"
                        value={email}
                        readOnly
                        aria-invalid={isEmailInvalid}
                        className="w-full rounded-md bg-gray-17 px-4 py-3 text-body-14-r text-gray-50 outline-none placeholder:text-gray-50"
                      />
                    </span>
                  }
                />
            </div>
            {/*수정완료 버튼*/}
            {isSaveActive ? (
              <div className="w-full">
                <Solid
                  text={patchProfileMutation.isPending ? "수정 중..." : "수정 완료"}
                  variant={patchProfileMutation.isPending ? "disabled" : "primary"}
                  disabled={patchProfileMutation.isPending}
                  onClick={handleSave}
                />
              </div>
            ) : null}
        </div>
    </div>
  );
}
