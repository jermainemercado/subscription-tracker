import React from 'react';
import logo from 'assets/images/logo.svg';
import avatar from 'assets/images/userAvatar.svg';

const DashboardHeader = ({ userAvatar = avatar, userName, userNumber }) => {
  return (
    <div className="dashboardheader">
      <div className="dashboardheader_brand">
        <img src={logo} alt="logo" />
        <h2>TICKETKINGS</h2>
        <h3>DASHBOARD</h3>
      </div>
      <div className="dashboardheader_user">
        <div>
          <h6>Welcome,</h6>
          <h5>Lucas</h5>
          <p>#5678</p>
        </div>
        <div className="dashboardheader_user_avatar">
          <img src={userAvatar} alt="userAvatar" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
