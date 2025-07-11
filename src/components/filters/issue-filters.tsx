'use client';
import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/stores/filter-store';
import FilterSelect from './filter-select';
import SearchBar from './search-bar';

export function IssueFilters() {
  const {
    statusFilter,
    selectedSection,
    setStatusFilter,
    setSelectedSection,
    resetFilters,
  } = useFilterStore();

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'resolved', label: 'Resuelto' },
  ];

  const sectionOptions = [
    { value: 'all', label: 'Todas las secciones' },
    { value: 'scanner', label: 'Scanner' },
    { value: 'bottom-sheet', label: 'Bottom-sheet' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'cupones', label: 'Cupones' },
    { value: 'carrito', label: 'Carrito' },
  ];

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Filtros</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Limpiar filtros
        </Button>
      </div>

      <div className="space-y-4">
        <SearchBar />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FilterSelect
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={statusOptions}
            placeholder="Filtrar por estado"
          />

          <FilterSelect
            value={selectedSection}
            onValueChange={setSelectedSection}
            options={sectionOptions}
            placeholder="Filtrar por sección"
          />
        </div>
      </div>
    </div>
  );
}
