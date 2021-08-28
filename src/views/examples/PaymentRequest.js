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
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter, useHistory } from "react-router-dom";
import { getUserRequest, updateUserRequest } from "../../redux/actions";
import { toastr } from 'react-redux-toastr'

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
  Col,
  Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getTransactionHistory } from "../../redux/actions";

const PaymentRequest = (props) => {
  // console.log(props, "props");
  const { transactionHistory, userRequests } = props.transactionHistory;
  // console.log(userRequests, "transactionHistory");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userRequests);
  const [filter, setFilter] = useState({
    filterS: {
      status: 'debit'
    }
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    var filterS = {
      status: e.currentTarget.getAttribute("dropdownvalue")
    }
    setFilter(prevState => ({
      ...prevState,
      filterS: { ...filterS }
    }));
    getUserData({
      transaction_type: e.currentTarget.getAttribute("dropdownvalue")
    })
  };
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
      getUserData();
    }));
  }
  const getUserData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getUserRequest(query, (errors, res) => {
      setUserData(res.data);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }
  console.log(filter, "STATUSSS");
  const status = {
    debit: "Debit",
    credit: "Credit"

  }
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
                <h3 className="text-white mb-0">Payments</h3>
                <div className="">
                  <UncontrolledDropdown size="sm" className="float-right">
                    <DropdownToggle caret className="">
                      {filter.filterS && filter.filterS.status ? status[filter.filterS.status] : "Status"}
                    </DropdownToggle>
                    <DropdownMenu right id="status">
                      <DropdownItem onClick={handleFilterChange} dropDownValue="debit">Debit</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="credit">Credit</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <FormGroup row>
                    <Col sm={4}>
                      <Input type="text" placeholder="with a placeholder" />
                    </Col>
                  </FormGroup>
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
                  {userData && userData.length ?
                    userData.map((list, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            <span className="mb-0 text-sm">{list.wallet_id.phone_number}</span>
                          </th>
                          <td>{list.transaction_mode}</td>
                          <td>{list.amount}</td>
                          <td>{list.transaction_type}</td>
                          <td>{list.updatedAt}</td>
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

export default withRouter(connect(mapStateToProps, {})(PaymentRequest));
