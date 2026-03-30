import Badge from '@/components/ui/Badge';
import { FeedItem as FeedItemType } from '@/lib/types';

interface FeedItemProps {
  item: FeedItemType;
}

function timeAgo(dateStr: string): string {
  const now = new Date('2024-03-24T12:00:00Z');
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

function formatAmount(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function getBadge(item: FeedItemType): {
  text: string;
  variant: 'green' | 'amber' | 'blue' | 'gray';
} {
  if (item.type === 'handover') return { text: 'Transfer', variant: 'green' };
  if (item.type === 'settled') return { text: 'Settled', variant: 'blue' };
  if (item.paymentMethod === 'cash') return { text: 'Cash', variant: 'amber' };
  if (item.paymentMethod === 'online') return { text: 'Online', variant: 'blue' };
  if (item.paymentMethod === 'cheque') return { text: 'Cheque', variant: 'gray' };
  return { text: 'Cash', variant: 'amber' };
}

export default function FeedItem({ item }: FeedItemProps) {
  const badge = getBadge(item);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '12px 14px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4px',
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#1a1a1a',
          flex: 1,
          paddingRight: '8px',
        }}>
          {item.description}
        </div>
        <div style={{ fontSize: '11px', color: '#6b7280', flexShrink: 0 }}>
          {timeAgo(item.createdAt)}
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '8px',
      }}>
        {item.type === 'handover'
          ? `Cash passed along — from ${item.personName}`
          : item.type === 'settled'
          ? `Payment settled with ${item.personName}`
          : `Collected by ${item.personName}`}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Badge text={badge.text} variant={badge.variant} />
          <Badge text={item.partyName} variant="gray" />
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#1D9E75',
        }}>
          {formatAmount(item.amount)}
        </div>
      </div>
    </div>
  );
}