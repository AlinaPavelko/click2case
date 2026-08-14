import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for generating case study using Gemini
app.post("/api/generate-case", async (req, res) => {
  const input = req.body;
  if (!input || !input.projectName) {
    res.status(400).json({ error: "Missing required project input." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log("No GEMINI_API_KEY provided; returning fallback flag.");
    res.json({ useFallback: true, reason: "No API key configured" });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });

    const userPrompt = `Transform the following raw UX project notes into a structured, concise, and professional UX Case Study:

Project Name: ${input.projectName || "N/A"}
Product / Company: ${input.productCompany || "N/A"}
My Role: ${input.myRole || "N/A"}
Project Duration: ${input.projectDuration || "N/A"}
Problem / Challenge: ${input.problem || "N/A"}
Project Goal: ${input.projectGoal || "N/A"}
What I Worked On: ${input.whatIWorkedOn || "N/A"}
Research / Source Materials: ${input.research || "N/A"}
Key Design Decisions: ${input.keyDecisions || "N/A"}
Outcome / Results: ${input.outcome || "N/A"}

Follow these strict guidelines:
- Rewrite input into concise, executive-ready, professional portfolio language suitable for a Product Designer portfolio.
- DO NOT invent facts, metrics, or research findings that were not provided in the input notes.
- If information is missing or minimal, omit it or describe the aspect neutrally without making up fake data.
- Ensure all 8 core sections are crafted cleanly: Overview, Problem, Goal, My Role, Process, Key Design Decisions, Outcome, Key Learnings.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction:
          "You are a Principal Product Designer and UX Staff Leader at a world-class tech company. Your task is to turn raw, messy project notes into an executive-ready UX Portfolio Case Study. Keep the tone editorial, polished, crisp, and authentic. Never invent fake metrics or unstated research findings. Use bullet points or short paragraphs where appropriate.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Short, impactful portfolio case study title"
            },
            summary: {
              type: Type.STRING,
              description: "1-2 sentence executive summary of the case study"
            },
            overview: {
              type: Type.STRING,
              description: "Polished project overview and context"
            },
            problem: {
              type: Type.STRING,
              description: "Problem and challenge statement"
            },
            goal: {
              type: Type.STRING,
              description: "Project goal and objectives"
            },
            myRole: {
              type: Type.STRING,
              description: "Detailed breakdown of designer's role and responsibilities"
            },
            process: {
              type: Type.STRING,
              description: "Synthesized UX process, research insights, and execution steps"
            },
            keyDesignDecisions: {
              type: Type.STRING,
              description: "Key design decisions, trade-offs, and rationale"
            },
            outcome: {
              type: Type.STRING,
              description: "Results, impact, deliverables, and achievements"
            },
            keyLearnings: {
              type: Type.STRING,
              description: "Key learnings, takeaways, and reflections"
            }
          },
          required: [
            "title",
            "summary",
            "overview",
            "problem",
            "goal",
            "myRole",
            "process",
            "keyDesignDecisions",
            "outcome",
            "keyLearnings"
          ]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini API");
    }

    const parsedData = JSON.parse(jsonText);

    res.json({
      success: true,
      data: {
        ...parsedData,
        metadata: {
          projectName: input.projectName || "Untitled Project",
          productCompany: input.productCompany || "N/A",
          role: input.myRole || "Product Designer",
          duration: input.projectDuration || "N/A",
          generatedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        }
      }
    });
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    res.status(500).json({
      error: "AI generation encountered an issue.",
      details: err?.message || String(err),
      useFallback: true
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Click2Case server running on http://localhost:${PORT}`);
  });
}

startServer();
