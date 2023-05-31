import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/posts'>Posts</Link>
            </li>
            <li>
              <Link to='/comments'>Comments</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path='/'
            element={
              <h1>
                Welcome to the React Tabular
                <img
                  src='https://codersera.com/blog/wp-content/uploads/2021/01/tech-facebook-cover-9.jpg'
                  alt='App Image'
                />
              </h1>
            }
          />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/posts' element={<PostsPage />} />
          <Route path='/comments' element={<CommentsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
