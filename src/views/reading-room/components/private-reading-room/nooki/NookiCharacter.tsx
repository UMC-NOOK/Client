import { useState } from 'react';
import SpeechBubble from '../speech-bubble/SpeechBubble';
import clsx from 'clsx';

interface NookiCharacterProps {
  bodyImage: string;
  headImage: string;
  bodySize?: string;
  headSize?: string;
  bodyPosition: string;
  headPosition: string;
  flipped?: boolean;
  ver?: number;
  textTransform?: string;
  textContent?: string;
  // 말풍선 관련
  speechBubbleOffset?: string | { x: number; y: number };
  speechContent?: string;
  enableSpeechBubble?: boolean;
  SpeechBubbleComponent?: React.ComponentType<{
    content?: string;
    isVisible?: boolean;
  }>;
}

const NookiCharacter = ({
  bodyImage,
  headImage,
  bodySize,
  headSize,
  bodyPosition,
  headPosition,
  flipped = false,
  textTransform = '-translate-y-[145px] translate-x-[40px]',
  textContent = '정혁 | 고독한 누키',
  speechBubbleOffset = '-translate-y-12 translate-x-2',
  speechContent = '독서중',
  enableSpeechBubble = true,
  SpeechBubbleComponent = SpeechBubble,
}: NookiCharacterProps) => {
  const flipStyle = flipped ? '[transform:scaleX(-1)]' : '';
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div
        className=""
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {enableSpeechBubble && isHovered && (
          <div
            className={`absolute z-20', 
              ${headPosition}`}
            style={
              typeof speechBubbleOffset === 'object'
                ? {
                    transform: `translate(${speechBubbleOffset.x}px, ${speechBubbleOffset.y}px)`,
                  }
                : undefined
            }
          >
            <SpeechBubbleComponent
              content={speechContent}
              isVisible={isHovered}
            />
          </div>
        )}

        <div>
          <img
            src={bodyImage}
            alt=""
            className={`${bodySize} object-contain absolute ${bodyPosition} ${flipStyle}`}
          />

          <p
            className={`text-nook-100 absolute ${headPosition} ${textTransform} text-sm font-semibold`}
          >
            {textContent}
          </p>

          <img
            src={headImage}
            alt=""
            className={`${headSize} object-contain absolute ${headPosition} ${flipStyle}`}
          />
        </div>
      </div>
    </>
  );
};

export default NookiCharacter;
