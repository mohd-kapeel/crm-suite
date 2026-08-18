import {
  createClient,
  type Session,
  type User,
} from "@supabase/supabase-js";

export type SupabaseUser = User;

type SupabaseSession = Session;

/* ---------------------------------------
   Supabase Environment Configuration
---------------------------------------- */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  ?.trim()
  .replace(/\/$/, "");

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

  console.log("=== SUPABASE ENV CHECK ===");
console.log("Supabase URL:", supabaseUrl);
console.log(
  "Supabase Publishable Key Loaded:",
  Boolean(supabasePublishableKey)
);
console.log("==========================");

export const supabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey
);

/* ---------------------------------------
   Supabase Client
---------------------------------------- */

export const supabase = supabaseConfigured
  ? createClient(
      supabaseUrl!,
      supabasePublishableKey!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    )
  : null;

/* ---------------------------------------
   Configuration Validation
---------------------------------------- */

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Please check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return supabase;
}

/* ---------------------------------------
   Sign Up
---------------------------------------- */

export async function signUp(
  name: string,
  email: string,
  password: string
) {
  const client = requireSupabase();

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) {
    throw new Error("Name is required.");
  }

  if (!cleanEmail) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  const { data, error } = await client.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      data: {
        full_name: cleanName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/* ---------------------------------------
   Sign In
---------------------------------------- */

export async function signIn(
  email: string,
  password: string
) {
  const client = requireSupabase();

  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  const { data, error } =
    await client.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/* ---------------------------------------
   Sign Out
---------------------------------------- */

export async function signOut() {
  const client = requireSupabase();

  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/* ---------------------------------------
   Get Current Session
---------------------------------------- */

export async function getSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error(
      "Failed to get Supabase session:",
      error
    );

    return null;
  }

  return data.session;
}

/* ---------------------------------------
   Get Current User
---------------------------------------- */

export async function getUser(): Promise<User | null> {
  if (!supabase) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(
      "Failed to get Supabase user:",
      error
    );

    return null;
  }

  return data.user;
}

/* ---------------------------------------
   Refresh Session
---------------------------------------- */

export async function refreshSession() {
  const client = requireSupabase();

  const {
    data,
    error,
  } = await client.auth.refreshSession();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/* ---------------------------------------
   Auth State Listener
---------------------------------------- */

export function onAuthStateChange(
  callback: (
    session: SupabaseSession | null
  ) => void
) {
  if (!supabase) {
    return () => {};
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}