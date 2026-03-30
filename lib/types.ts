export type Role = 'admin' | 'collector';

export type PartyStatus = 'active' | 'inactive';

export type PartyType = 'long_term' | 'one_time';

export type PaymentMethod = 'cash' | 'online' | 'cheque' | 'neft';

export type TransactionType = 'credit' | 'debit';

export type NotificationType = 'collection' | 'handover' | 'overdue' | 'settled';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  active: boolean;
}

export interface Party {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  balance: number;
  deadlineDays: number;
  type: PartyType;
  status: PartyStatus;
  createdBy: string;
  notes?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  partyId: string;
  partyName: string;
  type: TransactionType;
  amount: number;
  paymentMethod?: PaymentMethod;
  receivedBy?: string;
  receivedByName?: string;
  deadlineDate?: string;
  doneBy: string;
  doneByName: string;
  note?: string;
  createdAt: string;
}

export interface Transfer {
  id: string;
  fromUserId?: string;
  fromUserName?: string;
  toUserId: string;
  toUserName: string;
  amount: number;
  partyId: string;
  partyName: string;
  transactionId?: string;
  note?: string;
  createdAt: string;
}

export interface StaffHolding {
  userId: string;
  name: string;
  role: Role;
  totalHolding: number;
  holdings: {
    partyId: string;
    partyName: string;
    amount: number;
    since: string;
    daysHeld: number;
    isOverdue: boolean;
  }[];
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  partyId?: string;
  partyName?: string;
  read: boolean;
  createdAt: string;
}

export interface FeedItem {
  id: string;
  type: 'collection' | 'handover' | 'settled';
  description: string;
  amount: number;
  partyName: string;
  personName: string;
  paymentMethod?: PaymentMethod;
  createdAt: string;
}