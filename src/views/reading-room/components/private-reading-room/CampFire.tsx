import React from 'react';
import campFire from '../../../../assets/readingRoom/bg/Campfire.png';
import nb1 from '../../../../assets/readingRoom/nooki-body/body_1.png';
import nb2 from '../../../../assets/readingRoom/nooki-body/body_2.png';
import nb3 from '../../../../assets/readingRoom/nooki-body/body_3.png';
import nb4 from '../../../../assets/readingRoom/nooki-body/body_4.png';
import nh1_b from '../../../../assets/readingRoom/nooki-head/n1_b.png';
import nh1_g from '../../../../assets/readingRoom/nooki-head/n1_g.png';
import nh1_y from '../../../../assets/readingRoom/nooki-head/n1_y.png';
import nh1_o from '../../../../assets/readingRoom/nooki-head/n1_o.png';
import nh2_g from '../../../../assets/readingRoom/nooki-head/nooki2_green.png';
import nh2_b from '../../../../assets/readingRoom/nooki-head/nooki2_blue.png';
import nh2_y from '../../../../assets/readingRoom/nooki-head/nooki2_y.png';
import nh2_o from '../../../../assets/readingRoom/nooki-head/nooki2_o.png';
import nh3_o from '../../../../assets/readingRoom/nooki-head/nooki3_orange.png';
import nh3_y from '../../../../assets/readingRoom/nooki-head/nooki3_yellow.png';
import nh3_b from '../../../../assets/readingRoom/nooki-head/nooki3_blue.png';
import nh3_g from '../../../../assets/readingRoom/nooki-head/nooki3_green.png';
import nh4_y from '../../../../assets/readingRoom/nooki-head/nooki4_yellow.png';
import nh4_o from '../../../../assets/readingRoom/nooki-head/nooki4_orange.png';
import nh4_b from '../../../../assets/readingRoom/nooki-head/nooki4_blue.png';
import nh4_g from '../../../../assets/readingRoom/nooki-head/nooki4_green.png';
import NookiCharacter from './nooki/NookiCharacter';
import SpeechBubble2 from './speech-bubble/SpeechBubble2';
import SpeechBubble3 from './speech-bubble/SpeechBubble3';
import useCurrentBookStore from '../../../../store/private-reading-room/useCurrentBookStore';

// 타입 정의
interface User {
  alias: string;
  characterColor: 'ORANGE' | 'BLUE' | 'GREEN' | 'RED';
  nickname: string;
  userId: number;
}

interface CharacterPosition {
  bodyImage: string;
  headImages: {
    BLUE: string;
    GREEN: string;
    RED: string;
    ORANGE: string;
  };
  bodySize: string;
  headSize: string;
  bodyPosition: string;
  headPosition: string;
  textTransform?: string;
  speechBubbleOffset: { x: number; y: number };
  SpeechBubbleComponent?: React.ComponentType<any>;
  flipped?: boolean;
}

interface CampFireProps {
  currentUsers: User[] | null;
}

// 캐릭터 위치 상수
const CHARACTER_POSITIONS: CharacterPosition[] = [
  {
    bodyImage: nb1,
    headImages: {
      BLUE: nh1_b,
      GREEN: nh1_g,
      RED: nh1_y,
      ORANGE: nh1_o,
    },
    bodySize: 'w-[79px] h-[130px]',
    headSize: 'w-[169px] h-[130px]',
    bodyPosition: 'bottom-115 left-342',
    headPosition: 'bottom-165 left-330',
    speechBubbleOffset: { x: 20, y: -270 },
    SpeechBubbleComponent: SpeechBubble2,
  },
  {
    bodyImage: nb2,
    headImages: {
      BLUE: nh2_b,
      GREEN: nh2_g,
      RED: nh2_y,
      ORANGE: nh2_o,
    },
    bodySize: 'w-[200px] h-[141px]',
    headSize: 'w-[176px] h-[141px]',
    bodyPosition: 'bottom-30 left-305',
    headPosition: 'bottom-70 left-277',
    textTransform: '-translate-y-[130px] translate-x-[30px]',
    speechBubbleOffset: { x: -10, y: -270 },
  },
  {
    bodyImage: nb3,
    headImages: {
      BLUE: nh3_b,
      GREEN: nh3_g,
      RED: nh3_y,
      ORANGE: nh3_o,
    },
    bodySize: 'w-[62px] h-[131px]',
    headSize: 'w-[168px] h-[125px]',
    bodyPosition: 'bottom-118 left-135',
    headPosition: 'bottom-170 left-107',
    textTransform: '-translate-y-[155px] translate-x-[44px]',
    speechBubbleOffset: { x: 150, y: -270 },
    SpeechBubbleComponent: SpeechBubble3,
  },
  {
    bodyImage: nb4,
    headImages: {
      BLUE: nh4_b,
      GREEN: nh4_g,
      RED: nh4_y,
      ORANGE: nh4_o,
    },
    bodySize: 'w-[89px] h-[80px]',
    headSize: 'w-[182px] h-[121px]',
    bodyPosition: 'bottom-145 left-64',
    headPosition: 'bottom-178 left-58',
    flipped: true,
    textTransform: '-translate-y-[120px] translate-x-[30px]',
    speechBubbleOffset: { x: -30, y: -260 },
  },
];

const CampFire = ({ currentUsers }: CampFireProps) => {
  const currentReadingBooks = useCurrentBookStore((state) => state.Books);
  // 사용자 데이터가 없거나 빈 배열인 경우 빈 화면 렌더링
  if (!currentUsers || currentUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-[970px] h-[780px]">
          <img
            src={campFire}
            alt="campfire background"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  const getBookTitleByUserId = (userId: number): string => {
    // 1차: 현재 스토어의 Books에서 검색
    const currentBook = currentReadingBooks?.find(
      (book) => book.userId === userId,
    );

    if (currentBook?.title) {
      return currentBook.title;
    }
    return '책 고르는 중..';
  };

  // 최대 4명까지만 표시 (CHARACTER_POSITIONS 배열 길이에 따라)
  const visibleUsers = currentUsers.slice(
    0,
    Math.min(currentUsers.length, CHARACTER_POSITIONS.length),
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[970px] h-[780px]">
        <img
          src={campFire}
          alt="campfire background"
          className="w-full h-full object-contain"
        />

        {visibleUsers.map((user, index) => {
          const position = CHARACTER_POSITIONS[index];
          const headImage = position.headImages[user.characterColor];
          const textContent = user.nickname + ' | ' + user.alias;
          const speechContent = getBookTitleByUserId(user.userId);

          return (
            <NookiCharacter
              key={user.userId}
              bodyImage={position.bodyImage}
              headImage={headImage}
              bodySize={position.bodySize}
              headSize={position.headSize}
              bodyPosition={position.bodyPosition}
              headPosition={position.headPosition}
              textTransform={position.textTransform}
              textContent={textContent}
              speechBubbleOffset={position.speechBubbleOffset}
              SpeechBubbleComponent={position.SpeechBubbleComponent}
              speechContent={speechContent}
              flipped={position.flipped}
              userId={user.userId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CampFire;
