import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url.js';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post(`${URL}/api/auth/register`, {
                username, email, password
            })
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setFullname(res.data.fullname)
            setError(false);
            toast.success('Account created successfully');
            navigate('/login');
        } catch (error) {
            setError(true);
            toast.error('Something went wrong');
            console.log(error);
        }
    }
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
                        Create a new account
                    </h1>
                    <input
                        type='text'
                        placeholder='fullname'
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className='border border-gray-300 px-2 py-3 w-full rounded-xl'
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border border-gray-300 px-2 py-3 w-full rounded-xl'
                    />
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
                        onClick={handleRegister}
                        className='bg-black text-white px-4 py-3 rounded-md w-full'>
                        Register
                    </button>
                    {error && <p className='text-red-500'>Something went wrong</p>}
                    <div className='flex justify-center items-center space-x-3'>
                        <p>Already have an account?</p>
                        <Link to='/login' className='text-gray-500 hover:text-black'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register