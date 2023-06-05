import React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({
  onRemoveClick,
  data,
  column,
  onAddClick,
  children,
  onClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {column.map((item) => (
              <TableCell align="center" key={item.id}>
                {item.heading}
              </TableCell>
            ))}
            <TableCell align="center">
              <IconButton
                color="primary"
                aria-label="add"
                component="span"
                onClick={onAddClick}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody onClick={onClick}>
          {data.content &&
            data.content.map((theaters) => (
              <TableRow
                key={theaters.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {theaters.theaterName}
                </TableCell>
                <TableCell align="center">{theaters.address}</TableCell>
                <TableCell align="center">{theaters.city}</TableCell>
                <TableCell align="center">{theaters.phoneNumber}</TableCell>
                <TableCell align="center">
                  <EditIcon />
                  <IconButton
                    color="primary"
                    aria-label="add"
                    component="span"
                    onClick={onRemoveClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
