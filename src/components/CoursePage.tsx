'use client';

import React from 'react';
import type { Course } from '../lib/courses';

interface CoursePageProps {
  course: Course;
  whatsappNumber: string;
}

export default function CoursePage({ course, whatsappNumber }: CoursePageProps) {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse no curso de ${course.nome}. Pode me informar mais detalhes?`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#071CF8] text-white py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {course.titulo}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
            {course.subtitulo || course.descricao}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md font-semibold transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Fale Conosco no WhatsApp
          </a>
        </div>
      </section>

      {/* Benefícios */}
      {course.beneficiosDetalhado && course.beneficiosDetalhado.length > 0 && (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
              Benefícios do Curso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {course.beneficiosDetalhado.map((beneficio, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#071CF8]"
                >
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-3xl text-[#071CF8] flex-shrink-0">
                      {beneficio.icone}
                    </span>
                    <p className="text-gray-700 text-lg font-medium">{beneficio.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preço */}
      <section className="bg-gradient-to-r from-[#FFCB00] to-[#E6B800] text-black py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Preço Especial</h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl line-through opacity-75">De {course.precoOriginal}</p>
            <p className="text-5xl md:text-6xl font-bold">{course.preco} á vista</p>
            <p className="text-lg opacity-90">ou {course.parcelado}</p>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      {course.passos && course.passos.length > 0 && (
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {course.passos.map((passo, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#071CF8] text-white rounded-md flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
                    {passo.numero}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Passo {passo.numero}
                  </h3>
                  <p className="text-gray-600">{passo.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Depoimento */}
      {course.depoimento && (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
              Depoimentos
            </h2>
            <div className="bg-white p-8 md:p-12 rounded-md shadow-md">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: course.depoimento.estrelas }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-yellow-400">
                    star
                  </span>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">
                {course.depoimento.texto}
              </p>
              <div className="border-l-4 border-[#071CF8] pl-4">
                <p className="font-semibold text-gray-900">{course.depoimento.autor}</p>
                <p className="text-gray-600">{course.depoimento.profissao}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="bg-[#071CF8] text-white py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Não Perca Tempo!
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Comece sua jornada profissional agora. Inscreva-se no curso de {course.nome}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md font-semibold transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Quero Me Inscrever
          </a>
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Informações Importantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.documentos && (
              <div className="bg-white p-8 rounded-md shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-2xl text-blue-600">
                    description
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Documentos Necessários
                  </h3>
                </div>
                <p className="text-gray-700">{course.documentos}</p>
              </div>
            )}
            {course.validade && (
              <div className="bg-white p-8 rounded-md shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-2xl text-[#071CF8]">
                    schedule
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Validade
                  </h3>
                </div>
                <p className="text-gray-700">{course.validade}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
