import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalNav from '@/components/portal/PortalNav';

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('portal_auth');
  if (!auth || auth.value !== 'authenticated') {
    redirect('/portal');
  }

  return (
    <div className="flex min-h-screen">
      <PortalNav />
      <main className="flex-1 overflow-auto bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
