import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main className="not-found"><div><strong>404</strong><h1>Page not found</h1><p>The page you are looking for does not exist.</p><Link href="/"><ArrowLeft size={16}/> Back to CRM Suite</Link></div></main>; }
