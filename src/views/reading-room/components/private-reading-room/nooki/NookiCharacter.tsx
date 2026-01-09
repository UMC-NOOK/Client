import { useEffect, useState } from 'react';
import SpeechBubble from '../speech-bubble/SpeechBubble';
import clsx from 'clsx';
import { useBookStore } from '../../../../../store/private-reading-room/useBookStore';

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
  userId: number;
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
  speechContent,
  enableSpeechBubble = true,
  SpeechBubbleComponent = SpeechBubble,
  userId,
}: NookiCharacterProps) => {
  const flipStyle = flipped ? '[transform:scaleX(-1)]' : '';
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fullSpeechContent = (speechContent: string | undefined) => {
    if (speechContent === '책 고르는 중..') {
      return speechContent;
    } else if ((speechContent?.length as number) <= 5) {
      return speechContent + ' 독서중';
    }
    return speechContent;
  };

  const renderStyledText = (text: string) => {
    const parts = text.split(' | ');
    if (parts.length === 2) {
      return (
        <>
          <span>{parts[0]}</span>
          <span className="text-sm text-[rgba(255,255,255,0.5)] font-light mx-1">
            |
          </span>
          <span>{parts[1]}</span>
        </>
      );
    }
    return <span>{text}</span>;
  };

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
              content={fullSpeechContent(speechContent)}
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

          {/* div 태그로 조진다음에 너비 정해두고 justify-content: center로 조지면 되지 않을까 */}

          <p
            className={`text-nook-100 absolute ${headPosition} ${textTransform} text-sm font-semibold`}
          >
            {renderStyledText(textContent)}
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
