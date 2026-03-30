'use client';

import { useState } from 'react';
import TopBar from '@/components/ui/TopBar';
import NotifItem from '@/components/notifications/NotifItem';
import { notifications as initialNotifs } from '@/lib/data';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const liveUpdates = notifs.filter(
    n => n.type !== 'overdue'
  );
  const overdueAlerts = notifs.filter(
    n => n.type === 'overdue'
  );
  const unreadCount = notifs.filter(n => !n.read).length;

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  return (
    <div>
      <TopBar
        title="Notifications"
        rightElement={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: '#1D9E75',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
              }}
            >
              Mark all read
            </button>
          ) : (
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              All caught up
            </span>
          )
        }
      />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Unread count badge */}
        {unreadCount > 0 && (
          <div style={{
            background: '#E1F5EE',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '13px', color: '#0F6E56' }}>
              Unread notifications
            </span>
            <span style={{
              background: '#1D9E75',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '20px',
              padding: '2px 10px',
            }}>
              {unreadCount}
            </span>
          </div>
        )}

        {/* Overdue alerts */}
        {overdueAlerts.length > 0 && (
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#A32D2D',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Overdue alerts
            </div>
            <div style={{
              background: '#ffffff',
              border: '1px solid #F09595',
              borderRadius: '12px',
              padding: '0 14px',
            }}>
              {overdueAlerts.map((notif, i) => (
                <div
                  key={notif.id}
                  style={{
                    borderBottom: i === overdueAlerts.length - 1
                      ? 'none' : '1px solid #f3f4f6',
                  }}
                >
                  <NotifItem notif={notif} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live updates */}
        {liveUpdates.length > 0 && (
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#6b7280',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Live updates
            </div>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '0 14px',
            }}>
              {liveUpdates.map((notif, i) => (
                <div
                  key={notif.id}
                  style={{
                    borderBottom: i === liveUpdates.length - 1
                      ? 'none' : '1px solid #f3f4f6',
                  }}
                >
                  <NotifItem notif={notif} />
                </div>
              ))}
            </div>
          </div>
        )}

        {notifs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            color: '#6b7280',
            fontSize: '14px',
          }}>
            No notifications yet
          </div>
        )}

      </div>
    </div>
  );
}