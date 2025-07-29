import starFill from '../../../../../../../assets/button/library/star-fill.png';
import starSubtract from '../../../../../../../assets/button/library/Subtract.png';

interface StarMakerProps {
  star: number;
}

const StarMaker = ({ star }: StarMakerProps) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <img
          src={i < star ? starFill : starSubtract}
          alt="별"
          className="w-6 h-6 max-w-[13px] max-h-[13px] object-contain"
        />
      </span>,
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarMaker;
