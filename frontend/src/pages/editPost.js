import { useContext, useEffect, useState } from "react";
import Navbar from "../components/header.jsx";
import axios from "axios";
import { URL } from "../url.js";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/userContext.js";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]); // Ensure setCats is defined

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(`${URL}/api/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(`${URL}/api/posts/${postId}`, post, { withCredentials: true });
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="p-4 border w-[70%] flex flex-col justify-center px-6 md:px-[200px] mt-8">
          <h1 className="font-bold flex justify-center md:text-2xl text-xl">Update a post</h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 outline-none"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4"
            />
            <div className="flex flex-col">
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                rows={9}
                cols={30}
                className="px-4 py-2 outline-none"
                placeholder="Enter post description"
              />
              <button
                onClick={handleUpdate}
                className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
