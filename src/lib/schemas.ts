import type { Course } from './courses';

export const generateCourseSchema = (
  course: Course,
  baseUrl: string = 'https://autoescolaidealjales.com.br'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.titulo,
    description: course.descricao,
    image: `${baseUrl}${course.img}`,
    url: `${baseUrl}${course.link}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: course.preco.replace(/[^\d.]/g, '').replace('.', ''),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.depoimento?.estrelas || 5,
      ratingCount: 1,
    },
    provider: {
      '@type': 'Organization',
      name: 'Auto Escola Ideal',
      url: baseUrl,
    },
  };
};

export const generateCoursesListSchema = (
  courses: Course[],
  baseUrl: string = 'https://autoescolaidealjales.com.br'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.titulo,
      url: `${baseUrl}${course.link}`,
      image: `${baseUrl}${course.img}`,
    })),
  };
};

export const generateLocalBusinessSchema = (
  baseUrl: string = 'https://autoescolaidealjales.com.br'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Auto Escola Ideal Jales',
    image: `${baseUrl}/logo.png`,
    description: 'Auto Escola Ideal em Jales - Cursos especializados de direção defensiva, transporte seguro e permissão de motorista.',
    url: baseUrl,
    telephone: '+5518999999999', // Ajustar com número real
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Centro, 2264',
      addressLocality: 'Jales',
      addressRegion: 'SP',
      postalCode: '15700-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.271587,
      longitude: -50.5503057,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '12:00',
      },
    ],
  };
};
