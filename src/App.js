import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './SharedComponents/Header/Header'; 
import QuoteListPage from './pages/Quotes/QuotesListing/QuoteListPage'; 
import CreateQuotePage from './pages/Quotes/CreateQuotePage/CreateQuotePage';
import LoginPage from './pages/Login/LoginPage';
import './App.css';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token'); 
  const location = useLocation(); 

  return (
    <div className="app-container">
      {isLoggedIn && location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/quotes" /> : <LoginPage />} />

        {isLoggedIn ? (
          <>
            <Route path="/quotes" element={<QuoteListPage />} />
            <Route path="/create-quote" element={<CreateQuotePage />} />
            <Route path="*" element={<Navigate to="/quotes" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} /> 
        )}
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
