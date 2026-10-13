import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchDeadlines } from '../deadlineSlice';
import { DeadlineItem } from './DeadlineItem';
import { DeadlineDetailModal } from './DeadlineDetailModal';
import { type Deadline, isOverdueTask } from '../types';

export const DeadlineList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, filter, status, error } = useAppSelector((state) => state.deadlines);
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDeadlines());
    }
  }, [dispatch, status]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'COMPLETED') return item.isCompleted;
      if (filter === 'UNCOMPLETED') return !item.isCompleted;
      if (filter === 'OVERDUE') return isOverdueTask(item);
      return true;
    });
  }, [items, filter]);

  if (status === 'loading') {
    return <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Đang tải bài tập...</p>;
  }

  if (status === 'failed') {
    return <p style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>Lỗi: {error}</p>;
  }

  if (filteredItems.length === 0) {
    return <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Không có bài tập nào.</p>;
  }

  return (
    <>
      <div className="deadline-vertical-list">
        {filteredItems.map((item) => (
          <DeadlineItem key={item.id} deadline={item} onSelect={(dl) => setSelectedDeadline(dl)} />
        ))}
      </div>

      <DeadlineDetailModal
        deadline={selectedDeadline}
        onClose={() => setSelectedDeadline(null)}
      />
    </>
  );
};