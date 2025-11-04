import React from "react";

export const ThemeContext = React.createContext();

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light", // mặc định sáng
    };
  }

  toggleTheme = () => {
    this.setState((prev) => ({
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    const value = {
      theme,
      toggleTheme: this.toggleTheme,
    };

    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  }
}
