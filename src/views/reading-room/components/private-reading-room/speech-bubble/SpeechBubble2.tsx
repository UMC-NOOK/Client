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
        alt="말풍선1"
        className="object-contain max-w-90 max-h-90"
      />
      <p className="absolute text-sm text-nook-100 font-normal top-19 left-28">
        {content}
      </p>
    </div>
  );
}

export default SpeechBubble2;
