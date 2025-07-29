import { useEffect, useState } from 'react';
import Tap from '../../components/lounge/TapFilter';
import CategorySectionView from '../../components/lounge/CategorySectionView';
import SearchBar from '../../../../components/search/SearchBar';
import LsearchIcon from '../../../../assets/button/search/Lsearch.png';

const Lounge = () => {
  const [selectedCategory, setSelectedCategory] = useState('추천');

  useEffect(() => {
    // API 요청 예시
    // fetch(`/api/lounge?mallType=${selectedCategory}`)
    //   .then((res) => res.json())
    //   .then((data) => setBooks(data))
    //   .catch((error) => console.error(error));
  }, [selectedCategory]);

  return (
    <div className="flex justify-center mt-25 flex-col">
      <div className="flex w-full justify-evenly items-center">
        <Tap selected={selectedCategory} onSelect={setSelectedCategory} />
        <SearchBar
          variant="lounge"
          customWidth="340px"
          iconSrc={LsearchIcon}
        />
      </div>

      <div className="flex w-full justify-center items-center mb-10">
        <div className="flex justify-evenly items-center">
          <CategorySectionView selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Lounge;
