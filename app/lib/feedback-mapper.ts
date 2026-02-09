export const feedbackMapper = (rawFeedback: any): Feedback => {
  // If it's already in the correct format, return it
  if (rawFeedback.overallScore !== undefined && rawFeedback.ATS !== undefined) {
    return rawFeedback as Feedback;
  }

  // Handle the format provided in the issue description
  const mapped: Feedback = {
    overallScore: (rawFeedback.overall_rating || 0) * 10,
    ATS: {
      score: (rawFeedback.ats_compatibility || 0) * 10,
      tips: (rawFeedback.ats_notes || []).map((tip: string) => ({
        type: "improve", // AI notes are usually improvement-focused
        tip: tip,
      })),
    },
    toneAndStyle: {
      score: (rawFeedback.overall_rating || 0) * 10, // Defaulting to overall rating as it's not explicitly in the raw format
      tips: [
        ...(rawFeedback.strengths || []).map((s: string) => ({
          type: "good",
          tip: s,
          explanation: "Strength identified in the resume content.",
        })),
        ...(rawFeedback.weaknesses || []).map((w: string) => ({
          type: "improve",
          tip: w,
          explanation: "Area identified for potential improvement.",
        })),
      ],
    },
    content: {
      score: (rawFeedback.content_score || 0) * 10,
      tips: (rawFeedback.content_notes || []).map((note: string) => ({
        type: "improve",
        tip: note,
        explanation: "Feedback regarding the content quality and depth.",
      })),
    },
    structure: {
      score: (rawFeedback.formatting_score || 0) * 10,
      tips: (rawFeedback.formatting_notes || []).map((note: string) => ({
        type: "improve",
        tip: note,
        explanation:
          "Feedback regarding the layout and formatting of the resume.",
      })),
    },
    skills: {
      score: (rawFeedback.overall_rating || 0) * 10, // Defaulting to overall rating
      tips: (rawFeedback.specific_improvements || []).map((imp: string) => ({
        type: "improve",
        tip: imp,
        explanation: "Specific actionable step to improve the resume quality.",
      })),
    },
  };

  return mapped;
};
