import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./pages/main";
import Login from "./pages/login";
import Register from "./pages/register";
import AddPost from "./pages/addPost";
import PostDetails from "./pages/postDetails";
import EditPost from "./pages/editPost";
import MyPosts from "./pages/myPosts";
import Profile from "./pages/profile";
import UserContextProvider from './context/UserContextProvider';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add" element={<AddPost />} />
          <Route exact path="/posts/post/:id" element={<PostDetails />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/myposts/:id" element={<MyPosts />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
