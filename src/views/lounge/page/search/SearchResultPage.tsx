// src/views/lounge/page/search/SearchResultPage.tsx
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../../../components/search/SearchBar';
import SearchResultList from '../../../../components/search/SearchResultList';

export default function SearchResultPage() {
  const [params] = useSearchParams();
  const query = params.get('query') || '';

  return (
    <div className="p-6">
      <SearchBar />
      <SearchResultList query={query} />
    </div>
  );
}
