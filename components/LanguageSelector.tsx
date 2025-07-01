
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PROGRAMMING_LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (language: string) => {
    onSelectLanguage(language);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  
  const filteredLanguages = PROGRAMMING_LANGUAGES.filter(lang => 
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-secondary text-light-text px-4 py-2 rounded-md flex justify-between items-center transition duration-200 hover:bg-slate-600"
      >
        <span>{selectedLanguage}</span>
        <ChevronDownIcon className={`w-5 h-5 text-dark-text transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-secondary rounded-md shadow-lg border border-slate-600 max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary text-light-text px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </div>
          <ul className="py-1">
            {filteredLanguages.map(lang => (
              <li
                key={lang}
                onClick={() => handleSelect(lang)}
                className="px-4 py-2 text-light-text hover:bg-slate-600 cursor-pointer"
              >
                {lang}
              </li>
            ))}
            {filteredLanguages.length === 0 && (
                <li className="px-4 py-2 text-dark-text text-center">No language found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
