import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataService from "../store/services/DataService";
import { getBooks, deleteBook } from "../store/actions/Message";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import { Container } from "@mui/system";

//book page
const BooksPage = (props) => {
  const books = useSelector((state) => state.bookReducer);
  const [data, setData] = useState(books);

  const dispatch = useDispatch();
  const [order, setOrder] = useState("ASC");
  const initialBookState = {
    id: null,
    Bookname: "",
    bookAuthorId: null,
    bookPublisherId:null,
    bookGenreId:null,
    bookLanguageId:null,
    orderItemId:null
    //genreId: "",
  };
  const [currentBook, setCurrentBook] = useState(
    initialBookState
  );
  const [book, setBook] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [searchBook, setsearchBook] = useState("");
  const onChangeSearchTitle = (e) => {
    const searchBook = e.target.value;
    setsearchBook(searchBook);
  };
  const getRequestParams = (searchBook, page, pageSize) => {
    let params = {};
    if (searchBook) {
      params["Bookname"] = searchBook;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const getAllBooks = () => {
    const params = getRequestParams(page, pageSize);
    console.log('params',params)
    DataService.getAllBooks(params)
      .then((response) => {
        const { bookPage, totalPages } = response.data;
        setBook(bookPage);
        setCount(totalPages);
        console.log('response',response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

   useEffect(getAllBooks, [page, pageSize]);

  const refreshList = () => {
    getAllBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  };

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('irina')
    navigate("/api/create-book");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

 

  const column = [
    { heading: "Naziv knjige" },
  ];

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  return (
    <Container>
      <h1>Knjige</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {column.map((item) => (
                <TableCell
                  align="center"
                  key={item.id}
                  onClick={() => sorting("Bookname")}
                >
                  {item.heading}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton
                  color="primary"
                  aria-label="add"
                  component="span"
                  onClick={handleClick}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.content &&
              books.content.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {data.Bookname}
                  </TableCell>
                  {/* <TableCell align="center">
                    {data.dateOfThePerformance}
                  </TableCell> */}

                  <TableCell align="center">
                    <Link to={`/book/` + data.id}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        component="span"
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          //onClick={getAllPerformances}
        />
      </div>
    </Container>
  );
};

export default BooksPage;
