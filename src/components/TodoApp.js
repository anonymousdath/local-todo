import React, { Component } from "react";
import "./TodoApp.css";
export default class TodoApp extends Component {
  state = {
    input: "",
    items: JSON.parse(localStorage.getItem("todo"))
      ? JSON.parse(localStorage.getItem("todo"))
      : [],
    checked: JSON.parse(localStorage.getItem("check"))
      ? JSON.parse(localStorage.getItem("check"))
      : [],
  };

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { input, items, checked } = this.state;
    if (input !== "") {
      this.setState({
        items: [...items, input],
        checked: [...checked, false],
        input: "",
      });
    }
  };

  handleDelete = (key) => {
    this.setState({
      items: this.state.items.filter((value, index) => index !== key),
      checked: this.state.checked.filter((value, index) => index !== key),
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

  handleCheck = (key) => {
    var checkarray = [...this.state.checked];
    const arrayB = this.state.checked.map((data, index) => {
      if (key === index) {
        checkarray[key] = !data;
      }
      return 0;
    });
    this.setState({
      checked: [...checkarray],
    });
    console.log(arrayB);
  };
  render() {
    const { input, items, checked } = this.state;
    localStorage.setItem("todo", JSON.stringify(items));
    localStorage.setItem("check", JSON.stringify(checked));

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
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      onChange={() => this.handleCheck(index)}
                      defaultChecked={this.state.checked[index]}
                    ></input>
                    <span className="checkbox-custom"></span>
                  </label>
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
