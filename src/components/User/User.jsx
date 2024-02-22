import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./user.scss";
function User() {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {loading && <Spinner className="spinner-size" animation="grow" />}
      {!loading && user && (
        <>
          <div className="user" onClick={handleShow}>
            {user?.username[0]}
          </div>
          <Offcanvas
            className="offcanvas"
            show={show}
            onClick={handleClose}
            placement="end"
          >
            {" "}
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>{user.username}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p></p>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
}

export default User;
