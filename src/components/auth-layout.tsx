import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { asset } from "../data/crm-data";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <section className="auth-shell">
        <aside className="auth-brand-panel">
          <Link href="/login" className="auth-back"><ArrowLeft size={15}/> Back to sign in</Link>
          <div className="auth-brand">
            <span className="auth-logo"><img src={asset("inventmodel-logo.jpeg")} alt="InventModel" /></span>
            <div><strong>CRM <span>Suite</span></strong><small>InventModel Technology Solution</small></div>
          </div>
          <div className="auth-brand-copy">
            <span className="auth-kicker"><ShieldCheck size={14}/> Secure workspace access</span>
            <h2>One clean workspace for your entire sales operation.</h2>
            <p>Manage leads, pipelines, teams and customer activity from a modern CRM experience.</p>
            <div className="auth-points"><span>✓ Lead & contact management</span><span>✓ Pipeline visibility</span><span>✓ Team collaboration</span></div>
          </div>
        </aside>
        <section className="auth-card">
          <div className="auth-heading"><span>CRM SUITE</span><h1>{title}</h1><p>{subtitle}</p></div>
          {children}
        </section>
      </section>
    </main>
  );
}
