import React, { useState, useEffect, useMemo } from 'react';
import { Discurso, ViewMode } from './types/discurso';
import { SpeechSearchEngine } from './utils/searchEngine';
import { setupIframeResizer, triggerHeightCheck } from './utils/iframeBridge';
import { EditorialHeader } from './components/EditorialHeader';
import { EditorialSearchBar } from './components/EditorialSearchBar';
import { DiscursoCard } from './components/DiscursoCard';
import { DiscursoReader } from './components/DiscursoReader';
import { ThematicQuestionsView } from './components/ThematicQuestionsView';
import { TimelineView } from './components/TimelineView';
import { EmbedInfoModal } from './components/EmbedInfoModal';
import { EditorialFooter } from './components/EditorialFooter';
import { BookOpen, AlertCircle, Compass, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  const [discursos, setDiscursos] = useState<Discurso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation & View state
  const [currentView, setCurrentView] = useState<ViewMode>('explorer');
  const [selectedSpeech, setSelectedSpeech] = useState<Discurso | null>(null);
  const [targetParagraph, setTargetParagraph] = useState<number | undefined>(undefined);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);

  // Initialize iframe auto-resizer
  useEffect(() => {
    const cleanup = setupIframeResizer();
    return () => cleanup();
  }, []);

  // Fetch speeches data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Relative fetch for clean portability inside subfolder embeds
        const response = await fetch('./data/discursos.json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} al cargar el corpus de discursos`);
        }
        const data: Discurso[] = await response.json();
        setDiscursos(data);

        // Check if URL hash references a specific speech (e.g. #discurso-3)
        if (window.location.hash) {
          const hashId = window.location.hash.replace('#', '');
          const found = data.find((d) => d.id === hashId);
          if (found) {
            setSelectedSpeech(found);
            setCurrentView('reader');
          }
        }
      } catch (err: any) {
        console.error('Error fetching discursos:', err);
        setError(err.message || 'No fue posible cargar el archivo de discursos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Whenever view or selected speech changes, trigger height measurement
  useEffect(() => {
    triggerHeightCheck();
  }, [currentView, selectedSpeech, discursos, searchQuery, selectedCity, selectedTag]);

  // Search engine instance
  const searchEngine = useMemo(() => {
    if (discursos.length === 0) return null;
    return new SpeechSearchEngine(discursos);
  }, [discursos]);

  // Extract all distinct cities and tags
  const allCities = useMemo(() => {
    const set = new Set<string>();
    discursos.forEach((d) => {
      const parts = d.lugar.split(',');
      const city = parts[parts.length - 1]?.trim() || d.lugar;
      set.add(city);
    });
    return Array.from(set).sort();
  }, [discursos]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    discursos.forEach((d) => {
      d.palabrasClave.forEach((k) => set.add(k));
    });
    return Array.from(set).sort();
  }, [discursos]);

  // Perform search and filtering
  const searchResults = useMemo(() => {
    if (!searchEngine) return [];

    let list = searchEngine.search(searchQuery);

    if (selectedCity) {
      list = list.filter((item) =>
        item.discurso.lugar.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    if (selectedTag) {
      list = list.filter((item) =>
        item.discurso.palabrasClave.some(
          (k) => k.toLowerCase() === selectedTag.toLowerCase()
        )
      );
    }

    return list;
  }, [searchEngine, searchQuery, selectedCity, selectedTag]);

  // Navigation handlers
  const handleSelectSpeech = (speech: Discurso, pIndex?: number) => {
    setSelectedSpeech(speech);
    setTargetParagraph(pIndex);
    setCurrentView('reader');
    window.location.hash = speech.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToExplorer = () => {
    setSelectedSpeech(null);
    setTargetParagraph(undefined);
    setCurrentView('explorer');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    if (view !== 'reader') {
      setSelectedSpeech(null);
      setTargetParagraph(undefined);
      window.location.hash = '';
    }
  };

  const handleTagFilterClick = (tag: string) => {
    setSelectedTag(tag);
    if (currentView !== 'explorer') {
      setCurrentView('explorer');
      setSelectedSpeech(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center font-sans">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="font-display text-xl font-bold text-[#141b2b] mb-1">
          Cargando Archivo Histórico...
        </h2>
        <p className="text-xs text-neutral-caption font-sans">
          Cotejando corpus de León XIV
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center font-sans">
        <div className="max-w-md p-6 bg-white border border-error rounded shadow-subtle">
          <AlertCircle size={30} className="text-error mx-auto mb-3" />
          <h2 className="font-display text-lg font-bold text-[#141b2b] mb-2">
            Error al acceder a los documentos
          </h2>
          <p className="text-xs text-neutral-secondary mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-[#004d97] text-white text-xs uppercase font-bold tracking-label-caps rounded flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <RefreshCw size={13} />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Editorial Header */}
      <EditorialHeader
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        totalDiscursos={discursos.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'reader' && selectedSpeech ? (
          <DiscursoReader
            discurso={selectedSpeech}
            allDiscursos={discursos}
            targetParagraphIndex={targetParagraph}
            onBack={handleBackToExplorer}
            onSelectSpeech={handleSelectSpeech}
          />
        ) : currentView === 'thematic-faq' ? (
          <ThematicQuestionsView
            discursos={discursos}
            onSelectSpeech={handleSelectSpeech}
          />
        ) : currentView === 'timeline' ? (
          <TimelineView
            discursos={discursos}
            onSelectSpeech={handleSelectSpeech}
          />
        ) : (
          /* General Explorer View */
          <div>
            <EditorialSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              totalResults={searchResults.length}
              allCities={allCities}
              allTags={allTags}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
              {/* Section Header */}
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-hairline pb-2.5">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-label-caps text-primary">
                  <BookOpen size={14} />
                  <span>ÍNDICE DOCUMENTAL</span>
                </div>
                <div className="text-xs text-neutral-caption font-sans">
                  {discursos.length} discursos y homilías oficiales
                </div>
              </div>

              {searchResults.length === 0 ? (
                <div className="bg-white border border-hairline rounded p-12 text-center my-6 shadow-xs">
                  <Compass size={32} className="text-slate-400 mx-auto mb-3" />
                  <h3 className="font-display text-lg font-bold text-[#141b2b] mb-1.5">
                    No se hallaron coincidencias
                  </h3>
                  <p className="text-xs text-neutral-secondary max-w-sm mx-auto mb-4 font-sans">
                    No encontramos discursos ni párrafos que concuerden con los criterios seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCity('');
                      setSelectedTag('');
                    }}
                    className="px-3.5 py-1.5 bg-primary hover:bg-[#004d97] text-white text-xs uppercase font-bold tracking-label-caps rounded transition-colors"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                /* Grid of Discursos */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {searchResults.map((item) => (
                    <DiscursoCard
                      key={item.discurso.id}
                      discurso={item.discurso}
                      matchingParagraphs={item.matches}
                      searchQuery={searchQuery}
                      onSelect={handleSelectSpeech}
                      onTagClick={handleTagFilterClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Embed Code Modal */}
      <EmbedInfoModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />

      {/* Editorial Footer */}
      <EditorialFooter />
    </div>
  );
};
