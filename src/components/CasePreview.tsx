import React, { useState } from "react";
import { GeneratedCaseStudy } from "../types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import {
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  Printer,
  Building,
  User,
  Clock,
  Sparkles,
  FileText,
  CheckCircle2,
  Share2
} from "lucide-react";

interface CasePreviewProps {
  caseStudy: GeneratedCaseStudy;
  onEditInputs: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export const CasePreview: React.FC<CasePreviewProps> = ({
  caseStudy,
  onEditInputs,
  onRegenerate,
  isGenerating
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"formatted" | "markdown">("formatted");

  const meta = caseStudy.metadata || {
    projectName: caseStudy.title,
    productCompany: "N/A",
    role: "Product Designer",
    duration: "N/A",
    generatedAt: new Date().toLocaleDateString()
  };

  const sections = [
    { id: "overview", title: "1. Overview", content: caseStudy.overview },
    { id: "problem", title: "2. Problem", content: caseStudy.problem },
    { id: "goal", title: "3. Goal", content: caseStudy.goal },
    { id: "my-role", title: "4. My Role", content: caseStudy.myRole },
    { id: "process", title: "5. Process", content: caseStudy.process },
    { id: "decisions", title: "6. Key Design Decisions", content: caseStudy.keyDesignDecisions },
    { id: "outcome", title: "7. Outcome", content: caseStudy.outcome },
    { id: "learnings", title: "8. Key Learnings", content: caseStudy.keyLearnings }
  ];

  const fullMarkdownText = `# ${caseStudy.title}

*${caseStudy.summary}*

**Company/Product:** ${meta.productCompany}
**Role:** ${meta.role}
**Duration:** ${meta.duration}

---

## 1. Overview
${caseStudy.overview}

## 2. Problem
${caseStudy.problem}

## 3. Goal
${caseStudy.goal}

## 4. My Role
${caseStudy.myRole}

## 5. Process
${caseStudy.process}

## 6. Key Design Decisions
${caseStudy.keyDesignDecisions}

## 7. Outcome
${caseStudy.outcome}

## 8. Key Learnings
${caseStudy.keyLearnings}
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 pb-20">
      {/* Top Action Bar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs py-3">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={onEditInputs}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-300/70 rounded-md transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Edit inputs
            </button>

            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Regenerating..." : "Regenerate"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 bg-zinc-100 rounded-md border border-zinc-200 text-xs">
              <button
                onClick={() => setActiveTab("formatted")}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  activeTab === "formatted"
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Formatted View
              </button>
              <button
                onClick={() => setActiveTab("markdown")}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  activeTab === "markdown"
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Markdown Code
              </button>
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-300/80 rounded-md transition-colors cursor-pointer"
              title="Copy entire case study as Markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-300/80 rounded-md transition-colors cursor-pointer"
              title="Print case study"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Section Navigator Bar */}
        {activeTab === "formatted" && (
          <div className="max-w-4xl mx-auto px-6 mt-2 pt-2 border-t border-zinc-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px] text-zinc-500">
            <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">
              Jump to:
            </span>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-2 py-0.5 rounded hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors cursor-pointer"
              >
                {sec.title.replace(/^\d+\.\s+/, "")}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Preview Article */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        {activeTab === "formatted" ? (
          <article className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-8 md:p-12 space-y-10 print:shadow-none print:border-none print:p-0">
            {/* Header / Hero Section */}
            <div className="border-b border-zinc-200/80 pb-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-600 bg-zinc-100 rounded-full border border-zinc-200">
                <Sparkles className="w-3 h-3 text-amber-500" />
                UX Portfolio Case Study
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-zinc-950 tracking-tight leading-snug">
                {caseStudy.title}
              </h1>

              <p className="text-lg text-zinc-600 font-sans leading-relaxed">
                {caseStudy.summary}
              </p>

              {/* Metadata Pill Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200/70">
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-zinc-800">{meta.productCompany}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200/70">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-zinc-800">{meta.role}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200/70">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-zinc-800">{meta.duration}</span>
                </div>
              </div>
            </div>

            {/* Case Study Sections */}
            <div className="space-y-12">
              {sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-36 space-y-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
                    {sec.title}
                  </h2>

                  {sec.content ? (
                    <MarkdownRenderer content={sec.content} />
                  ) : (
                    <p className="text-sm italic text-zinc-400">
                      Section omitted (no raw input provided).
                    </p>
                  )}
                </section>
              ))}
            </div>

            {/* Article Footer Actions */}
            <div className="pt-10 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="text-xs text-zinc-500">
                Generated with <span className="font-medium text-zinc-800">Click2Case</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onEditInputs}
                  className="px-4 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                >
                  Edit Inputs
                </button>
                <button
                  onClick={handleCopyMarkdown}
                  className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied Markdown" : "Copy Full Markdown"}
                </button>
              </div>
            </div>
          </article>
        ) : (
          /* Raw Markdown Code View */
          <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 sm:p-8 font-mono text-xs overflow-x-auto shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
              <span>raw_case_study.md</span>
              <button
                onClick={handleCopyMarkdown}
                className="hover:text-white flex items-center gap-1.5 text-xs font-sans bg-zinc-800 px-3 py-1 rounded"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-zinc-300">
              {fullMarkdownText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
