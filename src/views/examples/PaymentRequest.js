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
import React, { useState, useEffect } from "react";
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter, useHistory } from "react-router-dom";
import { getWallets, getUserRequest, updateUserRequest, addMoneyToWallet } from "../../redux/actions";
import { toastr } from 'react-redux-toastr'

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getTransactionHistory } from "../../redux/actions";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@material-ui/core";

const PaymentRequest = (props) => {
  // console.log(props, "props");
  const { walletsList } = props.wallets;
  let walletData = walletsList.filter((wallet) => {
    return wallet?.phone_number
  })
  const filterOptions = createFilterOptions({
    ignoreCase: false,
    ignoreAccents: false,
  });
  const { transactionHistory, userRequests } = props.transactionHistory;
  // console.log(userRequests, "transactionHistory");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userRequests);
  const [state, setState] = useState({
    wallet_id: "",
    transaction_mode: "card",
    transaction_type: "none",
    amount: null,
    submitted: false,
  });
  const [filter, setFilter] = useState({
    filterS: {
      transaction_type: "",
      transaction_mode: "",
      phone_number: "",
      amount: "",
      createdAt: "",
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getUserData({ transaction_type: "credit" });
    dispatch(getWallets({}, (errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }, []);
  const handleChange = (e) => {
    const { id, value, name } = e.target;
    if (name) {
      setState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        [id]: value,
      }));
    }

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState(prevState => ({
      ...prevState,
      submitted: true
    }));
    let reqData = {
      "wallet_id": state.wallet_id,
      "amount": state.amount,
      "transaction_type": state.transaction_type,
      "transaction_mode": state.transaction_mode,
    }
    dispatch(addMoneyToWallet(reqData, (res, errors) => {
      toastr.success('Success', "Money Requested Successfully Please check and approve");
      dispatch(getUserRequest({}, (errors, res) => {
        dispatch({ type: 'LOADING_SUCCESS' });
      }));
    }));
  };
  // const handleFilterChange = (e) => {
  //   e.preventDefault();
  //   var filterS = {
  //     status: e.currentTarget.getAttribute("dropdownvalue")
  //   }
  //   setFilter(prevState => ({
  //     ...prevState,
  //     filterS: { ...filterS }
  //   }));
  //   getUserData({
  //     transaction_type: e.currentTarget.getAttribute("dropdownvalue")
  //   })
  // };
  const onUpdate = (transaction, status) => {
    let updatData = {
      "transaction_id": transaction._id,
      "transaction_status": status,
      "role": "admin"
    }
    dispatch(updateUserRequest(updatData, (err, res) => {
      if (res.data.message) {
        toastr.success('error', res.data.message)
      } else {
        toastr.success('Success', 'Request Updated Successfully')
      }
      getUserData({ transaction_type: "credit" });
    }));
  }
  const getUserData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getUserRequest(query, (errors, res) => {
      setUserData(res.data);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }
  const status = {
    debit: "Debit",
    credit: "Credit"

  }
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="mb-0 text-center">Add Money To User Account</h3>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <Autocomplete
                        filterOptions={filterOptions}
                        id="wallet_id"
                        options={walletData}
                        value={state.wallet_id}
                        onChange={(option, value) => {
                          setState(prevState => ({
                            ...prevState,
                            wallet_id: value,
                          }));
                        }}
                        renderOption={(option) => (
                          <React.Fragment>
                            <Grid item xs>
                              {option?.user_id?.first_name + option?.user_id?.last_name}
                              <Typography variant="body2" color="textSecondary">
                                {option?.phone_number}
                              </Typography>
                            </Grid>
                          </React.Fragment>
                        )}
                        fullWidth={true}
                        getOptionLabel={(option) => option?.phone_number}
                        renderInput={(params) => <TextField style={{ color: "white" }} {...params} label="Select Phone Number" variant="outlined" fullWidth />}
                      />
                    </InputGroup>
                    {
                      state.submitted && !state.wallet_id &&
                      <div className="error">Wallet name is required</div>
                    }
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        id="amount"
                        placeholder="Enter amount"
                        name="amount"
                        value={state.amount}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {
                      state.submitted && !state.amount &&
                      <div className="error">Amount is required</div>
                    }
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <Select
                        fullWidth
                        type="select"
                        value={state.transaction_type}
                        onChange={handleChange}
                        inputProps={{
                          id: 'transaction_type',
                          'aria-label': 'Without label'
                        }}
                        variant="outlined"
                        id="transaction_type"
                        name="transaction_type"
                      >
                        <option value="none" disabled>Select Transaction Type</option>
                        <option value="credit">Credit</option>
                        <option value="debit" > Debit</option>
                      </Select>
                    </InputGroup>
                    {
                      state.submitted && !state.transaction_type !== 'none' &&
                      <div className="error">Transaction Type is required</div>
                    }
                  </FormGroup>
                  {/* <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-ui-04" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        autoComplete="new-name"
                        value={state.transaction_mode}
                        onChange={handleChange}
                        className="form-control"
                        id="transaction_mode"
                        placeholder="Select Payment Mode"
                        name="transaction_mode"
                        required>
                        <option value={""}>Select Payment Mode</option>
                        <option value={"gpay"}>Gpay</option>
                        <option value={"paytm"}>Paytm</option>
                        <option value={"card"}>Card</option>
                        <option value={"bets"}>Bets</option>
                        <option value={"refer"}>Referral</option>
                      </Input>
                    </InputGroup>
                    {
                      state.submitted && !state.transaction_mode &&
                      <div className="error">Transaction Mode is required</div>
                    }
                  </FormGroup> */}
                  <div className="text-center">
                    <Button disabled={!(state.transaction_type !== 'none' && state.amount && state.wallet_id)} onClick={handleSubmit} className="my-4" color="primary" type="button">
                      Add Money
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Payments</h3>
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
                      placeholder="Select Payment Method"
                      name="transaction_mode"
                      required
                    >
                      <option key="select" value="">
                        Select Payment Method
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
                      <option key="refer" value="refer">
                        Referral
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
                <Table className="align-items-center table-dark table-flush"
                  responsive>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-white">Name</TableCell>
                      <TableCell className="text-white" align="cenetr">Payment Method</TableCell>
                      <TableCell  className="text-white" align="cenetr">Amount</TableCell>
                      <TableCell className="text-white" align="cenetr">Payment Type</TableCell>
                      <TableCell className="text-white" align="cenetr">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {userData && userData.length ?
                    userData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((list, index) => {
                      return (
                        <TableRow key={index}>
                          <TableHead scope="row">
                            <span className="mb-0 text-sm">{list?.wallet_id?.phone_number}</span>
                          </TableHead>
                          <TableCell  className="text-white" align="cenetr">{list?.transaction_mode}</TableCell>
                          <TableCell className="text-white" align="cenetr">{list?.amount}</TableCell>
                          <TableCell className="text-white" align="cenetr">{list?.transaction_type}</TableCell>
                          <TableCell className="text-white" align="cenetr">{moment(list?.createdAt).format('MM-DD-YYYY, h:mm a')}</TableCell>
                          <TableCell>
                            <React.Fragment>
                              <button
                                className={"btn-success"}
                                onClick={() => onUpdate(list, 'approved')}
                              >
                                Approve
                              </button>

                              <button
                                className={"btn-secondary"}
                                style={{ marginLeft: 8 }}
                                onClick={() => onUpdate(list, 'rejected')}
                              >
                                Reject
                              </button>
                            </React.Fragment>
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
                          count={userData.length}
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
                    <th scope="col">Name</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {userData && userData.length ?
                    userData.map((list, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            <span className="mb-0 text-sm">{list?.wallet_id?.phone_number}</span>
                          </th>
                          <td>{list?.transaction_mode}</td>
                          <td>{list?.amount}</td>
                          <td>{list?.transaction_type}</td>
                          <td>{moment(list?.createdAt).format('MM-DD-YYYY, h:mm a')}</td>
                          <td>
                            <React.Fragment>
                              <button
                                className={"btn-success"}
                                onClick={() => onUpdate(list, 'approved')}
                              >
                                Approve
                              </button>

                              <button
                                className={"btn-secondary"}
                                style={{ marginLeft: 8 }}
                                onClick={() => onUpdate(list, 'rejected')}
                              >
                                Reject
                              </button>
                            </React.Fragment>
                          </td>
                        </tr>
                      )
                    }) : ''
                  }
                </tbody>
              </Table> */}
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
    wallets: state.wallets,
    transactionHistory: state.transactionHistory
  };
}

export default withRouter(connect(mapStateToProps, {})(PaymentRequest));
