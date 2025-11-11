/** @jsxImportSource theme-ui */
import React from "react";
import {Box } from "theme-ui";
import TodoItem from "./TodoItem";
export default class TodoInput2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            inputValue: props.editingTodo ? props.editingTodo.text : "",
        };
    }

    render() {
        const { todos, handleToggleTodo, handleDeleteTodo, handleUpdateTodo, handleEditInInput } = this.props;
        return <Box>

            {todos.map((todo, idx) => (
                <TodoItem
                    idx={idx}
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                    onEditInInput={handleEditInInput}
                />
            ))}
        </Box>;
    }
}