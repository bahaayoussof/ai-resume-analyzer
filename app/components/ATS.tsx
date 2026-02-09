import { cn } from "~/lib/utils";

type ATSStatus = "good" | "warning" | "bad";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const getATSStatus = (score: number): ATSStatus => {
  if (score > 69) return "good";
  if (score > 49) return "warning";
  return "bad";
};

const STATUS_CONFIG: Record<ATSStatus, { bg: string; icon: string }> = {
  good: { bg: "from-green-100", icon: "/icons/ats-good.svg" },
  warning: { bg: "from-yellow-100", icon: "/icons/ats-warning.svg" },
  bad: { bg: "from-red-100", icon: "/icons/ats-bad.svg" },
};

const SuggestionItem = ({ type, tip }: Suggestion) => (
  <div className="flex flex-row gap-2 items-center">
    <img
      src={type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
      alt={type}
      className="w-4 h-4"
    />
    <p className="text-lg text-gray-500">{tip}</p>
  </div>
);

const ATS = ({ score, suggestions }: ATSProps) => {
  const status = getATSStatus(score);
  const { bg, icon } = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
        bg,
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        <img src={icon} alt={`ATS status: ${status}`} className="w-10 h-10" />
        <p className="text-2xl font-semibold">ATS Score - {score}/100</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>

        {suggestions.map((suggestion, index) => (
          <SuggestionItem key={index} {...suggestion} />
        ))}

        <p className="text-lg text-gray-500 mt-2">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
