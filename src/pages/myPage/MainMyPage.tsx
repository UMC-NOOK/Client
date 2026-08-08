import { useNavigate } from "react-router-dom";

import defaultProfile from "../../assets/icons/Profile Image.svg";
import close from "../../assets/icons/close.svg";
import ContainerText from "../../components/action/Button/ContainerText";
import Icon from "../../components/action/Button/Icon";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import { Normal } from "../../components/content/card/Book/Normal";
import Divider from "../../components/layout/Divider";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { useAuthMe } from "../../hooks/queries/useAuthMe";
import { mainMyPageRecentBookList } from "../../mocks/mypage/mainMyPage_RecentBookList";

export default function MainMyPage() {
  const navigate = useNavigate();
  const { data: authMe } = useAuthMe();

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
      <div className="flex flex-row gap-4"> 
          {/* 프로필 */}
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <img
              src={defaultProfile}
              alt="프로필"
              className="h-full w-full object-cover"
            />
          </div>
          {/* 프로필 정보 */}
          <div className="flex min-w-0 flex-1 items-center">
            <SectionHeader
              size="16"
              top={authMe?.nickName ?? ""}
              bottom={authMe?.email ?? ""}
            />
          </div>
      </div>
      {/* diver */}
      <div className="w-full">
        <Divider width="full" />
      </div>
      {/* 최근 열람 도서 */}
       <div className="flex w-full flex-col gap-2">
          <SectionHeader
              size="13"
              top={<span className="text-gray-60">최근 열람 도서</span>}
              bottom={
                 <div className="w-full overflow-x-auto">
                  <div className="flex w-max gap-2">
                    {mainMyPageRecentBookList.map((book) => (
                      <Normal
                        key={book.id}
                        imageUrl={book.imageUrl}
                        title={book.title}
                        author={book.author}
                      />
                    ))}
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
              top={<span className="text-gray-60">고객센터</span>}
              bottom={
                <div className="flex flex-col">
                  <ContainerText text="자주 묻는 질문" active />
                  <ContainerText text="이용 약관" active />
                  <ContainerText text="개인 정보 취급방침" active />
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
              top={<span className="text-gray-60">계정</span>}
              bottom={
                <div className="flex flex-col">
                  <ContainerText text="로그아웃" active />
                  <ContainerText text="계정 삭제" active danger />
                </div>
                }
          />
      </div>
    </div>
  );
}
