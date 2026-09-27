import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice-Enabled AI Teaching Assistant",
  description:
    "A classroom-focused assistant for lesson simplification, voice quizzes, translation, dictation, and digital board planning.",
};

import { AuthProvider } from "@/lib/auth/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
