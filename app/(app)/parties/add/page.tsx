'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';

export default function AddPartyPage() {
  const router = useRouter();

  const [name, setName]           = useState('');
  const [contact, setContact]     = useState('');
  const [phone, setPhone]         = useState('');
  const [balance, setBalance]     = useState('');
  const [deadline, setDeadline]   = useState('7');
  const [type, setType]           = useState<'long_term' | 'one_time'>('long_term');
  const [notes, setNotes]         = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim() && contact.trim() && balance;

  function handleSubmit() {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      router.push('/parties');
    }, 2000);
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
        <TopBar title="Add party" backHref="/parties" />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          gap: '14px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#E1F5EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#1D9E75" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>
            Party added!
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            {name} has been added to your party list
          </div>
        </div>
      </div>
    );
  }

  const labelStyle = {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 500,
    display: 'block',
    marginBottom: '6px',
  } as const;

  const inputStyle = {
    width: '100%',
    padding: '11px 12px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#1a1a1a',
    background: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
  } as const;

  return (
    <div>
      <TopBar title="Add new party" backHref="/parties" />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Party name */}
        <div>
          <label style={labelStyle}>Party / company name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Kapoor Builders"
            style={inputStyle}
          />
        </div>

        {/* Contact person */}
        <div>
          <label style={labelStyle}>Contact person name *</label>
          <input
            value={contact}
            onChange={e => setContact(e.target.value)}
            placeholder="Full name"
            style={inputStyle}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            style={inputStyle}
          />
        </div>

        {/* Opening balance */}
        <div>
          <label style={labelStyle}>Opening outstanding balance (Rs.) *</label>
          <input
            type="number"
            value={balance}
            onChange={e => setBalance(e.target.value)}
            placeholder="Current amount they owe"
            style={inputStyle}
          />
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            marginTop: '5px',
            paddingLeft: '2px',
          }}>
            This is their current outstanding amount before any new transactions
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label style={labelStyle}>Default payment deadline (days)</label>
          <input
            type="number"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            placeholder="e.g. 7"
            style={inputStyle}
          />
        </div>

        {/* Party type */}
        <div>
          <label style={labelStyle}>Party type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {([
              { value: 'long_term', label: 'Long-term', sub: 'Regular client' },
              { value: 'one_time',  label: 'One-time',  sub: 'Single transaction' },
            ] as const).map(opt => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: type === opt.value
                    ? '2px solid #1D9E75'
                    : '1px solid #e5e7eb',
                  background: type === opt.value ? '#E1F5EE' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: type === opt.value ? '#0F6E56' : '#1a1a1a',
                }}>
                  {opt.label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: type === opt.value ? '#0F6E56' : '#6b7280',
                  marginTop: '2px',
                }}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label style={labelStyle}>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any additional info about this party..."
            rows={3}
            style={{
              ...inputStyle,
              resize: 'none',
            }}
          />
        </div>

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: isValid ? '#1D9E75' : '#e5e7eb',
            color: isValid ? '#ffffff' : '#6b7280',
            fontSize: '15px',
            fontWeight: 600,
            cursor: isValid ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          Add party
        </button>

        <button
          onClick={() => router.push('/parties')}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#6b7280',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}