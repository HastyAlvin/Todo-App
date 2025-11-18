/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Box, Input, Button } from "theme-ui";
import {  XCircle } from "lucide-react";
export default class TodoInput extends React.Component {
   constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      inputValue: props.editingTodo ? props.editingTodo.text : "",
    };
  }

  // Bỏ đi thì có được không?
  componentDidUpdate(prevProps) { // hàm này được chạy sau khi render
    if (this.props.editingTodo && !prevProps.editingTodo) {
      this.setState({ inputValue: this.props.editingTodo.text });
      this.inputRef.current?.focus();
    }
    if (!this.props.editingTodo && prevProps.editingTodo) {
      this.setState({ inputValue: "" });
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
// Xử lý khi nhấn phím đang bị lặp logic ở todoItem
  handleKeyDown = (e) => {
    const { onAdd, onUpdate, editingTodo, onCancelEdit } = this.props;
    const text = this.state.inputValue.trim();

    if (e.key === "Enter" && text !== "") {
      if (editingTodo) {
        onUpdate(editingTodo.id, text);
      } else {
        onAdd(text);
      }
      this.setState({ inputValue: "" });
    }

    if (e.key === "Escape" && editingTodo) {
      onCancelEdit();
      this.setState({ inputValue: "" });
    }
  };

  handleCancel = () => {
    this.props.onCancelEdit();
    this.setState({ inputValue: "" });
  };

  render() {
    const { editingTodo } = this.props;
    const isEditing = !!editingTodo;
    return (
      <Box sx={{ position: "relative" }}>
        <Input
          ref={this.inputRef}
          type="text"
          placeholder={isEditing ? "Edit todo..." : "What needs to be done?"}
          value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          sx={{
            width: "100%",
            px: 3,
            py: 3,
            fontSize: 3,
            border: "none",
            outline: "none",
            transition: "all 0.2s ease",
            borderBottom: isEditing ? "2px solid #ef4444" : "1px solid #d1d5db",
            bg: isEditing ? "#fef2f2" : "white",
            "::placeholder": {
              color: isEditing ? "#ef4444" : "#9ca3af",
            },
          }}
        />

        {isEditing && (
          <Flex
            sx={{
              position: "absolute",
              right: 3,
              top: "50%",
              transform: "translateY(-50%)",
              gap: 1,
            }}
          >
            <Button
              onClick={this.handleCancel}
              sx={{
                p: 1,
                bg: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
                "&:hover": {
                  color: "#ef4444",
                },
              }}
            >
              <XCircle size={20} />
            </Button>
          </Flex>
        )}
      </Box>
    );
  }
}
