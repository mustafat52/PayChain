import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { StaffHolding } from '@/lib/types';

interface StaffRowProps {
  staff: StaffHolding;
}

function formatAmount(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function StaffRow({ staff }: StaffRowProps) {
  const isOverdue = staff.holdings.some(h => h.isOverdue);
  const hasHolding = staff.totalHolding > 0;
  const partyNames = [...new Set(staff.holdings.map(h => h.partyName))];

  return (
    <div style={{
      padding: '14px 0',
      borderBottom: '1px solid #f3f4f6',
    }}>
      {/* Main row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <Avatar name={staff.name} size={42} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1a1a1a',
            }}>
              {staff.name}
            </span>
            {isOverdue && (
              <Badge text="Overdue" variant="red" />
            )}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
            {hasHolding
              ? `${staff.holdings.length} payment${staff.holdings.length > 1 ? 's' : ''}`
              : 'No holdings'}
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontSize: '15px',
            fontWeight: 700,
            color: hasHolding ? '#1D9E75' : '#6b7280',
          }}>
            {formatAmount(staff.totalHolding)}
          </div>
        </div>
      </div>

      {/* Holdings breakdown */}
      {staff.holdings.map((holding, i) => (
        <div key={i} style={{
          marginTop: '8px',
          marginLeft: '54px',
          background: holding.isOverdue ? '#FCEBEB' : '#f9fafb',
          borderRadius: '8px',
          padding: '8px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 500,
              color: holding.isOverdue ? '#A32D2D' : '#1a1a1a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {holding.partyName}
            </div>
            <div style={{
              fontSize: '11px',
              color: holding.isOverdue ? '#A32D2D' : '#6b7280',
              marginTop: '1px',
            }}>
              {holding.daysHeld} day{holding.daysHeld !== 1 ? 's' : ''}
              {holding.isOverdue ? ' — OVERDUE' : ''}
            </div>
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: holding.isOverdue ? '#E24B4A' : '#1D9E75',
            flexShrink: 0,
          }}>
            {formatAmount(holding.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}