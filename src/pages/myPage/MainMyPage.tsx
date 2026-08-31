import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import defaultProfile from "../../assets/icons/Profile Image.svg";
import close from "../../assets/icons/close.svg";
import bookCoverPlaceholder from "../../assets/images/book-cover-placeholder.png";
import ContainerText from "../../components/action/Button/ContainerText";
import Icon from "../../components/action/Button/Icon";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import { Normal } from "../../components/content/card/Book/Normal";
import Divider from "../../components/layout/Divider";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { useLogout } from "../../hooks/mutations/useLogout";
import { useWithdraw } from "../../hooks/mutations/useWithdraw";
import { useRecentView } from "../../hooks/queries/mypage/useRecentView";
import { useUserMe } from "../../hooks/queries/useUserMe";
import DeleteAccountModal from "./modal/DeleteAccountModal";
import LogoutModal from "./modal/LogoutModal";

export default function MainMyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: userMe } = useUserMe();
  const {
    data: recentBooks = [],
    isLoading: isRecentBooksLoading,
    isError: isRecentBooksError,
  } = useRecentView();
  const logoutMutation = useLogout();
  const withdrawMutation = useWithdraw();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("onboardingCompleted");
        queryClient.clear();
        setIsLogoutModalOpen(false);
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        console.error("로그아웃에 실패했습니다.", error);
      },
    });
  };

  const handleDeleteAccount = () => {
    withdrawMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("onboardingCompleted");
        queryClient.clear();
        setIsDeleteAccountModalOpen(false);
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        console.error("계정 삭제에 실패했습니다.", error);
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* top navagation 바 */}
      <div className="w-full">
        <TopNavigation
          left={
            <Icon size="m">
              <img src={close} alt="" />
            </Icon>
          }
          onClickLeft={() => navigate(-1)}
          leftPadding="p-0"
        />
      </div>
      {/* 프로필 */}
      <button
        type="button"
        onClick={() => navigate("/mypage/profile")}
        aria-label="프로필 수정"
        className="flex w-full flex-row items-center gap-4 text-left"
      >
          <span className="flex h-14 w-14 aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img
              src={userMe?.profileImageUrl || defaultProfile}
              alt="프로필"
              className="block h-full min-h-full w-full min-w-full rounded-full object-cover object-center"
              onError={(event) => {
                event.currentTarget.onerror = null;
              }}
            />
          </span>
          {/* 프로필 정보 */}
          <span className="flex min-w-0 flex-1 items-center">
            <SectionHeader
              size="16"
              top={userMe?.nickName ?? ""}
              bottom={userMe?.email ?? ""}
            />
          </span>
      </button>
      {/* diver */}
      <div className="w-full">
        <Divider width="full" />
      </div>
      {/* 최근 열람 도서 */}
       <div className="flex w-full flex-col gap-2.5">
          <SectionHeader
              size="13"
              top={<span className="text-gray-60">최근 열람 도서</span>}
              bottom={
                 <div className="scrollbar-hide w-full overflow-x-auto">
                  <div className="flex w-max gap-2">
                    {isRecentBooksLoading ? (
                      <p className="text-label-12-r text-gray-60">
                        불러오는 중...
                      </p>
                    ) : isRecentBooksError ? (
                      <p className="text-label-12-r text-gray-60">
                        최근 열람 도서를 불러오지 못했어요.
                      </p>
                   ) : recentBooks.length === 0 ? (
                      <div className="flex h-[200px] w-[343px] max-w-full items-center justify-center py-24">
                        <p className="text-label-14-sb text-gray-60">
                          최근 열람한 도서가 없어요.
                        </p>
                      </div>
                    ) : (
                      recentBooks.map((book) => (
                      <Normal
                        key={book.bookId}
                        imageUrl={book.coverImageUrl || bookCoverPlaceholder}
                        title={book.title}
                        author={book.author}
                      />
                      ))
                    )}
                  </div>
                </div>}
          />
      </div>
      {/* diver */}
      <div className="w-full">
        <Divider width="full" />
      </div>
      {/* 고객센터 */}
      <div className="flex flex-col w-full">
        <SectionHeader
              size="13"
              top={<span className="text-gray-60 text-label-13-r">고객센터</span>}
              bottom={
                <div className="flex flex-col [&>*]:!text-btn-14-r">
                  <ContainerText text="자주 묻는 질문" active
                    onClick={() => window.open("https://magic-moat-e7b.notion.site/3cd5fbef9af38031b72fe6fed4bfd6fe?source=copy_link")}/>
                  <ContainerText text="이용 약관" active 
                    onClick={() => window.open("https://magic-moat-e7b.notion.site/3ca5fbef9af380c38a3ddbbab9a4150e?source=copy_link")}/>
                  <ContainerText text="개인 정보 취급방침" active 
                    onClick={()=> window.open("https://magic-moat-e7b.notion.site/3cd5fbef9af3800b8087d0c96b2f8bba?source=copy_link")}/>
                </div>
                }
          />
      </div>
      {/* diver */}
      <div className="w-full">
        <Divider width="full" />
      </div>
      {/* 로그아웃 및 탈퇴 */}
      <div className="flex flex-col w-full">
        <SectionHeader
              size="13"
              top={<span className="text-gray-60 text-label-13-r">계정</span>}
              bottom={
                <div className="flex flex-col [&>*]:!text-btn-14-r">
                  <ContainerText
                    text="로그아웃"
                    active
                    onClick={() => setIsLogoutModalOpen(true)}
                  />
                  <ContainerText
                    text="계정 삭제"
                    active
                    danger
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                  />
                </div>
                }
          />
      </div>
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <DeleteAccountModal
        open={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
