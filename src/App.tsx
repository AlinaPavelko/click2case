import React, { useState } from "react";
import { CaseStudyInput, GeneratedCaseStudy, SAMPLE_INPUTS } from "./types";
import { Header } from "./components/Header";
import { CaseForm } from "./components/CaseForm";
import { CasePreview } from "./components/CasePreview";
import { generateFallbackCaseStudy } from "./lib/fallbackGenerator";

export default function App() {
  const [screen, setScreen] = useState<"form" | "preview">("form");
  const [input, setInput] = useState<CaseStudyInput>({
    projectName: "",
    productCompany: "",
    myRole: "",
    projectDuration: "",
    problem: "",
    projectGoal: "",
    whatIWorkedOn: "",
    research: "",
    keyDecisions: "",
    outcome: ""
  });

  const [generatedCase, setGeneratedCase] = useState<GeneratedCaseStudy | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.projectName.trim()) {
      alert("Please enter a Project Name to generate a case study.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setGeneratedCase(result.data);
        setScreen("preview");
      } else {
        // Fallback generator if AI service flag is set or fallback returned
        const fallback = generateFallbackCaseStudy(input);
        setGeneratedCase(fallback);
        setScreen("preview");
      }
    } catch (err: any) {
      console.warn("API generate request failed, using client fallback generator:", err);
      // Fallback guarantees 100% reliability for testing
      const fallback = generateFallbackCaseStudy(input);
      setGeneratedCase(fallback);
      setScreen("preview");
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditInputs = () => {
    setScreen("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetForm = () => {
    if (confirm("Reset all form inputs?")) {
      setInput({
        projectName: "",
        productCompany: "",
        myRole: "",
        projectDuration: "",
        problem: "",
        projectGoal: "",
        whatIWorkedOn: "",
        research: "",
        keyDecisions: "",
        outcome: ""
      });
      setGeneratedCase(null);
      setScreen("form");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-200">
      <Header
        currentScreen={screen}
        onEditInputs={handleEditInputs}
        onResetForm={handleResetForm}
        isGenerating={isGenerating}
      />

      <main>
        {screen === "form" ? (
          <CaseForm
            input={input}
            onChange={setInput}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        ) : (
          generatedCase && (
            <CasePreview
              caseStudy={generatedCase}
              onEditInputs={handleEditInputs}
              onRegenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )
        )}
      </main>
    </div>
  );
}
