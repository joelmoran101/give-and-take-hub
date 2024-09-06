import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
   userId: '',
  },
  reducers: {

    setUserId: (state, action) => {
      state.userId = action.payload;
    }
    // Add more reducers for other fields
  },
});

export const { setUserId} = userSlice.actions;
export default userSlice.reducer;