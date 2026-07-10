export const ROLE_TYPES = ["student", "teacher", "parent"] as const;

export type RoleType = (typeof ROLE_TYPES)[number];

export const CLASS_LEVELS = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
] as const;

export type ClassLevel = (typeof CLASS_LEVELS)[number];

export const SUBJECTS = [
  "English",
  "Hindi",
  "Mathematics",
  "Environmental Studies",
  "Science",
  "Social Science",
  "Computer Studies",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const LANGUAGES = ["English", "Hindi", "Marathi"] as const;

export type Language = (typeof LANGUAGES)[number];

export const ROLE_DASHBOARD_PATHS: Record<RoleType, string> = {
  student: "/student/dashboard",
  teacher: "/teacher/dashboard",
  parent: "/parent/dashboard",
};

