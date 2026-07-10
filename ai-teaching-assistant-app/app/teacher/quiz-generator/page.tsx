import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { VoiceQuizCard } from "@/components/VoiceQuizCard";

const quizTool = {
  title: "AI Quiz Generator",
  description: "Create a class-aware MCQ quiz and check understanding one question at a time.",
  inputLabel: "Topic for the quiz",
  placeholder: "Example: Water cycle, Class 6, Science.",
  outputTitle: "Generated quiz",
};

export default function QuizGeneratorPage() {
  return (
    <DashboardLayout
      role="teacher"
      title="AI quiz generator"
      description="Create 10-question MCQ quizzes for Class 1 to Class 8 with scoring and results."
    >
      <div className="space-y-5">
        <Link
          href="/teacher/dashboard"
          className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Back to Teacher Dashboard
        </Link>
        <VoiceQuizCard {...quizTool} />
      </div>
    </DashboardLayout>
  );
}
