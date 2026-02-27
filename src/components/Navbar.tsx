"use client"
import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [formAberto, setFormAberto] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (window.scrollY > 0){
        navbar?.classList.remove("w-[90%]", "mt-5", "rounded-md");
        navbar?.classList.add("w-screen", "mt-0", "shadow-lg", "transition-all", "duration-300");
      }else {
        navbar?.classList.add("w-[90%]", "mt-5", "rounded-md");
        navbar?.classList.remove("w-screen", "mt-0", "shadow-lg");
      }
    }
    window.addEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const menuLinks = [
    { href: '/#sobre', label: 'Sobre' },
    { href: '/planos', label: 'Planos' },
    { href: '/#endereco', label: 'Endereço' },
    { href: '/cursos', label: 'Cursos' },
  ];

  const desktopLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#sobre', label: 'Sobre' },
    { href: '/planos', label: 'Planos' },
    { href: '/#endereco', label: 'Endereço' },
    { href: '/cursos', label: 'Cursos' },
  ];

  return (
    <div className='w-screen flex justify-center'>
      <nav id='navbar' className="flex flex-col gap-4 w-[90%] mt-5 p-4 rounded-lg justify-between px-6 lg:px-10 items-center bg-white z-50 fixed border border-gray-200 transition-all duration-300">
        <div className="flex gap-4 w-full justify-between items-center">
          {/* Logo */}
          <img 
            src={Logo.src} 
            height="45" 
            width="45" 
            className="rounded-lg" 
            alt="Logo Autoescola Ideal"
          />

          {/* Menu Desktop */}
          <div className="gap-8 hidden lg:flex items-center">
            {desktopLinks.map((link) => (
              <div key={link.href} className="group relative">
                <a className="cursor-pointer text-gray-700 font-medium text-sm transition-colors duration-300 hover:text-[#071CF8]" href={link.href}>
                  {link.label}
                </a>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f59e0b] group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Botão Área do Aluno (Desktop) */}
          <a 
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white bg-[#071CF8] hover:bg-[#041092] transition-colors duration-300" 
            href="https://novuscfc.app.br/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Área do Aluno
            <span className="material-symbols-outlined text-base">contacts_product</span>
          </a>

          {/* Botão Hamburger (Mobile) */}
          <button 
            className="group lg:hidden" 
            id="btn-hamburguer"
            onClick={toggleMenu}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            <span
              className={`material-symbols-outlined cursor-pointer transition duration-300 ${
                menuAberto ? 'rotate-90' : ''
              }`}
              id="iconeMenu"
            >
              dehaze
            </span>
          </button>
        </div>

        {/* Menu Mobile */}
        {menuAberto && (
          <div className="flex flex-col bg-white w-[90%] p-6 gap-4 items-center rounded-lg border border-gray-200">
            <div className="group relative w-full">
              <a 
                className="cursor-pointer text-gray-700 font-medium text-sm transition-colors duration-300 hover:text-[#0f3a7d]" 
                href="/"
                onClick={fecharMenu}
              >
                Inicio
              </a>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f59e0b] group-hover:w-full transition-all duration-300"></div>
            </div>

            {menuLinks.map((link) => (
              <div key={link.href} className="group relative w-full">
                <a 
                  className="cursor-pointer text-gray-700 font-medium text-sm transition-colors duration-300 hover:text-[#071CF8]" 
                  href={link.href}
                  onClick={fecharMenu}
                >
                  {link.label}
                </a>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f59e0b] group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}

            <a 
              className="bg-[#071CF8] w-full flex text-white py-2.5 px-4 rounded-lg font-semibold gap-2 justify-center items-center hover:bg-[#041092] transition-colors duration-300 text-sm" 
              href="https://novuscfc.app.br/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Área do Aluno
              <span className="material-symbols-outlined text-base">contacts_product</span>
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
