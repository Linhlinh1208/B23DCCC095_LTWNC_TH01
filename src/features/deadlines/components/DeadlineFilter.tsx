import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setFilter } from '../deadlineSlice';
import type { FilterStatus } from '../types';

export const DeadlineFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.deadlines.filter);

  const filters: { label: string; value: FilterStatus }[] = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Chưa hoàn thành', value: 'UNCOMPLETED' },
    { label: 'Quá hạn', value: 'OVERDUE' },
    { label: 'Đã hoàn thành', value: 'COMPLETED' },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => dispatch(setFilter(f.value))}
          className={`filter-btn ${currentFilter === f.value ? 'active' : ''}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};