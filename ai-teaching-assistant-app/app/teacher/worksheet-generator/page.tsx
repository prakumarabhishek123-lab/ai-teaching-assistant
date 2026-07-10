import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { WorksheetGenerator } from "@/components/WorksheetGenerator";

export default function WorksheetGeneratorPage() {
  return (
    <DashboardLayout
      role="teacher"
      title="AI worksheet generator"
      description="Create class-ready practice sheets for Class 1 to Class 8 with questions and answer keys."
    >
      <div className="space-y-5">
        <Link
          href="/teacher/dashboard"
          className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Back to Teacher Dashboard
        </Link>
        <WorksheetGenerator />
      </div>
    </DashboardLayout>
  );
}
