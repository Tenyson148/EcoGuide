import React from 'react';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userData, isCollapsed, setIsCollapsed }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="logo">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="title">
            HealthTrack
          </h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="collapse-button"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('daily')}
            className={`nav-button ${activeTab === 'daily' ? 'active' : ''}`}
          >
            <span className="nav-text">Daily Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`nav-button ${activeTab === 'monthly' ? 'active' : ''}`}
          >
            <span className="nav-text">Monthly Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`nav-button ${activeTab === 'ai' ? 'active' : ''}`}
          >
            <span className="nav-text">AI Assistant</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="impact-card">
          <p className="impact-title">Your Impact</p>
          <p className="impact-value">{userData.user.impact.value}</p>
          <p className="impact-comparison">{userData.user.impact.comparison}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;