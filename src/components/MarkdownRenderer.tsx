import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ""
}) => {
  if (!content) return null;

  // Split lines into blocks
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-outside ml-5 space-y-1.5 my-3 text-zinc-700 leading-relaxed text-base">
          {currentList.map((item, idx) => (
            <li key={idx}>{renderFormattedText(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Check for headers (### or ##)
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={index} className="text-base font-semibold text-zinc-900 mt-5 mb-2 tracking-tight">
          {trimmed.replace(/^###\s+/, "")}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={index} className="text-lg font-semibold text-zinc-900 mt-6 mb-2 tracking-tight">
          {trimmed.replace(/^##\s+/, "")}
        </h3>
      );
      return;
    }

    // Check for bullet lists (- or * or numbered like 1.)
    if (/^[-*]\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={index} className="text-zinc-700 leading-relaxed text-base my-2.5">
        {renderFormattedText(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className={`space-y-1 font-sans text-zinc-800 ${className}`}>{elements}</div>;
};

function renderFormattedText(text: string): React.ReactNode {
  // Format **bold** and *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-zinc-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-zinc-800">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
