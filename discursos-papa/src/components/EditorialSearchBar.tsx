import React from 'react';
import { Search, X, MapPin } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  totalResults: number;
  allCities: string[];
  allTags: string[];
}

export const EditorialSearchBar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  totalResults,
  allCities,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCity !== '';

  const handleClearFilters = () => {
    onSearchChange('');
    onCityChange('');
  };

  return (
    <div className="w-full bg-[#f8fafc] border-b border-hairline py-4 px-4 md:px-8 mb-6 no-print">
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Main Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por término, idea, lugar o cita (ej: democracia, trabajo, santidad, Brochero)..."
              className="w-full pl-9 pr-8 py-2 bg-white text-neutral-core font-sans text-sm rounded border border-[#d1d5db] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-neutral-core"
                title="Limpiar búsqueda"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Reset button if filtered */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 bg-white border border-[#d1d5db] hover:bg-slate-100 text-neutral-core text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <X size={14} />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Region & City Pill Badges per diseno.md */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-label-caps text-neutral-secondary mr-1 flex items-center gap-1">
            <MapPin size={12} className="text-primary" />
            Sede:
          </span>

          <button
            onClick={() => onCityChange('')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-label-caps border transition-colors ${
              selectedCity === ''
                ? 'bg-[#eff6ff] text-primary border-primary'
                : 'bg-[#f1f5f9] text-[#334155] border-transparent hover:bg-slate-200'
            }`}
          >
            Todas ({totalResults})
          </button>

          {allCities.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                onClick={() => onCityChange(isSelected ? '' : city)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-label-caps border transition-colors ${
                  isSelected
                    ? 'bg-[#eff6ff] text-primary border-primary'
                    : 'bg-[#f1f5f9] text-[#334155] border-transparent hover:bg-slate-200'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
