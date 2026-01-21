import React, { useState } from 'react';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [formAberto, setFormAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const abrirForm = () => {
    setFormAberto(true);
    document.body.style.overflow = 'hidden';
  };

  const fecharForm = () => {
    setFormAberto(false);
    document.body.style.overflow = '';
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
    <>
      <nav className="flex flex-col gap-4 w-screen p-3 justify-between px-20  items-center bg-white z-50 fixed">
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
          <div className="flex flex-col bg-white w-screen p-5 gap-3 items-center">
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
              className="bg-blue-600 flex text-white py-2 px-4 rounded-full font-semibold gap-4 justify-center items-center hover:bg-blue-900 transition duration-300 cursor-pointer" 
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
    </>
  );
}
