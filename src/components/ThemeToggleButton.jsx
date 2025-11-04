/** @jsxImportSource theme-ui */
import React from "react";
import { Button } from "theme-ui";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default class ThemeToggleButton extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { theme, toggleTheme } = this.context;
    const isDark = theme === "dark";

    return (
      <Button
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          top: 3,
          right: 3,
          borderRadius: "50%",
          width: 40,
          height: 40,
          bg: isDark ? "#374151" : "#f3f4f6",
          color: isDark ? "white" : "black",
          border: "1px solid #d1d5db",
          cursor: "pointer",
          "&:hover": {
            bg: isDark ? "#4b5563" : "#e5e7eb",
          },
          transition: "all 0.2s ease",
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    );
  }
}
