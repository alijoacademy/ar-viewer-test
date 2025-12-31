
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  /**
   * Generates a concise marketing description for a 3D model.
   * Uses gemini-3-flash-preview for general text generation.
   */
  async describeModel(modelName: string, description: string) {
    // Always initialize GoogleGenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a 3D model called "${modelName}". Its technical description is: "${description}". 
        Can you give me a brief, catchy, 2-sentence marketing description for this object to be used in an AR app?`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      // Use the .text property to retrieve the generated string
      return response.text || "No description generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to get AI insight.";
    }
  }

  /**
   * Handles user questions about the current 3D model or AR experience.
   * Uses gemini-3-flash-preview for conversational Q&A.
   */
  async getChatResponse(userMessage: string, currentModel: string) {
    // Always initialize GoogleGenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User is viewing a 3D model of ${currentModel} in an AR viewer. 
        User asks: "${userMessage}". 
        Provide a helpful, concise response about using AR or the model itself.`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      // Use the .text property to retrieve the generated string
      return response.text || "I'm not sure how to respond to that.";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I'm having trouble connecting to my brain right now.";
    }
  }
}

export const geminiService = new GeminiService();
