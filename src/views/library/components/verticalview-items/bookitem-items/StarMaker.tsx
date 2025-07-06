import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarMakerProps {
  star: number;
}

const StarMaker = ({ star }: StarMakerProps) => {
  const stars = [];
  for (let i = 0; i < star; i++) {
    stars.push(
      <span key={i}>
        <FaStar size={16} color="gold" />
      </span>
    );
  }

  return <div className="flex items-center">{stars}</div>;
};

export default StarMaker;
