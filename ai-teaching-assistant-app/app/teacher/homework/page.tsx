"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CLASS_LEVELS, SUBJECTS } from "@/lib/config/education";

type Priority = "Normal" | "Important" | "Urgent";
type HomeworkStatus = "Active" | "Completed";

type Homework = {
  id: string;
  title: string;
  className: string;
  subject: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  priority: Priority;
  status: HomeworkStatus;
  createdAt: string;
};

type FormErrors = {
  title?: string;
  className?: string;
  subject?: string;
  description?: string;
  dueDate?: string;
  totalMarks?: string;
};

const STORAGE_KEY = "teacher-assigned-homework";

export default function HomeworkPage() {
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [priority, setPriority] = useState<Priority>("Normal");

  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    try {
      const savedHomework = localStorage.getItem(STORAGE_KEY);

      if (savedHomework) {
        setHomeworkList(JSON.parse(savedHomework) as Homework[]);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(homeworkList));
  }, [homeworkList, isLoaded]);

  function validateForm() {
    const newErrors: FormErrors = {};
    const marks = Number(totalMarks);

    if (!title.trim()) {
      newErrors.title = "Homework title is required.";
    }

    if (!className) {
      newErrors.className = "Please select a class.";
    }

    if (!subject) {
      newErrors.subject = "Please select a subject.";
    }

    if (!description.trim()) {
      newErrors.description = "Please enter homework instructions.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Please select a due date.";
    } else if (dueDate < today) {
      newErrors.dueDate = "Due date cannot be in the past.";
    }

    if (!totalMarks) {
      newErrors.totalMarks = "Total marks are required.";
    } else if (!Number.isFinite(marks) || marks < 1 || marks > 500) {
      newErrors.totalMarks = "Enter marks between 1 and 500.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    const newHomework: Homework = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(),
      title: title.trim(),
      className,
      subject,
      description: description.trim(),
      dueDate,
      totalMarks: Number(totalMarks),
      priority,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    setHomeworkList((currentHomework) => [
      newHomework,
      ...currentHomework,
    ]);

    setTitle("");
    setClassName("");
    setSubject("");
    setDescription("");
    setDueDate("");
    setTotalMarks("");
    setPriority("Normal");
    setErrors({});
    setSuccessMessage("Homework assigned successfully.");
  }

  function updateHomeworkStatus(
    homeworkId: string,
    status: HomeworkStatus,
  ) {
    setHomeworkList((currentHomework) =>
      currentHomework.map((homework) =>
        homework.id === homeworkId
          ? { ...homework, status }
          : homework,
      ),
    );
  }

  function deleteHomework(homeworkId: string) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this homework?",
    );

    if (!shouldDelete) return;

    setHomeworkList((currentHomework) =>
      currentHomework.filter(
        (homework) => homework.id !== homeworkId,
      ),
    );
  }

  return (
    <DashboardLayout
      role="teacher"
      title="Assign homework"
      description="Create, manage, and track homework for your classes."
    >
      <div className="space-y-6">
        <Link
          href="/teacher/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <span aria-hidden="true">←</span>
          Back to Teacher Dashboard
        </Link>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              Plan classwork
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              Create a homework assignment
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Add instructions, marks, priority, and a due date.
            </p>
          </div>

          {successMessage && (
            <div
              className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 lg:grid-cols-2"
            noValidate
          >
            <FormField
              label="Homework title"
              error={errors.title}
              className="lg:col-span-2"
            >
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Fractions practice"
                className={inputClasses(Boolean(errors.title))}
              />
            </FormField>

            <FormField
              label="Class"
              error={errors.className}
            >
              <select
                value={className}
                onChange={(event) => setClassName(event.target.value)}
                className={inputClasses(Boolean(errors.className))}
              >
                <option value="">Select a class</option>

                {CLASS_LEVELS.map((classLevel) => (
                  <option key={classLevel} value={classLevel}>
                    {classLevel}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Subject"
              error={errors.subject}
            >
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className={inputClasses(Boolean(errors.subject))}
              >
                <option value="">Select a subject</option>

                {SUBJECTS.map((subjectOption) => (
                  <option key={subjectOption} value={subjectOption}>
                    {subjectOption}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Instructions"
              error={errors.description}
              className="lg:col-span-2"
            >
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={5}
                placeholder="Explain what students need to complete..."
                className={inputClasses(Boolean(errors.description))}
              />
            </FormField>

            <FormField
              label="Due date"
              error={errors.dueDate}
            >
              <input
                type="date"
                value={dueDate}
                min={today}
                onChange={(event) => setDueDate(event.target.value)}
                className={inputClasses(Boolean(errors.dueDate))}
              />
            </FormField>

            <FormField
              label="Total marks"
              error={errors.totalMarks}
            >
              <input
                type="number"
                min="1"
                max="500"
                value={totalMarks}
                onChange={(event) =>
                  setTotalMarks(event.target.value)
                }
                placeholder="Example: 20"
                className={inputClasses(Boolean(errors.totalMarks))}
              />
            </FormField>

            <FormField
              label="Priority"
              className="lg:col-span-2"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {(["Normal", "Important", "Urgent"] as Priority[]).map(
                  (priorityOption) => (
                    <label
                      key={priorityOption}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-semibold transition ${
                        priority === priorityOption
                          ? "border-amber-500 bg-white text-amber-900 ring-2 ring-amber-100"
                          : "border-amber-200 bg-white/70 text-slate-700 hover:border-amber-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priorityOption}
                        checked={priority === priorityOption}
                        onChange={() => setPriority(priorityOption)}
                        className="h-4 w-4"
                      />

                      {priorityOption}
                    </label>
                  ),
                )}
              </div>
            </FormField>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-200 sm:w-auto"
              >
                Assign Homework
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Classwork
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              Recently assigned homework
            </h2>
          </div>

          {!isLoaded ? (
            <p className="mt-6 text-sm text-slate-500">
              Loading homework...
            </p>
          ) : homeworkList.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="font-bold text-slate-900">
                No homework assigned yet
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Your new homework assignments will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {homeworkList.map((homework) => (
                <article
                  key={homework.id}
                  className="rounded-2xl border border-slate-200 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-950">
                          {homework.title}
                        </h3>

                        <StatusBadge status={homework.status} />

                        <PriorityBadge priority={homework.priority} />
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {homework.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
                        <span>{homework.className}</span>
                        <span>{homework.subject}</span>
                        <span>{homework.totalMarks} marks</span>
                        <span>
                          Due: {formatDate(homework.dueDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      {homework.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() =>
                            updateHomeworkStatus(
                              homework.id,
                              "Completed",
                            )
                          }
                          className="min-h-10 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            updateHomeworkStatus(
                              homework.id,
                              "Active",
                            )
                          }
                          className="min-h-10 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800 transition hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          Mark Active
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteHomework(homework.id)}
                        className="min-h-10 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function FormField({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>

      {children}

      {error && (
        <span className="text-sm font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function StatusBadge({ status }: { status: HomeworkStatus }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        status === "Completed"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-blue-100 text-blue-800"
      }`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const priorityClasses = {
    Normal: "bg-slate-100 text-slate-700",
    Important: "bg-amber-100 text-amber-800",
    Urgent: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClasses[priority]}`}
    >
      {priority}
    </span>
  );
}

function inputClasses(hasError: boolean) {
  return `min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-amber-500 focus:ring-amber-100"
  }`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}