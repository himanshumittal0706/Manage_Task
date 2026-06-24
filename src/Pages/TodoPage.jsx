import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, fetchTodoById } from "../store/slices/todoSlice";
import { Container, Row, Col } from "react-bootstrap";
import { FetchByIdDialog } from "../utils/Dialog";
import { Loader } from "../utils/Loader";
import { InfoOutlined } from "@mui/icons-material";
import "./TodoPage.css";

export const TodoApp = () => {
  return (
    <section className="todo-app-section">
      <FetchTodo />
    </section>
  );
};

export const FetchTodo = () => {
  const [openDialogId, setOpenDialogId] = useState(false);

  const dispatch = useDispatch();
  const { loading, todos, error } = useSelector((state) => state.todoAPI);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(fetchTodoById(id));
    setOpenDialogId(true);
  };

  const handleClose = () => {
    setOpenDialogId(false);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="todo-error">
        <p>Failed to load todos: {error}</p>
      </div>
    );
  }

  return (
    <Container fluid className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">
          <span className="todo-title-icon">📋</span>
          API Todos
        </h2>
        <p className="todo-subtitle">Explore todos fetched from the API</p>
      </div>

      <Row className="g-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Col key={todo.id} xxl={3} xl={3} lg={4} md={6} sm={12}>
              <div className="todo-card">
                <div className="todo-card-body">
                  <span
                    className={`todo-status-badge ${todo.completed ? "completed" : "pending"}`}
                  >
                    {todo.completed ? "✓ Done" : "○ Pending"}
                  </span>
                  <p className="todo-card-text">{todo.todo}</p>
                  <button
                    onClick={() => handleClick(todo.id)}
                    className="todo-detail-btn"
                    type="button"
                  >
                    <InfoOutlined fontSize="small" />
                    View Details
                  </button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="todo-empty">
              <p className="todo-empty-icon">📭</p>
              <p className="todo-empty-text">No todos found</p>
            </div>
          </Col>
        )}
      </Row>

      <FetchByIdDialog open={openDialogId} handleClose={handleClose} />
    </Container>
  );
};
