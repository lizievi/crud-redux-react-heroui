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
    }
  },
});

export const { deleteUser } = userSlice.actions;

// export const { addUser } = addSlice.actions;
export default userSlice.reducer;
