
import { GoogleGenAI } from "@google/genai";
import { PlanData } from '../types';

export const generatePlanSummary = async (data: PlanData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    
    Format the response as a clear Markdown message (2-3 short paragraphs).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI summary. Please review your preferences manually.";
  }
};
