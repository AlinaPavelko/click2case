import React, { useState } from "react";
import { CaseStudyInput, SAMPLE_INPUTS } from "../types";
import { Sparkles, Wand2, FileText, CheckCircle, RotateCcw, Info, ArrowRight } from "lucide-react";

interface CaseFormProps {
  input: CaseStudyInput;
  onChange: (input: CaseStudyInput) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const CaseForm: React.FC<CaseFormProps> = ({
  input,
  onChange,
  onGenerate,
  isGenerating
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (field: keyof CaseStudyInput, value: string) => {
    onChange({
      ...input,
      [field]: value
    });
  };

  const handleFillSample = (index?: number) => {
    const idx = typeof index === "number" ? index : selectedPresetIndex;
    const sample = SAMPLE_INPUTS[idx % SAMPLE_INPUTS.length];
    onChange(sample);
    setSelectedPresetIndex((idx + 1) % SAMPLE_INPUTS.length);

    showToast(`Loaded sample: ${sample.projectName}`);
  };

  const handleClear = () => {
    onChange({
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
    showToast("Form cleared");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const isFormEmpty = Object.values(input).every((v) => typeof v === "string" && !v.trim());

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-zinc-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Intro Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-zinc-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-zinc-900 tracking-tight">
              Create Case Study
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Enter your raw project details below. Click2Case turns them into a structured, executive-ready UX portfolio case study.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleFillSample()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-300/80 rounded-lg transition-colors cursor-pointer"
              title="Populate form with sample UX project data"
            >
              <Wand2 className="w-3.5 h-3.5 text-zinc-600" />
              Fill with sample data
            </button>

            {!isFormEmpty && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
          <span className="font-medium text-zinc-700">Sample presets:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {SAMPLE_INPUTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleFillSample(idx)}
                className="px-2.5 py-1 text-[11px] rounded bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-700 font-medium transition-colors cursor-pointer"
              >
                {sample.projectName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="space-y-8"
      >
        {/* Section 1: Basic Metadata */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
            1. Project Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Field 1: Project Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-800 mb-1.5">
                Project name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={input.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                placeholder="e.g. Merchant Analytics Redesign"
                required
                className="w-full px-3.5 py-2 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Field 2: Product / Company */}
            <div>
              <label className="block text-xs font-medium text-zinc-800 mb-1.5">
                Product / company <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={input.productCompany}
                onChange={(e) => handleInputChange("productCompany", e.target.value)}
                placeholder="e.g. Stripe / Fintech SaaS"
                required
                className="w-full px-3.5 py-2 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Field 3: My Role */}
            <div>
              <label className="block text-xs font-medium text-zinc-800 mb-1.5">
                My role <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={input.myRole}
                onChange={(e) => handleInputChange("myRole", e.target.value)}
                placeholder="e.g. Lead Product Designer"
                required
                className="w-full px-3.5 py-2 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Field 4: Project Duration */}
            <div>
              <label className="block text-xs font-medium text-zinc-800 mb-1.5">
                Project duration
              </label>
              <input
                type="text"
                value={input.projectDuration}
                onChange={(e) => handleInputChange("projectDuration", e.target.value)}
                placeholder="e.g. 3 Months (Q2 2025)"
                className="w-full px-3.5 py-2 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Problem & Goal */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
            2. Problem & Objectives
          </h2>

          <div className="space-y-5">
            {/* Field 5: Problem / Challenge */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-zinc-800">
                  Problem / challenge
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {input.problem.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={input.problem}
                onChange={(e) => handleInputChange("problem", e.target.value)}
                placeholder="What was broken, confusing, or inefficient? Include user friction points, metrics, or support tickets if known..."
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
              />
            </div>

            {/* Field 6: Project Goal */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-zinc-800">
                  Project goal
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {input.projectGoal.length} chars
                </span>
              </div>
              <textarea
                rows={2}
                value={input.projectGoal}
                onChange={(e) => handleInputChange("projectGoal", e.target.value)}
                placeholder="What was the intended outcome, business objective, or target user metric?"
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Execution & Process */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
            3. UX Process & Decisions
          </h2>

          <div className="space-y-5">
            {/* Field 7: What I Worked On */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-zinc-800">
                  What I worked on
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {input.whatIWorkedOn.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={input.whatIWorkedOn}
                onChange={(e) => handleInputChange("whatIWorkedOn", e.target.value)}
                placeholder="Your specific scope: user journeys, Figma prototypes, design system components, usability testing..."
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
              />
            </div>

            {/* Field 8: Research or Source Materials */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-zinc-800">
                  Research or source materials
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {input.research.length} chars
                </span>
              </div>
              <textarea
                rows={2}
                value={input.research}
                onChange={(e) => handleInputChange("research", e.target.value)}
                placeholder="User interviews, analytics logs, competitor benchmarking, surveys, session recordings..."
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
              />
            </div>

            {/* Field 9: Key Design Decisions */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-zinc-800">
                  Key design decisions
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {input.keyDecisions.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={input.keyDecisions}
                onChange={(e) => handleInputChange("keyDecisions", e.target.value)}
                placeholder="What major UX/UI choices did you make? Why did you pick pattern A over pattern B?"
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Results & Impact */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-xs space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2">
            4. Impact & Outcome
          </h2>

          {/* Field 10: Outcome / Results */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-zinc-800">
                Outcome / results
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                {input.outcome.length} chars
              </span>
            </div>
            <textarea
              rows={3}
              value={input.outcome}
              onChange={(e) => handleInputChange("outcome", e.target.value)}
              placeholder="What changed after launch? Usability testing metrics, conversion lift, support drop, qualitative feedback..."
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50/50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400 resize-y"
            />
          </div>
        </div>

        {/* Form Action Bar */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => handleFillSample()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 border border-zinc-300/80 rounded-lg transition-colors cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-zinc-500" />
            Fill with sample data
          </button>

          <button
            type="submit"
            disabled={isGenerating || !input.projectName.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Case Study...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate case</span>
                <ArrowRight className="w-4 h-4 opacity-70 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
