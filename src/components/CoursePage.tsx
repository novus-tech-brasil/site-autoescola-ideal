'use client';

import React from 'react';
import type { Course } from '../lib/courses';

interface CoursePageProps {
  course: Course;
  whatsappNumber: string;
}

export default function CoursePage({ course, whatsappNumber }: CoursePageProps) {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ola! Tenho interesse no curso de ${course.nome}. Pode me informar mais detalhes?`;

  return (
    <div className="w-full">
      <section className="material-hero py-14 md:py-18">
        <div className="section-wrap grid grid-cols-1 gap-4 lg:grid-cols-12">
          <article className="editorial-card col-span-1 bg-[#050f93] p-5 text-white sm:p-6 md:p-9 lg:col-span-8">
            <p className="eyebrow text-[#ffcb00]">Curso Profissionalizante</p>
            <h1 className="headline-lg mt-4 text-balance text-white">{course.titulo}</h1>
            <p className="copy-limit text-pretty mb-0 mt-4 text-base leading-relaxed text-white/95 md:text-lg">
              {course.subtitulo || course.descricao}
            </p>
          </article>

          <aside className="editorial-card col-span-1 flex flex-col justify-between bg-[#ffcb00] p-5 text-black sm:p-6 md:p-9 lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Atendimento</p>
            <p className="mt-2 text-balance text-2xl uppercase leading-tight">
              Tire duvidas e reserve sua vaga agora.
            </p>
            <a
              href={whatsappLink}
              data-lead-action="open-modal"
              data-lead-source={`curso-header-${course.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-black bg-black px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.09em] text-white transition hover:bg-[#1f2937] sm:w-auto"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
              Fale no WhatsApp
            </a>
          </aside>
        </div>
      </section>

      {course.beneficiosDetalhado && course.beneficiosDetalhado.length > 0 && (
        <section className="material-surface-strong py-14 md:py-18">
          <div className="section-wrap">
            <h2 className="mb-10 text-balance text-center text-3xl uppercase leading-none text-[#0c1327] md:text-4xl">
              Beneficios do Curso
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {course.beneficiosDetalhado.map((beneficio, index) => (
                <div key={index} className="editorial-card border-l-4 border-[#0619dd] bg-white p-5 sm:p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined shrink-0 text-3xl text-[#0619dd]">
                      {beneficio.icone}
                    </span>
                    <p className="text-pretty text-base font-medium text-slate-700 md:text-lg">{beneficio.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#ffcb00] py-14 text-black md:py-18">
        <div className="section-wrap text-center">
          <h2 className="mb-8 text-balance text-3xl uppercase leading-none md:text-4xl">
            Preco Especial
          </h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl opacity-70 line-through md:text-2xl">De {course.precoOriginal}</p>
            <p className="break-words text-center text-4xl uppercase sm:text-5xl md:text-6xl">
              {course.preco} a vista
            </p>
            <p className="text-base text-black md:text-lg">ou {course.parcelado}</p>
          </div>
        </div>
      </section>

      {course.passos && course.passos.length > 0 && (
        <section className="material-surface py-14 md:py-18">
          <div className="section-wrap">
            <h2 className="mb-10 text-balance text-center text-3xl uppercase leading-none text-[#0c1327] md:text-4xl">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {course.passos.map((passo, index) => (
                <div key={index} className="editorial-card flex flex-col items-center bg-white p-5 text-center sm:p-6 md:p-7">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md border border-black bg-[#ffcb00] text-3xl font-bold text-black">
                    {passo.numero}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.08em] text-[#0c1327]">
                    Passo {passo.numero}
                  </h3>
                  <p className="text-pretty text-slate-600">{passo.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {course.depoimento && (
        <section className="material-surface-strong py-14 md:py-18">
          <div className="section-wrap max-w-4xl">
            <h2 className="mb-10 text-balance text-center text-3xl uppercase leading-none text-[#0c1327] md:text-4xl">
              Depoimentos
            </h2>
            <div className="editorial-card bg-white p-5 sm:p-6 md:p-12">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: course.depoimento.estrelas }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[#8a5a00]">
                    star
                  </span>
                ))}
              </div>
              <p className="mb-6 text-base italic text-slate-700 md:text-lg">{course.depoimento.texto}</p>
              <div className="border-l-4 border-[#0619dd] pl-4">
                <p className="font-semibold text-[#0c1327]">{course.depoimento.autor}</p>
                <p className="text-slate-600">{course.depoimento.profissao}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="material-hero py-14 md:py-18">
        <div className="section-wrap text-center">
          <h2 className="mb-6 text-balance text-3xl uppercase leading-none text-white md:text-4xl">
            Nao Perca Tempo!
          </h2>
          <p className="copy-limit text-pretty mx-auto mb-8 text-base text-white/95 md:text-xl">
            Comece sua jornada profissional agora. Inscreva-se no curso de {course.nome}
          </p>
          <a
            href={whatsappLink}
            data-lead-action="open-modal"
            data-lead-source={`curso-final-${course.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-black bg-[#ffcb00] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.09em] text-black transition hover:bg-[#ffd633] sm:w-auto sm:px-7"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Quero Me Inscrever
          </a>
        </div>
      </section>

      <section className="material-surface py-14 md:py-18">
        <div className="section-wrap">
          <h2 className="mb-10 text-balance text-center text-3xl uppercase leading-none text-[#0c1327] md:text-4xl">
            Informacoes Importantes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {course.documentos && (
              <div className="editorial-card bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#0619dd]">description</span>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#0c1327]">
                    Documentos Necessarios
                  </h3>
                </div>
                <p className="text-slate-700">{course.documentos}</p>
              </div>
            )}
            {course.validade && (
              <div className="editorial-card bg-white p-5 sm:p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#0619dd]">schedule</span>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#0c1327]">
                    Validade
                  </h3>
                </div>
                <p className="text-slate-700">{course.validade}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
