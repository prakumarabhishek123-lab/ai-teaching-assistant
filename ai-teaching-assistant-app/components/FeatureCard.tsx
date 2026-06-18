type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

const cardColors: Record<string, string> = {
  CS: "bg-[#dff3ff]",
  VQ: "bg-[#ffe2c9]",
  TR: "bg-[#e4dcff]",
};

const iconColors: Record<string, string> = {
  CS: "bg-[#c5ebff]",
  VQ: "bg-[#ffd3ad]",
  TR: "bg-[#d4c5ff]",
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className={`rounded-lg border border-white bg-[#d8f7ef] p-6 text-slate-950 shadow-sm shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-md ${cardColors[icon] ?? ""}`}>
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#a7ead9] text-2xl shadow-sm shadow-slate-900/10 ${iconColors[icon] ?? ""}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
    </article>
  );
}
