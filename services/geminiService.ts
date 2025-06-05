
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StoryCategory, RiddleCategory } from "../types";
import { GEMINI_MODEL_TEXT } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables.");
  // In a real app, you might throw an error or have a fallback,
  // but for this context, we'll let it proceed and fail at API call time if not set.
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

export const generateStory = async (category: StoryCategory): Promise<string> => {
  try {
    const systemInstruction = "You are a delightful storyteller for children aged 3 to 6. Your stories are always happy, very short (2-3 paragraphs), use simple words, and are easy to understand. Focus on positive themes like friendship, kindness, and gentle adventures. Make the story engaging and fun.";
    const prompt = `Tell me a story about ${category.toLowerCase()}.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Failed to generate story. Please check your API key and connection.");
  }
};

export const generateRiddle = async (category: RiddleCategory): Promise<{ riddleText: string; answer: string }> => {
  try {
    const systemInstruction = `You create simple 'What am I?' riddles for children aged 3-6. Each riddle should describe a common item, animal, or concept from the given category in 2-3 simple clues. The answer should be a single word or a very short phrase (e.g., 'ice cream'). Respond ONLY with the riddle, followed by 'ANSWER: [TheAnswer]' on a new line. Ensure the answer is simple and easily guessable by a young child. Example: I am cold and sweet. You lick me on a hot day. What am I?\nANSWER: Ice cream`;
    const prompt = `Give me a riddle about a common ${category.toLowerCase()}.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    
    const text = response.text;
    const parts = text.split("\nANSWER:");
    if (parts.length === 2) {
      return { riddleText: parts[0].trim(), answer: parts[1].trim() };
    }
    console.error("Unexpected riddle format:", text);
    throw new Error("Failed to parse riddle from AI response.");
  } catch (error) {
    console.error("Error generating riddle:", error);
    throw new Error("Failed to generate riddle. Please check your API key and connection.");
  }
};

export const generateDrawingIdea = async (): Promise<string> => {
  try {
    const systemInstruction = "You are a fun idea generator for kids' drawings. Give a short, exciting, and imaginative drawing prompt for a child aged 3-6. Keep it to one sentence. Be very creative and playful. Examples: 'A cat wearing a superhero cape and flying!', 'A rainbow-colored elephant painting a picture with its trunk!', 'A friendly robot baking yummy cookies!'";
    const prompt = "Give me a silly and fun drawing idea for a young child.";

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating drawing idea:", error);
    throw new Error("Failed to generate drawing idea. Please check your API key and connection.");
  }
};