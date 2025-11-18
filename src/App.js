/** @jsxImportSource theme-ui */
import React from "react";
import { Box } from "theme-ui";
import TodoList from "./components/TodoList";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              transition: "background-color 0.3s ease, color 0.3s ease",
              bg: theme === "dark" ? "#1f2937" : "#f9fafb",
              color: theme === "dark" ? "#f3f4f6" : "#111827",
            }}
          >
            <ThemeToggleButton />
            <TodoList />
          </Box>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
//Tách riêng các phần xử lý ngoài việc list ra khỏi TodoList, xử lý state của Todoitem để giảm tải cho TodoList
// tách riêng component ra để thấy sự tyuongw tác giữa cac component với nhau
// Bổ sung dark mode/light mode
//Thêm chức năng Edit (liên quan Ref(reference))
//Bổ sung tính năng pagination (phân trang) (tối đa 5 item)
// PureComponent: so sánh nông. Khi props hoặc state thay đổi thì mới render lại component
// Nguyên tắc khi thay đổi state. Thế nào là một state mới ? 
// Mọi logic triển khai thay đổi component thay đổi reference của từng biến từng field cần phải kiểm soát hết.

//Làm thêm HOC scroll để load thêm thay cho chức năng phân trang
// Tìm hiểu keyword