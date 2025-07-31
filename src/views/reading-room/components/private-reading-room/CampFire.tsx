import campFire from '../../../../assets/readingRoom/bg/Campfire.png';
import nb1 from '../../../../assets/readingRoom/nooki-body/body_1.png';
import nb2 from '../../../../assets/readingRoom/nooki-body/body_2.png';
import nb3 from '../../../../assets/readingRoom/nooki-body/body_3.png';
import nb4 from '../../../../assets/readingRoom/nooki-body/body_4.png';
import nh1 from '../../../../assets/readingRoom/nooki-head/n1_b.png';
import nh2 from '../../../../assets/readingRoom/nooki-head/nooki2_green.png';
import nh3 from '../../../../assets/readingRoom/nooki-head/nooki3_orange.png';
import nh4 from '../../../../assets/readingRoom/nooki-head/nooki4_yellow.png';
import NookiCharacter from './nooki/NookiCharacter';

const CampFire = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[970px] h-[780px]">
        <img src={campFire} alt="" className="w-full h-full object-contain" />
        <NookiCharacter
          bodyImage={nb1}
          headImage={nh1}
          bodySize="w-[79px] h-[130px]"
          headSize="w-[169px] h-[130px]"
          bodyPosition="bottom-115 left-342"
          headPosition="bottom-165 left-330"
        />

        <NookiCharacter
          bodyImage={nb2}
          headImage={nh2}
          bodySize="w-[200px] h-[141]"
          headSize="w-[176px] h-[141px]"
          bodyPosition="bottom-30 left-305"
          headPosition="bottom-70 left-277"
        />

        <NookiCharacter
          bodyImage={nb3}
          headImage={nh3}
          bodySize="w-[62px] h-[131px]"
          headSize="w-[168px] h-[125px]"
          bodyPosition="bottom-118 left-135"
          headPosition="bottom-170 left-107"
        />

        {/* 뒤진힌놈 */}
        <NookiCharacter
          bodyImage={nb4}
          headImage={nh4}
          bodySize="w-[89px] h-[80px]"
          headSize="w-[182px] h-[121px]"
          bodyPosition="bottom-145 left-64"
          headPosition="bottom-178 left-58"
          flipped={true}
        />
      </div>
    </div>
  );
};

export default CampFire;
