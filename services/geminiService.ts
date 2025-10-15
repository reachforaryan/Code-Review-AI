
import { GoogleGenAI } from "@google/genai";
import { FileContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getFileExtension = (filename: string): string => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

const buildPrompt = (files: FileContent[]): string => {
  const codeBlocks = files.map(file => {
    const language = getFileExtension(file.name);
    return `
---
**File: ${file.name}**
\`\`\`${language}
${file.content}
\`\`\`
---
    `;
  }).join('\n');

  return `
Please review the following code file(s).

Analyze the code for readability, modularity, potential bugs, and adherence to best practices.

Provide a detailed report in Markdown format with the following structure:
### Overall Summary
A brief, high-level overview of the code quality, highlighting its strengths and key areas for improvement.

### Readability & Style
- Actionable feedback on naming conventions, comments, and code formatting that could improve clarity.

### Modularity & Structure
- Analysis of the code's organization, separation of concerns, and component design. Suggest ways to improve modularity and reusability.

### Potential Bugs
- Identification of any logical errors, edge cases not handled, or patterns that might lead to runtime issues. Use code snippets to illustrate the problem.

### Improvement Suggestions
- Specific, concrete recommendations for refactoring. Where possible, provide "before" and "after" code examples to make the suggestions clear.

Here is the code:
${codeBlocks}
  `;
};

export const generateReview = async (files: FileContent[]) => {
  const model = 'gemini-2.5-flash';
  const prompt = buildPrompt(files);
  
  const systemInstruction = "You are an expert software engineer and world-class code reviewer. Your goal is to provide constructive, actionable feedback in Markdown format to help developers improve their code. Be thorough and clear.";

  try {
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return response;
  } catch (error) {
    console.error("Error generating review from Gemini:", error);
    throw new Error("Failed to get a response from the AI. Please check your API key and network connection.");
  }
};
