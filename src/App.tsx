import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { DeadlineFilter } from './features/deadlines/components/DeadlineFilter';
import { DeadlineList } from './features/deadlines/components/DeadlineList';
import { DeadlineModal } from './features/deadlines/components/DeadlineModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="container">
        <header className="app-header">
          <div>
            <h1>Student Deadline Tracker</h1>
            <p>Quản lý và theo dõi hạn nộp bài tập cá nhân</p>
          </div>
          <button className="btn-submit" onClick={() => setIsModalOpen(true)}>
            + Thêm bài tập
          </button>
        </header>

        <div className="main-content-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>Danh sách bài tập</h2>
            <DeadlineFilter />
          </div>

          <DeadlineList />
        </div>

        <DeadlineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Provider>
  );
}