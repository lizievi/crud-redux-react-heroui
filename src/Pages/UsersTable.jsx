import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@heroui/react";

import { columns, statusOptions, statusColorMap } from "../data/index";
import { capitalize } from "../utils/capitalize";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, editUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function UsersTable() {
  const users = useSelector((state) => state.user);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [userToEdit, setUserToEdit] = React.useState(null);
  const [userToView, setUserToView] = React.useState(null);
  const hasSearchFilter = Boolean(filterValue);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(null);

  const onNavigateToFormUser = useCallback(() => {
    navigate("/form");
  }, [navigate]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter, users]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onDeleteUser = React.useCallback((user) => {
    setIsModalOpen(true);
    setUserToDelete(user);
  }, []);

  const onEditUser = React.useCallback((user) => {
    setIsModalEditOpen(true);
    setUserToEdit(user);
    setFormData(user);
  }, []);

  const onViewUser = React.useCallback((users) => {
    setIsModalViewOpen(true);
    setUserToView(users);
  }, []);

  const dispatch = useDispatch();

  const handleDeleteConfirmed = React.useCallback(() => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  }, [userToDelete, dispatch]);

  const handleEditConfirmed = React.useCallback(() => {
    if (formData) {
      dispatch(editUser(formData));
      setIsModalEditOpen(false);
      setUserToEdit(null);
      setFormData(null);
    }
  }, [formData, dispatch]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(key) => {
                    switch (key) {
                      case "view":
                        onViewUser(user);
                        break;

                      case "edit":
                        onEditUser(user);
                        break;
                      case "delete":
                        onDeleteUser(user);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onDeleteUser, onEditUser, onViewUser]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={onNavigateToFormUser}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    users.length,
    onNavigateToFormUser,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ]);

  const handleChangeToEdit = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedChangeToEdit = (selected) => {
    const selectedValue = Array.from(selected)[0];
    setFormData({
      ...formData,
      status: selectedValue,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="mt-20">   
        <h1 className="text-2xl font-bold mb-5 text-[rgb(0,111,238)]">Users Table</h1>
        <Table
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          className="max-w-400"
        >
          
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmar Eliminación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de que quieres eliminar a{" "}
                  <strong>{userToDelete?.name}</strong>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={handleDeleteConfirmed}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar usuario</ModalHeader>
              {userToEdit && (
                <ModalBody user={formData}>
                  <Input
                    label="Name"
                    labelPlacement="outside"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeToEdit}
                  />
                  <Input
                    label="Role"
                    labelPlacement="outside"
                    name="role"
                    value={formData.role}
                    onChange={handleChangeToEdit}
                  />
                  <Input
                    label="Team"
                    labelPlacement="outside"
                    name="team"
                    value={formData.team}
                    onChange={handleChangeToEdit}
                  />
                  <Select
                    label="Status"
                    labelPlacement="outside"
                    name="status"
                    selectedKeys={formData.status}
                    // onChange={handleChangeToEdit}
                    onSelectionChange={handleSelectedChangeToEdit}
                  >
                    <SelectItem key="active">Active</SelectItem>
                    <SelectItem key="paused">Paused</SelectItem>
                    <SelectItem key="vacation">Vacation</SelectItem>
                  </Select>
                  <Input
                    label="Avatar"
                    labelPlacement="outside"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChangeToEdit}
                  />
                  <Input
                    label="Age"
                    labelPlacement="outside"
                    name="age"
                    value={formData.age}
                    onChange={handleChangeToEdit}
                  />
                  <Input
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeToEdit}
                  />
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleEditConfirmed}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalViewOpen} onClose={() => setIsModalViewOpen(false)}>
        <ModalContent>
          {userToView && (
            <>
              <ModalHeader>View user</ModalHeader>
              <ModalBody user={userToView}>
                <Input
                  label="Name"
                  labelPlacement="outside"
                  name="name"
                  value={userToView.name}
                  disabled
                />
                <Input
                  label="Role"
                  labelPlacement="outside"
                  name="role"
                  value={userToView.role}
                  disabled
                />
                <Input
                  label="Team"
                  labelPlacement="outside"
                  name="team"
                  value={userToView.team}
                  disabled
                />

                <Input
                  label="Status"
                  labelPlacement="outside"
                  name="status"
                  value={userToView.status}
                  disabled
                />

                <Input
                  label="Avatar"
                  labelPlacement="outside"
                  name="avatar"
                  value={userToView.avatar}
                  disabled
                />
                <Input
                  label="Age"
                  labelPlacement="outside"
                  name="age"
                  value={userToView.age}
                  disabled
                />
                <Input
                  label="Email"
                  labelPlacement="outside"
                  name="email"
                  value={userToView.email}
                  disabled
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
