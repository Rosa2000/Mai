import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const totalPage = props.totalPage;
  const itemPerPage = props.itemPerPage;
  const pageNumbers = [];
  // const paginate = props.paginate;
  // const nextPage = props.nextPage;
  // const prevPage = props.prevPage;
  for (let i = 1; i <= Math.ceil(totalPage / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* <li className="page-item">
          <a className="page-link" href="#" onClick={() => prevPage()}>
            Previous
          </a>
        </li> */}
        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <Link
              onClick={props.onClick}
              to={{
                pathname: ``,
                search: `?offset=${num - 1}`,
              }}
              className="page-link"
            >
              {num}
            </Link>
          </li>
        ))}
        {/* <li className="page-item">
          <a className="page-link" href="#" onClick={() => nextPage()}>
            Next
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
