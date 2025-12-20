
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const generateImageName = async (imageFile: File): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        
        const prompt = `
            Generate a concise, descriptive, SEO-friendly filename for this image.
            Rules:
            - Use only lowercase letters, numbers, and hyphens.
            - Replace spaces with hyphens.
            - Do not include the file extension.
            - The name should accurately describe the main subject of the image.
            - Be descriptive but not overly long (3-7 words is ideal).
            - Example output: 'a-red-sports-car-on-a-sunny-day'
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        const text = response.text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        if (!text) {
            throw new Error("AI returned an empty name.");
        }

        return text;
    } catch (error) {
        console.error("Error generating image name:", error);
        throw new Error("Failed to generate name from AI.");
    }
};
