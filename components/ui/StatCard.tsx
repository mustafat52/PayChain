interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
}

export default function StatCard({
  label,
  value,
  sub,
  valueColor = '#1a1a1a',
}: StatCardProps) {
  return (
    <div style={{
      background: '#f9fafb',
      borderRadius: '10px',
      padding: '12px',
    }}>
      <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 600, color: valueColor }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
          {sub}
        </div>
      )}
    </div>
  );
}