import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:8000/bank/user/me/', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        setUser(data);
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="bg-black">
        <div className="flex w-screen h-screen items-center justify-center bg-neutral-800/30">
          Carregando...
        </div>
      </div>
    );

  return isAuth ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/login" replace />
  );
}
