import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, FloatButton, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QuoteListPage.scss';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .get(`https://assignment.stage.crafto.app/getQuotes?limit=10&offset=${offset}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const { data } = response.data;

        if (data.length === 0) {
          setHasMore(false); 
        } else {
          setQuotes((prevQuotes) => [...prevQuotes, ...data]);
          setOffset((prevOffset) => prevOffset + data.length);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='quote-list-page'>
      <Title level={3} className='page-title'>Welcome back,</Title>
      <div className="quote-list-container">
        {quotes.map((quote) => (
          <Card
            key={quote.id}
            hoverable
            className="quote-card"
            cover={
              <div className="image-container">
                <img src={quote.mediaUrl} alt="quote media" className="quote-image" />
                {quote.mediaUrl?.startsWith('http') && <div className="overlay-text">Quote: {quote.text}</div>}
              </div>
            }
          >
            <div className="quote-meta">
              <div className='quoteDetails'><span>Username:</span> <span>{quote.username}</span></div>
              <div className='quoteDetails'><span>Updated at:</span> <span>{new Date(quote.updatedAt).toLocaleString()}</span></div>
            </div>
          </Card>
        ))}
        {loading && <Spin />}
      </div>
      {hasMore && (
        <div className='load-more-container'>
          <Button onClick={loadQuotes} loading={loading} disabled={loading}>
            Load More
          </Button>
        </div>
      )}
      <FloatButton
        shape="square"
        type="primary"
        onClick={() => navigate('/create-quote')}
        className="float-btn"
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default QuoteListPage;
