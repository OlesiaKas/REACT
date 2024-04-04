import React, { useState, useContext } from "react";
import { Form, Col, Row, Container, Spinner, Alert } from "react-bootstrap";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import { AppContext } from "../../context/AppContext";
import { cfg } from "../../cfg/cfg";

function Admin() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState({
    value: null, //'success', 'error'
    message: "",
  });

  const { token, setToken } = useAuth();
  const { fetchData, setShowLogin } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidated(true);
    console.log("submit");

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    console.log("data submited");
    console.log("title", title);
    console.log("description", description);
    console.log("image", imgUrl);

    try {
      setLoading(true);
      const data = {
        title,
        description,
      };
      if (imgUrl.trim()) data.img = imgUrl;
      const response = await fetch(`${cfg.API.HOST}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const product = await response.json();
      console.log(response);
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          setShowLogin(true);
          alert("You need to login again");
        }

        throw new Error(product.error);
      }

      setStatus({ value: "success", message: "Product created successfully" });
      fetchData();
      console.log(product);
    } catch (error) {
      console.log(error);
      setStatus({
        value: "danger",
        message:
          error.message || "Failed creating product. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="custom-container">
      <h1>Add Product</h1>
      <Container>
        {status.value && <Alert variant={status.value}>{status.message}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Title is required!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Description is required!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label>Image url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button style={{ marginTop: "2rem" }} type="teal" disabled={loading}>
            Create product
          </Button>
          {loading && <Spinner animation="border" variant="secondary" />}
        </Form>
      </Container>
    </main>
  );
}

export default Admin;
