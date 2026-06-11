import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalNav from '@/components/portal/PortalNav';
import { PORTAL_SESSION_COOKIE, verifySessionToken } from '@/lib/portal-auth';

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token, process.env.PORTAL_SESSION_SECRET);
  if (!valid) {
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
