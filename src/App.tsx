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

  // Tính số bài tập chưa hoàn thành có hạn nộp vào hôm nay
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = items.filter((i) => i.dueDate === todayStr && !i.isCompleted).length;

  const total = items.length;
  const completed = items.filter((i) => i.isCompleted).length;
  const overdue = items.filter((i) => isOverdueTask(i)).length;

  return (
    <div className="app-shell">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h2>Deadline Tracker</h2>
            <small>Quản lý bài tập</small>
          </div>
        </div>

        {/* Nút thêm bài tập nổi bật */}
        <button className="sidebar-btn-add" onClick={() => setIsModalOpen(true)}>
          + Thêm bài tập mới
        </button>

        {/* Menu Navigation */}
        <nav className="sidebar-menu">
          <button
            type="button"
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon"></span>
            <span>Tổng quan</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'by-date' ? 'active' : ''}`}
            onClick={() => setActiveTab('by-date')}
          >
            <span className="nav-icon"></span>
            <span>Chi tiết theo ngày</span>
            {todayCount > 0 && <span className="badge-count">{todayCount}</span>}
          </button>
        </nav>

        <div className="sidebar-stats">
          <div className="stats-title">Tổng quan</div>
          <div className="stats-row">
            <span>Chờ làm:</span>
            <strong>{total - completed}</strong>
          </div>
          <div className="stats-row">
            <span>Đã hoàn thành:</span>
            <strong style={{ color: '#16a34a' }}>{completed}</strong>
          </div>
          <div className="stats-row">
            <span>Quá hạn:</span>
            <strong style={{ color: '#dc2626' }}>{overdue}</strong>
          </div>
        </div>
      </aside>

      <main className="main-viewport">
        <header className="content-topbar">
          <div>
            <h1>{activeTab === 'dashboard' ? 'Dashboard Tổng Quan' : 'Theo Dõi Theo Ngày'}</h1>
            <p>
              {activeTab === 'dashboard'
                ? 'Xem toàn bộ danh sách hạn nộp và lọc theo trạng thái'
                : 'Tra cứu bài tập theo mốc ngày cụ thể'}
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
              <h2>Tất cả bài tập</h2>
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