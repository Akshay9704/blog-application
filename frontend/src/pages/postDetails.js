import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from '../components/comment'
import Navbar from '../components/header'
import axios from 'axios'
import { URL, IMG } from '../url';
import { useEffect, useState, useContext } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FcManager } from "react-icons/fc";
import UserContext from '../context/userContext'

const PostDetails = () => {
  const postId = useParams().id
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [loader, setLoader] = useState(false)
  const [comment, setComment] = useState('')
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`)
      console.log(res.data);
      setPost(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true })
      console.log(res.data);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const postComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${URL}/api/comments/create`, { comment: comment, author: user.username, postId: postId, userId: user._id }, { withCredentials: true })
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      {loader ? <div className="h-[80vh] flex justify-center items-center w-full"><h1>Loading...</h1></div> : <div className="px-8 md:px-[200px] mt-8">
        <div className=" border p-3 shadow " >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)} ><BiEdit /></p>
              <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
            </div>}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <div className="flex">   <FcManager className=" text-2xl mr-2 " > </FcManager> By @{post.author}</div>
            <div className="flex  space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
            </div>
          </div>
          <div className=" w-[100%] flex flex-col justify-center   " >
            <img src={IMG + post.photo} className="object-cover h-[45vh] mx-auto mt-8" alt="" />
            <p className="mx-auto mt-8 w-[60vh] lg:w-[80vh] md:w-[60vh] border p-5 shadow-xl">{post.content}</p>
            <div className="flex justify-center item-center p-3 flex-col mt-4">
              <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
              {comments?.map((c) => (
                <Comment className=" " key={c._id} c={c} post={post} />
              ))}
            </div>
            {/* write a comment */} 
            <div className="lg:w-[90vh] md:w-[70vh] w-[65vh] border flex justify-center flex-col mt-4 md:flex-row">
              <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
              <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default PostDetails