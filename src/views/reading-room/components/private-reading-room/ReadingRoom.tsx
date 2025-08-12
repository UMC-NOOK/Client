import readingRoom from '../../../../assets/readingRoom/bg/ReadingRoom.png';
import NookiCharacter from './nooki/NookiCharacter';
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
import SpeechBubble3 from './speech-bubble/SpeechBubble3';
import SpeechBubble2 from './speech-bubble/SpeechBubble2';
import SpeechBubble4 from './speech-bubble/SpeechBubble4';
import useCurrentBookStore from '../../../../store/private-reading-room/useCurrentBookStore';

interface User {
  alias: string;
  characterColor: 'ORANGE' | 'BLUE' | 'GREEN' | 'YELLOW';
  nickname: string;
  userId: number;
}

interface CharacterPosition {
  bodyImage: string;
  headImages: {
    BLUE: string;
    GREEN: string;
    YELLOW: string;
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

interface ReadingRoomProps {
  currentUsers: User[] | null;
}

// 캐릭터 위치 상수
const CHARACTER_POSITIONS: CharacterPosition[] = [
  {
    bodyImage: nb1,
    headImages: {
      BLUE: nh1_b,
      GREEN: nh1_g,
      YELLOW: nh1_y,
      ORANGE: nh1_o,
    },
    bodySize: 'w-[89px] h-[147px]',
    headSize: 'w-[188px] h-[141px]',
    bodyPosition: 'bottom-87 left-172',
    headPosition: 'bottom-144 left-155',
    speechBubbleOffset: { x: 40, y: -263 },
    SpeechBubbleComponent: SpeechBubble2,
  },
  {
    bodyImage: nb2,
    headImages: {
      BLUE: nh2_b,
      GREEN: nh2_g,
      YELLOW: nh2_y,
      ORANGE: nh2_o,
    },
    bodySize: 'w-[213px] h-[151px]',
    headSize: 'w-[188px] h-[132px]',
    bodyPosition: 'bottom-265 left-365',
    headPosition: 'bottom-312 left-334',
    textTransform: '-translate-y-[126px] translate-x-[30px]',
    speechBubbleOffset: { x: -175, y: -140 },
    SpeechBubbleComponent: SpeechBubble4,
  },
  {
    bodyImage: nb3,
    headImages: {
      BLUE: nh3_b,
      GREEN: nh3_g,
      YELLOW: nh3_y,
      ORANGE: nh3_o,
    },
    bodySize: 'w-[69px] h-[144px]',
    headSize: 'w-[188px] h-[140px]',
    bodyPosition: 'bottom-219 left-84',
    headPosition: 'bottom-274 left-50',
    speechBubbleOffset: { x: 198, y: -187 },
    SpeechBubbleComponent: SpeechBubble3,
  },
  {
    bodyImage: nb4,
    headImages: {
      BLUE: nh4_b,
      GREEN: nh4_g,
      YELLOW: nh4_y,
      ORANGE: nh4_o,
    },
    bodySize: 'w-[97px] h-[89px]',
    headSize: 'w-[198px] h-[132px]',
    bodyPosition: 'bottom-114 left-60',
    headPosition: 'bottom-151 left-20',
    textTransform: '-translate-y-[130px] translate-x-[40px]',
    speechBubbleOffset: { x: -10, y: -247 },
  },
];

const ReadingRoom = ({ currentUsers }: ReadingRoomProps) => {
  const currentReadingBooks = useCurrentBookStore((state) => state.Books);
  // 사용자 데이터가 없거나 빈 배열인 경우 빈 화면 렌더링
  if (!currentUsers || currentUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-[970px] h-[780px]">
          <img
            src={readingRoom}
            alt="reading room background"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  const getBookTitleByUserId = (userId: number): string => {
    const book = currentReadingBooks?.find((book) => book.userId === userId);
    return book?.title || '책 고르는 중..';
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
          src={readingRoom}
          alt="reading room background"
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

export default ReadingRoom;
