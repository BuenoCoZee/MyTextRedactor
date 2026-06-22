import { createContext, useState, useEffect, type ReactNode } from "react";

import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../shared/api/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) throw error;

    if (data.user) {
      setUser(data.user);
      setSession(data.session);
    }
  };
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setUser(data.user);
      setSession(data.session);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

      setIsLoading(false);
    };

    checkSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);
  return (
    <AuthContext value={{ user, session, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext>
  );
};

export { AuthContext };
export { AuthProvider };
