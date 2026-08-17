import { CaseStudyInput, GeneratedCaseStudy, CaseStudySection } from "../types";

export function generateFallbackCaseStudy(input: CaseStudyInput): GeneratedCaseStudy {
  const pName = input.projectName.trim() || "Untitled Project";
  const company = input.productCompany.trim() || "Project";
  const role = input.myRole.trim() || "Product Designer";
  const duration = input.projectDuration.trim() || "Ongoing";

  const hasProblem = Boolean(input.problem.trim());
  const hasGoal = Boolean(input.projectGoal.trim());
  const hasWorkedOn = Boolean(input.whatIWorkedOn.trim());
  const hasResearch = Boolean(input.research.trim());
  const hasDecisions = Boolean(input.keyDecisions.trim());
  const hasOutcome = Boolean(input.outcome.trim());

  const sections: CaseStudySection[] = [];

  // Overview
  sections.push({
    type: "overview",
    heading: "Overview",
    content: `End-to-end UX initiative for ${pName} at ${company}, delivered by ${role} over ${duration}.`
  });

  // Problem & Context
  if (hasProblem || hasGoal) {
    let content = "";
    if (hasProblem) content += input.problem.trim();
    if (hasGoal) content += (content ? "\n\n" : "") + `Goal: ${input.projectGoal.trim()}`;
    sections.push({
      type: "context_challenge",
      heading: "Problem & Context",
      content
    });
  }

  // My Role
  if (role) {
    sections.push({
      type: "my_role",
      heading: "My Role",
      content: `Role: ${role}. Key responsibilities included user research synthesis, information architecture, workflow mapping, interaction design, and high-fidelity UI specifications.`
    });
  }

  // Approach & Decisions
  if (hasResearch || hasDecisions) {
    let content = "";
    if (hasResearch) content += `Research & Discovery:\n${input.research.trim()}\n\n`;
    if (hasDecisions) content += `Key Design Decisions:\n${input.keyDecisions.trim()}`;
    sections.push({
      type: "approach_decisions",
      heading: "Approach & Decisions",
      content: content.trim()
    });
  }

  // Solution
  if (hasWorkedOn) {
    sections.push({
      type: "solution",
      heading: "Solution",
      content: input.whatIWorkedOn.trim()
    });
  }

  // Outcome
  if (hasOutcome) {
    sections.push({
      type: "outcome",
      heading: "Outcome",
      content: input.outcome.trim()
    });
  }

  return {
    title: pName,
    sections,
    metadata: {
      projectName: pName,
      productCompany: company,
      role: role,
      duration: duration,
      generatedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    }
  };
}
