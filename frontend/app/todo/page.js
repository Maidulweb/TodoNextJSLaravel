"use client";
import React, { useEffect, useState } from "react";
import axios from "./lib/axios";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const todoSubmit = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("is_done", 0);
    let url = "/api/todos";

    if (editId != "") {
      url = "/api/todos/" + editId;
      formdata.append("_method", "PUT");
    }

    axios.post(url, formdata).then((res) => {
      setTitle("");
      fetchTodos();
      setEditId("");
    });
  };

  const editTodo = (id) => {
    setEditId(id);
    todos.map((item) => {
      if (item.id === id) {
        setTitle(item.title);
      }
    });
  };

  function fetchTodos() {
    axios.get("/api/todos/").then((res) => {
      setTodos(res.data);
    });
  }

  function deleteTodo(id) {
    let params = { _method: "DELETE" };
    axios.post("/api/todos/" + id, params).then((res) => {
      setTitle("");
      fetchTodos();
      setEditId("");
    });
  }

  return (
    <>
      <div className="container mx-auto w-1/2">
        <div className="form py-9">
          <form onSubmit={todoSubmit} method="post">
            <div className="mb-6">
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
                value={title}
                onChange={titleChange}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>
                <th scope="col" className="px-6 py-3">
                  Tital
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.title}
                    </th>

                    <td className="px-6 py-4">
                      <button
                        className="p-2 w-20 rounded bg-lime-500 text-white"
                        onClick={() => editTodo(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-3 w-20 rounded p-2 bg-red-600 text-white"
                        onClick={() => deleteTodo(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Todo;
