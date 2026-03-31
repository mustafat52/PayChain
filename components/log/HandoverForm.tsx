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
  const availableReceivers = staffHoldings.filter(s => s.userId !== fromUser);

  function handleSubmit() {
    if (!fromUser || !toUser || !amount || !partyId) return;
    setSubmitted(true);
    setTimeout(() => {
      setFromUser(''); setToUser(''); setAmount('');
      setPartyId(''); setNote(''); setSubmitted(false);
    }, 2500);
  }

  if (submitted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '48px 24px', gap: '14px', textAlign: 'center',
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#E1F5EE', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
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

  const labelStyle = {
    fontSize: '12px', color: '#6b7280', fontWeight: 500,
    display: 'block', marginBottom: '6px',
  } as const;

  const inputStyle = {
    width: '100%', padding: '11px 12px', borderRadius: '10px',
    border: '1px solid #e5e7eb', fontSize: '14px', color: '#1a1a1a',
    background: '#ffffff', outline: 'none', fontFamily: 'inherit',
  } as const;

  const selectStyle = (hasValue: boolean) => ({
    ...inputStyle,
    color: hasValue ? '#1a1a1a' : '#6b7280',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* From */}
      <div>
        <label style={labelStyle}>From (handing over) *</label>
        <select
          value={fromUser}
          onChange={e => { setFromUser(e.target.value); setPartyId(''); setAmount(''); }}
          style={selectStyle(!!fromUser)}
        >
          <option value="">Select staff member...</option>
          {activeHolders.map(s => (
            <option key={s.userId} value={s.userId}>{s.name}</option>
          ))}
        </select>
        {/* Show holdings info as separate info block — not in dropdown */}
        {selectedHolder && selectedHolder.holdings.length > 0 && (
          <div style={{
            marginTop: '8px',
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '8px 10px',
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 500 }}>
              Currently holding:
            </div>
            {selectedHolder.holdings.map((h, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                padding: '3px 0',
                borderBottom: i < selectedHolder.holdings.length - 1
                  ? '1px solid #e5e7eb' : 'none',
              }}>
                <span style={{ color: '#1a1a1a' }}>{h.partyName}</span>
                <span style={{ fontWeight: 600, color: '#1D9E75' }}>
                  Rs. {h.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* To */}
      <div>
        <label style={labelStyle}>To (receiving) *</label>
        <select
          value={toUser}
          onChange={e => setToUser(e.target.value)}
          style={selectStyle(!!toUser)}
        >
          <option value="">Select staff member...</option>
          {availableReceivers.map(s => (
            <option key={s.userId} value={s.userId}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Amount — clean number input, no pre-fill */}
      <div>
        <label style={labelStyle}>Amount being passed (Rs.) *</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={inputStyle}
        />
      </div>

      {/* Original party */}
      <div>
        <label style={labelStyle}>Original party (source) *</label>
        <select
          value={partyId}
          onChange={e => setPartyId(e.target.value)}
          style={selectStyle(!!partyId)}
        >
          <option value="">Select party...</option>
          {(selectedHolder && selectedHolder.holdings.length > 0
            ? selectedHolder.holdings.map(h => ({ id: h.partyId, name: h.partyName }))
            : parties.filter(p => p.status === 'active').map(p => ({ id: p.id, name: p.name }))
          ).map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Note */}
      <div>
        <label style={labelStyle}>Note (optional)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Any remarks..."
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!fromUser || !toUser || !amount || !partyId}
        style={{
          width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
          background: (!fromUser || !toUser || !amount || !partyId) ? '#e5e7eb' : '#1D9E75',
          color: (!fromUser || !toUser || !amount || !partyId) ? '#6b7280' : '#ffffff',
          fontSize: '15px', fontWeight: 600, fontFamily: 'inherit',
          cursor: (!fromUser || !toUser || !amount || !partyId) ? 'not-allowed' : 'pointer',
        }}
      >
        Confirm handover
      </button>
    </div>
  );
}