import type { ApiResponse } from '../../types/common';
import type { Deadline } from './types';

// Dữ liệu mẫu ban đầu từ máy chủ giả lập
const INITIAL_MOCK_DEADLINES: Deadline[] = [
  {
    id: 'dl-1',
    subject: 'Lập trình Web nâng cao',
    title: 'Bài thực hành 01 - Redux Toolkit',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'HIGH',
    description: 'Xây dựng Student Deadline Tracker đầy đủ Custom Hook, Compound Component và RTK createAsyncThunk.',
    isCompleted: false,
  },
  {
    id: 'dl-2',
    subject: 'Kiến trúc phần mềm',
    title: 'Báo cáo mẫu thiết kế Factory & Adapter',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'MEDIUM',
    description: 'Viết báo cáo phân tích ưu nhược điểm và cài đặt code demo bằng TypeScript.',
    isCompleted: false,
  },
  {
    id: 'dl-3',
    subject: 'An toàn bảo mật',
    title: 'Lab 2: Mã hóa RSA',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'LOW',
    description: 'Thực hành sinh khoá công khai, khoá bí mật và mã hoá gói tin trao đổi giữa client - server.',
    isCompleted: true,
  },
];

// Hàm giả lập gọi API backend với độ trễ mạng 800ms
export const fetchDeadlinesApi = async (): Promise<ApiResponse<Deadline[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập tỉ lệ thành công (có thể đổi sang reject để test trạng thái error)
      const isSuccess = true;

      if (isSuccess) {
        resolve({
          statusCode: 200,
          message: 'Lấy danh sách bài tập thành công',
          data: INITIAL_MOCK_DEADLINES,
        });
      } else {
        reject(new Error('Lỗi máy chủ: Không thể tải danh sách bài tập'));
      }
    }, 800);
  });
};