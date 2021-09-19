/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { Link, withRouter, useHistory } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getTransactionHistory } from "../../redux/actions";
import { TableBody, TableCell, TableRow, TableContainer, TablePagination, Table, TableHead, TableFooter } from "@material-ui/core";

const TransactionsHistory = (props) => {
  const { transactionHistory } = props.transactionHistory;
  const dispatch = useDispatch();
  const [transactionHistorySet, setTransactionHistory] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [filter, setFilter] = useState({
    filterS: {
      transaction_type: "",
      transaction_mode: "",
      phone_number: "",
      amount: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      filterS: {
        ...filter.filterS,
        [id]: value,
      },
    }));
  };
  const getUserData = (query = {}) => {
    dispatch({ type: "LOADING_START" });
    dispatch(
      getTransactionHistory(query, (errors, res) => {
        setTransactionHistory(res.response);
        dispatch({ type: "LOADING_SUCCESS" });
      })
    );
  };
  const status = {
    debit: "Debit",
    credit: "Credit",
  };
  const transaction_mode = {
    gpay: "Gpay",
    paytm: "Paytm",
    card: "Card",
    bets: "Bets",
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactionHistory.length) : 0;
  return (
    console.log(filter.filterS, "FILTERS"),
    (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Transaction History</h3>
                  <div className="d-flex mt-2">
                    <InputGroup size="sm" className="w-25">
                      <Input
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        value={filter.filterS.phone_number || ""}
                        onChange={handleFilterChange}
                        placeholder="Search Phone Number"
                      />
                      <InputGroupAddon addonType="append">
                        <Button className="bg-default shadow">
                          <i className="fas fa-search text-white" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup size="sm" className="w-25 ml-2">
                      <Input
                        id="amount"
                        type="number"
                        name="amount"
                        value={filter.filterS.amount || ""}
                        onChange={handleFilterChange}
                        placeholder="Search Amount"
                      />
                      <InputGroupAddon addonType="append">
                        <Button className="bg-default shadow">
                          <i className="fas fa-search text-white" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup size="sm" className="w-25 ml-2">
                      <Input
                        id="createdAt"
                        type="date"
                        name="createdAt"
                        value={filter.filterS.createdAt || ""}
                        onChange={handleFilterChange}
                        placeholder="Search for Date"
                      />
                      <InputGroupAddon addonType="append">
                        <Button className="bg-default shadow">
                          <i className="fas fa-search text-white" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup size="sm" className="w-25 ml-2">
                      <Input
                        type="select"
                        value={filter.filterS.transaction_type}
                        onChange={handleFilterChange}
                        className="form-control"
                        id="transaction_type"
                        name="transaction_type"
                        required
                      >
                        <option key="select" value="">
                          Select Transaction Type
                        </option>
                        <option key="gpay" value="debit">
                          Debit
                        </option>
                        <option key="paytm" value="credit">
                          Credit
                        </option>
                      </Input>
                    </InputGroup>
                    <InputGroup size="sm" className="w-25 ml-2">
                      <Input
                        type="select"
                        autoComplete="new-name"
                        value={filter.filterS.transaction_mode}
                        onChange={handleFilterChange}
                        className="form-control"
                        id="transaction_mode"
                        placeholder="Select Payment Mothod"
                        name="transaction_mode"
                        required
                      >
                        <option key="select" value="">
                          Select Payment Mothod
                        </option>
                        <option key="gpay" value="gpay">
                          Gpay
                        </option>
                        <option key="paytm" value="paytm">
                          Paytm
                        </option>
                        <option key="card" value="card">
                          Card
                        </option>
                        <option key="bets" value="bets">
                          Bets
                        </option>
                        <option key="win" value="win">
                          Win
                        </option>
                      </Input>
                    </InputGroup>
                    <InputGroup size="sm" className="w-25 ml-2">
                      <Input
                        type="Button"
                        onClick={() => getUserData({ ...filter.filterS })}
                        className="bg-default text-white"
                        value={"Search"}
                      ></Input>
                    </InputGroup>
                  </div>
                </CardHeader>
                <TableContainer>
                  <Table className="align-items-center "
                    responsive>
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-white" className="text-white">Phone Number</TableCell>
                        <TableCell className="text-white" align="center">Payment Method</TableCell>
                        <TableCell className="text-white" align="center">Amount</TableCell>
                        <TableCell className="text-white" align="center">Payment Type</TableCell>
                        <TableCell className="text-white" align="center">Date</TableCell>
                        <TableCell className="text-white"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactionHistory && transactionHistory.length
                        ? transactionHistory
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((list, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell className="text-white">{list?.wallet_id?.phone_number}</TableCell>
                                <TableCell className="text-white" align="center">{list?.transaction_mode}</TableCell>
                                <TableCell className="text-white" align="center">{list?.amount}</TableCell>
                                <TableCell className="text-white" align="center">{list?.transaction_type}</TableCell>
                                <TableCell className="text-white" align="center">
                                  {moment(list.updatedAt).format(
                                    "MM-DD-YYYY, h:mm a"
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          }) : ''
                      }
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          className="text-white"
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={5}
                          count={transactionHistory.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage} />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
                {/* <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment Type</th>
                      <th scope="col">Date</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory && transactionHistory.length
                      ? transactionHistory.map((list, index) => {
                        return (
                          <tr key={index}>
                            <td>{list?.wallet_id?.phone_number}</td>
                            <td>{list?.transaction_mode}</td>
                            <td>{list?.amount}</td>
                            <td>{list?.transaction_type}</td>
                            <td>
                              {moment(list.updatedAt).format(
                                "MM-DD-YYYY, h:mm a"
                              )}
                            </td>
                          </tr>
                        );
                      })
                      : ""}
                  </tbody>
                </Table> */}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    )
  );
};

function mapStateToProps(state) {
  return {
    user: state.session.user,
    transactionHistory: state.transactionHistory,
  };
}

export default withRouter(connect(mapStateToProps, {})(TransactionsHistory));
