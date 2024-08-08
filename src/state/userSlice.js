import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    email: '',
    phone: '',
    giver: false,
    searcher: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // Add more reducers for other fields
  },
});

export const { setUsername, setPassword } = userSlice.actions;
export default userSlice.reducer;