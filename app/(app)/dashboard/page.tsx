import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import FeedItem from '@/components/dashboard/FeedItem';
import OverdueAlert from '@/components/dashboard/OverDueAlert';
import { dashboardStats, feedItems, notifications } from '@/lib/data';

function formatAmount(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function DashboardPage() {
  const unreadCount = notifications.filter(n => !n.read).length;
  const overdueNotif = notifications.find(n => n.type === 'overdue' && !n.read);

  return (
    <div>
      {/* Top Bar */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '14px 16px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Good morning,</div>
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>
            Accountant
          </div>
        </div>
        <Link href="/notifications" style={{ position: 'relative', textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '8px',
              height: '8px',
              background: '#E24B4A',
              borderRadius: '50%',
              border: '1.5px solid #ffffff',
            }} />
          )}
        </Link>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}>
          <StatCard
            label="Total outstanding"
            value={formatAmount(dashboardStats.totalOutstanding)}
            sub={`Across ${10} parties`}
          />
          <StatCard
            label="Cash in circulation"
            value={formatAmount(dashboardStats.cashInCirculation)}
            sub="With staff"
          />
          <StatCard
            label="Collected today"
            value={formatAmount(dashboardStats.collectedToday)}
            sub="1 transaction"
          />
          <StatCard
            label="Overdue"
            value={String(dashboardStats.overdueCount)}
            sub="Past deadline"
            valueColor="#E24B4A"
          />
        </div>

        {/* Overdue Alert */}
        {overdueNotif && (
          <OverdueAlert message={overdueNotif.message} />
        )}

        {/* Live Feed */}
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#6b7280',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Live feed
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {feedItems.map(item => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}