import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from '../../../../components/search/SearchBar';
import SearchResultList from '../../../../components/search/SearchResultList';
import { useSearchStore } from '../../../../store/search/useSearchStore';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { setSearchTerm } = useSearchStore();

  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  return (
    <div className="flex flex-col items-center px-4 pt-8">
      <SearchBar />
      <SearchResultList emptyMessage="책을 찾을 수 없습니다." />
    </div>
  );
}
