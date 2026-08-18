import { useEffect, useState, type ReactNode } from "react";
import { Redirect, Route, Switch } from "wouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/not-found";
import { getSession, onAuthStateChange, refreshSession } from "./lib/supabase-auth";

function ProtectedHome({ ready, authenticated }: { ready: boolean; authenticated: boolean }) {
  if (!ready) return <div className="auth-loading">Checking secure session…</div>;
  return authenticated ? <Home /> : <Redirect to="/login" />;
}

function PublicOnly({ children, ready, authenticated }: { children: ReactNode; ready: boolean; authenticated: boolean }) {
  if (!ready) return <div className="auth-loading">Checking secure session…</div>;
  return authenticated ? <Redirect to="/" /> : <>{children}</>;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(Boolean(getSession()?.access_token));

  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      const session = getSession();
      if (session?.refresh_token && session.expires_at && session.expires_at * 1000 < Date.now() + 60_000) {
        await refreshSession();
      }
      if (mounted) {
        setAuthenticated(Boolean(getSession()?.access_token));
        setReady(true);
      }
    };
    initialize();
    return onAuthStateChange((next) => {
      if (mounted) setAuthenticated(Boolean(next?.access_token));
    });
  }, []);

  return (
    <Switch>
      <Route path="/">
        <ProtectedHome ready={ready} authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <PublicOnly ready={ready} authenticated={authenticated}><Login /></PublicOnly>
      </Route>
      <Route path="/signup">
        <PublicOnly ready={ready} authenticated={authenticated}><Signup /></PublicOnly>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
