import React from 'react';
import speechBubble1 from '../../../../../assets/readingRoom/speech-bubble/speech_bubble_2.png';

interface SpeechBubbleProps {
  content?: string;
  isVisible?: boolean;
}

function SpeechBubble2({
  content = '스토너 독서중',
  isVisible = true,
}: SpeechBubbleProps) {
  if (!isVisible) return null;
  return (
    <div className="absolute">
      <img
        src={speechBubble1}
        alt="말풍선2"
        className="object-contain max-w-90 max-h-90"
      />
      <div className="absolute flex justify-center w-[110px] top-19 left-17">
        <p className="text-sm text-nook-100 font-normal line-clamp-1">
          {content}
        </p>
      </div>
    </div>
  );
}

export default SpeechBubble2;
