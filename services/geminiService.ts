
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const convertCode = async (
  sourceCode: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  if (!sourceCode.trim()) {
    return "";
  }
  
  const prompt = `Translate the following code from ${sourceLanguage} to ${targetLanguage}.
  Only provide the raw code as the output, without any explanation, comments about the translation, or markdown formatting.
  Do not include the language name in a markdown block.
  
  Here is the ${sourceLanguage} code:
  \`\`\`${sourceLanguage.toLowerCase()}
  ${sourceCode}
  \`\`\`
  
  Provide only the ${targetLanguage} code.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
    
    let translatedText = response.text.trim();
    const fenceRegex = /^```(?:\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = translatedText.match(fenceRegex);
    if (match && match[1]) {
        translatedText = match[1].trim();
    }
    
    return translatedText;
  } catch (error) {
    console.error("Error converting code:", error);
    throw new Error("Failed to convert code. Please check your API key and network connection.");
  }
};
