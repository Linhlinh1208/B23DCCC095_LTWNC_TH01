import React from 'react';
import { Modal } from '../../../components/Modal';
import type { Deadline } from '../types';

interface Props {
  deadline: Deadline | null;
  onClose: () => void;
}

export const DeadlineDetailModal: React.FC<Props> = ({ deadline, onClose }) => {
  if (!deadline) return null;

  return (
    <Modal isOpen={!!deadline} onClose={onClose}>
      <Modal.Header>Chi tiết bài tập</Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
          <span className="subject-badge">{deadline.subject}</span>
          <span className={`priority-badge priority-${deadline.priority}`}>{deadline.priority}</span>
          <span className={`status-badge ${deadline.isCompleted ? 'done' : 'remaining'}`}>
            {deadline.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          </span>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
          {deadline.title}
        </h2>

        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px' }}>
          <strong>Hạn nộp:</strong> {deadline.dueDate}
        </p>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#475569', marginBottom: '4px' }}>
            Nội dung bài tập:
          </div>
          <p style={{ fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-line' }}>
            {deadline.description || 'Chưa có nội dung ghi chú.'}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn-submit" onClick={onClose}>
          Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
};