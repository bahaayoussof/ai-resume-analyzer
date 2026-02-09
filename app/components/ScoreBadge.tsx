interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeStyles = "";
  let badgeText = "";

  if (score > 70) {
    badgeStyles = "bg-badge-green text-green-600";
    badgeText = "Strong";
  } else if (score > 49) {
    badgeStyles = "bg-badge-yellow text-yellow-600";
    badgeText = "Good Start";
  } else {
    badgeStyles = "bg-badge-red text-red-600";
    badgeText = "Needs Work";
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeStyles}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
