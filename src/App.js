import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routing/Router';
import './style/css/App.css';
import Navbar from './components/layout/Navbar';
import { getUser } from './redux/actions/auth';

function App() {
  const dispatch = useDispatch();

  // Check if there is a logged in user
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
