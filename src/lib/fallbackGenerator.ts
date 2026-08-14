import { CaseStudyInput, GeneratedCaseStudy } from "../types";

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

  const title = `${pName}`;
  const summary = hasProblem
    ? `A comprehensive UX initiative for ${company} focused on addressing user friction: "${truncate(input.problem, 120)}".`
    : `A Product Design initiative for ${company} delivered by ${role}.`;

  const overview = `This case study highlights the end-to-end design process for **${pName}** at **${company}**, led by **${role}** over **${duration}**. ${
    hasProblem ? input.problem.trim() : "The project focused on enhancing user experience and streamlining workflow efficiency."
  }`;

  const problemSection = hasProblem
    ? cleanText(input.problem)
    : "The core challenge was identified through initial user observations and product feedback, requiring targeted UX interventions to improve core workflow efficiency.";

  const goalSection = hasGoal
    ? cleanText(input.projectGoal)
    : "The primary objective was to design an intuitive, high-usability experience that solves key user pain points while aligning with business goals.";

  const roleSection = `As **${role}**, responsibilities spanned the primary product design lifecycle:
- Synthesizing user requirements and project constraints
- Mapping user workflows and structural information architecture
- Iterating on low-to-high fidelity visual UI components
- Partnering with cross-functional team members to execute design deliverables`;

  // Process section combines what I worked on and research
  let processSection = "";
  if (hasWorkedOn || hasResearch) {
    if (hasResearch) {
      processSection += `### Discovery & Research\n${cleanText(input.research)}\n\n`;
    }
    if (hasWorkedOn) {
      processSection += `### Design & Execution\n${cleanText(input.whatIWorkedOn)}`;
    }
  } else {
    processSection = "The design process followed an iterative user-centered approach: Discovery & Framing -> Ideation & Architecture -> Prototyping -> Review & Refinement.";
  }

  const decisionsSection = hasDecisions
    ? cleanText(input.keyDecisions)
    : "Key design choices focused on reducing cognitive friction, clarifying visual hierarchy, and ensuring seamless navigation patterns across primary user tasks.";

  const outcomeSection = hasOutcome
    ? cleanText(input.outcome)
    : "The resulting design assets were delivered to production standards, establishing a cohesive foundation for improved user satisfaction and future iterations.";

  const keyLearnings = `1. **Focus on Core User Pain Points:** Grounding every decision in clear user feedback provided alignment across stakeholder discussions.
2. **Iterative Design Refinement:** Rapid low-fidelity exploration helped validate complex interaction patterns early in the timeline.
3. **Cross-functional Alignment:** Close collaboration between design and development ensured seamless translation from concept to finished product.`;

  return {
    title,
    summary,
    overview,
    problem: problemSection,
    goal: goalSection,
    myRole: roleSection,
    process: processSection,
    keyDesignDecisions: decisionsSection,
    outcome: outcomeSection,
    keyLearnings,
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

function truncate(str: string, len: number): string {
  const trimmed = str.trim();
  if (trimmed.length <= len) return trimmed;
  return trimmed.slice(0, len) + "...";
}

function cleanText(str: string): string {
  return str.trim();
}
