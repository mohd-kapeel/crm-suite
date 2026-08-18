import { useState, type FormEvent } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AuthLayout } from "../components/auth-layout";
import { signUp, supabaseConfigured } from "../lib/supabase-auth";

export default function Signup() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!supabaseConfigured) { setError("Supabase is not configured. Add your project URL and publishable key to .env.local."); return; }
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const result = await signUp(name, email, password);

if (result?.session?.access_token) {
  navigate("/");
} else {
        setSuccess("Account created. Please verify your email, then sign in to enter CRM Suite.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  return <AuthLayout title="Create your account" subtitle="Create your Supabase account and enter your CRM workspace.">
    <form className="auth-form" onSubmit={submit}>
      <label>Full name<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name" autoComplete="name" required /></label>
      <label>Work email<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" required /></label>
      <label>Password<div className="password-wrap"><input type={show ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} autoComplete="new-password" required /><button type="button" onClick={()=>setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
      <label>Confirm password<input type={show ? "text" : "password"} value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Repeat your password" autoComplete="new-password" required /></label>
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}
      <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Creating account…" : <><UserPlus size={17}/> Create account</>}</button>
      <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
    </form>
  </AuthLayout>;
}
