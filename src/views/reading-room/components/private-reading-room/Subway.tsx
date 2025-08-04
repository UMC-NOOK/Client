import subway from '../../../../assets/readingRoom/bg/Subway.png';
import nb1 from '../../../../assets/readingRoom/nooki-body/body_1.png';
import nb2 from '../../../../assets/readingRoom/nooki-body/body_2.png';
import nb3 from '../../../../assets/readingRoom/nooki-body/body_3.png';
import nb4 from '../../../../assets/readingRoom/nooki-body/body_4.png';
import nh1 from '../../../../assets/readingRoom/nooki-head/n1_g.png';
import nh2 from '../../../../assets/readingRoom/nooki-head/nooki2_blue.png';
import nh3 from '../../../../assets/readingRoom/nooki-head/nooki3_orange.png';
import nh4 from '../../../../assets/readingRoom/nooki-head/nooki4_yellow.png';
import NookiCharacter from './nooki/NookiCharacter';
import SpeechBubble2 from './speech-bubble/SpeechBubble2';

const Subway = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[970px] h-[780px]">
        <img src={subway} alt="" className="w-full h-full object-contain" />

        {/* speechBubbleOffset={{ x: 40, y: -263 }}
          SpeechBubbleComponent={SpeechBubble2} */}

        <NookiCharacter
          bodyImage={nb1}
          headImage={nh1}
          bodySize="w-[95px] h-[157px]"
          headSize="w-[202px] h-[152px]"
          bodyPosition="bottom-[80px] left-[100px]"
          headPosition="bottom-100 left-35"
          textTransform="-translate-y-[160px] translate-x-[50px]"
          speechBubbleOffset={{ x: 10, y: -300 }}
        />

        <NookiCharacter
          bodyImage={nb2}
          headImage={nh2}
          bodySize="w-[239px] h-[169px]"
          headSize="w-[211px] h-[148px]"
          bodyPosition="bottom-[80px] left-[325px]"
          headPosition="bottom-93 left-128"
          speechBubbleOffset={{ x: 20, y: -277 }}
          SpeechBubbleComponent={SpeechBubble2}
        />

        <NookiCharacter
          bodyImage={nb3}
          headImage={nh3}
          bodySize="w-[77px] h-[160px]"
          headSize="w-[206px] h-[153px]"
          bodyPosition="bottom-[80px] right-[330px]"
          headPosition="bottom-103 right-140"
          textTransform="-translate-y-[160px] -translate-x-[50px]"
          speechBubbleOffset={{ x: -200, y: -282 }}
        />

        <NookiCharacter
          bodyImage={nb4}
          headImage={nh4}
          bodySize="w-[108px] h-[97px]"
          headSize="w-[221px] h-[147px]"
          bodyPosition="bottom-[130px] right-[90px]"
          headPosition="bottom-107 right-35"
          textTransform="-translate-y-[150px] -translate-x-[60px]"
          speechBubbleOffset={{ x: -185, y: -270 }}
          SpeechBubbleComponent={SpeechBubble2}
        />
      </div>
    </div>
  );
};

export default Subway;
