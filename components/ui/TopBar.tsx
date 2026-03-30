import Link from 'next/link';

interface TopBarProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  rightElement?: React.ReactNode;
}

export default function TopBar({
  title,
  subtitle,
  backHref,
  rightElement,
}: TopBarProps) {
  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '14px 16px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {backHref && (
        <Link href={backHref} style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          textDecoration: 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      )}
      <div style={{ flex: 1 }}>
        {subtitle && (
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '1px' }}>
            {subtitle}
          </div>
        )}
        <div style={{ fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>
          {title}
        </div>
      </div>
      {rightElement && (
        <div style={{ flexShrink: 0 }}>{rightElement}</div>
      )}
    </div>
  );
}