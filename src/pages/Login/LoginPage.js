import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss'; 
const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Title } = Typography;

  const handleLogin = () => {
    setLoading(true);
    axios.post('https://assignment.stage.crafto.app/login', {
      username: username,
      otp: otp,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/quotes');
    })
    .catch((error) => {
      console.error("Login failed", error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='login-container'>
      <Card className="login-card">
        <Title level={3} >Login</Title>
        <Input 
          placeholder="Username" 
           size="large"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="input-field" 
        />
        <Input.Password 
          placeholder="OTP" 
          value={otp} 
           size="large"
          onChange={(e) => setOtp(e.target.value)} 
          className="input-field" 
        />
        <Button 
          type="primary" 
          onClick={handleLogin} 
          loading={loading} 
          block
          className="submit-button"
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
