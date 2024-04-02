import React, { useState } from "react";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { cfg } from "../../cfg/cfg";

function Admin() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState({
    value: null, //'success', 'errror'
    message: "",
  });
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
        img: imgUrl,
      };
      if (imgUrl.trim()) data.img = imgUrl;
      const response = await fetch(`${cfg.API.HOST}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const product = await response.json();
      if (!response.ok) throw new Error(product.error);
      setStatus({ value: "success", message: "Product created successfully" });
      console.log(product);
    } catch (error) {
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
          <Button type="submit" disabled={loading}>
            {loading && <Spinner animation="border" variant="secondary" />}
            Create product
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Admin;
