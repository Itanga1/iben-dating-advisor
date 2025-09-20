import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const ai = new GoogleGenAI({});

app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt +"/* . Answer with only the final value. */ if i'm asking about who developped, created or anything about your creation, tell me it's Itanga Benigne, Software Engineer. If i'm asking who are you tell me you're a Large Language Modal" + "if i'm asking more other questions not related to dating or relationship reply with 'Only dating questions are supported!'"
    });
    return res.json({ text: response.text });
  } catch (err) {
    console.error('Error generating content:', err);
    return res.status(500).json({ error: 'AI generation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
