import React, { useState, useEffect } from "react";
import qs from "query-string";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import history from "@history";
import {
  Button,
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Box,
  ButtonGroup,
} from "@material-ui/core";
import ConfrimDialogue from "../../components/Dialogue/ConfrimDialogue";
import users from "../../MOCK_DATA";
import Modal from "../../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UserList.module.css";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
};

const UsersList = (props) => {
  const querystr = qs.parse(props.location.search);
  const usr_page = querystr.page ? JSON.parse(querystr.page) : 1;
  const [userList, setUserList] = useState(users);
  const [variables, setVariables] = useState({ ...querystr });
  const [perPageUsers] = useState(10);
  const [dialogue, setDialogue] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [inputName, setInputName] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [addUsrOpen, setAddUsrOpen] = useState(false);

  // const users = useMemo(() => {
  //   return generateData();
  // }, []);

  // function generateData() {
  //   let users = [];
  //   for (let i = 1; i <= 40; i++) {
  //     users.push({
  //       id: i,
  //       name: `user${i}`,
  //     });
  //   }
  //   return users;
  // }

  const handlePageChange = (pg) => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    let searchKey = `_${e.target.key.value}`;
    let searchVal = e.target.value.value;
    setVariables({
      ...variables,
      [searchKey]: searchVal,
      page: 1,
    });
    setUserList(users);
    document.getElementById("search_input").value = "";
  };

  const handleTagDel = (key) => {
    delete variables[key];
    setUserList(users);
    // setSearchBy()
    setVariables({ ...variables, page: 1 });
  };

  const handleDelete = () => {
    setUserList(userList.filter((user) => user.id !== rowId));
    setDialogue(false);
    toast("Deleting Record", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const edit_row_modal_handler = (row) => {
    setEditOpen(true);
    setInputName(row.name);
    setRowId(row.id);
  };

  const add_user_modal_handler = () => {
    setAddUsrOpen(true);
  };

  const edit_row_submit_handler = () => {
    const currentRow = userList.find((user) => user.id === rowId);
    currentRow.name = inputName;
    setUserList(
      userList.map((user) => (user.id === rowId ? currentRow : user))
    );
    setEditOpen(false);
    toast("Updating Record", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setInputName("");
  };

  const add_user_submit_handler = () => {
    let id = userList.length;
    id++;
    const user = {
      id,
      name: inputName,
    };
    setUserList((prvUsers) => [...prvUsers, user]);
    setAddUsrOpen(false);
    setInputName("");
  };

  const columns = [
    {
      maxWidth: 75,
      Header: "No.",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Action",
      accessor: "",
      style: {
        textAlign: "center",
      },
      width: 100,
      Cell: (props) => {
        return (
          <Button
            variant="contained"
            // style={{ color: "red" }}
            onClick={() => {
              setDialogue(true);
              setRowId(props.original.id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
    {
      Header: "",
      accessor: "",
      style: {
        textAlign: "center",
      },
      width: 100,
      Cell: (props) => {
        return (
          <div
            style={BUTTON_WRAPPER_STYLES}
            onClick={() => console.log("clicked")}
          >
            <Button
              variant="contained"
              onClick={() => edit_row_modal_handler(props.original)}
            >
              edit
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (userList) {
      const q_str = qs.stringify(variables);
      history.push({ search: q_str });
      let users = [];
      if (variables._id) {
        userList.filter((user) => {
          if (!variables._id) {
            users.push(user);
          } else if (user.id.toString().includes(variables._id)) {
            users.push(user);
          }
        });
        setUserList(users);
      } else if (variables._name) {
        userList.filter((user) => {
          if (!variables._name) {
            users.push(user);
          } else if (
            user.name
              .toString()
              .toLowerCase()
              .includes(variables._name.toLowerCase())
          ) {
            users.push(user);
          }
        });
        setUserList(users);
      }
    }
  }, [variables]);

  // get current users
  const indexOfLastUser = variables.page
    ? variables.page * perPageUsers
    : 1 * perPageUsers;
  const indexOfFirstUser = indexOfLastUser - perPageUsers;

  let currentUsers = [];
  if (userList) {
    currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);
  }

  return (
    <div className="ecom-dashboard-wrapper">
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i className="ti-angle-left"></i>
          <h2 className="">User List</h2>
        </div>
      </div>
      <div className="container">
        <div className="mb-3 d-flex justify-content-end flex-wrap">
          <div className="tag-container">
            {variables &&
              Object.keys(variables).map((key) =>
                key.charAt(0) === "_" && variables[key] ? (
                  <span key={key} className="tag-spans">
                    {variables[key]}
                    <button
                      className="tag-del-btn"
                      onClick={() => handleTagDel(key)}
                    >
                      <i className="zmdi zmdi-close"></i>
                    </button>
                  </span>
                ) : null
              )}
          </div>
        </div>
        <div className={styles.flex_container}>
          <div
            style={BUTTON_WRAPPER_STYLES}
            onClick={() => console.log("clicked")}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#3f50b5", color: "white" }}
              onClick={add_user_modal_handler}
            >
              Add
            </Button>
          </div>
          <div className={styles.flex}>
            {/* <p>item one</p>
            <p>item two</p> */}

            <div>
              <form
                onSubmit={(e) => onSearchHandler(e)}
                className={styles.flex}
              >
                <div>
                  <select name="key">
                    <option value="id">id</option>
                    <option value="name">name</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="value"
                    id="search_input"
                    placeholder="search query..."
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ConfrimDialogue
          open={dialogue}
          handleClose={() => setDialogue(false)}
          action={() => handleDelete()}
          msg={"Are you sure you want to Delete ?"}
        />
        <ReactTable
          className="invoices-table"
          loading={false}
          // loadingText={<CircularProgress />}
          data={currentUsers}
          columns={columns}
          onPageChange={(pg) => handlePageChange(pg)}
          // onSortedChange={(newSorted) => handleSorting(newSorted)}
          page={usr_page - 1}
          manual
          // defaultPageSize={5}
          pages={Math.ceil(userList.length / perPageUsers)}
          // pageSize={10}
          showPageSizeOptions={false}
          showPageJump={true}
          minRows={2}
          noDataText="No User Found"
        />
      </div>
      <Modal open={editOpen}>
        <h2 style={{ marginBottom: "2rem" }}>Update User Name</h2>
        <FormGroup className="my-10">
          <FormControl>
            <InputLabel htmlFor="my-input">User Name</InputLabel>
            <Input
              type="text"
              id="my-input"
              aria-describedby="my-helper-text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            {/* <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText> */}
          </FormControl>
          {/* <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          /> */}
        </FormGroup>
        <div style={{ width: "300px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              size="large"
              aria-label="large button group"
              className="mt-10"
            >
              <Button variant="outlined" onClick={edit_row_submit_handler}>
                update
              </Button>
              <Button variant="outlined" onClick={() => setEditOpen(false)}>
                close
              </Button>
            </ButtonGroup>
          </Box>
        </div>
      </Modal>
      <Modal open={addUsrOpen}>
        <h2 style={{ marginBottom: "2rem" }}>Add User</h2>
        <FormGroup className="my-10">
          <FormControl>
            <InputLabel htmlFor="my-input">User Name</InputLabel>
            <Input
              type="text"
              id="my-input"
              aria-describedby="my-helper-text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            {/* <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText> */}
          </FormControl>
          {/* <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          /> */}
        </FormGroup>
        <div style={{ width: "300px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              size="large"
              aria-label="large button group"
              className="mt-10"
            >
              <Button variant="outlined" onClick={add_user_submit_handler}>
                Add
              </Button>
              <Button variant="outlined" onClick={() => setAddUsrOpen(false)}>
                close
              </Button>
            </ButtonGroup>
          </Box>
        </div>
      </Modal>
      <div style={OTHER_CONTENT_STYLES}></div>
    </div>
  );
};

export default UsersList;
