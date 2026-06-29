import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Alert, ListGroup } from "react-bootstrap";

export const Products = () => {
  const [productData, setProductData] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok)
        throw new Error("Failed to fetch");
      const result = await response.json();
      setProductData(result.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData() }, []);

  const handleAdd = () => {
    if (!title.trim()) return;

    const newProduct = {
      id: Date.now(),
      title,
      tags: [],
    };

    setProductData((prev) => [newProduct, ...prev]);
    setTitle("");
  };

  const handleUpdate = () => {
    setProductData((prev) =>
      prev.map((item) =>
        item.id === editId ? { ...item, title } : item
      )
    );

    setEditId(null);
    setTitle("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
  };

  const handleDelete = (id) => {
    const deleted = productData.find((item) => item.id === id);

    if (deleted) {
      setDeletedItems((prev) => [...prev, deleted]);
    }

    setProductData((prev) => prev.filter((item) => item.id !== id));

    if (editId === id) {
      setEditId(null);
      setTitle("");
    }
  };

  const filteredData = productData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="py-4">

      <Card className="shadow-sm mb-4">
        <Card.Body>

          <h2 className="mb-4 text-center">Products</h2>

          <Row className="g-2 mb-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder={
                  editId ? "Edit Product Title" : "Enter Product Title"
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editId ? handleUpdate() : handleAdd();
                  }
                }}
              />
            </Col>

            <Col md={4}>
              {editId ? (
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-100"
                  onClick={handleAdd}
                >
                  Add Product
                </Button>
              )}
            </Col>
          </Row>

          <Form.Control
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </Card.Body>
      </Card>

      <Row>
        {filteredData.length === 0 ? (
          <Col>
            <Alert variant="info">
              {search
                ? `No products found for "${search}".`
                : "No products available."}
            </Alert>
          </Col>
        ) : (
          filteredData.map((item) => (
            <Col md={6} lg={4} className="mb-4" key={item.id}>
              <Card className="h-100 shadow-sm">

                <Card.Body>

                  <Card.Title>{item.title}</Card.Title>

                  <div className="mb-3">
                    {item.tags?.length > 0 ? (
                      item.tags.map((tag) => (
                        <Badge
                          bg="primary"
                          className="me-2 mb-2"
                          key={tag}
                        >
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <Badge bg="secondary">
                        No Tags
                      </Badge>
                    )}
                  </div>

                  <div className="d-flex gap-2">

                    <Button variant="light" className="w-100" onClick={() => { setEditId(item.id); setTitle(item.title); }} >Edit</Button>

                    <Button variant="danger" className="w-100" onClick={() => handleDelete(item.id)}>Delete</Button>

                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Card className="shadow-sm mt-4">
        <Card.Body>

          <h4 className="mb-3">Deleted Products</h4>

          {deletedItems.length === 0 ? (
            <Alert variant="secondary">
              No deleted items.
            </Alert>
          ) : (
            <ListGroup>
              {deletedItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  {item.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

        </Card.Body>
      </Card>

    </Container>
  );
};



