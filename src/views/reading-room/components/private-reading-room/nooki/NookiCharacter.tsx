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
    </>
  );
};

export default NookiCharacter;
