import { useState } from 'react';

const RECENT_KEY = 'recent_searches';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getRecentSearches = (): string[] => {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const addRecentSearch = (term: string) => {
    const updated = [term, ...getRecentSearches().filter(t => t !== term)].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const removeRecentSearch = (term: string) => {
    const updated = getRecentSearches().filter(t => t !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  return {
    searchTerm,
    setSearchTerm,
    getRecentSearches,
    addRecentSearch,
    removeRecentSearch,
  };
};