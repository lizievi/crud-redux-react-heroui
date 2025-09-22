import React from "react";
import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { v4 as uuid } from "uuid";

export default function UserForm() {
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const dispatch = useDispatch();

  const onAddUser = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newUser = {
      ...data,
      id: uuid(),
    };
    dispatch(addUser(newUser));
    e.currentTarget.reset();
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4 mt-10"
      onSubmit={onAddUser}
    >
      <h1 className="text-2xl font-bold mb-5 text-primary-500">Add new user</h1>
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          label="Role"
          labelPlacement="outside"
          name="role"
          placeholder="Enter your role"
        />

        <Input
          isRequired
          label="Team"
          labelPlacement="outside"
          name="team"
          placeholder="Enter your team"
        />

        <Select
          isRequired
          label="Status"
          labelPlacement="outside"
          name="status"
          placeholder="Select status"
          
        >
          <SelectItem key="active">Active</SelectItem>
          <SelectItem key="paused">Paused</SelectItem>
          <SelectItem key="vacation">Vacation</SelectItem>
        </Select>

        <Input
          isRequired
          label="Avatar"
          labelPlacement="outside"
          name="avatar"
          placeholder="Enter your avatar"
        />

        <Input
          isRequired
          label="Age"
          labelPlacement="outside"
          name="age"
          placeholder="Enter your age"
        />

        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Add
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
          <Button variant="bordered" onPress={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="text-center text-green-500 font-semibold mt-4">
          ¡El usuario se ha agregado exitosamente!
        </div>
      )}
    </Form>
  );
}
