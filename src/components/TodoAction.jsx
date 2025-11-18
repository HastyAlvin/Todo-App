/** @jsxImportSource theme-ui */
import React from "react";
import { Flex, Button, Text } from "theme-ui";

export default class TodoAction extends React.Component {


  render() {
    const { activeCount, filter, onFilterChange, onClearCompleted } = this.props;

    return (
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #d1d5db",
          px: 3,
          py: 2,
          fontSize: 1,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left side */}
        <Text sx={{ whiteSpace: "nowrap", color: "#374151" }}>
          {activeCount} item{activeCount !== 1 ? "s" : ""} left
        </Text>

        {/* Middle filter buttons */}
        <Flex sx={{ gap: 2 }}>
          {["all", "active", "completed"].map((filterOption) => {
            const isActive = filter === filterOption;
            return (
              <Button
                key={filterOption}
                onClick={() => onFilterChange(filterOption)}
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: 0,
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  bg: isActive ? "#ef4444" : "transparent",
                  color: isActive ? "white" : "#4b5563",
                  "&:hover": {
                    bg: isActive ? "#dc2626" : "#f3f4f6",
                  },
                }}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </Button>
            );
          })}
        </Flex>

        {/* Right side */}
        <Button
          onClick={onClearCompleted}
          sx={{
            fontSize: 0,
            color: "#4b5563",
            bg: "transparent",
            border: "none",
            cursor: "pointer",
            "&:hover": { color: "#ef4444" },
          }}
        >
          Clear completed
        </Button>
      </Flex>
    );
  }
}