import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import DailyLogs from './components/DailyLogs.jsx';
import MonthlyLogs from './components/MonthlyLogs.jsx';
import AIAssistant from './components/AIAssistant.jsx';
import dailyData from './data/dailyData.json';
import monthlyData from './data/monthlyData.json';
import userData from './data/userData.json';

const App = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="header animate-fade-in-up">
          <h2 className="greeting">{userData.user.greeting}</h2>
          <p className="subtitle">{userData.user.subtitle}</p>
        </div>

        <div>
          {activeTab === 'daily' && (
            <DailyLogs dailyData={dailyData} userData={userData} />
          )}

          {activeTab === 'monthly' && (
            <MonthlyLogs dailyData={dailyData} monthlyData={monthlyData} />
          )}

          {activeTab === 'ai' && (
            <AIAssistant />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;