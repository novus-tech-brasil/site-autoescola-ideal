"use client";

import React, { useEffect, useMemo, useState } from "react";

type Variant = "A" | "B";

const VARIANT_STORAGE_KEY = "ideal_ab_variant_v1";

const CONTENT_A = [
  "+ de 1.000 alunos atendidos em Jales e regiao",
  "Instrutores qualificados e atendimento rapido",
  "Simulacao de plano em menos de 2 minutos",
  "Suporte do inicio ate o exame pratico",
];

const CONTENT_B = [
  "Vagas da semana com atendimento prioritario",
  "Plano personalizado para carro, moto ou ambos",
  "Equipe responde no WhatsApp em poucos minutos",
  "Processo guiado para voce avancar com seguranca",
];

function getOrCreateVariant(): Variant {
  if (typeof window === "undefined") {
    return "A";
  }

  const cached = window.localStorage.getItem(VARIANT_STORAGE_KEY);
  if (cached === "A" || cached === "B") {
    return cached;
  }

  const generated: Variant = Math.random() > 0.5 ? "A" : "B";
  window.localStorage.setItem(VARIANT_STORAGE_KEY, generated);
  return generated;
}

export default function ScrollingBanner() {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    setVariant(getOrCreateVariant());
  }, []);

  const items = useMemo(() => {
    return variant === "A" ? CONTENT_A : CONTENT_B;
  }, [variant]);

  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <section
      className="relative z-20 w-full border-y border-[#0f172a]/15 bg-white"
      aria-label="Beneficios e avisos"
      data-ab-variant={variant}
    >
      <div className="overflow-hidden w-full">
        <div className="marquee-track flex min-w-max items-center py-2.5 md:py-3" role="presentation">
          {duplicatedItems.map((item, index) => (
            <div key={`${item}-${index}`} className="mx-1.5 flex items-center gap-1.5 md:mx-3 md:gap-2">
              <span className="rounded-full border border-[#0f172a]/20 bg-[#ffcb00] px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.11em] text-black md:text-[0.68rem]">
                IDEAL
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-[#0c1327] md:text-[0.84rem]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
