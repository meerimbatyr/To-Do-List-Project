import React from "react";
import "./App.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      errorMessage: "",
      todoList: [],
    };
  }

  //value typed in input is stored in this.state
  //every time we type on input, we will reach that value through the event and update it in this.state
  onChange = (e) => {
    this.setState({ inputValue: e.target.value, errorMessage: "" });
  };

  onAddToDo = () => {
    const { inputValue, todoList: newTodos } = this.state;
    const newAddTodo = {
      name: inputValue,
      isDone: false,
      isEditing: false,
      indexEdited: 0,
      currentValue: "",
      dataEdited: {},
    };

    if (!inputValue) {
      this.setState({
        errorMessage: "You haven't added any todos yet!",
      });
      return;
    }
    if (newTodos.indexOf(inputValue) === -1) {
      newTodos.push(newAddTodo);
      this.setState({
        todoList: newTodos,
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

  edit = (e) => {
    // const { value: name } = e.target;
    console.log(e.target.value);
    this.setState({ currentValue: e.target.value });
  };

  handleEdit = (todo, index) => {
    this.setState({
      isEditing: !this.state.isEditing,
      indexEdited: index,
      currentValue: todo.name,
    });
  };

  submitEditTodo = (todo, index) => {
    let copyList = [...this.state.todoList];
    copyList[this.state.indexEdited].name = this.state.currentValue;
    this.setState({
      isEditing: false,
      indexEdited: index,
      name: todo.name,
      todoList: copyList,
    });
  };

  handleClear = () => this.setState({ todoList: [] });

  complete = (index) => {
    const copyList = [...this.state.todoList];
    copyList[index].isDone = !copyList[index].isDone;
    this.setState({ todoList: copyList });
  };

  render() {
    return (
      <div className="container">
        <h1>TO DO LIST</h1>
        <section className="add-item">
          <div className="add-item-wrapper">
            <input
              onChange={this.onChange}
              value={this.state.inputValue}
              className="add-item__input"
              placeholder="Add item..."
            />
            <button className="btn add" onClick={this.onAddToDo}>
              ADD
            </button>
          </div>

          <div className="error-msg">
            {this.state.errorMessage !== "" && (
              <p className="red-color">{this.state.errorMessage}</p>
            )}
          </div>
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
                      id="checkbox"
                    />
                    {this.state.isEditing ? (
                      <input
                        onChange={(e) => this.edit(e, index)}
                        className={todo.isDone ? "completed" : null}
                        value={todo.name}
                        id="edit-input"
                      />
                    ) : (
                      <span>{todo.name}</span>
                    )}
                  </div>

                  <div className="btn-container">
                    {this.state.isEditing && !todo.isDone ? (
                      <button
                        className="edit"
                        type="button"
                        onClick={() => this.submitEditTodo(todo, index)}
                      >
                        <MdUpdate />
                      </button>
                    ) : (
                      <button
                        className="edit"
                        type="button"
                        onClick={() => this.handleEdit(todo, index)}
                      >
                        <FaEdit />
                      </button>
                    )}

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
        </section>
        <button onClick={this.handleClear} className=" btn clear">
          Clear
        </button>
      </div>
    );
  }
}

export default App;
