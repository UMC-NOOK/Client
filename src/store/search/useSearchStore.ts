import { create } from 'zustand';

const RECENT_KEY = 'recent_searches';

interface SearchState {
  searchTerm: string;
  recentSearches: string[];
  setSearchTerm: (term: string) => void;
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearAllSearches: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  recentSearches: JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'),

  setSearchTerm: (term) => set({ searchTerm: term }),

  addRecentSearch: (term) => {
    const cleaned = term.trim();
    const current = get().recentSearches;
    const updated = [cleaned, ...current.filter(t => t !== cleaned)].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    set({ recentSearches: updated });
  },

  removeRecentSearch: (term) => {
    const updated = get().recentSearches.filter(t => t !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    set({ recentSearches: updated });
  },

  clearAllSearches: () => {
    localStorage.removeItem(RECENT_KEY);
    set({ recentSearches: [] });
  },
}));
