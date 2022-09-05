import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { styled } from "@mui/material/styles";

import TablePaginationActions from "../Tables/TablePaginationActions";


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const URL = process.env.REACT_APP_API_BASE_URL;

const fetchHandler = async () => {
  return await Axios.get(`${URL}persons`).then((res) => res.data);
};

const ListPersons = () => {
  
  const [listOfPersons, setListOfPersons] = useState([]);
  
  useEffect(() => {
    fetchHandler().then((data) => setListOfPersons(data));
  }, []);
  
  

  //console.log(listOfPersons)
  const rows = listOfPersons;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="persons table ">
        <TableHead sx={{ backgroundColor: "#ccc" }}>
          <TableRow>
            <TableCell>Rok urodzenia</TableCell>
            <TableCell>Imię</TableCell>
            <TableCell>Nazwisko</TableCell>
            <TableCell>Imię i nazwisko ojca</TableCell>
            <TableCell>Imię i nazwisko matki</TableCell>
            <TableCell>Miejscowość urodzenia</TableCell>
            <TableCell>Parafia</TableCell>
            <TableCell>Więcej</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {row.birthyear}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.surname}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/family/searchpersons/${row.father}`}
                  title={row.fatherName}
                >
                {row.fatherName}
                </Link>
                </StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/family/searchpersons/${row.mother}`}
                  title={row.motherName}
                >
                {row.motherName}
                </Link>
              </StyledTableCell>
              <StyledTableCell>{row.birthplace}</StyledTableCell>
              <StyledTableCell>{row.birthpar}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/family/searchpersons/${row._id}`}
                  title="Zobacz więcej"
                >
                  <ContactPageIcon sx={{ color: "#000" }} />
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
              colSpan={8}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ListPersons;
