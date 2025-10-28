/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Flex, Button, Text } from "theme-ui";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

export default class TodoList extends React.Component {
    state = {  //state lưu dữ liệu của component
        todos: [],   // mảng lưu danh sách công việc
        filter: "all",   //filter default là all
    };

    //Thêm todo
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

    //CHuyển trạng thái hoàn thành
    handleToggle = (id) => {
        this.setState({ // cập nhật lại danh sách
            todos: this.state.todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        });
    };

    // Xoá công việc 
    handleDelete = (id) => {
        this.setState({ // cập nhật lại danh sách
            todos: this.state.todos.filter((t) => t.id !== id),
        });
    };

    //Lọc công việc
    handleFilterChange = (filter) => {
        this.setState({ filter }); // cập nhật lại danh sách
    };

    //Xoá công việc hoàn thành
    handleClearCompleted = () => {
        this.setState({
            todos: this.state.todos.filter((t) => !t.completed), // cập nhật lại danh sách
        });
    };

    //Lấy danh sách theo filter
    getFilteredTodos = () => {
        const { todos, filter } = this.state; //lấy giá trị từ state đã khai báo
        if (filter === "active") return todos.filter((t) => !t.completed); //completed = false
        if (filter === "completed") return todos.filter((t) => t.completed);//completed = true
        return todos;
    };

    render() {
        const filteredTodos = this.getFilteredTodos();
        const activeCount = this.state.todos.filter((t) => !t.completed).length; // độ dài của mảng có completed = false

        return (
            <Box
                sx={{
                    width: "400px",
                    mx: "auto",
                    mt: 5,
                    boxShadow: "md",
                    bg: "white",
                    borderRadius: "6px",
                }}
            >
                <TodoInput onAdd={this.handleAddTodo} /> {/* ✅ tách riêng input */}

                {/* phương thức map() chỉ dùng với array và trả lại một mảng mới hoàn toàn */}
                {filteredTodos.map((todo) => (
                    <TodoItem  //truyền các giá trị vào props
                        key={todo.id}
                        todo={todo}
                        onToggle={this.handleToggle}
                        onDelete={this.handleDelete}
                    />
                ))}

                {this.state.todos.length > 0 && (
                    <Flex
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTop: "1px solid #e6e6e6",
                            px: 3,
                            py: 2,
                            fontSize: 14,
                        }}
                    >
                        <Text>
                            {activeCount} item{activeCount !== 1 ? "s" : ""} left
                        </Text>
                        <Flex sx={{ gap: 2 }}>
                            {["all", "active", "completed"].map((f) => (
                                <Button
                                    key={f}
                                    onClick={() => this.handleFilterChange(f)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        fontSize: 13,
                                        border: "1px solid #ddd",
                                        bg: this.state.filter === f ? "#f2f2f2" : "transparent",
                                        color: this.state.filter === f ? "black" : "gray",
                                    }}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </Button>
                            ))}
                        </Flex>
                        <Button
                            onClick={this.handleClearCompleted}
                            sx={{ fontSize: 13, color: "gray", bg: "transparent" }}
                        >
                            Clear completed
                        </Button>
                    </Flex>
                )}
            </Box>
        );
    }
}
