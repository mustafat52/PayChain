import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Party } from '@/lib/types';

interface PartyRowProps {
  party: Party;
}

function formatAmount(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function getStatusBadge(party: Party): {
  text: string;
  variant: 'green' | 'amber' | 'red' | 'gray';
} {
  if (party.status === 'inactive') return { text: 'Inactive', variant: 'gray' };
  if (party.balance === 0) return { text: 'Cleared', variant: 'green' };
  return { text: 'Active', variant: 'amber' };
}

function getAmountColor(party: Party): string {
  if (party.balance === 0) return '#1D9E75';
  return '#1a1a1a';
}

export default function PartyRow({ party }: PartyRowProps) {
  const status = getStatusBadge(party);

  return (
    <Link href={`/parties/${party.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid #f3f4f6',
      }}>
        <Avatar name={party.name} size={40} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {party.name}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
            {party.contactPerson}
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: getAmountColor(party),
          }}>
            {formatAmount(party.balance)}
          </div>
          <div style={{ marginTop: '3px' }}>
            <Badge text={status.text} variant={status.variant} />
          </div>
        </div>
      </div>
    </Link>
  );
}