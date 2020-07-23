import React, { Component } from "react";
import "./TodoApp.css";
export default class TodoApp extends Component {
  state = {
    input: "",
    items: JSON.parse(localStorage.getItem("todo"))
      ? JSON.parse(localStorage.getItem("todo"))
      : [],
  };

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { input, items } = this.state;
    if (input !== "") {
      this.setState({
        items: [...items, input],
        input: "",
      });
    }
  };

  handleDelete = (key) => {
    this.setState({
      items: this.state.items.filter((value, index) => index !== key),
    });
  };

  handleEdit = (text, key) => {
    let temp = [];
    this.state.items.map((data, index) => {
      if (index === key) {
        temp[index] = text;
      } else temp[index] = data;
      return 0;
    });
    this.setState({
      items: [...temp],
    });
  };
  render() {
    const { input, items } = this.state;
    localStorage.setItem("todo", JSON.stringify(items));
    return (
      <div className="todo-container">
        <form className="input-container" onSubmit={this.handleSubmit}>
          <h1>Todo App</h1>

          <input
            value={input}
            placeholder="Enter here..."
            type="text"
            onChange={this.handleChange}
          ></input>
        </form>
        <div className="list-container">
          <ul>
            {items.map((data, index) => {
              return (
                <li key={index}>
                  <input
                    className="list-input"
                    type="text"
                    value={data}
                    onChange={(e) => this.handleEdit(e.target.value, index)}
                  />
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => this.handleDelete(index)}
                  ></i>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
