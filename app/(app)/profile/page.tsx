import TopBar from '@/components/ui/TopBar';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { currentUser, users } from '@/lib/data';
import Link from 'next/link';

export default function ProfilePage() {
  const admins    = users.filter(u => u.role === 'admin');
  const collectors = users.filter(u => u.role === 'collector');

  return (
    <div>
      <TopBar title="Profile & settings" />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Current user card */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '10px', textAlign: 'center',
        }}>
          <Avatar name={currentUser.name} size={64} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
              {currentUser.phone}
            </div>
          </div>
          <Badge
            text={currentUser.role === 'admin' ? 'Admin' : 'Collector'}
            variant={currentUser.role === 'admin' ? 'green' : 'gray'}
          />
        </div>

        {/* App info */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '12px', overflow: 'hidden',
        }}>
          {[
            { label: 'App name',   value: 'PayChain'             },
            { label: 'Version',    value: 'v1.0 — Demo'          },
            { label: 'Agency',     value: 'Hussaini Automations'  },
            { label: 'Your role',  value: currentUser.role === 'admin' ? 'Admin (full access)' : 'Collector' },
          ].map((row, i, arr) => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '12px 14px',
              borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{row.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Team section */}
        <div>
          <div style={{
            fontSize: '11px', fontWeight: 600, color: '#6b7280',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            Admin team
          </div>
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb',
            borderRadius: '12px', padding: '0 14px',
          }}>
            {admins.map((u, i) => (
              <div key={u.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 0',
                borderBottom: i < admins.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}>
                <Avatar name={u.name} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>
                    {u.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '1px' }}>
                    {u.phone}
                  </div>
                </div>
                <Badge text="Admin" variant="green" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '11px', fontWeight: 600, color: '#6b7280',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            Collectors
          </div>
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb',
            borderRadius: '12px', padding: '0 14px',
          }}>
            {collectors.map((u, i) => (
              <div key={u.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 0',
                borderBottom: i < collectors.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}>
                <Avatar name={u.name} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>
                    {u.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '1px' }}>
                    {u.phone}
                  </div>
                </div>
                <Badge text="Collector" variant="gray" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '1px solid #FCEBEB', borderRadius: '12px',
            padding: '14px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            gap: '8px', background: '#ffffff', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#E24B4A" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#E24B4A' }}>
              Sign out
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}