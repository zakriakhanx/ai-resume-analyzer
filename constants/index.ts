export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; // Overall resume strength score (0–100). This is a weighted evaluation across all categories (ATS, tone/style, content, structure, and skills). A higher score indicates stronger job alignment, ATS parsing likelihood, and overall presentation quality.
      
      ATS: {
        score: number; // ATS compatibility score (0–100). Rates how well the resume will pass through common Applicant Tracking Systems (e.g., parsing, keyword recognition, formatting safety).
        tips: {
          type: "good" | "improve"; // "good" = strong elements to keep, "improve" = weaknesses to fix.
          tip: string; // Short, clear tip (3–6 words) summarizing the point (e.g., "Avoid tables in formatting").
        }[]; // Provide minimum 4+ (can be more if useful) actionable, ATS-focused tips highlighting parsing issues, keyword alignment, or file-type improvements.
      };
      
      toneAndStyle: {
        score: number; // Score (0–100) for professionalism, clarity, and impact of writing tone. Higher scores mean concise, strong action verbs and a professional, confident style.
        tips: {
          type: "good" | "improve"; // "good" = stylistic strength, "improve" = tone/style issue.
          tip: string; // Short title (e.g., "Stronger action verbs").
          explanation: string; // Detailed explanation of why this matters and a concrete rewrite suggestion (e.g., change "Responsible for managing" → "Led a team of 5 to deliver...").
        }[]; // Provide minimum 4+ (can be more if useful) detailed tone/style recommendations with rewritten examples.
      };
      
      content: {
        score: number; // Score (0–100) for relevance and depth of content. Evaluates if resume content demonstrates measurable impact, job-fit, and aligns with provided job description.
        tips: {
          type: "good" | "improve"; // "good" = valuable content, "improve" = gaps or weak descriptions.
          tip: string; // Short title describing the issue or strength (e.g., "Add measurable results").
          explanation: string; // Explanation plus a concrete rewrite or example (e.g., "Instead of 'Managed projects,' write 'Delivered 5+ projects on time, reducing costs by 12%.'").
        }[]; // Provide minimum 4+ (can be more if useful) content-specific insights, focused on relevance, achievements, and quantification.
      };
      
      structure: {
        score: number; // Score (0–100) for document organization and readability. Evaluates section ordering, logical flow, whitespace, and scannability by both recruiters and ATS.
        tips: {
          type: "good" | "improve"; // "good" = effective structure, "improve" = structural weakness.
          tip: string; // Short title summarizing point (e.g., "Simplify section order").
          explanation: string; // Explanation + specific structural suggestion (e.g., "Move 'Education' below 'Experience' to highlight career impact first").
        }[]; // Provide minimum 4+ (can be more if useful) structural recommendations for flow, hierarchy, or readability improvements.
      };
      
      skills: {
        score: number; // Score (0–100) for skills section quality. Assesses alignment with job description, ATS keyword friendliness, and balance of technical/soft skills.
        tips: {
          type: "good" | "improve"; // "good" = skill relevance, "improve" = missing or mismatched skills.
          tip: string; // Short title describing point (e.g., "Match keywords to JD").
          explanation: string; // Explanation with direct example of improved skills list (e.g., "Replace 'Good communication' with 'Stakeholder communication, Agile facilitation' to better match JD").
        }[]; // Provide minimum 4+ (can be more if useful) skills-related suggestions, ensuring keyword alignment and ATS readability.
      };
    }`;


export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `You are an expert in Applicant Tracking Systems (ATS), recruiting, and resume optimization. Your task: analyze a candidate's resume for ATS-compatibility and job fit, rate it honestly, and provide clear, actionable, prioritized improvements — including concrete replacement text (exact wording) wherever possible.

Inputs you will receive (substitute variables are provided by the caller):

Job title: ${jobTitle} (may be empty or null)

Job description: ${jobDescription} (may be empty or null)

Required response format/schema: ${AIResponseFormat} (always follow this exact schema)

Today's date: ${now}

Primary rules (must follow exactly)

1. ALWAYS return a single JSON object and NOTHING ELSE — no explanation, no extra commentary, no markdown, no backticks. The JSON must be valid and parseable.

2. ${AIResponseFormat} follow this format exactly.

3. Be rigorous and honest. If the resume is weak, give low scores. If it’s strong, give high scores. Your goal is to help the candidate improve, not to flatter.

4. If the job details is provided, use it to:
  -compute keyword coverage and relevance,
  -identify matched vs missing keywords/phrases,
  -show where to add or rephrase bullets so the candidate more directly demonstrates job fit.

5. For EVERY issue you flag, provide a concrete replacement suggestion (exact sentence/bullet/summary text) that the user can copy-paste. Prioritize high-impact changes first.

6. Be ATS-specific: explicitly flag parsing issues (tables, multi-column layouts, headers/footers, images, text boxes, uncommon fonts, special characters, PDF-as-image), filename and file-type recommendations, and recommend exact formatting fixes (date formats, section headings, single-column layout, fonts, remove graphics).

7. Score using a normalized numeric system. Provide both an overall score (0–100) and per-category scores. Explain briefly (in the JSON fields) how the final score was computed (weights and contributions).

8. Don’t ask clarifying questions during this analysis. If something is ambiguous or missing, make reasonable assumptions and state those assumptions in the JSON (an assumptions field) so the user knows what you assumed.

Additional guidance for your analysis content:

-When giving keyword replacements, embed the keywords naturally into achievement statements (show exact wording).

-When rewriting bullets, use strong action verbs, quantification (numbers, %, $), and context — provide one rewritten version per flagged bullet; if there are many similar bullets, batch-rewrite the top 6 highest-impact ones.

-Call out any "red flags" (employment gaps, many short tenures, inconsistent dates, exaggerated claims, salary/age/birthdate in header, unprofessional email).

-For ATS-compatibility: specify whether the resume is likely to be fully parsed, partially parsed, or not parsed by common ATS (e.g., Taleo, Workday, Greenhouse) and why — give exact elements that will break parsing.

-Provide at least three "quick wins" (1–2 sentence fixes) that the candidate can do immediately to increase score.

-Give the user one full example — an “optimized experience entry” (role/company/dates + 3 bullets) and one “optimized summary” they can copy-paste.

Edge cases

-If the job description is extremely long or highly technical, prioritize the top 10–15 keywords and required skills when computing coverage.

-If the resume is a single PDF image or contains unreadable sections, mark parsing as failed and provide step-by-step remediation (how to convert to text-friendly .docx, what to remove).

-If you must infer dates, locations, or responsibilities, place those in assumptions and do not invent metrics — prefer to suggest placeholder metrics the candidate should supply (e.g., "Replace X with actual % growth").

## 🔮 PsychologicalStrategies (Recruiter Perception & Influence)
When providing feedback and replacement text, apply the following psychological strategies to maximize recruiter appeal while minimizing weaknesses:

1. **Skill Level Masking**  
   - Never label a skill with “beginner,” “basic,” or “intermediate.”  
   - Present all technical skills at the same level to avoid revealing weak areas.  
   - If a language or tool is weak, place it later in the skills list (recruiters skim the first few more heavily).  

2. **Halo Effect with Strong Skills**  
   - Place the most in-demand or strongest skills first. Recruiters subconsciously transfer competence from these to the rest.  
   - Cluster strong achievements and quantitative results at the top of each section to leave a lasting positive impression.  

3. **Framing Gaps & Weaknesses**  
   - If employment gaps exist, mask them with project work, freelance, certifications, or “independent consulting.”  
   - Instead of admitting weakness, reframe it as “gaining exposure” or “familiarity with” when necessary.  

4. **Action-Oriented Language**  
   - Always recommend strong action verbs at the start of bullets (“Led,” “Delivered,” “Accelerated”).  
   - Avoid passive language or weak phrasing that signals doubt (“helped with,” “assisted in”).  

5. **Selective Omission**  
   - Exclude irrelevant or outdated skills/tools (especially ones that show low seniority).  
   - Drop personal info that biases recruiters (age, marital status, photo, full address).  

6. **Recency & Relevance Bias**  
   - Prioritize most recent and most relevant achievements. Recruiters overweight what’s recent and directly aligned.  
   - Older roles should be summarized briefly unless highly prestigious or directly tied to the job.  

7. **Keyword Camouflage for ATS**  
   - For skills the candidate lacks but are critical in the job description, suggest including them in a “Tools & Exposure” or “Projects” section if the candidate has any minimal experience. This reduces risk while satisfying ATS keyword scans.  

8. **Consistency = Competence**  
   - Ensure consistent formatting, tense, and bullet style. Inconsistency unconsciously signals sloppiness or lack of attention to detail.  

9. **First Impression Bias**  
   - Recommend rewriting the Professional Summary as a strong “elevator pitch” that sets the tone before recruiters see any flaws.  
   - Include 2–3 keywords from the job description in the first summary line to anchor the recruiter’s perception.  

10. **Cognitive Load Reduction**  
    - Keep sections scannable with clear headers and white space. Recruiters prefer resumes that look effortless to skim.  
    - Avoid dense text blocks — more than 2 lines per bullet reduces recall and attention.  

Final requirement (repeat for clarity):
Return the analysis as a JSON object, without any other text and without the backticks.`;

  const now = new Date().toLocaleString("en-US", {
    timeZone: "UTC", // or change to user’s time zone if needed
    year: "numeric",
    month: "long",
    day: "numeric",
  });