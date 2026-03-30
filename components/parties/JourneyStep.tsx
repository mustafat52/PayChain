interface JourneyStepProps {
  person: string;
  time: string;
  amount?: string;
  status: 'done' | 'active' | 'pending';
  isLast: boolean;
}

export default function JourneyStep({
  person,
  time,
  amount,
  status,
  isLast,
}: JourneyStepProps) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {/* Left — dot + line */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20px',
        flexShrink: 0,
      }}>
        {/* Dot */}
        <div style={{
          width: status === 'active' ? '14px' : '10px',
          height: status === 'active' ? '14px' : '10px',
          borderRadius: '50%',
          background: status === 'pending' ? '#e5e7eb' : '#1D9E75',
          border: status === 'active' ? '3px solid #E1F5EE' : 'none',
          outline: status === 'active' ? '2px solid #1D9E75' : 'none',
          flexShrink: 0,
          marginTop: '3px',
        }} />
        {/* Line */}
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            minHeight: '20px',
            background: status === 'done' ? '#1D9E75' : '#e5e7eb',
            margin: '4px 0',
          }} />
        )}
      </div>

      {/* Right — content */}
      <div style={{ flex: 1, paddingBottom: isLast ? '0' : '16px' }}>
        <div style={{
          fontSize: '13px',
          fontWeight: status === 'active' ? 600 : 500,
          color: status === 'pending' ? '#6b7280' : '#1a1a1a',
        }}>
          {person}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          marginTop: '2px',
        }}>
          {time}
        </div>
        {amount && (
          <div style={{
            fontSize: '12px',
            color: '#1D9E75',
            fontWeight: 500,
            marginTop: '2px',
          }}>
            {amount}
          </div>
        )}
      </div>
    </div>
  );
}