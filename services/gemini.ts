import { GoogleGenerativeAI } from "@google/generative-ai";
import { PlanData } from '../types';

export const generatePlanSummary = async (data: PlanData): Promise<string> => {
  console.log("Starting generatePlanSummary");
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || '';
  console.log("API Key present:", !!apiKey);

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return "API Key is missing or default. Please set VITE_GEMINI_API_KEY in your .env file.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const selectedItems = data.items.filter(item => data.selections[item.id]?.selected);
  const preferencesList = selectedItems.map(item => {
    const note = data.selections[item.id].note;
    return `- ${item.label}${note ? ': ' + note : ''}`;
  }).join('\n');

  const prompt = `
    You are an expert birth doula. Generate a professional, concise, and friendly cover letter for a medical team based on the following birth plan preferences.
    The goal is to communicate the parent's wishes clearly while acknowledging medical safety.
    
    Patient: ${data.patientName || 'Anonymous'}
    Partner: ${data.partnerName || 'None listed'}
    Due Date: ${data.dueDate || 'Unknown'}
    
    Preferences:
    ${preferencesList}
    
    Format the response as clear Markdown text (2-3 short paragraphs).
    DO NOT include any metadata or code blocks in your response, just the text.
  `;

  try {
    console.log("Calling Gemini API with prompt length:", prompt.length);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response text obtained");
    return text || "Could not generate summary.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes('404')) {
      return "Model not found. Please check implementation.";
    }
    return "Error generating AI summary. Please review your preferences manually.";
  }
};
