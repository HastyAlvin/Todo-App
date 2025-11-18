/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Box, Input, Button, Text } from "theme-ui";
import { X, Edit2, Check, XCircle } from "lucide-react";


//    handleToggleTodo = (id) => {
//     this.setState({
//         todos: this.state.todos.map((t) =>
//             t.id === id ? { ...t, completed: !t.completed } : t
//         ),
//     });
// };
// handleDeleteTodo = (id) => {
//     this.setState({
//         todos: this.state.todos.filter((t) => t.id !== id),
//         editingTodo:
//             this.state.editingTodo?.id === id ? null : this.state.editingTodo,
//     });
// };
// Những logic xoay quanh thì nên defin ở đây
export default class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.editInputRef = React.createRef();
    this.state = {
      isEditingInline: false,
      editValue: props.todo.text,
    };
  }

  handleToggle = () => {
    this.props.onToggle(this.props.todo.id);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.todo.id);
  };

  handleEditClick = () => {
    this.setState({ isEditingInline: true, editValue: this.props.todo.text }, () => {
      this.editInputRef.current?.focus();
    });
  };

  handleEditInInput = () => {
    const idx = this.props.idx
    this.props.onEditInInput(this.props.todo, idx);
  };

  handleEditChange = (e) => {
    this.setState({ editValue: e.target.value });
  };

  // Xử lý khi nhấn phím đang bị lặp logic ở todoInput

  handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSaveEdit();
    }
    if (e.key === "Escape") {
      this.handleCancelEdit();
    }
  };

  handleSaveEdit = () => {
    const text = this.state.editValue.trim();
    if (text !== "") {
      this.props.onUpdate(this.props.todo.id, text);
    }
    this.setState({ isEditingInline: false });
  };

  handleCancelEdit = () => {
    this.setState({ isEditingInline: false, editValue: this.props.todo.text });
  };

  render() {
    const { todo } = this.props;
    const { isEditingInline, editValue } = this.state;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #d1d5db",
          px: 3,
          py: 2,
          transition: "background-color 0.2s ease",
          bg: isEditingInline ? "#fef2f2" : "white",
        }}
      >
        {/* Left side */}
        <Flex sx={{ alignItems: "center", gap: 2, flex: 1 }}>
          <Input
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleToggle}
            sx={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              accentColor: "#ef4444",
            }}
          />

          {isEditingInline ? (
            <Input
              ref={this.editInputRef}
              type="text"
              value={editValue}
              onChange={this.handleEditChange}
              onKeyDown={this.handleEditKeyDown}
              sx={{
                flex: 1,
                border: "1px solid #ef4444",
                borderRadius: "6px",
                px: 2,
                py: 1,
                fontSize: 2,
                outline: "none",
              }}
            />
          ) : (
            <Text
              as="span"
              sx={{
                flex: 1,
                cursor: "text",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#6b7280" : "#111827",
              }}
              onDoubleClick={this.handleEditClick}
            >
              {todo.text}
            </Text>
          )}
        </Flex>

        {/* Right side buttons */}
        <Flex sx={{ gap: 1 }}>
          {isEditingInline ? (
            <>
              <Button
                onClick={this.handleSaveEdit}
                sx={{
                  color: "#16a34a",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  p: 1,
                  "&:hover": { color: "#15803d" },
                }}
              >
                <Check size={18} />
              </Button>
              <Button
                onClick={this.handleCancelEdit}
                sx={{
                  color: "#6b7280",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  p: 1,
                  "&:hover": { color: "#ef4444" },
                }}
              >
                <XCircle size={18} />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={this.handleEditInInput}
                title="Edit in input (top)"
                sx={{
                  color: "#6b7280",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  p: 1,
                  "&:hover": { color: "#ef4444" },
                }}
              >
                <Edit2 size={16} />
              </Button>
              <Button
                onClick={this.handleDelete}
                sx={{
                  color: "#6b7280",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  p: 1,
                  "&:hover": { color: "#ef4444" },
                }}
              >
                <X size={18} />
              </Button>
            </>
          )}
        </Flex>
      </Box>
    );
  }
}
