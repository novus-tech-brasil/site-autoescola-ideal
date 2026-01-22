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
        navbar?.classList.remove("w-[90%]", "mt-5", "rounded-2xl");
        navbar?.classList.add("w-screen", "mt-0", "shadow-lg", "transition-all", "duration-300");
      }else {
        navbar?.classList.add("w-[90%]", "mt-5", "rounded-2xl");
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
  ];

  const desktopLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#sobre', label: 'Sobre' },
    { href: '/planos', label: 'Planos' },
    { href: '/#endereco', label: 'Endereço' },
  ];

  return (
    <div className='w-screen flex justify-center'>
      <nav id='navbar' className="flex flex-col gap-4 w-[90%] mt-5 p-3 rounded-2xl justify-between px-20  items-center bg-white z-50 fixed">
        <div className="flex gap-4 w-full justify-between items-center">
          {/* Logo */}
          <img 
            src={Logo.src} 
            height="50" 
            width="50" 
            className="rounded-full" 
            alt="Logo Autoescola Ideal"
          />

          {/* Menu Desktop */}
          <div className="gap-5 hidden lg:flex">
            {desktopLinks.map((link) => (
              <div key={link.href} className="group">
                <a className="cursor-pointer" href={link.href}>
                  {link.label}
                </a>
                <div className="w-0 h-1 bg-blue-700 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Botão Área do Aluno (Desktop) */}
          <a 
            className="bg-blue-600 text-white py-2 px-4 rounded-full font-semibold gap-4 justify-center items-center hover:bg-blue-900 transition duration-300 cursor-pointer hidden lg:flex" 
            href="https://novuscfc.app.br/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Área do Aluno
            <span className="material-symbols-outlined">contacts_product</span>
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
          <div className="flex flex-col bg-white w-[90%] p-5 gap-3 items-center">
            <div className="group">
              <a 
                className="cursor-pointer" 
                href="/"
                onClick={fecharMenu}
              >
                Inicio
              </a>
              <div className="w-0 h-1 bg-blue-700 group-hover:w-full transition-all duration-300"></div>
            </div>

            {menuLinks.map((link) => (
              <div key={link.href} className="group">
                <a 
                  className="cursor-pointer" 
                  href={link.href}
                  onClick={fecharMenu}
                >
                  {link.label}
                </a>
                <div className="w-0 h-1 bg-blue-700 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}

            <a 
              className="bg-blue-600 w-full flex text-white py-2 px-4 rounded-full font-semibold gap-4 justify-center items-center hover:bg-blue-900 transition duration-300 cursor-pointer text-[13px] min-w-[200px]" 
              href="https://novuscfc.app.br/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Área do Aluno
              <span className="material-symbols-outlined">contacts_product</span>
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
