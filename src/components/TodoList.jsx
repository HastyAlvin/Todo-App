/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Text, Heading } from "theme-ui";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoAction from "./TodoAction";
import { ThemeContext } from "../context/ThemeContext";
export default class TodoList extends React.Component {
    state = {
        todos: [],
        filter: "all",
        editingTodo: null,
    };

    handleAddTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        this.setState({
            todos: [newTodo, ...this.state.todos],
        });
    };

    handleUpdateTodo = (id, text) => {
        this.setState({
            todos: this.state.todos.map((t) =>
                t.id === id ? { ...t, text } : t
            ),
            editingTodo: null,
        });
    };

    handleToggleTodo = (id) => {
        this.setState({
            todos: this.state.todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        });
    };

    handleDeleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter((t) => t.id !== id),
            editingTodo: this.state.editingTodo?.id === id ? null : this.state.editingTodo,
        });
    };

    handleEditInInput = (todo) => {
        this.setState({ editingTodo: todo });
    };

    handleCancelEdit = () => {
        this.setState({ editingTodo: null });
    };

    handleFilterChange = (filter) => {
        this.setState({ filter });
    };

    handleClearCompleted = () => {
        this.setState({
            todos: this.state.todos.filter((t) => !t.completed),
        });
    };

    getFilteredTodos = () => {
        const { todos, filter } = this.state;
        if (filter === "active") return todos.filter((t) => !t.completed);
        if (filter === "completed") return todos.filter((t) => t.completed);
        return todos;
    };

    render() {
        const { editingTodo, todos, filter } = this.state;
        const filteredTodos = this.getFilteredTodos(); // ✅ Tính từ state
        const activeCount = todos.filter((t) => !t.completed).length;

        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "40rem",
                            mx: "auto",
                            mt: 12,
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            bg: theme === "dark" ? "#374151" : "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            color: theme === "dark" ? "#f9fafb" : "#111827",
                        }}
                    >
                        {/* Title */}
                        <Heading
                            as="h1"
                            sx={{
                                fontSize: "8xl",
                                fontWeight: "100",
                                color: "#ef4444",

                            }}
                        >
                            todos
                        </Heading>

                        {/* Main container */}
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "40rem", // ~max-w-xl
                                mx: "auto",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                bg: "white",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <TodoInput
                                onAdd={this.handleAddTodo}
                                onUpdate={this.handleUpdateTodo}
                                onCancelEdit={this.handleCancelEdit}
                                editingTodo={editingTodo}
                            />

                            {filteredTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={this.handleToggleTodo}
                                    onDelete={this.handleDeleteTodo}
                                    onUpdate={this.handleUpdateTodo}
                                    onEditInInput={this.handleEditInInput}
                                />
                            ))}

                            {todos.length > 0 && (
                                <TodoAction
                                    activeCount={activeCount}
                                    filter={filter}
                                    onFilterChange={this.handleFilterChange}
                                    onClearCompleted={this.handleClearCompleted}
                                />
                            )}
                        </Box>

                        {/* Footer instructions */}
                        <Box sx={{ fontSize: 1 }}>
                            <Text sx={{ mb: 1, display: "block" }}>
                                Double-click để edit trực tiếp
                            </Text>
                            <Text>Click icon Edit để edit ở Input trên</Text>
                        </Box>
                    </Box>
                )}
            </ThemeContext.Consumer>
        );
    }

}
