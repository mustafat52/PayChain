interface BadgeProps {
  text: string;
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'gray';
}

const variants = {
  green: { bg: '#E1F5EE', color: '#0F6E56' },
  amber: { bg: '#FAEEDA', color: '#633806' },
  red:   { bg: '#FCEBEB', color: '#A32D2D' },
  blue:  { bg: '#E6F1FB', color: '#0C447C' },
  gray:  { bg: '#f3f4f6', color: '#6b7280' },
};

export default function Badge({ text, variant = 'gray' }: BadgeProps) {
  const style = variants[variant];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '11px',
      fontWeight: 500,
      padding: '3px 9px',
      borderRadius: '20px',
      background: style.bg,
      color: style.color,
    }}>
      {text}
    </span>
  );
}