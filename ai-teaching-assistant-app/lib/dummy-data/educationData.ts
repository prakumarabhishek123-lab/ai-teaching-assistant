import { ClassLevel, Subject } from "../config/education";

export interface StudentRecord {
  id: string;
  rollNo: number;
  name: string;
  avatar: string;
  attendancePct: number;
  status: "Present" | "Absent" | "Late";
  marks: {
    Mathematics: number;
    Science: number;
    English: number;
    Hindi: number;
    "Social Science": number;
    "Computer Studies": number;
  };
  overallGrade: string;
  category: "Excelling" | "On Track" | "Needs Support";
  parentName: string;
  parentPhone: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: Subject;
  className: ClassLevel;
  dueDate: string;
  totalMarks: number;
  submittedCount?: number;
  totalCount?: number;
  studentStatus?: "Completed" | "Pending" | "In Review";
  grade?: string;
  description: string;
}

export interface AttendanceDay {
  day: number;
  dateStr: string;
  weekday: string;
  status: "present" | "absent" | "holiday" | "weekend";
}

export const INITIAL_STUDENTS_CLASS_5: StudentRecord[] = [
  {
    id: "st-1",
    rollNo: 1,
    name: "Aarav Sharma",
    avatar: "AS",
    attendancePct: 94,
    status: "Present",
    marks: {
      Mathematics: 92,
      Science: 88,
      English: 84,
      Hindi: 90,
      "Social Science": 78,
      "Computer Studies": 95,
    },
    overallGrade: "A+",
    category: "Excelling",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98765 43210",
  },
  {
    id: "st-2",
    rollNo: 2,
    name: "Ananya Patel",
    avatar: "AP",
    attendancePct: 98,
    status: "Present",
    marks: {
      Mathematics: 96,
      Science: 94,
      English: 92,
      Hindi: 89,
      "Social Science": 90,
      "Computer Studies": 98,
    },
    overallGrade: "A+",
    category: "Excelling",
    parentName: "Kavita Patel",
    parentPhone: "+91 98765 43211",
  },
  {
    id: "st-3",
    rollNo: 3,
    name: "Rohan Gupta",
    avatar: "RG",
    attendancePct: 76,
    status: "Absent",
    marks: {
      Mathematics: 62,
      Science: 65,
      English: 59,
      Hindi: 70,
      "Social Science": 60,
      "Computer Studies": 75,
    },
    overallGrade: "C+",
    category: "Needs Support",
    parentName: "Vikas Gupta",
    parentPhone: "+91 98765 43212",
  },
  {
    id: "st-4",
    rollNo: 4,
    name: "Meera Iyer",
    avatar: "MI",
    attendancePct: 92,
    status: "Present",
    marks: {
      Mathematics: 85,
      Science: 86,
      English: 91,
      Hindi: 82,
      "Social Science": 84,
      "Computer Studies": 88,
    },
    overallGrade: "A",
    category: "On Track",
    parentName: "Ramesh Iyer",
    parentPhone: "+91 98765 43213",
  },
  {
    id: "st-5",
    rollNo: 5,
    name: "Kabir Singh",
    avatar: "KS",
    attendancePct: 89,
    status: "Present",
    marks: {
      Mathematics: 79,
      Science: 82,
      English: 74,
      Hindi: 80,
      "Social Science": 76,
      "Computer Studies": 84,
    },
    overallGrade: "B+",
    category: "On Track",
    parentName: "Harpreet Singh",
    parentPhone: "+91 98765 43214",
  },
  {
    id: "st-6",
    rollNo: 6,
    name: "Priyansh Verma",
    avatar: "PV",
    attendancePct: 72,
    status: "Absent",
    marks: {
      Mathematics: 58,
      Science: 62,
      English: 64,
      Hindi: 60,
      "Social Science": 55,
      "Computer Studies": 70,
    },
    overallGrade: "C",
    category: "Needs Support",
    parentName: "Sanjay Verma",
    parentPhone: "+91 98765 43215",
  },
  {
    id: "st-7",
    rollNo: 7,
    name: "Tanvi Deshmukh",
    avatar: "TD",
    attendancePct: 96,
    status: "Present",
    marks: {
      Mathematics: 91,
      Science: 93,
      English: 88,
      Hindi: 94,
      "Social Science": 89,
      "Computer Studies": 92,
    },
    overallGrade: "A+",
    category: "Excelling",
    parentName: "Sunil Deshmukh",
    parentPhone: "+91 98765 43216",
  },
  {
    id: "st-8",
    rollNo: 8,
    name: "Aditya Kulkarni",
    avatar: "AK",
    attendancePct: 85,
    status: "Present",
    marks: {
      Mathematics: 74,
      Science: 78,
      English: 80,
      Hindi: 75,
      "Social Science": 72,
      "Computer Studies": 80,
    },
    overallGrade: "B+",
    category: "On Track",
    parentName: "Manish Kulkarni",
    parentPhone: "+91 98765 43217",
  },
];

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "asg-1",
    title: "Fractions & Decimals Practice Sheet",
    subject: "Mathematics",
    className: "Class 5",
    dueDate: "Due Today, 5:00 PM",
    totalMarks: 20,
    submittedCount: 19,
    totalCount: 24,
    studentStatus: "Pending",
    description: "Solve 10 word problems involving like and unlike fractions.",
  },
  {
    id: "asg-2",
    title: "Water Cycle Diagram & Explanation",
    subject: "Science",
    className: "Class 5",
    dueDate: "Tomorrow, 2:00 PM",
    totalMarks: 25,
    submittedCount: 21,
    totalCount: 24,
    studentStatus: "In Review",
    description: "Draw and label condensation, evaporation, and precipitation.",
  },
  {
    id: "asg-3",
    title: "Story Comprehension: The Brave Little Sparrow",
    subject: "English",
    className: "Class 5",
    dueDate: "In 3 days",
    totalMarks: 15,
    submittedCount: 24,
    totalCount: 24,
    studentStatus: "Completed",
    grade: "14/15 (A+)",
    description: "Answer five short questions and highlight new adjectives.",
  },
  {
    id: "asg-4",
    title: "Hindi Vyakaran - Kriya aur Visheshan",
    subject: "Hindi",
    className: "Class 5",
    dueDate: "In 5 days",
    totalMarks: 20,
    submittedCount: 16,
    totalCount: 24,
    studentStatus: "Completed",
    grade: "18/20 (A)",
    description: "Identify action words and descriptors in 10 sentences.",
  },
  {
    id: "asg-5",
    title: "Local Community Helpers Project",
    subject: "Social Science",
    className: "Class 5",
    dueDate: "Next Monday",
    totalMarks: 30,
    submittedCount: 12,
    totalCount: 24,
    studentStatus: "Pending",
    description: "Interview a community worker and write a 1-page report.",
  },
];

export const MOCK_NOTICES = [
  {
    id: "not-1",
    title: "Upcoming Parent-Teacher Meeting (PTM)",
    date: "Oct 5, 2026",
    sender: "Principal's Office",
    category: "Important",
    content: "PTM for Classes 1 to 8 will be held on Saturday from 9:00 AM to 1:00 PM in the primary wing.",
  },
  {
    id: "not-2",
    title: "Science Fair Project Submissions Open",
    date: "Sep 30, 2026",
    sender: "Science Department",
    category: "Academic",
    content: "Students from Class 4 to 8 are invited to submit working models on green energy and eco-solutions.",
  },
  {
    id: "not-3",
    title: "Term 1 Report Cards Dispatch",
    date: "Sep 25, 2026",
    sender: "Examination Cell",
    category: "Grades",
    content: "First semester progress reports are compiled and available for digital download in the Parent Portal.",
  },
];

export const MOCK_CHAT_MESSAGES = [
  {
    id: "m-1",
    sender: "teacher",
    senderName: "Mrs. Sunita Verma",
    time: "Yesterday, 3:15 PM",
    text: "Namaste Mr. Sharma! Aarav performed very well in today's mental maths session. He was eager to help his group with fraction puzzles.",
  },
  {
    id: "m-2",
    sender: "parent",
    senderName: "Rajesh Sharma",
    time: "Yesterday, 4:45 PM",
    text: "Thank you Mrs. Verma! He enjoys your lessons. We have been reading English together every evening as suggested by the AI assistant.",
  },
  {
    id: "m-3",
    sender: "teacher",
    senderName: "Mrs. Sunita Verma",
    time: "Today, 10:30 AM",
    text: "That is wonderful to hear! Please remind him to submit the science diagram worksheet by tomorrow afternoon.",
  },
];

export const MOCK_MONTHLY_ATTENDANCE: AttendanceDay[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const isWeekend = day % 7 === 0 || day % 7 === 6;
  const isHoliday = day === 15;
  const isAbsent = day === 8;
  return {
    day,
    dateStr: `Sep ${day}`,
    weekday: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][(day - 1) % 7],
    status: isHoliday ? "holiday" : isWeekend ? "weekend" : isAbsent ? "absent" : "present",
  };
});
