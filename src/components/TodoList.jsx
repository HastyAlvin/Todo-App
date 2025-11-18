/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Text, Heading } from "theme-ui";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoAction from "./TodoAction";
import { ThemeContext } from "../context/ThemeContext";
import Pagination from "./Pagination";

const STATE_FILTER = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETE: "completed"
};

export default class TodoList extends React.Component {
    state = {
        todos: [],
        filter: STATE_FILTER.ALL,
        editingTodo: null,
        itemsPerPage: 5, //  số todo mỗi trang
        currentPage: 1,
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

    handleUpdateTodo = (idx, text) => {
        // this.setState({
        //     todos: this.state.todos.map((t) =>
        //         t.id === id ? { ...t, text } : t
        //     ),
        //     editingTodo: null,
        // });
        // const newTodos = this.state.todos.map((t, index) => {
        //     return idx === index ? { ...t, text } : t
        // })

        this.state.todos[this.idx].text = text;
        const newTodos = this.state.todos;

        this.setState({
            todos: newTodos,
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
            editingTodo:
                this.state.editingTodo?.id === id ? null : this.state.editingTodo,
        });
    };

    handleEditInInput = (todo, idx) => {
        this.setState({ editingTodo: todo });
        this.idx = idx;
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
        if (filter === STATE_FILTER.ACTIVE) return todos.filter((t) => !t.completed);
        if (filter === STATE_FILTER.COMPLETE) return todos.filter((t) => t.completed);
        return todos;
    };
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    // --- Pagination handlers ---
    // Phải tách ra component riêng 
    // Triển khai HOC 

    render() {
        const { editingTodo, todos, filter } = this.state;
        const filteredTodos = this.getFilteredTodos(); // Lọc theo trạng thái
        const activeCount = todos.filter((t) => !t.completed).length; // 
        const totalPages = Math.ceil(
            filteredTodos.length / this.state.itemsPerPage
        );
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage; // chỉ số bắt đầu
        const endIndex = startIndex + this.state.itemsPerPage; // chỉ số kết thúc
        const currentTodos = filteredTodos.slice(startIndex, endIndex); // Lấy todo của trang hiện tại
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
                            {currentTodos.map((todo, idx) => (
                                <TodoItem
                                    idx={idx}
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={this.handleToggleTodo}
                                    onDelete={this.handleDeleteTodo}
                                    onUpdate={this.handleUpdateTodo}
                                    onEditInInput={this.handleEditInInput}
                                />
                            ))}
                            {filteredTodos.length > 0 && (
                                <Pagination
                                    totalPages={totalPages}
                                    onPageChange={this.handlePageChange}
                                    currentPage={this.state.currentPage}
                                />
                            )}

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
