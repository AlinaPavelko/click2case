import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION = `Ти AI-асистент Click2Case для Product і UX Designers.

Користувач надає rough information про дизайн-проєкт. Перетвори її на clear, structured, polished portfolio case study.

Організуй інформацію в coherent narrative та підкреслюй contribution дизайнера і зв'язок між problem, decisions, solution та outcome.

Використовуй лише факти з input. Не вигадуй metrics, research, users, responsibilities, business outcomes або learnings.
Не додавай припущення як факти.
Не замінюй supplied facts сильнішими твердженнями, наприклад "designed" на "implemented".
Якщо інформації для секції недостатньо, пропусти її.
Якщо Outcome & learnings містить лише outcome, не створюй learnings.

Не пов'язуй окремі факти причинно-наслідковими зв'язками, якщо цей зв'язок прямо не вказаний в input. Зберігай окремі факти окремими.

Поверни лише valid JSON:

{
  "title": "",
  "sections": [
    {
      "type": "overview | context_challenge | my_role | approach_decisions | solution | outcome | learnings",
      "heading": "",
      "content": ""
    }
  ]
}

Без markdown, HTML або тексту поза JSON.`;

function buildUserPrompt(input: any): string {
  const parts: string[] = [];

  if (input.projectName) {
    parts.push(`Project name: ${input.projectName}`);
  }
  if (input.myRole) {
    parts.push(`Your role: ${input.myRole}`);
  }
  if (input.productCompany || input.projectDuration) {
    const details = [input.productCompany, input.projectDuration].filter(Boolean).join(" / ");
    parts.push(`Project type: ${details}`);
  }
  if (input.problem || input.projectGoal) {
    const problemContext = [
      input.problem ? `Problem: ${input.problem}` : "",
      input.projectGoal ? `Goal: ${input.projectGoal}` : ""
    ]
      .filter(Boolean)
      .join("\n");
    parts.push(`Problem & context:\n${problemContext}`);
  }
  if (input.whatIWorkedOn || input.research || input.keyDecisions) {
    const workItems = [
      input.whatIWorkedOn ? `Scope / Execution: ${input.whatIWorkedOn}` : "",
      input.research ? `Research: ${input.research}` : "",
      input.keyDecisions ? `Key Decisions: ${input.keyDecisions}` : ""
    ]
      .filter(Boolean)
      .join("\n");
    parts.push(`What you did:\n${workItems}`);
  }
  if (input.outcome) {
    parts.push(`Outcome & learnings:\n${input.outcome}`);
  }

  return parts.join("\n\n");
}

// API route for generating case study using Groq
app.post("/api/generate-case", async (req, res) => {
  const input = req.body;
  if (!input || !input.projectName) {
    res.status(400).json({ error: "Missing required project input." });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.log("No GROQ_API_KEY provided; returning fallback flag.");
    res.json({ useFallback: true, reason: "No GROQ_API_KEY configured" });
    return;
  }

  try {
    const userPrompt = buildUserPrompt(input);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: SYSTEM_INSTRUCTION
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error (status ${response.status}): ${errorText}`);
    }

    const groqData = await response.json();
    let rawContent = groqData.choices?.[0]?.message?.content || "";

    if (typeof rawContent === "string") {
      rawContent = rawContent.trim();
      if (rawContent.startsWith("```json")) {
        rawContent = rawContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (rawContent.startsWith("```")) {
        rawContent = rawContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }
    }

    const parsedData = JSON.parse(rawContent);

    if (!parsedData || typeof parsedData !== "object") {
      throw new Error("Invalid JSON structure received from Groq API");
    }

    const title = parsedData.title || input.projectName || "Untitled Project";
    const sections = Array.isArray(parsedData.sections) ? parsedData.sections : [];

    res.json({
      success: true,
      data: {
        title,
        sections,
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
    console.error("Groq Generation Error:", err);
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
