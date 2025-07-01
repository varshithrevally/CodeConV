
import React from 'react';
import LanguageSelector from './LanguageSelector';

interface CodePanelProps {
  panelTitle: string;
  language: string;
  onLanguageChange: (language: string) => void;
  code: string;
  onCodeChange?: (code: string) => void;
  isReadOnly?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

const CodePanel: React.FC<CodePanelProps> = ({
  panelTitle,
  language,
  onLanguageChange,
  code,
  onCodeChange,
  isReadOnly = false,
  isLoading = false,
  placeholder,
}) => {
  return (
    <div className="flex flex-col h-full bg-secondary rounded-xl overflow-hidden border border-slate-700 shadow-lg">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-light-text mb-3">{panelTitle}</h2>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={onLanguageChange} />
      </div>
      <div className="flex-grow relative">
        <textarea
          value={code}
          onChange={(e) => onCodeChange && onCodeChange(e.target.value)}
          readOnly={isReadOnly}
          placeholder={placeholder}
          className="w-full h-full p-4 bg-secondary text-light-text font-mono resize-none focus:outline-none leading-relaxed"
          spellCheck="false"
        />
        {isLoading && (
            <div className="absolute inset-0 bg-secondary bg-opacity-75 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    <span className="text-light-text">Translating...</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CodePanel;
