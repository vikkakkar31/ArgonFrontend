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
  Table,
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

const TransactionsHistory = (props) => {
  const { transactionHistory } = props.transactionHistory;
  const dispatch = useDispatch();
  const [transactionHistorySet, setTransactionHistory] = useState([]);

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
                <Table
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
                              <td>{list.wallet_id.phone_number}</td>
                              <td>{list.transaction_mode}</td>
                              <td>{list.amount}</td>
                              <td>{list.transaction_type}</td>
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
                </Table>
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
