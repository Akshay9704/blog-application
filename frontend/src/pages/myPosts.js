import { Link } from "react-router-dom";
import Navbar from "../components/header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Posts from "../components/posts";
import UserContext from "../context/userContext";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="text-center mt-16">Loading...</div>
        ) : noResults ? (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        ) : (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <Posts post={post} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPosts;
