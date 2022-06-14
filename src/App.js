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

  onChange(e) {
    this.setState({
      inputValue: e?.target?.value, //it will not change todoList
      errorMessage: "",
    });
  }

  onSubmit = () => {
    let value = this.state.inputValue;
    let list = [...this.state.todoList];

    if (value === "") {
      this.setState({
        errorMessage: "Should not be empty string",
      });
      return;
    }
    if (list.indexOf(value) === -1) {
      this.setState({
        todoList: [...this.state.todoList, this.state.inputValue],
        inputValue: "",
      });
    } else {
      this.setState({
        errorMessage: "Already exists",
      });
    }
    //alert(this.state.inputValue);
  };

  // handleEdit = (id) => {
  //   let list = [...this.state.todoList];
  //   const specificItem = list.find((item) => item.id === id);

  // };

  render() {
    return (
      <div className="container">
        <h1>To Do App</h1>
        <section className="add-item">
          <h2>Add item</h2>
          <input
            onChange={this.onChange.bind(this)}
            value={this.state.inputValue}
            className="add-item_input"
          />
          <button onClick={this.onSubmit}>Add</button>
          {this.state.errorMessage !== "" && (
            <p className="red-color">{this.state.errorMessage}</p>
          )}
        </section>
        <section className="to-do-list">
          <h2>TODO</h2>
          <ul>
            {this.state.todoList.map((item) => {
              return (
                <>
                  <li className="list" key={item}>
                    {item}
                    <div className="btn-container">
                      <button type="button" onClick={this.handleEdit}>
                        <FaEdit />
                      </button>
                      <button type="button" onClick={this.handleDelete}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </section>
        <section className="completed-list">
          <h2>COMPLETED test</h2>
        </section>
      </div>
    );
  }
}

export default App;
