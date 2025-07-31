import readingRoom from '../../../../assets/readingRoom/bg/ReadingRoom.png';
import NookiCharacter from './nooki/NookiCharacter';
import nb1 from '../../../../assets/readingRoom/nooki-body/body_1.png';
import nb2 from '../../../../assets/readingRoom/nooki-body/body_2.png';
import nb3 from '../../../../assets/readingRoom/nooki-body/body_3.png';
import nb4 from '../../../../assets/readingRoom/nooki-body/body_4.png';
import nh1 from '../../../../assets/readingRoom/nooki-head/n1_g.png';
import nh2 from '../../../../assets/readingRoom/nooki-head/nooki2_blue.png';
import nh3 from '../../../../assets/readingRoom/nooki-head/nooki3_orange.png';
import nh4 from '../../../../assets/readingRoom/nooki-head/nooki4_yellow.png';

const ReadingRoom = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[970px] h-[780px]">
        <img
          src={readingRoom}
          alt=""
          className="w-full h-full object-contain"
        />
        <NookiCharacter
          bodyImage={nb1}
          headImage={nh1}
          bodySize="w-[89px] h-[147px]"
          headSize="w-[188px] h-[141px]"
          bodyPosition="bottom-87 left-172"
          headPosition="bottom-144 left-155"
        />

        <NookiCharacter
          bodyImage={nb2}
          headImage={nh2}
          bodySize="w-[213px] h-[151]"
          headSize="w-[188px] h-[132px]"
          bodyPosition="bottom-265 left-365"
          headPosition="bottom-312 left-334"
        />

        <NookiCharacter
          bodyImage={nb3}
          headImage={nh3}
          bodySize="w-[69px] h-[144px]"
          headSize="w-[188px] h-[140px]"
          bodyPosition="bottom-219 left-84"
          headPosition="bottom-274 left-50"
        />

        {/* 뒤진힌놈 */}
        <NookiCharacter
          bodyImage={nb4}
          headImage={nh4}
          bodySize="w-[97px] h-[89px]"
          headSize="w-[198px] h-[132px]"
          bodyPosition="bottom-114 left-60"
          headPosition="bottom-151 left-20"
        />
      </div>
    </div>
  );
};

export default ReadingRoom;
