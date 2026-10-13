export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';