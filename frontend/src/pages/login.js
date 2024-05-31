import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url.js';
import UserContext from '../context/userContext.js';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${URL}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      setUser(response.data);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      setError(true); // Set error state to display error message
    }
  };

  return (
    <div>
      <Toaster />
      <div className='flex items-center justify-center px-6 md:px-[200px] py-4 bg-black text-white'>
        <h1 className='text-lg md:text-xl font-bold'>
          <Link to='/'>Blog Application</Link>
        </h1>
      </div>
      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
          <h1 className='text-3xl font-bold text-left'>
            Login to your account
          </h1>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 px-2 py-3 w-full rounded-xl'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 px-2 py-3 w-full rounded-xl'
          />
          <button
            onClick={handleLogin}
            className='bg-black text-white px-4 py-3 rounded-md w-full'>
            Login
          </button>
          {error && <p className='text-red-500'>Something went wrong</p>}
          <div className='flex justify-center items-center space-x-3'>
            <p>Create new account</p>
            <Link to='/register' className='text-gray-500 hover:text-black'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
