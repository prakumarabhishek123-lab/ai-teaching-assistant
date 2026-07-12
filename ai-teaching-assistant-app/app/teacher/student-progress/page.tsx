"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CLASS_LEVELS, SUBJECTS } from "@/lib/config/education";

type ProgressStatus = "Excellent" | "On Track" | "Needs Support";

type StudentRecord = {
  id: number;
  name: string;
  className: string;
  subject: string;
  homeworkCompleted: number;
  totalHomework: number;
  quizAverage: number;
  attendance: number;
  status: ProgressStatus;
};

const studentRecords: StudentRecord[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    className: "Class 5",
    subject: "Mathematics",
    homeworkCompleted: 9,
    totalHomework: 10,
    quizAverage: 92,
    attendance: 96,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Ananya Singh",
    className: "Class 5",
    subject: "Mathematics",
    homeworkCompleted: 8,
    totalHomework: 10,
    quizAverage: 84,
    attendance: 91,
    status: "On Track",
  },
  {
    id: 3,
    name: "Rohan Kumar",
    className: "Class 5",
    subject: "Mathematics",
    homeworkCompleted: 5,
    totalHomework: 10,
    quizAverage: 58,
    attendance: 76,
    status: "Needs Support",
  },
  {
    id: 4,
    name: "Meera Patel",
    className: "Class 4",
    subject: "Environmental Studies",
    homeworkCompleted: 10,
    totalHomework: 10,
    quizAverage: 95,
    attendance: 98,
    status: "Excellent",
  },
  {
    id: 5,
    name: "Aditya Verma",
    className: "Class 4",
    subject: "Environmental Studies",
    homeworkCompleted: 7,
    totalHomework: 10,
    quizAverage: 79,
    attendance: 88,
    status: "On Track",
  },
  {
    id: 6,
    name: "Ishita Gupta",
    className: "Class 6",
    subject: "English",
    homeworkCompleted: 8,
    totalHomework: 10,
    quizAverage: 87,
    attendance: 93,
    status: "On Track",
  },
  {
    id: 7,
    name: "Kabir Khan",
    className: "Class 6",
    subject: "English",
    homeworkCompleted: 4,
    totalHomework: 10,
    quizAverage: 54,
    attendance: 72,
    status: "Needs Support",
  },
  {
    id: 8,
    name: "Saanvi Mishra",
    className: "Class 7",
    subject: "Science",
    homeworkCompleted: 10,
    totalHomework: 10,
    quizAverage: 94,
    attendance: 97,
    status: "Excellent",
  },
  {
    id: 9,
    name: "Vihaan Joshi",
    className: "Class 7",
    subject: "Science",
    homeworkCompleted: 7,
    totalHomework: 10,
    quizAverage: 81,
    attendance: 89,
    status: "On Track",
  },
  {
    id: 10,
    name: "Diya Roy",
    className: "Class 8",
    subject: "Mathematics",
    homeworkCompleted: 6,
    totalHomework: 10,
    quizAverage: 67,
    attendance: 82,
    status: "Needs Support",
  },
];

export default function StudentProgressPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filteredStudents = useMemo(() => {
    return studentRecords.filter((student) => {
      const matchesClass =
        !selectedClass || student.className === selectedClass;

      const matchesSubject =
        !selectedSubject || student.subject === selectedSubject;

      return matchesClass && matchesSubject;
    });
  }, [selectedClass, selectedSubject]);

  const overview = useMemo(() => {
    if (filteredStudents.length === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        homeworkCompletion: 0,
        studentsNeedingSupport: 0,
      };
    }

    const totalQuizScore = filteredStudents.reduce(
      (total, student) => total + student.quizAverage,
      0,
    );

    const completedHomework = filteredStudents.reduce(
      (total, student) => total + student.homeworkCompleted,
      0,
    );

    const assignedHomework = filteredStudents.reduce(
      (total, student) => total + student.totalHomework,
      0,
    );

    const studentsNeedingSupport = filteredStudents.filter(
      (student) => student.status === "Needs Support",
    ).length;

    return {
      totalStudents: filteredStudents.length,
      averageScore: Math.round(
        totalQuizScore / filteredStudents.length,
      ),
      homeworkCompletion:
        assignedHomework > 0
          ? Math.round(
              (completedHomework / assignedHomework) * 100,
            )
          : 0,
      studentsNeedingSupport,
    };
  }, [filteredStudents]);

  function clearFilters() {
    setSelectedClass("");
    setSelectedSubject("");
  }

  return (
    <DashboardLayout
      role="teacher"
      title="Student progress"
      description="Review homework completion, quiz performance, attendance, and students who may need support."
    >
      <div className="space-y-6">
        <Link
          href="/teacher/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <span aria-hidden="true">←</span>
          Back to Teacher Dashboard
        </Link>

        <section
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
          aria-labelledby="progress-filters-heading"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                Learning insights
              </p>

              <h2
                id="progress-filters-heading"
                className="mt-1 text-2xl font-bold text-slate-950"
              >
                Filter student records
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Select a class or subject to review specific students.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[34rem]">
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                Class

                <select
                  value={selectedClass}
                  onChange={(event) =>
                    setSelectedClass(event.target.value)
                  }
                  className="min-h-12 rounded-xl border border-emerald-200 bg-white px-4 text-base font-semibold outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="">All classes</option>

                  {CLASS_LEVELS.map((classLevel) => (
                    <option key={classLevel} value={classLevel}>
                      {classLevel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                Subject

                <select
                  value={selectedSubject}
                  onChange={(event) =>
                    setSelectedSubject(event.target.value)
                  }
                  className="min-h-12 rounded-xl border border-emerald-200 bg-white px-4 text-base font-semibold outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="">All subjects</option>

                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </section>

        <section aria-labelledby="progress-overview-heading">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Overview
            </p>

            <h2
              id="progress-overview-heading"
              className="mt-1 text-2xl font-bold text-slate-950"
            >
              Class performance
            </h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewCard
              value={String(overview.totalStudents)}
              label="Total students"
              description="Students in the current view"
            />

            <OverviewCard
              value={`${overview.averageScore}%`}
              label="Average score"
              description="Average quiz performance"
            />

            <OverviewCard
              value={`${overview.homeworkCompletion}%`}
              label="Homework completion"
              description="Assigned homework completed"
            />

            <OverviewCard
              value={String(overview.studentsNeedingSupport)}
              label="Need support"
              description="Students requiring attention"
            />
          </div>
        </section>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          aria-labelledby="student-records-heading"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-violet-700">
                Student records
              </p>

              <h2
                id="student-records-heading"
                className="mt-1 text-2xl font-bold text-slate-950"
              >
                Detailed progress
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Showing {filteredStudents.length} student
                {filteredStudents.length === 1 ? "" : "s"}.
              </p>
            </div>

            {(selectedClass || selectedSubject) && (
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredStudents.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="font-bold text-slate-900">
                No student records found
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Try choosing a different class or subject.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 min-h-11 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Show all students
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[58rem] text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="pb-3 pr-4 font-semibold">
                        Student
                      </th>

                      <th className="pb-3 pr-4 font-semibold">
                        Class
                      </th>

                      <th className="pb-3 pr-4 font-semibold">
                        Subject
                      </th>

                      <th className="pb-3 pr-4 font-semibold">
                        Homework
                      </th>

                      <th className="pb-3 pr-4 font-semibold">
                        Quiz average
                      </th>

                      <th className="pb-3 pr-4 font-semibold">
                        Attendance
                      </th>

                      <th className="pb-3 text-right font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="py-4 pr-4 font-bold text-slate-950">
                          {student.name}
                        </td>

                        <td className="py-4 pr-4 font-medium text-slate-700">
                          {student.className}
                        </td>

                        <td className="py-4 pr-4 text-slate-600">
                          {student.subject}
                        </td>

                        <td className="py-4 pr-4 text-slate-600">
                          {student.homeworkCompleted} of{" "}
                          {student.totalHomework}
                        </td>

                        <td className="py-4 pr-4 font-semibold text-slate-700">
                          {student.quizAverage}%
                        </td>

                        <td className="py-4 pr-4 font-semibold text-slate-700">
                          {student.attendance}%
                        </td>

                        <td className="py-4 text-right">
                          <ProgressBadge status={student.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-4 md:hidden">
                {filteredStudents.map((student) => (
                  <article
                    key={student.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-950">
                          {student.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          {student.className} · {student.subject}
                        </p>
                      </div>

                      <ProgressBadge status={student.status} />
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-3">
                      <MobileStat
                        label="Homework"
                        value={`${student.homeworkCompleted}/${student.totalHomework}`}
                      />

                      <MobileStat
                        label="Quiz average"
                        value={`${student.quizAverage}%`}
                      />

                      <MobileStat
                        label="Attendance"
                        value={`${student.attendance}%`}
                      />

                      <MobileStat
                        label="Progress"
                        value={student.status}
                      />
                    </dl>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function OverviewCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-black text-slate-950">
        {value}
      </p>

      <h3 className="mt-2 font-bold text-slate-900">
        {label}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </article>
  );
}

function ProgressBadge({
  status,
}: {
  status: ProgressStatus;
}) {
  const statusClasses: Record<ProgressStatus, string> = {
    Excellent: "bg-emerald-100 text-emerald-800",
    "On Track": "bg-blue-100 text-blue-800",
    "Needs Support": "bg-amber-100 text-amber-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}

function MobileStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>

      <dd className="mt-1 text-sm font-bold text-slate-900">
        {value}
      </dd>
    </div>
  );
}