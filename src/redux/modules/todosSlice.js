import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  // 첫번째 인자 - 이름(의미는 없음)
  'getTodos',

  // 두번째 인자 - 콜백함수
  // 서버와 통신하는 부분은 비동기처리해줘야함 - async
  async (payload, thunkAPI) => {
    // 서버와 통신은 항상 성공할 수 없음 따라서 시도하는 부분과 실패했을때의 부분을 분리해놔야함
    try {
      const responce = await axios.get('http://localhost:4000/todos');
      console.log(responce);

      // toolkit에서 제공하는 API
      // promise -> resolve(=네트워크 요청이 성공한 경우) -> dispatch해주는 기능을 가진 API
      return thunkAPI.fulfillWithValue(responce.data);
    } catch (error) {
      console.log('error', error);

      // toolkit에서 제공하는 API
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    // 아직 진행중일때
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
    },

    // 완료됐을때
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },

    // 에러가 났을때
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
