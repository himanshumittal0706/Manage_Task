import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, fetchTodoById } from "../store/slices/todoSlice";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FetchByIdDialog } from "../utils/Dialog";

export const TodoApp = () => {
  return (
    <section>
      <FetchTodo />
    </section>
  )
}

export const FetchTodo = () => {

  const [openDialogId, setOpenDialogId] = useState(false);

  const handleClick = (id) => {
    dispatch(fetchTodoById(id));
    setOpenDialogId(true);
  }

  const handleClose = () => setOpenDialogId(false);

  const dispatch = useDispatch();

  const { loading, todos, error } = useSelector((state) => state.todoAPI);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);


  if (loading) return <div className="loader-overlay">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>

  if (error) return <h2>{error}</h2>;

  return (
    <section>
      <Container>
        <Row>
          {
            todos.map((todo) => (
              <Col key={todo.id} xxl={3} xl={3} lg={3} md={6} sm={12} xs={12} className="mb-3 border border-bg p-2 m-2">
                <p>{todo.todo}</p>
                <button onClick={() => handleClick(todo.id)} type="button" className="btn btn-dark btn btn-sm">Get Single ID</button>
              </Col>
            ))
          }
        </Row>
      </Container>
      <FetchByIdDialog open={openDialogId} handleClose={handleClose} />
    </section>
  )
}



