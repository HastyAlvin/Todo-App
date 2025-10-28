/** @jsxImportSource theme-ui */
import React from "react";
import { Box, Heading } from "theme-ui";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Heading as="h1" sx={{ color: "#b83f45", fontSize: 80, fontWeight: 100 }}>
        todos
      </Heading>
      <TodoList />
    </Box>
  );
}
// tách riêng component ra để thấy sự tyuongw tác giữa cac component với nhau
// Tìm hiểu các keyword bổ sung: map, filter, spread operator(...)
export default App;
