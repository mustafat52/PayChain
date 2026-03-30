interface OverdueAlertProps {
  message: string;
}

export default function OverdueAlert({ message }: OverdueAlertProps) {
  return (
    <div style={{
      background: '#FAEEDA',
      borderRadius: '10px',
      padding: '10px 12px',
      display: 'flex',
      gap: '8px',
      alignItems: 'flex-start',
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="#633806" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span style={{ fontSize: '12px', color: '#633806', lineHeight: '1.5' }}>
        {message}
      </span>
    </div>
  );
}