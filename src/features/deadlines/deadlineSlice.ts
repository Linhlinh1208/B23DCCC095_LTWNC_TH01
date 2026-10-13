import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Deadline, CreateDeadlineDto, FilterStatus } from './types';
import type { StatusType } from '../../types/common';
import { fetchDeadlinesApi } from './deadlineApi';

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

// createAsyncThunk gọi qua API giả lập (Slide Buổi 3)
export const fetchDeadlines = createAsyncThunk<Deadline[], void>(
  'deadlines/fetchDeadlines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDeadlinesApi();
      return response.data; // Trích xuất mảng Deadline[] từ ApiResponse<Deadline[]>
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi kết nối API');
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
    },
    toggleDeadline: (state, action: PayloadAction<string>) => {
      const item = state.items.find((d) => d.id === action.payload);
      if (item) {
        item.isCompleted = !item.isCompleted;
      }
    },
    deleteDeadline: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
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