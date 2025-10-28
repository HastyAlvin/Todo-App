/** @jsxImportSource theme-ui */
import React from "react";
import { Input } from "theme-ui";

export default class TodoInput extends React.Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleKeyDown = (e) => {
    const { onAdd } = this.props; // nhận hàm thêm từ TodoList
    const text = this.state.inputValue.trim();

    if (e.key === "Enter" && text !== "") {
      onAdd(text); // gọi hàm từ cha truyền xuống
      this.setState({ inputValue: "" }); // reset input
    }
  };

  render() {
    return (
      <Input
        placeholder="What needs to be done?"
        value={this.state.inputValue}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        sx={{
          border: "none",
          borderBottom: "1px solid #e6e6e6",
          px: 3,
          py: 3,
          fontSize: 18,
          "::placeholder": { color: "gray" },
        }}
      />
    );
  }
}
