import React, {useEffect, useState} from 'react';
import logo from 'assets/images/logo.svg';
import avatar from 'assets/images/userAvatar.svg';
import Axios from 'axios';

const DashboardHeader = ({ userAvatar = avatar, userName, userNumber }) => {

  const [discordUser, setDiscordUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    await Axios.get('/dashboard/getInfo')
      .then(res => {
        setDiscordUser(res.data.userInfo)
      })
  }

  useEffect(() => {
    fetchUserData()
    setLoading(false)
  }, [])
  
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
          <h5>{discordUser.username ? discordUser.username : 'Lucas' }</h5>
          <p>{discordUser.discordHash ? '#' + discordUser.discordHash : '#5678'}</p>
        </div>
        <div className="dashboardheader_user_avatar">
          <img src={discordUser.avatarLink ? discordUser.avatarLink : userAvatar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
