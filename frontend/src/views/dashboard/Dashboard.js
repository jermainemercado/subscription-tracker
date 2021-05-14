import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardBody from '../../components/DashboardBody';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_panel">
        <DashboardHeader />
        <DashboardBody />
      </div>
    </div>
  );
};

export default Dashboard;
