import React from 'react';
import { Modal } from '../../../components/Modal';
import { useDeadlineForm } from '../hooks/useDeadlineForm';
import { useAppDispatch } from '../../../app/hooks';
import { addDeadline } from '../deadlineSlice';
import type { CreateDeadlineDto } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: CreateDeadlineDto = {
  subject: '',
  title: '',
  dueDate: '',
  priority: 'MEDIUM',
  description: '',
};

export const DeadlineModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const { values, handleChange, handleSubmit, reset } = useDeadlineForm(defaultValues, (formData) => {
    dispatch(addDeadline(formData));
    reset();
    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>Thêm bài tập mới</Modal.Header>
        <Modal.Body>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label>Môn học</label>
            <input
              type="text"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              placeholder="VD: Lập trình Web nâng cao"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label>Tên bài tập</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="VD: Bài thực hành 01"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div className="form-group">
              <label>Hạn nộp</label>
              <input
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Độ ưu tiên</label>
              <select name="priority" value={values.priority} onChange={handleChange}>
                <option value="LOW">Thấp (Low)</option>
                <option value="MEDIUM">Trung bình (Medium)</option>
                <option value="HIGH">Cao (High)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Nội dung bài</label>
            <textarea
              name="description"
              rows={4}
              value={values.description}
              onChange={handleChange}
              placeholder="Nhập yêu cầu, ghi chú hoặc nội dung bài tập..."
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Huỷ
          </button>
          <button type="submit" className="btn-submit">
            Lưu bài tập
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};