interface NookiCharacterProps {
  bodyImage: string;
  headImage: string;
  bodySize?: string;
  headSize?: string;
  bodyPosition: string;
  headPosition: string;
  flipped?: boolean;
}

const NookiCharacter = ({
  bodyImage,
  headImage,
  bodySize = 'w-80 h-80',
  headSize = 'w-80 h-80',
  bodyPosition,
  headPosition,
  flipped = false,
}: NookiCharacterProps) => {
  const flipStyle = flipped ? '[transform:scaleX(-1)]' : '';

  return (
    <>
      <div>
        <img
          src={bodyImage}
          alt=""
          className={`${bodySize} object-contain absolute ${bodyPosition} ${flipStyle}`}
        />
        <img
          src={headImage}
          alt=""
          className={`${headSize} object-contain absolute ${headPosition} ${flipStyle}`}
        />
      </div>
    </>
  );
};

export default NookiCharacter;
