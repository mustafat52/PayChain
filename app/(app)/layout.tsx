import BottomNav from '@/components/ui/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <main style={{ paddingBottom: '72px' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}