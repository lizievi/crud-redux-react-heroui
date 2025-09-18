import { createSlice } from "@reduxjs/toolkit";
import { users } from "../data/users.js";
const initialState = users;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //  action: type y payload = valor
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      
      return state.filter(({id}) => id !== userIdToDelete)
    },
    addUser:(state, action) => {
      const userToAdd = action.payload;
      state.push(userToAdd);
    }
  },
});

export const { deleteUser, addUser } = userSlice.actions;

// export const { addUser } = addSlice.actions;
export default userSlice.reducer;
