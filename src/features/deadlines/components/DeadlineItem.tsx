import React from 'react';
import { type Deadline, isOverdueTask } from '../types';
import { useAppDispatch } from '../../../app/hooks';
import { toggleDeadline, deleteDeadline } from '../deadlineSlice';
import { Card } from '../../../components/Card';

interface Props {
  deadline: Deadline;
  onSelect: (item: Deadline) => void;
}

export const DeadlineItem: React.FC<Props> = ({ deadline, onSelect }) => {
  const dispatch = useAppDispatch();
  const isOverdue = isOverdueTask(deadline);

  // Phân loại class màu nền theo trạng thái
  const getCardThemeClass = (): string => {
    if (deadline.isCompleted) return 'card-completed'; // Xanh lá
    if (isOverdue) return 'card-overdue';               // Đỏ
    return 'card-normal';                              // Bình thường
  };

  // Badge hiển thị số ngày còn lại hoặc quá hạn
  const getStatusBadge = () => {
    if (deadline.isCompleted) {
      return <span className="status-badge done">Đã hoàn thành</span>;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(deadline.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span className="status-badge overdue">Quá hạn {Math.abs(diffDays)} ngày</span>;
    } else if (diffDays === 0) {
      return <span className="status-badge overdue">Hôm nay đến hạn!</span>;
    } else {
      return <span className="status-badge remaining">Còn {diffDays} ngày</span>;
    }
  };

  // Xử lý sự kiện riêng biệt, không kích hoạt mở Modal chi tiết
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleDeadline(deadline.id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xoá bài tập "${deadline.title}"?`)) {
      dispatch(deleteDeadline(deadline.id));
    }
  };

  return (
    <Card className={`task-card-vertical ${getCardThemeClass()}`}>
      {/* Khu vực bấm vào để mở modal xem chi tiết */}
      <div
        onClick={() => onSelect(deadline)}
        style={{ cursor: 'pointer', flex: 1 }}
      >
        <Card.Header>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="subject-badge">{deadline.subject}</span>
            <span className={`priority-badge priority-${deadline.priority}`}>
              {deadline.priority}
            </span>
          </div>
          {getStatusBadge()}
        </Card.Header>

        <Card.Body>
          {/* Không gạch ngang chữ khi đã hoàn thành */}
          <div className="card-title">
            {deadline.title}
          </div>
          <div className="card-date">Hạn nộp: {deadline.dueDate}</div>
          {deadline.description && (
            <p className="card-desc-preview">Mô tả: {deadline.description}</p>
          )}
        </Card.Body>
      </div>

      {/* Khu vực thao tác hoàn thành và xoá */}
      <Card.Footer>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <input
            type="checkbox"
            id={`check-${deadline.id}`}
            checked={deadline.isCompleted}
            onChange={handleToggle}
            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
          />
          <label
            htmlFor={`check-${deadline.id}`}
            style={{ fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none' }}
          >
            {deadline.isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </label>
        </div>

        <button
          type="button"
          className="btn-delete"
          onClick={handleDelete}
        >
         Xoá
        </button>
      </Card.Footer>
    </Card>
  );
};