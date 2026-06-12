type HowItWorksStepProps = {
  step: string;
  title: string;
  description: string;
};

export function HowItWorksStep({
  step,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
