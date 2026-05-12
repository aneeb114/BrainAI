import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStudyNotes(topic: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Generate detailed study notes for: ${topic}. 
  Include:
  1. Key Concepts
  2. Summary
  3. Important Questions
  4. Examples
  Provide the response in Markdown format.`;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return result.text;
}

export async function explainCode(code: string, language: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Explain the following ${language} code line by line. 
  Identify any possible errors and suggest improvements.
  Code:
  \`\`\`${language}
  ${code}
  \`\`\`
  Provide the response in Markdown format.`;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return result.text;
}

export async function solveProblem(problem: string, type: 'SQL' | 'Java' | 'DLD') {
  const model = "gemini-3-flash-preview";
  const prompt = `Solve this ${type} problem. 
  Provide a detailed step-by-step explanation and the final solution.
  Problem: ${problem}
  Provide the response in Markdown format.`;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return result.text;
}

export async function translateToUrdu(text: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Translate the following educational concept into easy-to-understand Urdu (in Urdu script). 
  Keep the tone helpful and encouraging for a student.
  Text: ${text}`;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return result.text;
}

export async function summarizePdf(text: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Summarize the following PDF content. 
  Extracted Text: ${text}
  Provide:
  1. Executive Summary
  2. Main Points (Bullet points)
  3. Important Questions from the text
  4. Key Terms
  Provide the response in Markdown format.`;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return result.text;
}
