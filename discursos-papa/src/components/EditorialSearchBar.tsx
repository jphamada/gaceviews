import React from 'react';
import { Search, X, MapPin, Tag } from 'lucide-react';

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
  selectedTag,
  onTagChange,
  totalResults,
  allCities,
  allTags,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCity !== '' || selectedTag !== '';

  const handleClearFilters = () => {
    onSearchChange('');
    onCityChange('');
    onTagChange('');
  };

  return (
    <div className="w-full bg-surface-container-low border-b border-hairline p-4 md:p-6 mb-8 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Main Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por término, idea, lugar o cita (ej: federalismo, salario, juventud, paz)..."
              className="w-full pl-10 pr-10 py-2.5 bg-surface-lowest text-on-surface font-sans text-sm md:text-base border border-[#D6CCBF] focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
                title="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>



          {/* Reset button if filtered */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2.5 bg-transparent border border-outline hover:bg-surface-dim text-on-surface text-xs uppercase font-bold tracking-label-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <X size={14} />
              Restablecer
            </button>
          )}
        </div>



        {/* Contextual search feedback line */}
        <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant font-sans">
          <span>

          </span>
          <span className="hidden sm:inline italic font-serif">

          </span>
        </div>
      </div>
    </div>
  );
};
