'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/#home", label: "Home" },
    { to: "/#about", label: "About" },
    { to: "/#projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "pt-1" : "pt-3"}`}>
      <div
        className={`container mx-auto transition-all duration-300 ${isScrolled ? "max-w-4xl" : "max-w-7xl"}`}>
        <nav
          className={`flex items-center justify-between px-4 md:px-6 py-2 md:py-3 transition-all duration-300 ${
            isScrolled
              ? "bg-gray-600/80 backdrop-blur-md rounded-full shadow-lg "
              : "bg-transparent"
          }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/engin.png"
              alt="Prosupport Logo"
              className="h-6 md:h-8 w-auto object-contain"
              width={120}
              height={32}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="text-yellow-100 hover:text-primary-teal transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/#services" className="inline-block">
                <button type="button" className="bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent border border-gray-700 px-3 py-1 rounded hover:bg-gray-700 hover:text-white transition-colors">
                    Our Services
                </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-white rounded-xl shadow-lg p-3 animate-fadeUp">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className="text-gray-700 hover:text-primary-teal py-2 rounded-md text-center font-medium"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
                <Link href="/#services" className="w-full" onClick={closeMenu}>
                  <button type="button" className="w-full mt-2 text-gray-800 border border-gray-400 rounded-md px-3 py-2">
                        Our Services
                    </button>
                </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
