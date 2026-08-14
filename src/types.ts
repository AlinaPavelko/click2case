export interface CaseStudyInput {
  projectName: string;
  productCompany: string;
  myRole: string;
  projectDuration: string;
  problem: string;
  projectGoal: string;
  whatIWorkedOn: string;
  research: string;
  keyDecisions: string;
  outcome: string;
}

export interface GeneratedCaseStudy {
  title: string;
  summary: string;
  overview: string;
  problem: string;
  goal: string;
  myRole: string;
  process: string;
  keyDesignDecisions: string;
  outcome: string;
  keyLearnings: string;
  metadata: {
    projectName: string;
    productCompany: string;
    role: string;
    duration: string;
    generatedAt: string;
  };
}

export const SAMPLE_INPUTS: CaseStudyInput[] = [
  {
    projectName: "Merchant Analytics Redesign",
    productCompany: "Stripe / PayPulse (Fintech)",
    myRole: "Lead Product Designer",
    projectDuration: "3 Months (Q2 2025)",
    problem: "Small business merchants struggled to understand their daily cash flow and processing fees. The existing dashboard was overwhelming, buried key financial metrics in multi-level menus, and led to high support ticket volume regarding hidden transaction fees.",
    projectGoal: "Redesign the merchant financial analytics dashboard to improve daily metric comprehension, reduce time-to-insight for store owners, and decrease churn caused by financial ambiguity.",
    whatIWorkedOn: "Conducted user research with 12 merchants, mapped financial workflows, created interactive Figma prototypes for desktop and tablet, established a modular metric card component library, and led usability testing across 3 iteration cycles.",
    research: "Customer support log audit (200+ tickets), 12 semi-structured merchant interviews, competitor analysis across 4 leading fintech platforms, and hotjar session recordings showing high drop-off on payout breakdown pages.",
    keyDecisions: "1) Introduced a customizable 'Top-3 Metrics' hero bar for quick morning checks. 2) Replaced dense tabular data with visual timeline graphs with interactive tooltips. 3) Grouped processing fee breakdowns directly alongside payout transfers instead of separate statements.",
    outcome: "Merchant daily active engagement with financial reports increased significantly. Usability test completion rate reached 95% (up from 58%), and fee-related support tickets dropped by 34% within 60 days of release."
  },
  {
    projectName: "Patient Onboarding & Telehealth Flow",
    productCompany: "CarePulse Health",
    myRole: "Senior UX Designer",
    projectDuration: "6 Weeks",
    problem: "Patients booking virtual specialist visits experienced a 42% abandonment rate during pre-appointment intake. The intake form was a single long page with 35 fields, leading to high friction and missing medical histories.",
    projectGoal: "Create a guided, low-cognitive-load patient onboarding flow that gathers required medical details while preserving high completion rates before teleconsultations.",
    whatIWorkedOn: "End-to-end design: intake flow architecture, progressive disclosure forms, mobile and desktop responsive views, accessibility (WCAG AAA contrast), and handover specifications for engineering.",
    research: "Behavioral analytics on drop-off points, survey responses from 45 patients, and feedback sessions with 6 attending physicians who highlighted missing patient history.",
    keyDecisions: "1) Chunked the 35-field form into a 4-step progressive wizard with visual progress indicators. 2) Implemented smart defaults and auto-complete for prescription medications. 3) Added save & resume capability for complex medical histories.",
    outcome: "Form completion rate rose to 88%. Pre-appointment intake time dropped from 14 minutes to under 5 minutes, and doctor prep time was reduced by 3 minutes per patient session."
  },
  {
    projectName: "DevOps Pipeline Visualizer",
    productCompany: "CloudScale Infrastructure",
    myRole: "UX/UI Designer",
    projectDuration: "2 Months",
    problem: "Developers and site reliability engineers (SREs) struggled to debug failing build pipelines because error logs were plain text files without visual context or clear stage relationships.",
    projectGoal: "Design an interactive, node-based pipeline visualizer that surfaces build status, failure points, and logs instantly.",
    whatIWorkedOn: "Information architecture, node graph interactions, log modal designs, dark mode UI system, and interactive prototype testing with internal dev teams.",
    research: "1:1 developer interviews with 8 engineers, observing real-time incident resolution workflows during on-call rotations.",
    keyDecisions: "1) Designed a dynamic DAG (Directed Acyclic Graph) canvas with color-coded node states. 2) Built a slide-over log inspector that keeps graph context visible. 3) Added a one-click 'Rerun Failed Step' action button.",
    outcome: "Mean time to resolution (MTTR) for build errors decreased by 28%. Internal developer satisfaction score jumped from 3.2/5 to 4.7/5."
  }
];
