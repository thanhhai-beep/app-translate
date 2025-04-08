import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = router.pathname === '/login';

  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
} 