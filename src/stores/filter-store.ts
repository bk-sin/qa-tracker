import { create } from 'zustand'

interface FilterState {
  // Search
  searchTerm: string
  setSearchTerm: (term: string) => void
  
  // Status filter
  statusFilter: string
  setStatusFilter: (status: string) => void
  
  // Section filter
  selectedSection: string
  setSelectedSection: (section: string) => void
  
  // Reset all filters
  resetFilters: () => void
  
  // Search query (alias for searchTerm for compatibility)
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  // Search
  searchTerm: '',
  setSearchTerm: (term: string) => set({ searchTerm: term, searchQuery: term }),
  
  // Status filter
  statusFilter: 'all',
  setStatusFilter: (status: string) => set({ statusFilter: status }),
  
  // Section filter
  selectedSection: 'all',
  setSelectedSection: (section: string) => set({ selectedSection: section }),
  
  // Reset all filters
  resetFilters: () => set({ 
    searchTerm: '', 
    searchQuery: '',
    statusFilter: 'all', 
    selectedSection: 'all' 
  }),
  
  // Search query (alias for searchTerm for compatibility)
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query, searchTerm: query }),
}))
