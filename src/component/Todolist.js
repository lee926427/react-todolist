import React, { Component } from "react";
import "../stylus/todoList.css"

const Title = () => {
    return (
        <div id="titleWrapper">
            <h2 className="textCenter">To-do List</h2>
        </div>
    );
}

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTodoAddition = this.handleNewTodoAddition.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleNewTodoAddition() {
        if (this.input.value !== "") {
            this.props.addTodo(this.input.value);
            this.setState({
                value: "",
            });
        }
    }

    render() {
        return (
            <div id="form">
                <input
                    ref={node => { this.input = node }}
                    value={this.state.value}
                    placeholder="Add Todos Here..."
                    autoComplete="off"
                    onChange={this.handleChange}
                />

                <button
                    onClick={this.handleNewTodoAddition}
                >
                    +
                </button>
            </div>
        );
    }
}

const Todo = ({ todo, remove }) => {
    //single todo
    return (
        <p className="todos">
            {todo.value}
            <span
                className="removeBtn"
                onClick={() => {
                    remove(todo.id)
                }}
            >x</span>
        </p>
    );
};

const List = ({ todos, remove }) => {
    let allTodos;
    if (todos.length > 0) {
        allTodos = todos.map(todo => {
            //passing todo and remove method reference
            return <Todo todo={todo} remove={remove} />
            //return (<p>{todo.value}</p>);
        });
    } else {
        return allTodos=<h3 id="acu">All caught up!</h3>;
    }

    return (
        <div id="list">
            <p id="info"> Your Todos:</p>
            {allTodos}
        </div>
    );
};

const Footer = () => {
    return (
        <div id="foot">
            <a href="https://github.com/lee926427" target="_blank">
                <p>Github</p>
            </a>
        </div>
    );
};

export default class Container extends Component {
    constructor(props) {
        super(props);
        const introData = [
            {
                id: -3,
                value: "Hi! This is a simple todo list app made by React."
            },
            {
                id: -2,
                value: "Hover over todos and click on 'X' to delete them!"
            },
            {
                id: -1,
                value: "Add new todos and come back any time later, I will save them for you!"
            }
        ];

        const localData = localStorage.todos && JSON.parse(localStorage.todos);

        this.state = {
            data: localData || introData,
        }
        //binding methods
        this.addTodo = this.addTodo.bind(this);
        this.remove = this.removeTodo.bind(this)
    }
    // Handler to update localStorage
    updateLocalStorage() {
        if (typeof (Storage) !== "undefined") {
            localStorage.todos = JSON.stringify(this.state.data);
        }
    }
    // Handler to add todo
    addTodo(val) {
        let id;
        if (typeof (Storage) !== "undefined") {
            id = Number(localStorage.count);
            localStorage.count = Number(localStorage.count) + 1;
        } else {
            id = window.id++;
        };

        const todo = {
            value: val,
            id: id
        };
        this.state.data.push(todo);
        //update state
        this.setState({
            data: this.state.data
        }, () => {
            this.updateLocalStorage();
        });
    }
    // Handler to remove todo
    removeTodo(id) {
        //filter out the todo that has to be removed
        const list = this.state.data.filter(todo => {
            if (todo.id !== id)
                return todo;
        });
        //update state
        this.setState({
            data: list
        }, () => {
            this.updateLocalStorage();
        });
    }

    componentDidMount() {
        localStorage.clear();
        if (typeof (Storage) !== "undefined") {
            if (!localStorage.todos) {
                localStorage.todos = JSON.stringify(this.state.data);
            }
            if (!localStorage.count) {
                localStorage.count = 0;
            }
        } else {
            console.log("%cApp will not remember todos created as LocalStorage Is Not Available",
                "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
            window.id = 0;
        }
    }
    render() {
        return (
            <div id="container">
                <Title />
                <Form addTodo={this.addTodo} />
                <List todos={this.state.data} remove={this.remove} />
                <Footer />
            </div>    
        )
    }
}

