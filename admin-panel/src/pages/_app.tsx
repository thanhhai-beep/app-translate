import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { checkAuth } from '@/utils/auth';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (!isAuth && router.pathname !== '/login') {
        router.push('/login');
      }
    };

    verifyAuth();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (router.pathname === '/login') {
    return <Component {...pageProps} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
} 