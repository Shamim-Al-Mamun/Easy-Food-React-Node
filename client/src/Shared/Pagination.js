import React from "react";
const Pagination = ({
  currentPage,
  productPerPage,
  totalProducts,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ul className="flex items-center justify-center space-x-2 mt-10 mx-auto">
        {pageNumbers.map((number) => (
          <li>
            <button
              onClick={() => paginate(number)}
              className={`w-10 h-10 text-black border border-yellow-400 transition-colors duration-150 hover:bg-yellow-300 rounded-full focus:shadow-outline ${
                number === currentPage ? "bg-primary" : "bg-yellow-100"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
