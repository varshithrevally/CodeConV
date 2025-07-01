
import React, { useState, useCallback } from 'react';
import CodePanel from './components/CodePanel';
import { convertCode } from './services/geminiService';
import { PROGRAMMING_LANGUAGES } from './constants';

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

const App: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>(PROGRAMMING_LANGUAGES[0]);
  const [targetLanguage, setTargetLanguage] = useState<string>(PROGRAMMING_LANGUAGES[1]);
  const [sourceCode, setSourceCode] = useState<string>('');
  const [translatedCode, setTranslatedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(async () => {
    if (!sourceCode.trim()) {
      setError('Please enter some code to convert.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranslatedCode('');

    try {
      const result = await convertCode(sourceCode, sourceLanguage, targetLanguage);
      setTranslatedCode(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [sourceCode, sourceLanguage, targetLanguage]);

  return (
    <div className="min-h-screen bg-primary text-light-text font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            CodeCon<span className="text-accent">V</span>
          </h1>
          <p className="mt-2 text-dark-text text-lg">
            Convert code snippets between your favorite languages.
          </p>
        </header>

        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6 text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <main className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)] min-h-[500px]">
          <div className="lg:w-1/2 h-full">
            <CodePanel
              panelTitle="Source Code"
              language={sourceLanguage}
              onLanguageChange={setSourceLanguage}
              code={sourceCode}
              onCodeChange={setSourceCode}
              placeholder={`Enter ${sourceLanguage} code here...`}
            />
          </div>

          <div className="flex items-center justify-center my-4 lg:my-0 lg:mx-2">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="bg-accent text-primary font-bold rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-110 hover:bg-sky-400 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              ) : (
                <ArrowRightIcon className="w-8 h-8 lg:w-10 lg:h-10" />
              )}
            </button>
          </div>

          <div className="lg:w-1/2 h-full">
            <CodePanel
              panelTitle="Translated Code"
              language={targetLanguage}
              onLanguageChange={setTargetLanguage}
              code={translatedCode}
              isReadOnly={true}
              isLoading={isLoading}
              placeholder="Translation will appear here..."
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
