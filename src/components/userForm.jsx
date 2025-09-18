import { useState } from "react";
import { useDispatch } from "react-redux";
import {addSlice} from "../features/userSlice";
import { v4 as uuid } from "uuid";

function UserForm() {
  const [user, setUser] = useState({
    name: "",
    role: "",
    team: "",
    status: "",
    age: "",
    avatar: "",
    email: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        addSlice({
          ...user,
          id: uuid(),
        })
      );
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="name"
        onChange={handleChange}
      />
      <br />
      <input
        name="age"
        type="text"
        placeholder="age"
        onChange={handleChange}
      />
      <br />

      <input
        name="role"
        type="text"
        placeholder="role"
        onChange={handleChange}
      /> 
      <br />

      <input
        name="email"
        type="email"
        placeholder="email"
        onChange={handleChange}
      />  
      <br />

      <input
        name="status"
        type="text"
        placeholder="status"
        onChange={handleChange}
      /> 
      <br />

      <input
        name="team"
        type="text"
        placeholder="team"
        onChange={handleChange}
      />  
      <br />

      <input
        name="avatar"
        type="text"
        placeholder="avatar"
        onChange={handleChange}
      />    
      <br />
      <button>Add</button>
    </form>
  );
}

export default UserForm;
