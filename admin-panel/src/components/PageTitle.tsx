import Head from 'next/head';

interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <Head>
      <title>{title} - Admin Panel</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
} 