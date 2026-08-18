import { useEffect, useState, type ReactNode } from "react";
import { Redirect, Route, Switch } from "wouter";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/ForgotPass";
import NotFound from "./pages/not-found";

import {
  getSession,
  onAuthStateChange,
  refreshSession,
} from "./lib/supabase-auth";

function ProtectedHome({
  ready,
  authenticated,
}: {
  ready: boolean;
  authenticated: boolean;
}) {
  if (!ready) {
    return <div className="auth-loading">Checking secure session…</div>;
  }

  return authenticated ? <Home /> : <Redirect to="/login" />;
}

function PublicOnly({
  children,
  ready,
  authenticated,
}: {
  children: ReactNode;
  ready: boolean;
  authenticated: boolean;
}) {
  if (!ready) {
    return <div className="auth-loading">Checking secure session…</div>;
  }

  return authenticated ? <Redirect to="/" /> : <>{children}</>;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        let session = await getSession();

        if (
          session?.refresh_token &&
          session.expires_at &&
          session.expires_at * 1000 < Date.now() + 60_000
        ) {
          const refreshed = await refreshSession();
          session = refreshed.session;
        }

        if (mounted) {
          setAuthenticated(Boolean(session?.access_token));
          setReady(true);
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);

        if (mounted) {
          setAuthenticated(false);
          setReady(true);
        }
      }
    };

    initialize();

    const unsubscribe = onAuthStateChange((nextSession) => {
      if (mounted) {
        setAuthenticated(Boolean(nextSession?.access_token));
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <Switch>
      <Route path="/">
        <ProtectedHome
          ready={ready}
          authenticated={authenticated}
        />
      </Route>

      <Route path="/login">
        <PublicOnly
          ready={ready}
          authenticated={authenticated}
        >
          <Login />
        </PublicOnly>
      </Route>

      <Route path="/signup">
        <PublicOnly
          ready={ready}
          authenticated={authenticated}
        >
          <Signup />
        </PublicOnly>
      </Route>

      <Route path="/forgot-password">
        <PublicOnly
          ready={ready}
          authenticated={authenticated}
        >
          <ForgotPassword />
        </PublicOnly>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}