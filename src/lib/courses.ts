export interface Course {
  id: string;
  nome: string;
  titulo: string;
  descricao: string;
  preco: string;
  precoOriginal: string;
  parcelado: string;
  icone: string;
  img: string;
  cor: "primary" | "secondary";
  link: string;
  beneficios: string[];
  // Para página individual
  subtitulo?: string;
  beneficiosDetalhado?: {
    icone: string;
    texto: string;
  }[];
  passos?: {
    numero: string;
    texto: string;
  }[];
  depoimento?: {
    texto: string;
    autor: string;
    profissao: string;
    estrelas: number;
  };
  documentos?: string;
  validade?: string;
}

export const courses: Course[] = [
  {
    id: "mopp",
    nome: "MOPP",
    titulo: "Transporte de Produtos Perigosos",
    descricao: "Curso obrigatório para motoristas que desejam transportar produtos perigosos conforme a legislação vigente, com foco em prevenção de riscos e condução segura.",
    preco: "R$ 285,99",
    precoOriginal: "R$ 380,00",
    parcelado: "12x de R$ 31,66",
    icone: "local_shipping",
    img: "/cursos/mopp.webp",
    cor: "primary",
    link: "/cursos/mopp",
    beneficios: [
      "Atende às exigências legais",
      "Atualização sobre normas e sinalização",
      "Boas práticas de prevenção de acidentes"
    ],
    subtitulo: "Capacitação técnica para transporte de cargas perigosas",
    beneficiosDetalhado: [
      { icone: "verified", texto: "Formação exigida para transporte de produtos perigosos" },
      { icone: "school", texto: "Conteúdo alinhado às normas atuais" },
      { icone: "schedule", texto: "Turmas organizadas para facilitar sua rotina" }
    ],
    passos: [
      { numero: "1", texto: "Realize sua inscrição online ou presencialmente" },
      { numero: "2", texto: "Participe das aulas teóricas conforme cronograma" },
      { numero: "3", texto: "Aprovação na avaliação para emissão do certificado" }
    ],
    depoimento: {
      texto: "Curso bem organizado e direto ao ponto. Esclareceu pontos importantes da legislação que eu não dominava.",
      autor: "Carlos Silva",
      profissao: "Motorista Rodoviário",
      estrelas: 5
    },
    documentos: "CNH e E-mail",
    validade: "Atualmente, vitalicia, mas recomenda-se reciclagem a cada 5 anos"
  },
  {
    id: "transporte-escolar",
    nome: "Transporte Escolar",
    titulo: "Especialização em Transporte de Crianças",
    descricao: "Especialização obrigatória para condutores que atuam no transporte escolar, com foco em segurança, legislação e responsabilidade profissional.",
    preco: "R$ 285,99",
    precoOriginal: "R$ 380,00",
    parcelado: "12x de R$ 31,66",
    icone: "directions_bus",
    img: "/cursos/escolar.webp",
    cor: "secondary",
    link: "/cursos/transporte-escolar",
    beneficios: [
      "Exigência legal para transporte escolar",
      "Atualização sobre normas de segurança",
      "Conduta profissional no transporte de crianças"
    ],
    subtitulo: "Formação específica para atuação no transporte escolar",
    beneficiosDetalhado: [
      { icone: "shield", texto: "Diretrizes de segurança no transporte infantil" },
      { icone: "gavel", texto: "Atualização sobre exigências legais" },
      { icone: "people", texto: "Postura profissional no atendimento a alunos e responsáveis" }
    ],
    passos: [
      { numero: "1", texto: "Inscrição com documentação de motorista" },
      { numero: "2", texto: "Participação nas aulas conforme cronograma" },
      { numero: "3", texto: "Certificação após aprovação nas avaliações" }
    ],
    depoimento: {
      texto: "Aprendi detalhes importantes sobre responsabilidade e legislação. Curso essencial para quem trabalha na área.",
      autor: "Mariana Costa",
      profissao: "Condutora de Transporte Escolar",
      estrelas: 5
    },
    documentos: "CNH e E-mail",
    validade: "Atualmente, vitalicia, mas recomenda-se reciclagem a cada 5 anos"
  },
  {
    id: "transporte-coletivo",
    nome: "Transporte Coletivo",
    titulo: "Especialização em Transporte de Passageiros",
    descricao: "Curso de especialização para motoristas que atuam no transporte coletivo de passageiros, com foco em direção defensiva e responsabilidade no transporte público.",
    preco: "R$ 285,99",
    precoOriginal: "R$ 380,00",
    parcelado: "12x de R$ 31,66",
    icone: "directions_bus",
    img: "/cursos/coletivo.webp",
    cor: "secondary",
    link: "/cursos/transporte-coletivo",
    beneficios: [
      "Exigência para atuação no transporte coletivo",
      "Atualização em normas de trânsito",
      "Direção preventiva e segura"
    ],
    subtitulo: "Capacitação para transporte coletivo de passageiros",
    beneficiosDetalhado: [
      { icone: "shield", texto: "Boas práticas para transporte seguro de passageiros" },
      { icone: "gavel", texto: "Conhecimento das obrigações legais do condutor" },
      { icone: "people", texto: "Postura profissional no atendimento ao público" }
    ],
    passos: [
      { numero: "1", texto: "Inscrição com documentação exigida" },
      { numero: "2", texto: "Participação nas aulas teóricas" },
      { numero: "3", texto: "Certificação após aprovação final" }
    ],
    depoimento: {
      texto: "Conteúdo claro e objetivo. Reforçou pontos importantes para quem trabalha com passageiros diariamente.",
      autor: "Mariana Costa",
      profissao: "Motorista de Transporte Coletivo",
      estrelas: 5
    },
    documentos: "CNH e E-mail",
    validade: "Atualmente, vitalicia, mas recomenda-se reciclagem a cada 5 anos"
  },
  {
    id: "transporte-cargas-indivisiveis",
    nome: "Transporte de Cargas Indivisíveis",
    titulo: "Especialização em Cargas Especiais",
    descricao: "Curso voltado para motoristas que desejam atuar no transporte de cargas indivisíveis, abordando regulamentação específica e condução segura em situações especiais.",
    preco: "R$ 285,99",
    precoOriginal: "R$ 380,00",
    parcelado: "12x de R$ 31,66",
    icone: "precision_manufacturing",
    img: "/cursos/indivisivel.webp",
    cor: "secondary",
    link: "/cursos/transporte-cargas-indivisiveis",
    beneficios: [
      "Qualificação exigida para cargas especiais",
      "Conhecimento técnico específico",
      "Atualização sobre regulamentação"
    ],
    subtitulo: "Especialização para transporte de cargas especiais",
    beneficiosDetalhado: [
      { icone: "verified", texto: "Atende às exigências para transporte de cargas indivisíveis" },
      { icone: "precision_manufacturing", texto: "Orientações técnicas para condução segura" },
      { icone: "gavel", texto: "Atualização sobre normas aplicáveis" }
    ],
    passos: [
      { numero: "1", texto: "Pré-requisito: CNH categoria C, D ou E" },
      { numero: "2", texto: "Aulas teóricas conforme regulamentação" },
      { numero: "3", texto: "Aprovação final para emissão do certificado" }
    ],
    depoimento: {
      texto: "Curso técnico e bem estruturado. Esclareceu dúvidas importantes sobre regulamentação.",
      autor: "Roberto Neves",
      profissao: "Motorista de Cargas Especiais",
      estrelas: 5
    },
    documentos: "CNH e E-mail",
    validade: "Atualmente, vitalicia, mas recomenda-se reciclagem a cada 5 anos"
  },
  {
    id: "transporte-emergencial",
    nome: "Transporte Emergencial",
    titulo: "Segurança e Procedimentos em Emergências",
    descricao: "Curso destinado a condutores de veículos de emergência, com foco em direção segura, responsabilidade profissional e procedimentos básicos em situações críticas.",
    preco: "R$ 285,99",
    precoOriginal: "R$ 380,00",
    parcelado: "12x de R$ 31,66",
    icone: "emergency",
    img: "/cursos/emergencia.webp",
    cor: "primary",
    link: "/cursos/transporte-emergencial",
    beneficios: [
      "Capacitação para condução de emergência",
      "Noções básicas de primeiros socorros",
      "Direção segura em situações especiais"
    ],
    subtitulo: "Formação para atuação no transporte emergencial",
    beneficiosDetalhado: [
      { icone: "favorite", texto: "Noções fundamentais de primeiros socorros" },
      { icone: "local_hospital", texto: "Procedimentos básicos no transporte hospitalar" },
      { icone: "verified_user", texto: "Capacitação conforme exigências da categoria" }
    ],
    passos: [
      { numero: "1", texto: "Inscrição com documentação exigida" },
      { numero: "2", texto: "Capacitação conforme cronograma do curso" },
      { numero: "3", texto: "Certificação após avaliação final" }
    ],
    depoimento: {
      texto: "Curso sério e objetivo. Reforça a responsabilidade necessária para atuar em situações emergenciais.",
      autor: "Lucas Martins",
      profissao: "Condutor de Veículo de Emergência",
      estrelas: 5
    },
    documentos: "CNH e E-mail",
    validade: "5 anos com reciclagem obrigatória"
  }
];

export const getCourseBySlugs = (slug: string): Course | undefined => {
  return courses.find((course) => course.id === slug);
};
