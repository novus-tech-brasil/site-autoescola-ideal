"use client";

import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";

export interface TimedModalSubmitPayload {
  name: string;
  phone: string;
  source: string;
}

interface TimedModalProps {
  open: boolean;
  source: string;
  title: string;
  description: string;
  ctaLabel: string;
  dismissLabel: string;
  directActionLabel?: string;
  onDirectAction?: () => void;
  onClose: () => void;
  onSubmit: (payload: TimedModalSubmitPayload) => void;
}

export default function TimedModal({
  open,
  source,
  title,
  description,
  ctaLabel,
  dismissLabel,
  directActionLabel,
  onDirectAction,
  onClose,
  onSubmit,
}: TimedModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      source,
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-[#020617]/65 p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="editorial-card w-full max-w-md border border-[#0f172a]/25 bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[#0619dd]">Atendimento IDEAL</p>
            <h3 className="mt-2 text-balance text-2xl uppercase leading-none text-[#0c1327]">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded-md border border-[#0f172a]/20 px-2 py-1 text-sm font-bold text-[#0c1327] transition hover:bg-slate-100"
          >
            X
          </button>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-slate-700">{description}</p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">Seu nome</span>
            <input
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-[#0f172a]/20 px-3 py-3 text-sm text-[#0c1327] outline-none transition focus:border-[#0619dd]"
              placeholder="Digite seu nome"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">WhatsApp</span>
            <input
              required
              minLength={10}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-md border border-[#0f172a]/20 px-3 py-3 text-sm text-[#0c1327] outline-none transition focus:border-[#0619dd]"
              placeholder="(17) 99999-9999"
            />
          </label>

          <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#0f172a]/25 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] transition hover:bg-slate-100"
            >
              {dismissLabel}
            </button>
            <button
              type="submit"
              className="rounded-md border border-black bg-[#ffcb00] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffd633]"
            >
              {ctaLabel}
            </button>
          </div>

          {onDirectAction && directActionLabel ? (
            <button
              type="button"
              onClick={onDirectAction}
              className="w-full rounded-md border border-[#0619dd]/30 bg-[#0619dd]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0619dd] transition hover:bg-[#0619dd]/10"
            >
              {directActionLabel}
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}
