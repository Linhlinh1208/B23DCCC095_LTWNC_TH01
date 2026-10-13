import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { DeadlineItem } from './DeadlineItem';
import { DeadlineDetailModal } from './DeadlineDetailModal';
import type { Deadline } from '../types';

export const DeadlineByDateView: React.FC = () => {
  const { items } = useAppSelector((state) => state.deadlines);
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null);

  // Mặc định là ngày hôm nay dạng YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [targetDate, setTargetDate] = useState<string>(todayStr);

  // Lọc bài tập có dueDate trùng với ngày đang chọn
  const dayDeadlines = items.filter((item) => item.dueDate === targetDate);

  // Đếm nhanh
  const completedCount = dayDeadlines.filter((d) => d.isCompleted).length;

  return (
    <div>
      {/* Thanh công cụ Switch chọn ngày */}
      <div className="date-switch-bar">
        <div className="date-quick-buttons">
          <button
            type="button"
            className={`date-chip ${targetDate === todayStr ? 'active' : ''}`}
            onClick={() => setTargetDate(todayStr)}
          >
            Hôm nay
          </button>
          <button
            type="button"
            className={`date-chip ${targetDate === tomorrowStr ? 'active' : ''}`}
            onClick={() => setTargetDate(tomorrowStr)}
          >
            Ngày mai
          </button>
        </div>

        <div className="date-picker-wrapper">
          <label htmlFor="custom-date-picker">Chọn ngày:</label>
          <input
            id="custom-date-picker"
            type="date"
            value={targetDate}
            onChange={(e) => {
              if (e.target.value) setTargetDate(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Banner thông tin ngày đang chọn */}
      <div className="date-summary-box">
        <div>
          <h3>Hạn nộp ngày: <span className="highlight-date">{targetDate}</span></h3>
          <p>
            {dayDeadlines.length > 0
              ? `Có ${dayDeadlines.length} bài tập (Đã hoàn thành ${completedCount}/${dayDeadlines.length})`
              : 'Không có hạn nộp nào trong ngày này.'}
          </p>
        </div>
      </div>

      {/* Danh sách bài tập của ngày */}
      {dayDeadlines.length === 0 ? (
        <div className="empty-state-card">
          <p>🎉 Thảnh thơi! Không có bài tập nào đến hạn vào ngày này.</p>
        </div>
      ) : (
        <div className="deadline-vertical-list">
          {dayDeadlines.map((item) => (
            <DeadlineItem
              key={item.id}
              deadline={item}
              onSelect={(dl) => setSelectedDeadline(dl)}
            />
          ))}
        </div>
      )}

      <DeadlineDetailModal
        deadline={selectedDeadline}
        onClose={() => setSelectedDeadline(null)}
      />
    </div>
  );
};