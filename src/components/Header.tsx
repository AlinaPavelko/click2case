import React from "react";
import { Sparkles, FileText, ArrowLeft, RefreshCw } from "lucide-react";

interface HeaderProps {
  currentScreen: "form" | "preview";
  onEditInputs?: () => void;
  onResetForm?: () => void;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onEditInputs,
  onResetForm,
  isGenerating
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & Product Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-medium text-sm shadow-xs">
            <span className="tracking-tight font-serif italic text-base">C2C</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 tracking-tight text-base">Click2Case</span>
              <span className="px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200/60">
                MVP Prototype
              </span>
            </div>
            <p className="text-xs text-zinc-500 hidden sm:block">
              UX Case Study Generator for Product Designers
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {currentScreen === "preview" && onEditInputs && (
            <button
              onClick={onEditInputs}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 border border-zinc-300/70 rounded-md transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Edit Inputs
            </button>
          )}

          {currentScreen === "form" && onResetForm && (
            <button
              onClick={onResetForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Form
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
