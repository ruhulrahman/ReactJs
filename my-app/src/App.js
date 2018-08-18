import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import todos from './data.js';

class App extends Component {
  state = {
    todos: todos,
    createTodosText: '',
    updateTodoText: '',
    isUpdate: false,
  }

  _createTodosText = (e) => {
    this.setState({
      createTodosText: e.target.value
    });
  }

  _createTodo = () => {
    let todo = {
      id: Date.now(),
      text: this.state.createTodosText,
      completion: false
    }

    let todos = [...this.state.todos, todo];
    this.setState({
      todos: todos,
      createTodosText: '',
    });
  }

  showTodotext = todo => {
    if (todo.completion) {
      return <span onClick={() => this.toggleTodo(todo)} className="line-through">{todo.text}</span>
    }
    return <span onClick={() => this.toggleTodo(todo)}>{todo.text}</span>
  }

  toggleTodo = td => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === td.id) {
        return {
          id: todo.id,
          text: todo.text,
          completion: ! todo.completion 
        }
      } else {
        return todo
      }
    });

    this.setState({
      todos: todos,
    });
  }

  updateTodoText = (e) => {
    this.setState({
      updateTodoText: e.target.value
    });
  }

  updateTodo = (td) => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === td.id) {
        return {
          id: todo.id,
          completion: todo.completion, 
          text: this.state.updateTodoText,
        }
      } else {
        return todo
      }
    });

    this.setState({
      todos,
      isUpdate: false
    });
  }

  updateStart = (todo) => {
    this.setState({
      isUpdate: true,
      updateTodo: todo,
      updateTodoText: todo.text
    });
  }

  deleteTodo = (td) => {
    let todos = this.state.todos.filter(todo => todo.id !== td.id);
    this.setState({
      todos
    });
  }

  createBlock = () => {
    return(
        <div className="card mt-3">
          <div className="card-header">
            <h1>Create a todo</h1>
          </div>
          <div className="card-body">
            <input className="form-control" type="text" value={this.state.createTodosText} onChange={this._createTodosText} />
            <button onClick={this._createTodo} className="btn btn-success mt-2">Add Todo</button>
          </div>
        </div>
    )
  }

  updateBlock = (todo) => {
    return(
      <div className="card mt-nativeEvent2">
        <div className="card-header">
          <h1>Update your todo</h1>
        </div>
        <div className="card-body">
          <input type="text" value={this.state.updateTodoText} onChange={this.updateTodoText} className="form-control" />
          <button onClick={() => this.updateTodo(todo)} className="btn btn-primary mt-2">Update Todo</button>
        </div>
      </div>
    )
  }

  render() {
    console.log('state', this.state);
    return (
      <div className="">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ruhul's First React Application</h1>
          </header>

        <div className="card mt-1">
          <div className="card-header">
            <h1>Some todos List:</h1>
          </div>
          <div className="card-body">            
            {
              this.state.todos.map(todo => {
                return <li key={todo.id}>
                    {this.showTodotext(todo)}
                    <button onClick={() => this.updateStart(todo)} className="btn btn-success m-2">Edit Todo</button>
                    <button onClick={() => this.deleteTodo(todo)} className="btn btn-danger m-2">Delete Todo</button>
                  </li>
              })
            }

          </div>
        </div>


        {
          this.state.isUpdate ? this.updateBlock(this.state.updateTodo) : null
        }

        {this.createBlock()}

      </div>
    );
  }
}

export default App;
