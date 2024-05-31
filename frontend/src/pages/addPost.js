import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'
import { URL } from '../url'
import Navbar from '../components/header'

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)

  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const post = {
      title,
      content,
      username: user.username,
      userId: user._id,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data)
      }
      catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className='flex justify-center'>
        <div className='px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-2xl mt-3 flex justify-center'>
            Create a Post
          </h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input
              type='text'
              placeholder='Title'
              className='border px-4 py-2 outline-none m-2'
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder='Description'
              className='border px-4 py-2 outline-none m-2'
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type='file'
              className='border px-4 py-2 outline-none m-2'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className='bg-black text-white p-2 m-2 w-full md:w-[20%] mx-auto'
              onClick={handleCreatePost}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPost