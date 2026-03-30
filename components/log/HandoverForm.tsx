'use client';

import { useState } from 'react';
import { staffHoldings, parties } from '@/lib/data';

export default function HandoverForm() {
  const [fromUser, setFromUser]   = useState('');
  const [toUser, setToUser]       = useState('');
  const [amount, setAmount]       = useState('');
  const [partyId, setPartyId]     = useState('');
  const [note, setNote]           = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeHolders = staffHoldings.filter(s => s.totalHolding > 0);
  const selectedHolder = staffHoldings.find(s => s.userId === fromUser);
  const availableReceivers = staffHoldings.filter(
    s => s.userId !== fromUser
  );

  function handleSubmit() {
    if (!fromUser || !toUser || !amount || !partyId) return;
    setSubmitted(true);
    setTimeout(() => {
      setFromUser('');
      setToUser('');
      setAmount('');
      setPartyId('');
      setNote('');
      setSubmitted(false);
    }, 2500);
  }

  if (submitted) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: '14px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#E1F5EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#1D9E75" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
          Handover logged!
        </div>
        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          Holdings updated for both staff
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* From */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          From (handing over) *
        </label>
        <select
          value={fromUser}
          onChange={e => { setFromUser(e.target.value); setPartyId(''); }}
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: fromUser ? '#1a1a1a' : '#6b7280',
            background: '#ffffff',
            outline: 'none',
          }}
        >
          <option value="">Select staff...</option>
          {activeHolders.map(s => (
            <option key={s.userId} value={s.userId}>
              {s.name} — Rs. {s.totalHolding.toLocaleString('en-IN')}
            </option>
          ))}
        </select>

        {/* Show what they're holding */}
        {selectedHolder && selectedHolder.holdings.map((h, i) => (
          <div key={i} style={{
            marginTop: '6px',
            padding: '8px 10px',
            background: '#f9fafb',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#6b7280',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{h.partyName}</span>
            <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
              Rs. {h.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      {/* To */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          To (receiving) *
        </label>
        <select
          value={toUser}
          onChange={e => setToUser(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: toUser ? '#1a1a1a' : '#6b7280',
            background: '#ffffff',
            outline: 'none',
          }}
        >
          <option value="">Select staff...</option>
          {availableReceivers.map(s => (
            <option key={s.userId} value={s.userId}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Amount (Rs.) *
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount being passed"
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: '#1a1a1a',
            background: '#ffffff',
            outline: 'none',
          }}
        />
      </div>

      {/* Original party */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Original party (source) *
        </label>
        <select
          value={partyId}
          onChange={e => setPartyId(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: partyId ? '#1a1a1a' : '#6b7280',
            background: '#ffffff',
            outline: 'none',
          }}
        >
          <option value="">Select party...</option>
          {selectedHolder
            ? selectedHolder.holdings.map(h => (
                <option key={h.partyId} value={h.partyId}>
                  {h.partyName}
                </option>
              ))
            : parties.filter(p => p.status === 'active').map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
          }
        </select>
      </div>

      {/* Note */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Any remarks..."
          rows={3}
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: '#1a1a1a',
            background: '#ffffff',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!fromUser || !toUser || !amount || !partyId}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: 'none',
          background: (!fromUser || !toUser || !amount || !partyId)
            ? '#e5e7eb' : '#1D9E75',
          color: (!fromUser || !toUser || !amount || !partyId)
            ? '#6b7280' : '#ffffff',
          fontSize: '15px',
          fontWeight: 600,
          cursor: (!fromUser || !toUser || !amount || !partyId)
            ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Confirm handover
      </button>

    </div>
  );
}