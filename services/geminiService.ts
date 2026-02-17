import { GoogleGenAI } from "@google/genai";
import { PROJECTS, PORTFOLIO_OWNER, POSITIONING, HEADLINE } from "../constants";

// Construct a context string from the portfolio data
const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${PORTFOLIO_OWNER}'s portfolio website.
Your persona is professional, technical, and concise.
You are chatting with a recruiter or a potential client.

Here is ${PORTFOLIO_OWNER}'s profile:
- Positioning: ${POSITIONING}
- Headline: ${HEADLINE}
- Key Projects & Skills:
${PROJECTS.map(p => `- ${p.title}: ${p.description}. Tech: ${p.techStack.join(', ')}`).join('\n')}

Rules:
1. Answer questions about ${PORTFOLIO_OWNER}'s skills, experience, and projects based strictly on this info.
2. If asked about something not in the list, professionally state that you don't have that info but emphasize related distributed systems skills.
3. Keep answers under 3 sentences unless asked for a detailed technical explanation.
4. Do not make up fake jobs or companies.
5. Be enthusiastic about "Production Grade" systems.
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API Key not found in environment variables.");
    }
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "I'm currently offline (API Key missing). Please contact Nikunja directly via email.";
  }

  try {
    // We construct a chat history for context
    const chat = client.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Replay history to set state (simplified approach, normally we'd keep the chat object alive)
    // For this simple demo, we just send the new message with the system instruction context 
    // effectively handling it as a single turn or re-hydrating if needed. 
    // To keep it simple and stateless for this function:
    
    // Ideally, we should maintain the `chat` instance in a React ref. 
    // Since this is a service function, we'll assume a fresh chat for simplicity 
    // or we could append history to the prompt if we aren't persisting the object.
    
    // Let's use the history prop to seed the conversation if possible, 
    // but the SDK `create` method doesn't take raw history objects easily without mapping.
    // We will just send the latest message for this stateless implementation, 
    // or rely on the caller to keep the session alive if we moved this to a hook.
    
    // BETTER APPROACH: Just generate content for single turn Q&A to allow for quick "Ask me about X".
    // If we want conversation, we need to store the chat instance in the component.
    // Let's stick to generateContent for simplicity and robustness in this demo,
    // embedding the history in the prompt if needed, OR just answering the current question.
    
    const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            { role: 'user', parts: [{ text: `History: ${JSON.stringify(history.slice(-4))}\n\nCurrent User Question: ${message}` }] }
        ],
        config: {
            systemInstruction: SYSTEM_INSTRUCTION
        }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a system error while processing your request. Please try again.";
  }
};
