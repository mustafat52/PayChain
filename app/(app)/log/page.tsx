'use client';

import { useState } from 'react';
import TopBar from '@/components/ui/TopBar';
import PartyPaymentForm from '@/components/log/PartyPaymentForm';
import HandoverForm from '@/components/log/HandoverForm';

type Tab = 'party' | 'handover';

export default function LogPage() {
  const [activeTab, setActiveTab] = useState<Tab>('party');

  return (
    <div>
      <TopBar title="Log a transaction" />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#f3f4f6',
          borderRadius: '10px',
          padding: '4px',
          gap: '4px',
        }}>
          {([
            { key: 'party',    label: 'Party payment' },
            { key: 'handover', label: 'Staff handover' },
          ] as { key: Tab; label: string }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '9px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.key ? '#ffffff' : 'transparent',
                color: activeTab === tab.key ? '#1a1a1a' : '#6b7280',
                fontSize: '13px',
                fontWeight: activeTab === tab.key ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: activeTab === tab.key
                  ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        {activeTab === 'party'
          ? <PartyPaymentForm />
          : <HandoverForm />
        }

      </div>
    </div>
  );
}