import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useAppSelector } from './app/hooks';
import { DeadlineFilter } from './features/deadlines/components/DeadlineFilter';
import { DeadlineList } from './features/deadlines/components/DeadlineList';
import { DeadlineModal } from './features/deadlines/components/DeadlineModal';
import { DeadlineByDateView } from './features/deadlines/components/DeadlineByDateView';
import { isOverdueTask } from './features/deadlines/types';

type ActiveTab = 'dashboard' | 'by-date';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items } = useAppSelector((state) => state.deadlines);

  // Tính số bài tập có hạn nộp vào hôm nay để hiển thị ở "Chi tiết theo ngày"
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = items.filter((i) => i.dueDate === todayStr && !i.isCompleted).length;

  const total = items.length;
  const completed = items.filter((i) => i.isCompleted).length;
  const overdue = items.filter((i) => isOverdueTask(i)).length;

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Quản lý Deadline</h2>
          <small>Bài thực hành 01</small>
        </div>

        <button className="sidebar-btn-add" onClick={() => setIsModalOpen(true)}>
          + Thêm bài tập
        </button>

        <nav className="sidebar-menu">
          {/* Dashboard: ĐÃ BỎ SỐ ĐẾM */}
          <button
            type="button"
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span>Tổng quan</span>
          </button>

          {/* Chi tiết theo ngày: HIỂN THỊ SỐ BÀI HÔM NAY CẦN LÀM */}
          <button
            type="button"
            className={`nav-item ${activeTab === 'by-date' ? 'active' : ''}`}
            onClick={() => setActiveTab('by-date')}
          >
            <span>Chi tiết theo ngày</span>
            {todayCount > 0 && <span className="badge-count">{todayCount}</span>}
          </button>
        </nav>

        <div className="sidebar-stats">
          <div className="stats-title">Thống kê</div>
          <div className="stats-row">
            <span>Tổng số bài:</span>
            <strong>{total}</strong>
          </div>
          <div className="stats-row">
            <span>Chưa xong:</span>
            <strong>{total - completed}</strong>
          </div>
          <div className="stats-row">
            <span>Quá hạn:</span>
            <strong style={{ color: '#d32f2f' }}>{overdue}</strong>
          </div>
          <div className="stats-row">
            <span>Đã xong:</span>
            <strong style={{ color: '#2e7d32' }}>{completed}</strong>
          </div>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="main-viewport">
        <header className="content-topbar">
          <div>
            <h1>{activeTab === 'dashboard' ? 'Dashboard Tổng Quan' : 'Chi Tiết Theo Ngày'}</h1>
            <p>
              {activeTab === 'dashboard'
                ? 'Danh sách bài tập và lọc trạng thái hoàn thành'
                : 'Xem bài tập đến hạn theo từng ngày cụ thể'}
            </p>
          </div>
          {activeTab === 'dashboard' && (
            <button className="btn-submit" onClick={() => setIsModalOpen(true)}>
              + Thêm bài tập
            </button>
          )}
        </header>

        {activeTab === 'dashboard' ? (
          <div className="main-content-panel">
            <div className="panel-header-action">
              <h2>Danh sách bài tập</h2>
              <DeadlineFilter />
            </div>
            <DeadlineList />
          </div>
        ) : (
          <div className="main-content-panel">
            <DeadlineByDateView />
          </div>
        )}
      </main>

      <DeadlineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}