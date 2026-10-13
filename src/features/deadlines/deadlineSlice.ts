import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Deadline, CreateDeadlineDto, FilterStatus } from './types';
import type { StatusType } from '../../types/common';
import { fetchDeadlinesApi } from './deadlineApi';

const STORAGE_KEY = 'STUDENT_DEADLINE_TRACKER_V1';

// Hàm đọc dữ liệu từ localStorage
const loadStorageData = (): Deadline[] | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Không thể đọc từ localStorage', err);
    return null;
  }
};

// Hàm ghi dữ liệu vào localStorage
const saveStorageData = (items: Deadline[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Không thể lưu vào localStorage', err);
  }
};

interface DeadlineState {
  items: Deadline[];
  filter: FilterStatus;
  status: StatusType;
  error: string | null;
}

const initialState: DeadlineState = {
  items: [],
  filter: 'ALL',
  status: 'idle',
  error: null,
};

// Async thunk: Ưu tiên nạp từ localStorage trước, nếu lần đầu mở mới gọi API giả lập
export const fetchDeadlines = createAsyncThunk<Deadline[], void>(
  'deadlines/fetchDeadlines',
  async (_, { rejectWithValue }) => {
    try {
      const savedData = loadStorageData();
      if (savedData && savedData.length > 0) {
        return savedData; // Trả về dữ liệu bạn đã lưu trước đó
      }

      // Nếu bộ nhớ trống (lần đầu dùng), lấy từ API mẫu ban đầu
      const res = await fetchDeadlinesApi();
      saveStorageData(res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi kết nối');
    }
  }
);

export const deadlineSlice = createSlice({
  name: 'deadlines',
  initialState,
  reducers: {
    addDeadline: (state, action: PayloadAction<CreateDeadlineDto>) => {
      const newItem: Deadline = {
        ...action.payload,
        id: `dl-${Date.now()}`,
        isCompleted: false,
      };
      state.items.unshift(newItem);
      saveStorageData(state.items); // Lưu ngay lập tức
    },
    toggleDeadline: (state, action: PayloadAction<string>) => {
      const item = state.items.find((d) => d.id === action.payload);
      if (item) {
        item.isCompleted = !item.isCompleted;
        saveStorageData(state.items); // Lưu ngay lập tức
      }
    },
    deleteDeadline: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
      saveStorageData(state.items); // Lưu ngay lập tức
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeadlines.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDeadlines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDeadlines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Lỗi khi tải dữ liệu';
      });
  },
});

export const { addDeadline, toggleDeadline, deleteDeadline, setFilter } = deadlineSlice.actions;

export const deadlineReducer = deadlineSlice.reducer;
export default deadlineSlice.reducer;