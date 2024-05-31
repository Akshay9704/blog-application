import { IMG } from "../url";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";

const Posts = ({ post }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Card style={{ width: "28rem" }}>
        <Card.Img variant="top" src={IMG + post.photo} alt="" />
        <img src={IMG + post.photo} alt="" />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text>{post.username}</Card.Text>
          <Link to={`/posts/post/${post._id}`}>
            <Button variant="dark">Explore</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Posts;
