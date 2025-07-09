import SearchBar from '../../../components/search/SearchBar';

const Lounge = () => {
  return (
    <div className="relative px-4 py-8">
      {/* 라운지 전용 위치 및 사이즈 임시 조정 */}
      <div className="absolute top-5 right-100 w-[300px]">
      <SearchBar
        wrapperClassName="absolute top-4 right-12"
        customWidth="300px"
      />
      </div>

      {/* 라운지 본문 콘텐츠 */}
      <div className="pt-24">
        {/* 베스트셀러, 추천 리스트 등 들어갈 자리 */}
      </div>
    </div>
  );
};

export default Lounge;
