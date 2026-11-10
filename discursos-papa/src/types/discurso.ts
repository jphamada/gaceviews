export interface PreguntaFrecuente {
  pregunta: string;
  parrafoRef: number;
}

export interface Discurso {
  id: string;
  titulo: string;
  fecha: string;
  lugar: string;
  audiencia: string;
  resumen: string;
  palabrasClave: string[];
  preguntasFrecuentes: PreguntaFrecuente[];
  parrafos: string[];
}

export interface SearchMatch {
  discurso: Discurso;
  score: number;
  matchedField: 'titulo' | 'resumen' | 'lugar' | 'palabrasClave' | 'parrafos';
  matchedParagraphs: Array<{
    paragraphIndex: number;
    text: string;
  }>;
}

export type ViewMode = 'explorer' | 'reader' | 'thematic-faq' | 'timeline';
