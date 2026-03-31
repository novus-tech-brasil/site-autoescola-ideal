"use client";
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import ScrollingBanner from "./ScrollingBanner";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [navbarCompacta, setNavbarCompacta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarCompacta(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const menuLinks = [
    { href: "/#sobre", label: "Sobre" },
    { href: "/planos", label: "Planos" },
    { href: "/#endereco", label: "Endereco" },
    { href: "/cursos", label: "Cursos" },
  ];

  const desktopLinks = [
    { href: "/", label: "Inicio" },
    { href: "/#sobre", label: "Sobre" },
    { href: "/planos", label: "Planos" },
    { href: "/#endereco", label: "Endereco" },
    { href: "/cursos", label: "Cursos" },
  ];

  return (
    <header className="site-nav fixed top-0 z-50 w-full bg-[#050f93] text-white transition-all duration-300">
      <div
        className={`mx-auto flex w-full max-w-[1180px] flex-col px-3 sm:px-4 md:px-5 lg:px-6 ${navbarCompacta ? "py-2.5" : "py-3"}`}
      >
        <div className="flex w-full items-center justify-between gap-3">
          <a href="/" className="min-w-0 flex items-center gap-2 sm:gap-3" aria-label="Ir para o inicio">
            <img
              src={Logo.src}
              height="46"
              width="46"
              className="h-10 w-10 rounded-md border border-white/15 sm:h-[46px] sm:w-[46px]"
              alt="Logo Autoescola Ideal"
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-[0.58rem] uppercase tracking-[0.18em] text-white/95 sm:text-[0.67rem]">
                Autoescola
              </span>
              <span className="truncate font-['Space_Grotesk'] text-sm leading-none tracking-wide sm:text-lg">
                IDEAL JALES
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegacao principal">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                className="text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:text-[#ffcb00]"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="hidden items-center gap-2 border border-black bg-[#ffcb00] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffd633] lg:inline-flex"
            href="https://novuscfc.app.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Area do Aluno
            <span className="material-symbols-outlined text-base">contacts_product</span>
          </a>

          <button
            className="group shrink-0 rounded-md border border-white/25 px-2.5 py-2 lg:hidden"
            id="btn-hamburguer"
            onClick={toggleMenu}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            <span
              className={`material-symbols-outlined transition duration-300 ${menuAberto ? "rotate-90 text-[#ffcb00]" : "text-white"}`}
              id="iconeMenu"
            >
              dehaze
            </span>
          </button>
        </div>

        {menuAberto && (
          <div className="mt-3 flex flex-col gap-3 rounded-lg border border-white/20 bg-[#0914a8] p-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.7)] lg:hidden">
            <div className="w-full border-b border-white/15 pb-3">
              <a
                className="block py-1 text-sm font-semibold uppercase tracking-[0.08em] text-white"
                href="/"
                onClick={fecharMenu}
              >
                Inicio
              </a>
            </div>

            {menuLinks.map((link) => (
              <div key={link.href} className="w-full border-b border-white/15 pb-3 last:border-b-0 last:pb-0">
                <a
                  className="block py-1 text-sm font-semibold uppercase tracking-[0.08em] text-white"
                  href={link.href}
                  onClick={fecharMenu}
                >
                  {link.label}
                </a>
              </div>
            ))}

            <a
              className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-black bg-[#ffcb00] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[#ffd633]"
              href="https://novuscfc.app.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Area do Aluno
              <span className="material-symbols-outlined text-base">contacts_product</span>
            </a>
          </div>
        )}
      </div>
      <ScrollingBanner />
    </header>
  );
}
