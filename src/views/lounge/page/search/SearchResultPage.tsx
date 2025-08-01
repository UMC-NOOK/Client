import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from '../../../../components/search/SearchBar';
import SearchResultList from '../../../../components/search/SearchResultList';
import { useSearchStore } from '../../../../store/search/useSearchStore';
import arrowLeftIcon from '../../../../assets/button/search/backtolounge.png';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { setSearchTerm } = useSearchStore();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  return (
    <div className="flex flex-col items-center px-4 pt-8">
      <div className="relative w-full max-w-[470px] ">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-265px] top-1/2 transform -translate-y-1/2 w-[28px] h-[28px] z-10"
        >
          <img
            src={arrowLeftIcon}
            alt="뒤로가기"
            className="w-[28px] h-[28px] object-contain"
          />
        </button>
        <SearchBar />
      </div>

      <SearchResultList emptyMessage="책을 찾을 수 없습니다." />
    </div>
  );
}
