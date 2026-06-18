type HowItWorksStepProps = {
  step: string;
  title: string;
  description: string;
};

const stepCardColors: Record<string, string> = {
  "1": "bg-[#e7f0ff]",
  "2": "bg-[#fff6cf]",
  "3": "bg-[#eef2f6]",
};

const stepBadgeColors: Record<string, string> = {
  "1": "bg-[#9fc5ff]",
  "2": "bg-[#f4d35e]",
  "3": "bg-[#b8c2cc]",
};

export function HowItWorksStep({
  step,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className={`flex gap-4 rounded-lg border border-white p-5 shadow-sm shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-md ${stepCardColors[step] ?? "bg-white"}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-slate-950 shadow-sm shadow-slate-900/10 ${stepBadgeColors[step] ?? "bg-white"}`}>
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
