/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Text, Heading } from "theme-ui";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoAction from "./TodoAction";
import { ThemeContext } from "../context/ThemeContext";

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
        currentPage: 1, //  trang hiện tại
        itemsPerPage: 5, //  số todo mỗi trang
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

    // --- Pagination handlers ---
    // Phải tách ra component riêng 
    // Triển khai HOC 
    goToNextPage = () => {
        const totalPages = Math.ceil( // Tong so trang = TotalTodo /  So todo moi trang (5 todo)
            this.getFilteredTodos().length / this.state.itemsPerPage
        );
        this.setState((prev) => ({
            currentPage: Math.min(prev.currentPage + 1, totalPages), // khong vuot qua tong so trang
        }));
    };

    goToPrevPage = () => {
        this.setState((prev) => ({
            currentPage: Math.max(prev.currentPage - 1, 1), // khong nho hon trang 1
        }));
    };

    goToSpecificPage = (page) => { // di den trang cu the
        this.setState({ currentPage: page });
    };
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
                            {/* <TodoInput2
                                todos={todos}
                                handleToggleTodo={this.handleToggleTodo}
                                handleDeleteTodo={this.handleDeleteTodo}
                                handleUpdateTodo={this.handleUpdateTodo}
                                handleEditInInput={this.handleEditInInput}
                            /> */}
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 2,
                                        p: 1,
                                    }}>
                                    <button
                                        onClick={this.goToPrevPage}
                                        disabled={this.state.currentPage === 1}>
                                        Prev
                                    </button>
                                    {/* Array.from({length: 5 }, (_, i) => i + 1) 
                                    ví dụ tạo mảng độ dài 5 [1,2,3,4,5]
                                    */}
                                    {/* sử dụng cách khác để tạo mảng độ dài totalPages */}
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => this.goToSpecificPage(i + 1)}
                                            style={{
                                                fontWeight:
                                                    this.state.currentPage === i + 1 ? "bold" : "normal", //đúng curentPage thì in đậm
                                            }}>
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={this.goToNextPage}
                                        disabled={this.state.currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </Box>
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
