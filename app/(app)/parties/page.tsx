'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TopBar from '@/components/ui/TopBar';
import PartyRow from '@/components/parties/PartyRow';
import { parties } from '@/lib/data';

type FilterTab = 'all' | 'active' | 'overdue' | 'cleared' | 'inactive';

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all',      label: 'All'      },
  { key: 'active',   label: 'Active'   },
  { key: 'overdue',  label: 'Overdue'  },
  { key: 'cleared',  label: 'Cleared'  },
  { key: 'inactive', label: 'Inactive' },
];

const OVERDUE_THRESHOLD_DAYS = 7;

function isOverdue(party: typeof parties[0]): boolean {
  return party.status === 'active' && party.balance > 0
    && party.deadlineDays < OVERDUE_THRESHOLD_DAYS;
}

export default function PartiesPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filtered = useMemo(() => {
    return parties.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
        || p.contactPerson.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === 'all'      ? true :
        activeTab === 'active'   ? p.status === 'active' && p.balance > 0 :
        activeTab === 'overdue'  ? isOverdue(p) :
        activeTab === 'cleared'  ? p.balance === 0 :
        activeTab === 'inactive' ? p.status === 'inactive' : true;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const totalOutstanding = parties
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.balance, 0);

  return (
    <div>
      <TopBar
        title="Parties"
        rightElement={
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {parties.length} total
          </span>
        }
      />

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Total outstanding pill */}
        <div style={{
          background: '#E1F5EE',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '12px', color: '#0F6E56' }}>Total outstanding</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F6E56' }}>
            Rs. {(totalOutstanding / 100000).toFixed(1)}L
          </span>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search party or contact..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              flex: 1,
              fontSize: '14px',
              color: '#1a1a1a',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '16px',
                padding: 0,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: activeTab === tab.key ? 'none' : '1px solid #e5e7eb',
                background: activeTab === tab.key ? '#1D9E75' : '#ffffff',
                color: activeTab === tab.key ? '#ffffff' : '#6b7280',
                fontSize: '12px',
                fontWeight: activeTab === tab.key ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Party list */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '0 14px',
        }}>
          {filtered.length === 0 ? (
            <div style={{
              padding: '32px 0',
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '14px',
            }}>
              No parties found
            </div>
          ) : (
            filtered.map((party, index) => (
              <div
                key={party.id}
                style={{
                  borderBottom: index === filtered.length - 1
                    ? 'none'
                    : '1px solid #f3f4f6',
                }}
              >
                <PartyRow party={party} />
              </div>
            ))
          )}
        </div>

      </div>

      {/* FAB - Add party */}
      <Link href="/parties/add" style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'fixed',
          bottom: '84px',
          right: '20px',
          width: '52px',
          height: '52px',
          background: '#1D9E75',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(29,158,117,0.4)',
          zIndex: 30,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </Link>
    </div>
  );
}