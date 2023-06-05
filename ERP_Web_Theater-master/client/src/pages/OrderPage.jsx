import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import DataService from "../store/services/DataService";
import { getOrders, deleteOrder } from "../store/actions/Message";

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
const OrdersPage = (props) => {
  const orders = useSelector((state) => state.orderReducer);
  const [data, setData] = useState(orders);

  const dispatch = useDispatch();
  //const [order, setOrder] = useState("ASC");
  const initialOrderState = {
    id: null,
    date: "", 
    status: "" 
    //genreId: "",
  };
  const [currentOrder, setCurrentOrder] = useState(
    initialOrderState
  );
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [searchOrder, setsearchOrder] = useState("");
  const onChangeSearchTitle = (e) => {
    const searchOrder = e.target.value;
    setsearchOrder(searchOrder);
  };
  const getRequestParams = (searchOrder, page, pageSize) => {
    let params = {};
    if (searchOrder) {
      params["date"] = searchOrder;
    }
    if (page) {
      params["status"] = page - 1;
    }
   
    return params;
  };

  const getAllOrders= () => {
    const params = getRequestParams(page, pageSize);
    console.log('params',params)
    DataService.getAllOrders(params)
      .then((response) => {
        const { orderPage, totalPages } = response.data;
        setOrder(orderPage);
        setCount(totalPages);
        console.log('response',response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

   useEffect(getAllOrders, [page, pageSize]);

  const refreshList = () => {
    getAllOrders();
    setCurrentOrder(null);
    setCurrentIndex(-1);
  };

  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('irina')
    navigate("/api/create-order");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

 

  const column = [
    { heading: "Porudzbina" },
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
      <h1>Porudzbine</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {column.map((item) => (
                <TableCell
                  align="center"
                  key={item.id}
                  onClick={() => sorting("date")}
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
            {orders.content &&
              orders.content.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {data.date}
                  </TableCell>
                  {/* <TableCell align="center">
                    {data.dateOfThePerformance}
                  </TableCell> */}

                  <TableCell align="center">
                    <Link to={`/order/` + data.id}>
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

      {/*      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchPerformance}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={getAllPerformances}
          >
            Search
          </button>
        </div>
      </div> */}
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

export default OrdersPage;
