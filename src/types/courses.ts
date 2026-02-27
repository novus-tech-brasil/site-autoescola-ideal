/**
 * Tipos e Interfaces para o Sistema de Cursos
 */

export interface CourseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CoursePricing {
  current: string;
  original: string;
  installments: string;
  currency: 'BRL'; // Futuro: expandir para outras moedas
}

export interface CourseIcon {
  name: string;
  category: 'transportation' | 'safety' | 'efficiency' | 'skills' | 'other';
}

export interface CourseBenefit {
  icon: string;
  text: string;
}

export interface CourseStep {
  number: string;
  text: string;
}

export interface CourseTestimonial {
  text: string;
  author: string;
  profession: string;
  stars: number; // 1-5
  date?: string; // ISO 8601 format
}

export interface CourseFile {
  title: string;
  content: string;
  icon: string;
}

export interface CourseSchedule {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  maxStudents: number;
}

export interface Course {
  // Identificação
  id: string; // slug único
  nome: string; // Título curto (até 25 caracteres)
  titulo: string; // Descrição longa completa
  descricao: string; // Resumo para a listagem (1-2 linhas)

  // Preço
  preco: string;
  precoOriginal: string;
  parcelado: string;

  // Imagem e Ícone
  img: string; // Caminho WebP relativo (/cursos/...)
  icone: string; // Nome do ícone Material Symbols
  cor: 'primary' | 'secondary';

  // Navegação
  link: string; // Rota da página individual
  beneficios: string[]; // Array com 3 benefícios principais para card

  // Página Individual (Opcional)
  subtitulo?: string;
  beneficiosDetalhado?: CourseBenefit[];
  passos?: CourseStep[];
  depoimento?: CourseTestimonial;
  documentos?: string;
  validade?: string;
  duracao?: string; // ex: "32 horas"
  maximoAlunos?: number;
  prerequisitos?: string[];
  resultadosEsperados?: string[];
  instrutores?: Array<{
    name: string;
    specialization: string;
    image?: string;
  }>;
  cronograma?: CourseSchedule[];
}

/**
 * Enums para Tipagem
 */

export enum CourseColor {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum IconCategory {
  Transportation = 'transportation',
  Safety = 'safety',
  Efficiency = 'efficiency',
  Skills = 'skills',
  Other = 'other',
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  filtered: boolean;
}

export interface CourseFilter {
  color?: CourseColor;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}

/**
 * Tipos para SEO
 */

export interface CourseSchemaMarkup {
  '@context': string;
  '@type': 'Course';
  name: string;
  description: string;
  image: string;
  url: string;
  offers: {
    '@type': 'Offer';
    priceCurrency: 'BRL';
    price: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
  };
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  educationalLevel?: string;
  learningResourceType?: string[];
}

export interface LocalBusinessSchemaMarkup {
  '@context': string;
  '@type': 'LocalBusiness';
  name: string;
  image: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
}

/**
 * Tipos para WhatsApp
 */

export interface WhatsAppConfig {
  number: string; // Sem +55, sem espaços
  defaultMessage: string;
  courseMessages: {
    [courseId: string]: string;
  };
}

export interface WhatsAppLink {
  url: string;
  message: string;
  preFilledText: boolean;
}

/**
 * Tipos para Props de Componentes
 */

export interface CourseCardProps {
  course: Course;
  showCTA?: boolean;
  variant?: 'grid' | 'list';
}

export interface CoursePageProps {
  course: Course;
  whatsappNumber: string;
}

export interface CourseListProps {
  courses: Course[];
  columns?: number;
  showFilter?: boolean;
}

/**
 * Utility Types
 */

export type CourseWithPartial = Partial<Course>;

export type CourseID = Course['id'];

export interface PaginatedCourses {
  data: Course[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Tipos de Resposta de API (Futuro)
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    timestamp: string;
    duration: number;
  };
}
