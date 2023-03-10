import { configureStore } from '@reduxjs/toolkit';
import todosSlice, { __getTodos } from './modules/todosSlice';

const store = configureStore({
  reducer: { todos: todosSlice },
});
export default store;
