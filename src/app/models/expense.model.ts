export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO
  description?: string;
  type: 'expense' | 'income';
}
