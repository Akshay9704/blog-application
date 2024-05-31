import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/posts.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/header';
import { URL } from '../url.js';
import UserContext from '../context/userContext.js';

const Main = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts`);
      if (!res.data) {
        setNoResults(true);
      } else {
        setPosts(res.data);
      }
    } catch (error) {
      console.error(error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className='px-8 md:px-[200px] min-h-[80vh]'>
        {noResults ? (
          <h3 className='text-center font-bold mt-6'>No posts available</h3>
        ) : (
          posts.map((post) => (
            <div className="h-[20vh] flex justify-center items-center" key={post._id}>
              <Posts post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Main;
