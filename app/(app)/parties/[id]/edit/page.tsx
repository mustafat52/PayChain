'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import { parties } from '@/lib/data';

export default function EditPartyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const party = parties.find(p => p.id === id);

  const [name, setName]         = useState(party?.name || '');
  const [contact, setContact]   = useState(party?.contactPerson || '');
  const [phone, setPhone]       = useState(party?.phone || '');
  const [balance, setBalance]   = useState(String(party?.balance || 0));
  const [deadline, setDeadline] = useState(String(party?.deadlineDays || 7));
  const [notes, setNotes]       = useState(party?.notes || '');
  const [type, setType]         = useState<'long_term' | 'one_time'>(
    party?.type || 'long_term'
  );
  const [status, setStatus]     = useState<'active' | 'inactive'>(
    party?.status || 'active'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!party) {
    return (
      <div>
        <TopBar title="Edit party" backHref="/parties" />
        <div style={{ padding: '40px 24px', textAlign: 'center', color: '#6b7280' }}>
          Party not found
        </div>
      </div>
    );
  }

  function handleSave() {
    setSubmitted(true);
    setTimeout(() => {
      router.push(`/parties/${id}`);
    }, 1800);
  }

  if (submitted) {
    return (
      <div>
        <TopBar title="Edit party" backHref={`/parties/${id}`} />
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '80px 24px',
          gap: '14px', textAlign: 'center',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#E1F5EE', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#1D9E75" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>
            Changes saved!
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            Redirecting back to party...
          </div>
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

  return (
    <div>
      <TopBar title="Edit party" backHref={`/parties/${id}`} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Name */}
        <div>
          <label style={labelStyle}>Party / company name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            style={inputStyle} />
        </div>

        {/* Contact */}
        <div>
          <label style={labelStyle}>Contact person</label>
          <input value={contact} onChange={e => setContact(e.target.value)}
            style={inputStyle} />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            style={inputStyle} />
        </div>

        {/* Balance */}
        <div>
          <label style={labelStyle}>Outstanding balance (Rs.)</label>
          <input type="number" value={balance}
            onChange={e => setBalance(e.target.value)} style={inputStyle} />
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px', paddingLeft: '2px' }}>
            Only adjust if correcting an error. Normal payments reduce balance automatically.
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label style={labelStyle}>Default payment deadline (days)</label>
          <input type="number" value={deadline}
            onChange={e => setDeadline(e.target.value)} style={inputStyle} />
        </div>

        {/* Type */}
        <div>
          <label style={labelStyle}>Party type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {([
              { value: 'long_term', label: 'Long-term',  sub: 'Regular client'     },
              { value: 'one_time',  label: 'One-time',   sub: 'Single transaction' },
            ] as const).map(opt => (
              <button key={opt.value} onClick={() => setType(opt.value)} style={{
                padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                border: type === opt.value ? '2px solid #1D9E75' : '1px solid #e5e7eb',
                background: type === opt.value ? '#E1F5EE' : '#ffffff',
                textAlign: 'left', fontFamily: 'inherit',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600,
                  color: type === opt.value ? '#0F6E56' : '#1a1a1a' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '11px', marginTop: '2px',
                  color: type === opt.value ? '#0F6E56' : '#6b7280' }}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label style={labelStyle}>Party status</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {([
              { value: 'active',   label: 'Active',   color: '#1D9E75', bg: '#E1F5EE' },
              { value: 'inactive', label: 'Inactive', color: '#6b7280', bg: '#f3f4f6' },
            ] as const).map(opt => (
              <button key={opt.value} onClick={() => setStatus(opt.value)} style={{
                padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                border: status === opt.value
                  ? `2px solid ${opt.color}` : '1px solid #e5e7eb',
                background: status === opt.value ? opt.bg : '#ffffff',
                textAlign: 'left', fontFamily: 'inherit',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600,
                  color: status === opt.value ? opt.color : '#1a1a1a' }}>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
          {status === 'inactive' && (
            <div style={{
              marginTop: '8px', padding: '8px 10px',
              background: '#FAEEDA', borderRadius: '8px',
              fontSize: '11px', color: '#633806',
            }}>
              Inactive parties are hidden from new transactions but their history is preserved.
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label style={labelStyle}>Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            rows={3} style={{ ...inputStyle, resize: 'none' }}
            placeholder="Any additional info..." />
        </div>

        {/* Buttons */}
        <button onClick={handleSave} style={{
          width: '100%', padding: '14px', borderRadius: '12px',
          border: 'none', background: '#1D9E75', color: '#ffffff',
          fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Save changes
        </button>

        <button onClick={() => router.push(`/parties/${id}`)} style={{
          width: '100%', padding: '13px', borderRadius: '12px',
          border: '1px solid #e5e7eb', background: '#ffffff',
          color: '#6b7280', fontSize: '15px', fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Cancel
        </button>

      </div>
    </div>
  );
}