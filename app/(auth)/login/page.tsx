'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone]         = useState('');
  const [loading, setLoading]     = useState(false);

  function handleLogin() {
    if (!phone.trim()) return;
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '32px 24px',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#1D9E75',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div style={{ fontSize: '26px', fontWeight: 700, color: '#1a1a1a' }}>
          PayChain
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
          Business Payment Manager
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#1a1a1a',
          marginBottom: '6px',
        }}>
          Sign in
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          marginBottom: '24px',
        }}>
          Enter your phone number to continue
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: 500,
            display: 'block',
            marginBottom: '6px',
          }}>
            Phone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="+91 XXXXX XXXXX"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              fontSize: '15px',
              color: '#1a1a1a',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={!phone.trim() || loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: phone.trim() && !loading ? '#1D9E75' : '#e5e7eb',
            color: phone.trim() && !loading ? '#ffffff' : '#6b7280',
            fontSize: '15px',
            fontWeight: 600,
            cursor: phone.trim() && !loading ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          {loading ? 'Signing in...' : 'Continue'}
        </button>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '12px',
        color: '#6b7280',
      }}>
        Hussaini Automations · PayChain v1.0
      </div>
    </div>
  );
}