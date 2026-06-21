import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos } from "../store/slices/todoSlice";

export const TodoApp = () => {

  const dispatch = useDispatch();

    const { loading, todos, error } = useSelector(
        (state) => state.todoAPI
    );

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section>
      <h2>Radha</h2>
      {
        todos.map((todo) => (
          <p key={todo.id}>{todo.todo}</p>
        ))
      }
    </section>
  )
}


