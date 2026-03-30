interface AvatarProps {
  name: string;
  size?: number;
  variant?: 'green' | 'amber' | 'blue' | 'red' | 'gray';
}

const variants = {
  green: { bg: '#E1F5EE', color: '#0F6E56' },
  amber: { bg: '#FAEEDA', color: '#633806' },
  blue:  { bg: '#E6F1FB', color: '#0C447C' },
  red:   { bg: '#FCEBEB', color: '#A32D2D' },
  gray:  { bg: '#f3f4f6', color: '#6b7280' },
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getVariant(name: string): keyof typeof variants {
  const colors: (keyof typeof variants)[] = ['green', 'amber', 'blue', 'red', 'gray'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function Avatar({ name, size = 40, variant }: AvatarProps) {
  const v = variants[variant || getVariant(name)];
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: v.bg,
      color: v.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.32,
      fontWeight: 600,
      flexShrink: 0,
    }}>
      {getInitials(name)}
    </div>
  );
}