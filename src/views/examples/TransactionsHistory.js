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
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
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
  Button
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
      status: 'debit',
      payment_method: 'bets',
      name_search: '',
      amount_search: '',
      date_search: ''
    }
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    // var filterS = {
    //   status: e.currentTarget.getAttribute("dropdownvalue"),
    //   payment_method: e.currentTarget.getAttribute("dropdownvalue"),
    //   name_search: e.target.value,
    //   amount_search: e.target.value,
    //   date_search: e.target.value
    // }
    const { id, value } = e.target;
    setFilter(prevState => ({
      ...prevState,
      filterS: { 
        ...filter.filterS,
        [id]: value, 
      }
    }));
    getUserData({
      transaction_type: e.currentTarget.getAttribute("dropdownvalue")
    })
  };
  const getUserData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getTransactionHistory(query, (errors, res) => {
      setTransactionHistory(res.response);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }
  const status = {
    debit: "Debit",
    credit: "Credit"
  }
  const payment_method = {
    gpay: "Gpay",
    paytm: "Paytm",
    card: "Card",
    bets: "Bets"
  }
  return (
    console.log(filter.filterS, "FILTERS"),
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
                      id="name_search"
                      type="text"
                      name="name_search"
                      value={filter.filterS.name_search || ""}
                      onChange={handleFilterChange}
                      placeholder="Search for Name"
                    />
                    <InputGroupAddon addonType="append">
                      <Button className="bg-default shadow"><i className="fas fa-search text-white" /></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="amount_search"
                      type="number"
                      name="amount_search"
                      value={filter.filterS.amount_search || ""}
                      onChange={handleFilterChange}
                      placeholder="Search for Amount"
                    />
                    <InputGroupAddon addonType="append">
                      <Button className="bg-default shadow"><i className="fas fa-search text-white" /></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="date_search"
                      type="date"
                      name="date_search"
                      value={filter.filterS.date_search || ""}
                      onChange={handleFilterChange}
                      placeholder="Search for Date"
                    />
                    <InputGroupAddon addonType="append">
                      <Button className="bg-default shadow"><i className="fas fa-search text-white" /></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <UncontrolledDropdown size="sm" className="ml-2">
                    <DropdownToggle caret className="">
                      {filter.filterS && filter.filterS.status ? status[filter.filterS.status] : "Status"}
                    </DropdownToggle>
                    <DropdownMenu right id="status">
                      <DropdownItem onClick={handleFilterChange} dropDownValue="debit">Debit</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="credit">Credit</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown size="sm" className="ml-2">
                    <DropdownToggle caret className="">
                      {filter.filterS && filter.filterS.payment_method ? payment_method[filter.filterS.payment_method] : "Payment Method"}
                    </DropdownToggle>
                    <DropdownMenu right id="payment_method">
                      <DropdownItem onClick={handleFilterChange} dropDownValue="gpay">Gpay</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="paytm">Paytm</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="card">Card</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="bets">Bets</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory && transactionHistory.length ?
                    transactionHistory.map((list, index) => {
                      return (
                        <tr key={index}>
                          <td>{list.wallet_id.phone_number}</td>
                          <td>{list.transaction_mode}</td>
                          <td>{list.amount}</td>
                          <td>{list.transaction_type}</td>
                          <td>{moment(list.updatedAt).format('MM-DD-YYYY, h:mm a')}</td>
                        </tr>
                      )
                    }) : ''
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.session.user,
    transactionHistory: state.transactionHistory
  };
}

export default withRouter(connect(mapStateToProps, {})(TransactionsHistory));
