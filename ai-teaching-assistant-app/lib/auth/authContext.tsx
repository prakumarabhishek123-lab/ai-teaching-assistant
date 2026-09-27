"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { RoleType, ROLE_DASHBOARD_PATHS } from "../config/education";
import { supabase, isSupabaseConfigured } from "../supabase/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatar: string;
  school: string;
  classLevel?: string;
  section?: string;
  rollNo?: string;
  subject?: string;
  childName?: string;
  childClass?: string;
  phone?: string;
  joinedDate: string;
}

export const DEMO_USERS: Record<RoleType, AuthUser> = {
  student: {
    id: "user-student-1",
    name: "Aarav Sharma",
    email: "aarav.student@school.edu",
    role: "student",
    avatar: "AS",
    school: "Delhi Public Global Academy",
    classLevel: "Class 5",
    section: "A",
    rollNo: "12",
    joinedDate: "April 2024",
  },
  teacher: {
    id: "user-teacher-1",
    name: "Sunita Verma",
    email: "sunita.teacher@school.edu",
    role: "teacher",
    avatar: "SV",
    school: "Delhi Public Global Academy",
    subject: "Mathematics & Science",
    classLevel: "Class 5",
    joinedDate: "June 2021",
  },
  parent: {
    id: "user-parent-1",
    name: "Rajesh Sharma",
    email: "rajesh.parent@school.edu",
    role: "parent",
    avatar: "RS",
    school: "Delhi Public Global Academy",
    childName: "Aarav Sharma",
    childClass: "Class 5 - Section A",
    phone: "+91 98765 43210",
    joinedDate: "April 2024",
  },
};

function formatAuthUser(sbUser: SupabaseUser): AuthUser {
  const metadata = sbUser.user_metadata || {};
  const role: RoleType = (metadata.role as RoleType) || "student";
  const demo = DEMO_USERS[role] || DEMO_USERS.student;
  const fullName =
    metadata.full_name ||
    metadata.name ||
    sbUser.email?.split("@")[0] ||
    demo.name;

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || demo.avatar;

  return {
    ...demo,
    id: sbUser.id,
    name: fullName,
    email: sbUser.email || demo.email,
    role: role,
    avatar: initials,
    joinedDate: sbUser.created_at
      ? new Date(sbUser.created_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : demo.joinedDate,
  };
}

export interface LoginResult {
  error?: string;
  role?: RoleType;
}

export interface RegisterResult {
  error?: string;
  emailConfirmationRequired?: boolean;
  role?: RoleType;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password?: string,
    role?: RoleType
  ) => Promise<LoginResult | void>;
  register: (userData: {
    role: RoleType;
    name: string;
    email: string;
    password?: string;
    classLevel?: string;
    section?: string;
    rollNo?: string;
    subject?: string;
    childName?: string;
    childClass?: string;
  }) => Promise<RegisterResult | void>;
  logout: () => Promise<void>;
  switchRole: (role: RoleType) => Promise<void>;
  updateProfile: (updatedData: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        if (!isSupabaseConfigured) {
          setIsLoading(false);
          return;
        }

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Failed to retrieve Supabase session:", error);
        }

        if (isMounted) {
          if (session?.user) {
            setUser(formatAuthUser(session.user));
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        if (session?.user) {
          setUser(formatAuthUser(session.user));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password?: string,
    role?: RoleType
  ): Promise<LoginResult | void> => {
    if (!isSupabaseConfigured) {
      return {
        error:
          "Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
      };
    }

    if (!email || !password) {
      return { error: "Please enter both email and password." };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        const formatted = formatAuthUser(data.user);
        const targetRole =
          (data.user.user_metadata?.role as RoleType) || role || formatted.role;
        const finalUser = { ...formatted, role: targetRole };
        setUser(finalUser);
        router.push(ROLE_DASHBOARD_PATHS[targetRole]);
        return { role: targetRole };
      }
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : "Failed to sign in";
      if (rawMessage.toLowerCase().includes("failed to fetch")) {
        return {
          error:
            "Connection failed. Please verify your Supabase project URL and network connection in .env.local",
        };
      }
      return { error: rawMessage };
    }
  };

  const register = async (userData: {
    role: RoleType;
    name: string;
    email: string;
    password?: string;
    classLevel?: string;
    section?: string;
    rollNo?: string;
    subject?: string;
    childName?: string;
    childClass?: string;
  }): Promise<RegisterResult | void> => {
    if (!isSupabaseConfigured) {
      return {
        error:
          "Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
      };
    }

    if (!userData.email || !userData.password) {
      return { error: "Email and password are required." };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email.trim(),
        password: userData.password,
        options: {
          data: {
            full_name: userData.name.trim(),
            role: userData.role,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.session && data.user) {
        const formatted = formatAuthUser(data.user);
        setUser(formatted);
        router.push(ROLE_DASHBOARD_PATHS[userData.role]);
        return { role: userData.role };
      }

      if (data.user) {
        return { emailConfirmationRequired: true, role: userData.role };
      }
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : "Registration failed";
      if (rawMessage.toLowerCase().includes("failed to fetch")) {
        return {
          error:
            "Connection failed. Please verify your Supabase project URL and network connection in .env.local",
        };
      }
      return { error: rawMessage };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Supabase signOut error:", err);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const switchRole = async (role: RoleType) => {
    if (!user) return;
    const updatedUser = { ...user, role };
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.updateUser({
          data: { role },
        });
      } catch {
        // ignore
      }
    }
    router.push(ROLE_DASHBOARD_PATHS[role]);
  };

  const updateProfile = async (updatedData: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...updatedData };
    });

    if (isSupabaseConfigured && updatedData.name) {
      try {
        await supabase.auth.updateUser({
          data: { full_name: updatedData.name },
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
