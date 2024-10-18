import React, { useState } from 'react';
import { Input, Button, Upload, Card, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuotePage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!text) {
      alert('Please add quote text');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data: uploadResponse } = await axios.post(
      'https://crafto.app/crafto/v1.0/media/assignment/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const token = localStorage.getItem('token');
    await axios.post(
      'https://assignment.stage.crafto.app/postQuote',
      { text, mediaUrl: uploadResponse.mediaUrl },
      { headers: { Authorization: token, 'Content-Type': 'application/json' } }
    );

    navigate('/quotes');
  };

  const handleFileChange = (info) => {
    setFile(info.file.originFileObj);
  };

  return (
    <div>
      {/* Custom Header */}
      <Row
        style={{
          padding: '16px',
          background: '#f0f2f5',
          borderBottom: '1px solid #d9d9d9',
          alignItems: 'center',
        }}
      >
        <Col>
          <ArrowLeftOutlined onClick={() => navigate(-1)} style={{cursor:'pointer',marginRight:"10px"}}/>
        </Col>
        <Col>
          <h3 style={{ margin: 0 }}>Create Quote</h3>
        </Col>
      </Row>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 120px)'
        }}
      >
        <Card title="Create Quote" style={{ width: 400 }}>
          <div style={{ marginBottom: 16 }}>
            <Input.TextArea
              placeholder="Enter your quote"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Upload onChange={handleFileChange}>
              <Button>Upload Image</Button>
            </Upload>
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CreateQuotePage;
