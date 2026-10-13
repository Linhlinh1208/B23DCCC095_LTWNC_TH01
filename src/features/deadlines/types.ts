export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Deadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string; // 'YYYY-MM-DD'
  priority: PriorityLevel;
  description: string; // Nội dung chi tiết bài tập
  isCompleted: boolean;
}

// Buổi 1: Utility Types - Tạo DTO form
export type CreateDeadlineDto = Omit<Deadline, 'id' | 'isCompleted'>;

export type FilterStatus = 'ALL' | 'UNCOMPLETED' | 'OVERDUE' | 'COMPLETED';

// Buổi 1: Type Guard kiểm tra quá hạn
export function isOverdueTask(deadline: Deadline): boolean {
  if (deadline.isCompleted) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline.dueDate);
  return due.getTime() < today.getTime();
}