import MiniSearch from 'minisearch';
import { Discurso } from '../types/discurso';

export interface IndexedParagraph {
  id: string; // e.g. "discurso-1-p-2"
  discursoId: string;
  paragraphIndex: number;
  text: string;
  discursoTitulo: string;
  lugar: string;
  fecha: string;
}

export class SpeechSearchEngine {
  private miniSearch: MiniSearch<IndexedParagraph>;
  private discursos: Discurso[] = [];

  constructor(discursos: Discurso[]) {
    this.discursos = discursos;
    this.miniSearch = new MiniSearch<IndexedParagraph>({
      fields: ['text', 'discursoTitulo', 'lugar'],
      storeFields: ['discursoId', 'paragraphIndex', 'text', 'discursoTitulo', 'lugar', 'fecha'],
      searchOptions: {
        boost: { discursoTitulo: 2, text: 1 },
        fuzzy: 0.2,
        prefix: true,
      },
    });

    const documents: IndexedParagraph[] = [];
    discursos.forEach((disc) => {
      // index title/summary as paragraph -1 or header
      documents.push({
        id: `${disc.id}-header`,
        discursoId: disc.id,
        paragraphIndex: 0,
        text: `${disc.titulo}. ${disc.resumen} ${disc.palabrasClave.join(' ')}`,
        discursoTitulo: disc.titulo,
        lugar: disc.lugar,
        fecha: disc.fecha,
      });

      disc.parrafos.forEach((p, idx) => {
        documents.push({
          id: `${disc.id}-p-${idx}`,
          discursoId: disc.id,
          paragraphIndex: idx,
          text: p,
          discursoTitulo: disc.titulo,
          lugar: disc.lugar,
          fecha: disc.fecha,
        });
      });
    });

    this.miniSearch.addAll(documents);
  }

  public search(query: string): Array<{
    discurso: Discurso;
    matches: Array<{ paragraphIndex: number; text: string }>;
    score: number;
  }> {
    if (!query || !query.trim()) {
      return this.discursos.map((d) => ({
        discurso: d,
        matches: [],
        score: 1,
      }));
    }

    const cleanQuery = query.trim();
    const results = this.miniSearch.search(cleanQuery);

    // Group hits by discursoId
    const map = new Map<string, { matches: Array<{ paragraphIndex: number; text: string }>; score: number }>();

    for (const res of results) {
      const discId = res.discursoId as string;
      const pIndex = res.paragraphIndex as number;
      const text = res.text as string;

      if (!map.has(discId)) {
        map.set(discId, { matches: [], score: res.score });
      }

      const entry = map.get(discId)!;
      entry.score = Math.max(entry.score, res.score);

      // Only add distinct paragraph indices
      if (!entry.matches.some((m) => m.paragraphIndex === pIndex)) {
        entry.matches.push({ paragraphIndex: pIndex, text });
      }
    }

    // Also check direct keyword matching in discursos for tag clicks
    const lowerQuery = cleanQuery.toLowerCase();
    this.discursos.forEach((disc) => {
      const tagMatch = disc.palabrasClave.some((k) => k.toLowerCase().includes(lowerQuery));
      const placeMatch = disc.lugar.toLowerCase().includes(lowerQuery);
      const titleMatch = disc.titulo.toLowerCase().includes(lowerQuery);
      const summaryMatch = disc.resumen.toLowerCase().includes(lowerQuery);

      if (tagMatch || placeMatch || titleMatch || summaryMatch) {
        if (!map.has(disc.id)) {
          map.set(disc.id, { matches: [{ paragraphIndex: 0, text: disc.parrafos[0] }], score: 2 });
        }
      }
    });

    const matchedList: Array<{
      discurso: Discurso;
      matches: Array<{ paragraphIndex: number; text: string }>;
      score: number;
    }> = [];

    map.forEach((value, discId) => {
      const disc = this.discursos.find((d) => d.id === discId);
      if (disc) {
        matchedList.push({
          discurso: disc,
          matches: value.matches.sort((a, b) => a.paragraphIndex - b.paragraphIndex),
          score: value.score,
        });
      }
    });

    return matchedList.sort((a, b) => b.score - a.score);
  }
}
