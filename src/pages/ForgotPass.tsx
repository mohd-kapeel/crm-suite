import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { AuthLayout } from "../components/auth-layout";
import { supabase, supabaseConfigured } from "../lib/supabase-auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!supabaseConfigured || !supabase) {
      setError("Supabase is not configured.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      setMessage(
        "Password reset link has been sent to your email. Please check your inbox."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email address and we'll send you a password reset link."
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

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#047857",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>

        <p className="auth-switch">
          Remember your password?{" "}
          <Link href="/login">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}