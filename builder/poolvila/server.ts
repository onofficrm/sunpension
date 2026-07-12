import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `당신은 '세부빌라(Cebu Villa)'의 AI 맞춤형 풀빌라 추천 챗봇입니다. 
고객이 입력하는 인원수, 여행 목적(가족, 친구, 골프 등), 선호 지역(세부시티, 막탄), 특별한 요구사항을 분석하여 
적합한 풀빌라를 추천하고 친절하게 답변해주세요.
답변은 깔끔하고 명확하게 작성하며 너무 길지 않게 핵심만 전달하세요.`,
        },
      });

      // Restore history manually if needed, but since we can't easily set history in simple chat api with just `@google/genai` 
      // wait, `ai.chats.create` allows passing history.
      // But it's easier to just use `generateContent` if we pass the whole conversation as contents.
      
      const contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `당신은 '세부빌라(Cebu Villa)'의 AI 맞춤형 풀빌라 추천 챗봇입니다. 
고객의 입력(인원수, 여행 목적, 선호 지역 등)을 분석하여 적합한 풀빌라 유형(세부시티, 막탄 등)과 팁을 친절하게 추천해주세요. 마크다운을 사용하여 깔끔하게 답변하세요.`,
        }
      });
      
      res.json({ reply: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });

  app.post("/api/itinerary", async (req, res) => {
    try {
      const { days, location, purpose, people, pace } = req.body;
      
      const prompt = `
세부 풀빌라 여행을 위한 맞춤형 일정을 추천해주세요.
- 여행 기간: ${days}
- 선호 지역: ${location}
- 여행 목적: ${purpose}
- 인원: ${people}명
- 여행 스타일/페이스: ${pace}

위 정보를 바탕으로, 일차별(1일차, 2일차 등) 추천 일정을 작성해주세요.
풀빌라에서의 휴식(바베큐, 프라이빗 수영 등), 현지 맛집, 마사지, 호핑투어 등 세부의 매력을 느낄 수 있는 활동을 적절히 섞어주세요.
마크다운 형식으로 보기 좋게 정리해서 제공해주세요.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "당신은 세부 여행 일정을 기획하는 전문가입니다. 유익하고 실용적인 일정을 마크다운으로 예쁘게 작성해주세요.",
        }
      });
      
      res.json({ itinerary: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate itinerary" });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
