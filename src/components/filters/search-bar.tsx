import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/stores/filter-store';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = 'Buscar issues...',
}: SearchBarProps) {
  const { searchTerm, setSearchTerm } = useFilterStore();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
