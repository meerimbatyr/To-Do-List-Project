import React from "react";
import "./App.css";
import { FaEdit, FaTrash } from "react-icons/fa";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      errorMessage: "",
      todoList: [],
    };
  }

  //value typed in input is stores in this.state
  //every time we type on input, we will reach that value through the event and update it in this.state
  onChange = (e) => {
    const { value: inputValue } = e?.target;
    this.setState({ inputValue, errorMessage: "" });
  };

  onSubmit = () => {
    const { inputValue, todoList: newTodos } = this.state;
    const newAddTodo = {
      name: inputValue,
      isDone: false,
    };
    // let inputValue = this.state.inputValue;
    // let newTodos = [...this.state.todoList];

    if (inputValue === "") {
      this.setState({
        errorMessage: "Should not be empty string",
      });
      return;
    }
    if (newTodos.indexOf(inputValue) === -1) {
      newTodos.push(newAddTodo);
      this.setState({
        todoList: newTodos,
        // todoList: [...newTodos, inputValue],
        inputValue: "",
      });
    } else {
      this.setState({
        errorMessage: "Already exists",
      });
    }
  };

  handleDelete = (index) => {
    const { todoList } = this.state;
    todoList.splice(index, 1);
    this.setState({ todoList });
  };

  handleEdit = (index) => {
    const copyList = [...this.state.todoList];
    if (!copyList[index].isDone) {
      this.state.inputValue = copyList[index].name;
    }
  };

  handleClear = () => this.setState({ todoList: [] });

  complete = (index) => {
    const copyList = [...this.state.todoList];
    copyList[index].isDone = true;
    this.setState({ todoList: copyList });
  };

  render() {
    return (
      <div className="container">
        <h1>TO DO APP</h1>
        <section className="add-item">
          <h3>ADD TO-DO</h3>
          <input
            onChange={this.onChange}
            value={this.state.inputValue}
            className="add-item__input"
            placeholder="Add new task..."
          />
          <button className="btn add" onClick={this.onSubmit}>
            Add
          </button>
          {this.state.errorMessage !== "" && (
            <p className="red-color">{this.state.errorMessage}</p>
          )}
        </section>
        <section className="to-do-list">
          <h2>TASKS TO DO</h2>
          <ul>
            {this.state.todoList.map((todo, index) => {
              return (
                <li key={index} className={todo.isDone ? "completed" : null}>
                  <div>
                    <input
                      onClick={() => this.complete(index)}
                      type="checkbox"
                    />
                    {todo.name}
                  </div>

                  <div className="btn-container">
                    <button
                      className="edit"
                      type="button"
                      onClick={() => this.handleEdit(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => this.handleDelete(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <button onClick={this.handleClear} className=" btn clear">
            Clear
          </button>
        </section>
        <section className="completed-list"></section>
      </div>
    );
  }
}

export default App;
