import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Games from './components/Games';
import Welcome from './components/Welcome';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0d1117', color: '#58a6ff' }}>Initializing App...</div>;
  }

  return (
    <>
      {!session ? <Auth session={session} /> : showWelcome ? <Welcome onAccept={() => setShowWelcome(false)} /> : <Games session={session} />}
    </>
  );
}

export default App;