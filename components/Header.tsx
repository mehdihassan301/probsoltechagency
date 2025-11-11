import React, { useState, useEffect } from 'react';
import { Page, Theme } from '../types';
import { SunIcon, MoonIcon, SearchIcon } from './Icons';
import SearchModal from './SearchModal';

interface HeaderProps {
  setPage: (page: Page, id?: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const Header: React.FC<HeaderProps> = ({ setPage, theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (page: Page, id?: string) => {
    setPage(page, id);
    setIsMenuOpen(false); // Close menu on navigation
  };
  
  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false); // Close menu if open
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks: { name: Page; label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'Services', label: 'Services' },
    { name: 'Portfolio', label: 'Portfolio' },
    { name: 'Pricing', label: 'Pricing' },
    { name: 'About', label: 'About' },
    { name: 'Blog', label: 'Blog' },
    { name: 'Careers', label: 'Careers' },
    { name: 'Contact', label: 'Contact' },
  ];

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <header className={`premium-header-container ${isMounted ? 'header-animate-in' : ''}`}>
        <div className="premium-header-content">
          <button onClick={() => handleLinkClick('Home')} className="premium-header-logo">
            ProbSolv
          </button>

          <nav className="premium-header-nav">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => handleLinkClick(link.name)} className="premium-header-nav-link">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="premium-header-actions">
            <button
              onClick={handleSearchClick}
              className="search-btn flex"
              aria-label="Search site"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <SunIcon className={`sun-icon ${theme === 'dark' ? 'active' : ''}`} />
              <MoonIcon className={`moon-icon ${theme === 'light' ? 'active' : ''}`} />
            </button>
            <button onClick={() => handleLinkClick('Contact')} className="premium-header-cta">
              Start Project
            </button>
            <button 
              className={`premium-header-hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
        
        <div className={`premium-header-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-menu-nav">
              {navLinks.map((link) => (
                  <button key={link.name} onClick={() => handleLinkClick(link.name)} className="premium-header-nav-link mobile">
                      {link.label}
                  </button>
              ))}
          </nav>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} navigateTo={handleLinkClick} />
    </>
  );
};