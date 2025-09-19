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
      // state.push(userToAdd);
      return [...state, userToAdd];
    },
    editUser: (state, action) => {
      const userToEdit = action.payload;
      const userId = userToEdit.id;
      return state.map((user) => {
        if (user.id === userId) {
          return userToEdit;
        }
        return user;
      });
    }
  },
});

export const { deleteUser, addUser, editUser } = userSlice.actions;

// export const { addUser } = addSlice.actions;
export default userSlice.reducer;
