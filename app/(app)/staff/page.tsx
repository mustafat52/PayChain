import TopBar from '@/components/ui/TopBar';
import StaffRow from '@/components/staff/StaffRow';
import { staffHoldings } from '@/lib/data';
import Link from 'next/link';

function formatAmount(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function StaffPage() {
  const totalCirculation = staffHoldings.reduce(
    (sum, s) => sum + s.totalHolding, 0
  );
  const overdueStaff = staffHoldings.filter(
    s => s.holdings.some(h => h.isOverdue)
  );
  const activeStaff = staffHoldings.filter(s => s.totalHolding > 0);

  return (
    <div>
      <TopBar
        title="Staff holdings"
        rightElement={
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1D9E75' }}>
            {formatAmount(totalCirculation)}
          </span>
        }
      />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            background: '#f9fafb',
            borderRadius: '10px',
            padding: '12px',
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
              Active holders
            </div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
              {activeStaff.length}
            </div>
            <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
              Staff with cash
            </div>
          </div>
          <div style={{
            background: overdueStaff.length > 0 ? '#FCEBEB' : '#f9fafb',
            borderRadius: '10px',
            padding: '12px',
          }}>
            <div style={{
              fontSize: '11px',
              color: overdueStaff.length > 0 ? '#A32D2D' : '#6b7280',
              marginBottom: '4px',
            }}>
              Overdue holders
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: overdueStaff.length > 0 ? '#E24B4A' : '#1a1a1a',
            }}>
              {overdueStaff.length}
            </div>
            <div style={{
              fontSize: '10px',
              color: overdueStaff.length > 0 ? '#A32D2D' : '#6b7280',
              marginTop: '2px',
            }}>
              Past deadline
            </div>
          </div>
        </div>

        {/* Overdue alert */}
        {overdueStaff.length > 0 && (
          <div style={{
            background: '#FAEEDA',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#633806" strokeWidth="2"
              style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{ fontSize: '12px', color: '#633806', lineHeight: 1.5 }}>
              {overdueStaff.map(s => s.name).join(', ')}{' '}
              {overdueStaff.length === 1 ? 'has' : 'have'} overdue payments.
              Follow up immediately.
            </span>
          </div>
        )}

        {/* Staff list */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '0 14px',
        }}>
          {staffHoldings.map((staff, i) => (
            <div
              key={staff.userId}
              style={{
                borderBottom: i === staffHoldings.length - 1
                  ? 'none'
                  : '1px solid #f3f4f6',
              }}
            >
              <StaffRow staff={staff} />
            </div>
          ))}
        </div>

        {/* Log handover CTA */}
        <Link href="/log" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#1D9E75',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
            }}>
              Log a handover
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}