import React, { Component } from "react";
import "./App.css";
import { FaEdit, FaTrash } from "react-icons/fa";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      errorMessage: "",
      todoList: [],
      isEditing: false,
      idEdited: 0,
    };
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value, errorMessage: "" });
  };

  addToDo = () => {
    const generateId = () => {
      return Math.floor(new Date() * Math.random() * 1000);
    };

    const { inputValue, todoList } = this.state;
    const newTodos = [...todoList];
    const newAddTodo = {
      id: generateId(),
      name: inputValue,
      checked: false,
    };

    if (!inputValue) {
      this.setState({
        errorMessage: "Please, pass a value!",
      });
      setTimeout(() => {
        this.setState({
          errorMessage: "",
        });
      }, 2000);
      return;
    }

    //fucntion that checks if value is already in the list
    const findValue = (inputValue) => {
      return newTodos.some((item) => {
        return item.name === inputValue;
      });
    };

    if (findValue(inputValue) === false) {
      newTodos.push(newAddTodo);
      this.setState({
        todoList: newTodos,
        inputValue: "",
      });
    } else {
      this.setState({
        errorMessage: "Already exists",
      });
      setTimeout(() => {
        this.setState({
          errorMessage: "",
        });
      }, 2000);
    }
  };

  handleDelete = (id) => {
    const { todoList } = this.state;
    // const newTodos = [...todoList];
    // newTodos.splice(index, 1);

    //with for loop
    // const newTodos = [];
    // for (let i = 0; i < todoList.length; i++) {
    //   if (index !== i) {
    //     newTodos.push(todoList[i]);
    //   }
    // }

    //with filter
    const newTodos = todoList.filter((todo) => todo.id !== id);
    this.setState({ todoList: newTodos });
  };

  handleEdit = (todo, id) => {
    this.setState({
      isEditing: !this.state.isEditing,
      inputValue: todo.name,
      idEdited: id,
    });
  };

  submitEditTodo = () => {
    let copyList = [...this.state.todoList];
    console.log(this.state);
    const { inputValue, idEdited } = this.state;
    copyList.map((item) => {
      if (item.id === idEdited) {
        item.name = inputValue;
      }
      return item;
    });

    this.setState({
      isEditing: false,
      todoList: copyList,
      inputValue: "",
    });
  };

  handleClear = () => this.setState({ todoList: [] });

  complete = (index) => {
    const copyList = [...this.state.todoList];
    copyList[index].checked = !copyList[index].checked;
    this.setState({ todoList: copyList });
  };

  render() {
    const { todoList, inputValue, errorMessage, isEditing } = this.state;
    return (
      <div className="container">
        <h1>TO DO LIST</h1>
        <section className="add-item">
          <div className="add-item-wrapper">
            <input
              onChange={this.onChange}
              value={inputValue}
              className="add-item__input"
              placeholder="Add item..."
            />
            {isEditing ? (
              <button className="btn edit" onClick={this.submitEditTodo}>
                EDIT
              </button>
            ) : (
              <button className="btn add" onClick={this.addToDo}>
                ADD
              </button>
            )}
          </div>

          <div className="error-msg">
            {errorMessage !== "" && <p className="danger">{errorMessage}</p>}
          </div>
        </section>
        <section className="to-do-list">
          <h2>TASKS TO DO</h2>
          <ul>
            {todoList.map((todo, index) => {
              return (
                <li key={todo.id} className={todo.checked ? "completed" : null}>
                  <div>
                    <input
                      onChange={(e) => this.complete(index)}
                      type="checkbox"
                      id="checkbox"
                    />
                    <span>{todo.name}</span>
                  </div>

                  <div className="btn-container">
                    {!isEditing && !todo.checked ? (
                      <button
                        className="edit"
                        type="button"
                        onClick={() => this.handleEdit(todo, todo.id)}
                      >
                        <FaEdit />
                      </button>
                    ) : (
                      <button type="button" className="disabled" disabled>
                        <FaEdit />
                      </button>
                    )}

                    <button
                      className="delete"
                      type="button"
                      onClick={() => this.handleDelete(todo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <button onClick={this.handleClear} className=" btn clear">
          Clear List
        </button>
      </div>
    );
  }
}

export default App;
