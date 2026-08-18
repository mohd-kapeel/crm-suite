import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AuthLayout } from "../components/auth-layout";
import { signIn, supabaseConfigured } from "../lib/supabase-auth";

export default function Login() {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!supabaseConfigured) {
      setError(
        "Supabase is not configured. Add your project URL and publishable key to .env.local."
      );
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in with your Supabase account to continue to your CRM workspace."
    >
      <form className="auth-form" onSubmit={submit}>
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Password

          <div className="password-wrap">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label="Toggle password visibility"
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        {/* Forgot Password */}
        <div
          style={{
            textAlign: "right",
            marginTop: "-8px",
            marginBottom: "4px",
          }}
        >
          <Link
            href="/forgot-password"
            style={{
              color: "#4f46e5",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            "Signing in…"
          ) : (
            <>
              <LogIn size={17} />
              Sign in
            </>
          )}
        </button>

        <p className="auth-switch">
          New to CRM Suite?{" "}
          <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}