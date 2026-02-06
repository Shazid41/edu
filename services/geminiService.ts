
import { GoogleGenAI, Type } from "@google/genai";
import { Student, AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeStudent = async (student: Student): Promise<AIAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a detailed academic analysis for the following student: ${JSON.stringify(student)}`,
      config: {
        systemInstruction: "You are a Senior Academic Advisor. Provide structured, actionable insights for student success.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A high-level summary of the student's status." },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of academic or behavioral strengths." },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of areas needing improvement." },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable steps for the student or teacher." },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Overall academic risk assessment." }
          },
          required: ["summary", "strengths", "weaknesses", "recommendations", "riskLevel"]
        }
      }
    });

    return JSON.parse(response.text.trim()) as AIAnalysis;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};

export const generateClassSummary = async (students: Student[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a strategic overview of this class of ${students.length} students. Here is their data: ${JSON.stringify(students.map(s => ({ name: s.name, gpa: s.gpa, status: s.status })))}`,
      config: {
        systemInstruction: "Analyze class trends, identify potential groups needing intervention, and suggest classroom management strategies. Use professional markdown formatting."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Class summary failed:", error);
    return "Could not generate class summary at this time.";
  }
};
