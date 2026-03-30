import { Notification } from '@/lib/types';

interface NotifItemProps {
  notif: Notification;
}

function timeAgo(dateStr: string): string {
  const now = new Date('2024-03-24T12:00:00Z');
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function NotifItem({ notif }: NotifItemProps) {
  const isOverdue = notif.type === 'overdue';
  const dotColor = notif.read
    ? '#e5e7eb'
    : isOverdue ? '#E24B4A' : '#1D9E75';

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6',
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: dotColor,
        flexShrink: 0,
        marginTop: '5px',
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '13px',
          color: notif.read ? '#6b7280' : '#1a1a1a',
          lineHeight: '1.5',
          fontWeight: notif.read ? 400 : 500,
        }}>
          {notif.message}
        </div>
        <div style={{
          fontSize: '11px',
          color: isOverdue && !notif.read ? '#E24B4A' : '#6b7280',
          marginTop: '4px',
          fontWeight: isOverdue && !notif.read ? 500 : 400,
        }}>
          {isOverdue ? 'Overdue alert · ' : ''}{timeAgo(notif.createdAt)}
        </div>
      </div>
    </div>
  );
}