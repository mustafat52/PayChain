import { notFound } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import JourneyStep from '@/components/parties/JourneyStep';
import { parties, transactions, transfers } from '@/lib/data';

interface Props {
  params: { id: string };
}

function formatAmount(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatAmountShort(amount: number): string {
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function PartyDetailPage({ params }: Props) {
  const party = parties.find(p => p.id === params.id);
  if (!party) notFound();

  const partyTransactions = transactions
    .filter(t => t.partyId === party.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const lifetimePaid = partyTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  // Get active payment journey — latest debit transaction
  const latestPayment = partyTransactions.find(t => t.type === 'debit');

  // Get transfers related to this party
  const partyTransfers = transfers
    .filter(t => t.partyId === party.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // Build journey steps
  const journeySteps: {
    person: string;
    time: string;
    amount?: string;
    status: 'done' | 'active' | 'pending';
  }[] = [];

  if (latestPayment) {
    // Step 1 — party paid
    journeySteps.push({
      person: `${party.contactPerson} (Client)`,
      time: formatDate(latestPayment.createdAt),
      amount: `Paid ${formatAmountShort(latestPayment.amount)} ${latestPayment.paymentMethod}`,
      status: 'done',
    });

    // Steps from transfers
    partyTransfers.forEach((tr, index) => {
      journeySteps.push({
        person: `${tr.toUserName}`,
        time: formatDate(tr.createdAt),
        amount: `Holding ${formatAmountShort(tr.amount)}`,
        status: index === partyTransfers.length - 1 ? 'active' : 'done',
      });
    });

    // If no transfers yet — collector is first holder
    if (partyTransfers.length === 0 && latestPayment.receivedByName) {
      journeySteps.push({
        person: `${latestPayment.receivedByName} (Collector)`,
        time: formatDate(latestPayment.createdAt),
        amount: `Holding ${formatAmountShort(latestPayment.amount)}`,
        status: 'active',
      });
    }

    // Pending steps
    if (partyTransfers.length < 2) {
      journeySteps.push({
        person: 'Khaleel (Supervisor)',
        time: 'Pending',
        status: 'pending',
      });
    }
    journeySteps.push({
      person: 'Accountant',
      time: 'Pending',
      status: 'pending',
    });
  }

  const statusBadge = party.balance === 0
    ? { text: 'Cleared', variant: 'green' as const }
    : party.status === 'inactive'
    ? { text: 'Inactive', variant: 'gray' as const }
    : { text: 'Active', variant: 'amber' as const };

  return (
    <div>
      <TopBar
        title={party.name}
        backHref="/parties"
        rightElement={<Badge text={statusBadge.text} variant={statusBadge.variant} />}
      />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <StatCard
            label="Outstanding balance"
            value={formatAmountShort(party.balance)}
            valueColor={party.balance === 0 ? '#1D9E75' : '#1a1a1a'}
          />
          <StatCard
            label="Lifetime paid"
            value={formatAmountShort(lifetimePaid)}
          />
        </div>

        {/* Party info */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {[
            { label: 'Contact', value: party.contactPerson },
            { label: 'Phone', value: party.phone },
            { label: 'Deadline', value: `${party.deadlineDays} days per payment` },
            { label: 'Type', value: party.type === 'long_term' ? 'Long-term' : 'One-time' },
            ...(party.notes ? [{ label: 'Notes', value: party.notes }] : []),
          ].map((row, i, arr) => (
            <div key={row.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '11px 14px',
              borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
              gap: '12px',
            }}>
              <span style={{ fontSize: '13px', color: '#6b7280', flexShrink: 0 }}>
                {row.label}
              </span>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#1a1a1a',
                textAlign: 'right',
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Current payment journey */}
        {journeySteps.length > 0 && (
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#6b7280',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}>
              Current payment journey
            </div>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '14px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>
                  {latestPayment && formatAmountShort(latestPayment.amount)}
                  {latestPayment?.paymentMethod && (
                    <span style={{ fontWeight: 400, color: '#6b7280' }}>
                      {' '}· {latestPayment.paymentMethod.charAt(0).toUpperCase()
                        + latestPayment.paymentMethod.slice(1)}
                    </span>
                  )}
                </span>
                <Badge text="In transit" variant="amber" />
              </div>
              {journeySteps.map((step, i) => (
                <JourneyStep
                  key={i}
                  person={step.person}
                  time={step.time}
                  amount={step.amount}
                  status={step.status}
                  isLast={i === journeySteps.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Transaction history */}
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#6b7280',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Transaction history
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {partyTransactions.length === 0 ? (
              <div style={{
                padding: '24px',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '13px',
              }}>
                No transactions yet
              </div>
            ) : (
              partyTransactions.map((txn, i) => (
                <div key={txn.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderBottom: i < partyTransactions.length - 1
                    ? '1px solid #f3f4f6'
                    : 'none',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: txn.type === 'debit' ? '#E1F5EE' : '#FCEBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={txn.type === 'debit' ? '#1D9E75' : '#E24B4A'}
                      strokeWidth="2.5">
                      {txn.type === 'debit'
                        ? <path d="M12 19V5M5 12l7-7 7 7" />
                        : <path d="M12 5v14M5 12l7 7 7-7" />
                      }
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>
                      {txn.type === 'debit' ? 'Payment received' : 'Credit — new supply'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                      {formatDate(txn.createdAt)}
                      {txn.receivedByName && ` · via ${txn.receivedByName}`}
                      {txn.note && ` · ${txn.note}`}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: txn.type === 'debit' ? '#1D9E75' : '#E24B4A',
                    flexShrink: 0,
                  }}>
                    {txn.type === 'debit' ? '−' : '+'}
                    {formatAmountShort(txn.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}