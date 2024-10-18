import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const username =  'User'

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="name">Quotes</div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className="dropdown-trigger" onClick={e => e.preventDefault()}>
            {username} ▼
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
