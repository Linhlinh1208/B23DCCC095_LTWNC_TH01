import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addDeadline } from '../deadlineSlice';
import { useDeadlineForm } from '../hooks/useDeadlineForm';
import type { CreateDeadlineDto } from '../types';

const defaultValues: CreateDeadlineDto = {
    subject: '',
    title: '',
    dueDate: '',
    priority: 'MEDIUM',
    description: ''
};

export const DeadlineForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange, handleSubmit } = useDeadlineForm(defaultValues, (formData) => {
    dispatch(addDeadline(formData));
  });

  return (
    <form onSubmit={handleSubmit} className="deadline-form">
      <h3>Thêm bài tập mới</h3>
      <div className="form-grid">
        <div className="form-group">
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

        <div className="form-group">
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

      <button type="submit" className="btn-submit">
        + Thêm bài tập
      </button>
    </form>
  );
};