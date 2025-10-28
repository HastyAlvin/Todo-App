/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Text, IconButton } from "theme-ui";
import { X } from "lucide-react";

export default class TodoItem extends React.Component {
  render() {
    const { todo, onToggle, onDelete } = this.props;

    return (
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e6e6e6",
          px: 3,
          py: 2,
        }}
      >
        <Flex sx={{ alignItems: "center", gap: 2 }}>
          <label sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              sx={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: "#b83f45",
              }}
            />
            <Text
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "text",
              }}
            >
              {todo.text}
            </Text>
          </label>

          <Text
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "text",
            }}
          >
            {todo.text}
          </Text>
        </Flex>

        <IconButton
          onClick={() => onDelete(todo.id)}
          sx={{
            color: "gray",
            bg: "transparent",
            "&:hover": { color: "red" },
          }}
        >
          <X size={18} />
        </IconButton>
      </Flex>
    );
  }
}
