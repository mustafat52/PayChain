'use client';

import { useState } from 'react';
import { parties, collectors } from '@/lib/data';

export default function PartyPaymentForm() {
  const [partyId, setPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('cash');
  const [receivedBy, setReceivedBy] = useState('');
  const [deadline, setDeadline] = useState('7');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedParty = parties.find(p => p.id === partyId);

  function handleSubmit() {
    if (!partyId || !amount || !receivedBy) return;
    setSubmitted(true);
    setTimeout(() => {
      setPartyId('');
      setAmount('');
      setMethod('cash');
      setReceivedBy('');
      setDeadline('7');
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
          Payment logged!
        </div>
        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          All users have been notified
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Party */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Party name *
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
          {parties
            .filter(p => p.status === 'active')
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
        {selectedParty && (
          <div style={{
            marginTop: '6px',
            padding: '8px 10px',
            background: '#f9fafb',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#6b7280',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>Outstanding balance</span>
            <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
              Rs. {selectedParty.balance.toLocaleString('en-IN')}
            </span>
          </div>
        )}
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
          Amount received (Rs.) *
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
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

      {/* Payment method */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '8px',
        }}>
          Payment method *
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { value: 'cash',   label: 'Cash'   },
            { value: 'online', label: 'Online' },
            { value: 'cheque', label: 'Cheque' },
            { value: 'neft',   label: 'NEFT'   },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setMethod(opt.value)}
              style={{
                flex: 1,
                padding: '9px 4px',
                borderRadius: '8px',
                border: method === opt.value
                  ? '2px solid #1D9E75'
                  : '1px solid #e5e7eb',
                background: method === opt.value ? '#E1F5EE' : '#ffffff',
                color: method === opt.value ? '#0F6E56' : '#6b7280',
                fontSize: '12px',
                fontWeight: method === opt.value ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Received by */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Received by *
        </label>
        <select
          value={receivedBy}
          onChange={e => setReceivedBy(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            color: receivedBy ? '#1a1a1a' : '#6b7280',
            background: '#ffffff',
            outline: 'none',
          }}
        >
          <option value="">Select staff member...</option>
          {collectors.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
          display: 'block',
          marginBottom: '6px',
        }}>
          Payment deadline (days)
        </label>
        <input
          type="number"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          placeholder="e.g. 7"
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
        disabled={!partyId || !amount || !receivedBy}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: 'none',
          background: (!partyId || !amount || !receivedBy) ? '#e5e7eb' : '#1D9E75',
          color: (!partyId || !amount || !receivedBy) ? '#6b7280' : '#ffffff',
          fontSize: '15px',
          fontWeight: 600,
          cursor: (!partyId || !amount || !receivedBy) ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Confirm & notify all
      </button>

    </div>
  );
}