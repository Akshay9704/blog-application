import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { URL } from "../url";
import toast, { Toaster } from "react-hot-toast";
import UserContext from "../context/userContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            Blog Application
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {user ? (
                <>
                  <Nav.Link
                    className="text-lg"
                    onClick={() => navigate("/add")}
                  >
                    Add Blog
                  </Nav.Link>
                  <Nav.Link
                    className="text-lg"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    className="text-lg"
                    onClick={() => {
                      navigate("/");
                      handleLogout();
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  className="text-lg"
                  onClick={() => navigate("/login")}
                >
                  Login/Register
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
