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
import { Link, withRouter, useHistory } from "react-router-dom";
import { toastr } from 'react-redux-toastr'
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
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
import { getWallets, addMoneyToWallet } from "../../redux/actions";

const Wallet = (props) => {
  const { walletsList } = props.wallets;
  const dispatch = useDispatch();
  const [walletSet, setWallets] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });
  const [state, setState] = useState({
    wallet_id: "",
    transaction_mode: "",
    transaction_type: "",
    amount: 0,
    submitted: false,
  });
  const [filter, setFilter] = useState({
    filterS: {
      status: '',
      phone_number: "",
      total_amount: ""
    }
  });

  const [totalAmount, setTotalAmount] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getWallets({}, (errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFilter(prevState => ({
      ...prevState,
      filterS: {
        ...filter.filterS,
        [id]: value,
      }
    }));
    console.log(filter.filterS, "STATUSSS");
  };

  const getWalletData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getWallets(query, (errors, res) => {
      setWallets(res.response);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }

  /**
   *
   * @param id - The id of the wallet
   * @param currentTotalAmount - The current total amount of the wallet
   */
  const onEdit = ({ id, currentTotalAmount }) => {
    setInEditMode({
      status: true,
      rowKey: id
    })
    setTotalAmount(currentTotalAmount);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
    })
    // reset the total amount value
    setTotalAmount(null);
  }
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
      dispatch(getWallets({}, (errors, res) => {
        dispatch({ type: 'LOADING_SUCCESS' });
      }));
    }));
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0 text-center">Add Money To User Account</h3>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-ui-04" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        autoComplete="new-name"
                        value={state.wallet_id}
                        onChange={handleChange}
                        className="form-control"
                        id="wallet_id"
                        placeholder="Select Game"
                        name="wallet_id"
                        required>
                        {walletsList && walletsList.length ?
                          walletsList.map((list, index) => {
                            return (
                              <option key={index} value={list._id}>{list?.user_id?.first_name + list?.user_id?.last_name}</option>
                            )
                          }) : ''
                        }
                      </Input>
                    </InputGroup>
                    {
                      state.submitted && !state.wallet_id &&
                      <div className="error">Wallet name is required</div>
                    }
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-money-coins" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        autoComplete="new-wbetno"
                        className="form-control"
                        id="amount"
                        placeholder="Enter amount"
                        name="password"
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
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-ui-04" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        autoComplete="new-name"
                        value={state.transaction_type}
                        onChange={handleChange}
                        className="form-control"
                        id="transaction_type"
                        placeholder="Select Transaction Type"
                        name="transaction_type"
                        required>
                        <option value={"credit"}>Credit</option>
                        <option value={"debit"}>Debit</option>
                      </Input>
                    </InputGroup>
                    {
                      state.submitted && !state.transaction_type &&
                      <div className="error">Transaction Type is required</div>
                    }
                  </FormGroup>
                  <FormGroup className="mb-3">
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
                        <option value={"gpay"}>Gpay</option>
                        <option value={"paytm"}>Paytm</option>
                        <option value={"card"}>Card</option>
                        <option value={"bets"}>Bets</option>
                      </Input>
                    </InputGroup>
                    {
                      state.submitted && !state.transaction_mode &&
                      <div className="error">Transaction Mode is required</div>
                    }
                  </FormGroup>
                  <div className="text-center">
                    <Button disabled={!(state.transaction_mode && state.transaction_type && state.amount && state.wallet_id)} onClick={handleSubmit} className="my-4" color="primary" type="button">
                      Add Result
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
                <h3 className="text-white mb-0">Wallet Details</h3>
                <div className="d-flex mt-2">
                  <InputGroup size="sm" className="w-25">
                    <Input
                      id="phone_number"
                      type="text"
                      name="phone_number"
                      value={filter.filterS.phone_number}
                      onChange={handleFilterChange}
                      placeholder="Search Phone Number"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="total_amount"
                      step="1"
                      type="number"
                      name="total_amount"
                      value={filter.filterS.total_amount}
                      onChange={handleFilterChange}
                      placeholder="Search Total Amount"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      type="select"
                      value={filter.filterS.status}
                      onChange={handleFilterChange}
                      id="status"
                      name="status"
                      required>
                      <option key="select" value="">Select Status</option>
                      <option key="active" value="active">Active</option>
                      <option key="inactive" value="inactive">Inactive</option>
                    </Input>
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input type="Button" onClick={() => getWalletData({ ...filter.filterS })} className="bg-default text-white" value={"Search"}></Input>
                  </InputGroup>
                </div>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {walletsList && walletsList.length ?
                    walletsList.map((list, index) => {
                      return (
                        <tr key={index}>
                          <td>{list?.user_id?.first_name + list?.user_id?.last_name}</td>
                          <td>{list.phone_number}</td>
                          <td>{list.total_amount}</td>
                          <td>{list.status}</td>
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
    wallets: state.wallets
  };
}

export default withRouter(connect(mapStateToProps, {})(Wallet));
