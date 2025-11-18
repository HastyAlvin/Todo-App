/** @jsxImportSource theme-ui */
import { Box, Button } from "theme-ui";
import React from "react";

export default class Pagination extends React.Component {


  // Các hàm bây giờ sẽ gọi trực tiếp onPageChange của Parent, sử dụng props.currentPage
  goToPrevPage = () => {
    const { onPageChange, currentPage } = this.props;
    onPageChange(Math.max(currentPage - 1, 1));
  };

  goToNextPage = () => {
    const { totalPages, onPageChange, currentPage } = this.props;
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  goToSpecificPage = (page) => {
    const { onPageChange } = this.props;
    onPageChange(page);
  };

  render() {
    // Lấy currentPage từ props thay vì state
    const { totalPages, currentPage } = this.props;

    if (totalPages === 0) return null;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          p: 2,
        }}
      >
        <Button
          onClick={this.goToPrevPage}
          disabled={currentPage === 1}
          sx={{ bg: 'gray' }}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => this.goToSpecificPage(i + 1)}
            sx={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal", bg: currentPage === i + 1 ? "#d2ceceffff" : ' gray'
            }}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          onClick={this.goToNextPage}
          disabled={currentPage === totalPages}
          sx={{ bg: 'gray' }}

        >
          Next
        </Button>
      </Box>
    );
  }
}
