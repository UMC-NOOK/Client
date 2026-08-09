import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultProfile from "../../assets/icons/Profile Image.svg";
import camera from "../../assets/icons/camera-black.svg";
import chevron_left from "../../assets/icons/chevron_left.svg";
import Icon from "../../components/action/Button/Icon";
import Solid from "../../components/action/Button/Solid";
import InformationSection from "../../components/content/InformationText/InformationSection";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { useAuthMe } from "../../hooks/queries/useAuthMe";

export default function ProfileMyPage() {
  const navigate = useNavigate();
  const { data: authMe } = useAuthMe();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(defaultProfile);
  const isEmailInvalid =
    email.length > 0 && !/^[^\s@]+@(naver\.com|gmail\.com)$/i.test(email);
  const isSaveActive =
    nickname !== (authMe?.nickName ?? "") || profileFile !== null;

  useEffect(() => {
    if (authMe?.nickName) setNickname(authMe.nickName);
    if (authMe?.email) setEmail(authMe.email);
  }, [authMe?.nickName, authMe?.email]);

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
            onClickLeft={() => navigate("/mypage")}
            leftPadding="p-0"
            />
        </div>
      {/* 프로필 */}
        <div className="flex flex-col gap-12"> 
            {/* 프로필 */}
            <div className="relative h-30 w-30 self-center">
              <div className="h-full w-full overflow-hidden rounded-full">
                <img
                  src={profilePreview}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white">
                <img src={camera} alt="" className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  aria-label="프로필 사진 변경"
                  className="hidden"
                  onChange={(event) =>
                    handleProfileChange(event.target.files?.[0])
                  }
                />
              </label>
            </div>
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
                    maxLength={10}
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
                        placeholder="이메일을 입력해주세요."
                        aria-invalid={isEmailInvalid}
                        className="w-full rounded-md bg-gray-17 px-4 py-3 text-body-14-r text-gray-50 outline-none placeholder:text-gray-50"
                      />
                      {isEmailInvalid ? (
                        <span className="text-label-12-r text-red-60">
                          올바르지 않은 이메일 형식입니다.
                        </span>
                      ) : null}
                    </span>
                  }
                />
            </div>
            {/*수정완료 버튼*/}
            {isSaveActive ? (
              <div className="w-full">
                <Solid text="수정 완료" variant="primary" />
              </div>
            ) : null}
        </div>
    </div>
  );
}
