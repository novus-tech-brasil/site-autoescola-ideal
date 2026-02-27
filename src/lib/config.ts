/**
 * Configuração da Autoescola Ideal
 * Personalize os valores abaixo com suas informações
 */

export const COMPANY_CONFIG = {
  // Informações da Autoescola
  name: 'Auto Escola Ideal',
  fullName: 'Auto Escola Ideal Jales',
  tagline: 'Cursos especializados de direção defensiva, transporte seguro e permissão de motorista.',
  website: 'https://autoescolaidealjales.com.br',

  // Contato
  whatsapp: '18999999999', // Substituir com número real (sem espaços, sem +55)
  phone: '+55 (18) 9999-9999',
  email: 'contato@autoescolaidealjales.com.br',

  // Endereço
  address: {
    street: 'Centro, 2264',
    city: 'Jales',
    state: 'SP',
    zipCode: '15700-000',
    country: 'BR',
    coords: {
      lat: -20.271587,
      lng: -50.5503057,
    },
  },

  // Horários de funcionamento (em formato 24h)
  businessHours: [
    {
      day: 'Monday-Friday',
      open: '08:00',
      close: '18:00',
    },
    {
      day: 'Saturday',
      open: '08:00',
      close: '12:00',
    },
    {
      day: 'Sunday',
      open: 'Closed',
      close: 'Closed',
    },
  ],

  // Cores da marca
  colors: {
    primary: '#0066CC', // Azul
    secondary: '#FF8C00', // Laranja/Âmbar
    success: '#22C55E', // Verde (WhatsApp)
    danger: '#EF4444', // Vermelho
  },

  // Redes Sociais
  social: {
    whatsapp: 'https://wa.me/18999999999',
    facebook: 'https://facebook.com/autoescolaidealjales',
    instagram: 'https://instagram.com/autoescolaidealjales',
  },

  // Mensagens padrão para WhatsApp
  whatsappMessages: {
    general: 'Olá! Gostaria de saber mais sobre os cursos da Autoescola Ideal.',
    courseName: (courseName: string) =>
      `Olá! Tenho interesse no curso de ${courseName}. Pode me informar mais detalhes?`,
    enrollment: (courseName: string) =>
      `Olá! Gostaria de me inscrever no curso de ${courseName}.`,
  },
};

export const getWhatsappLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodedMessage}`;
};

export const getWhatsappCourseLink = (courseName: string): string => {
  return getWhatsappLink(COMPANY_CONFIG.whatsappMessages.courseName(courseName));
};
