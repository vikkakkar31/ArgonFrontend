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
import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux';
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
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getTransactionHistory } from "../../redux/actions"; 

const PaymentRequest = (props) => {
  const { transactionHistory } = props.transactionHistory;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    status: ''
  });

  const handleFilterChange = (e) => {
    e.preventDefault();
    var filterS = {
      status: e.currentTarget.getAttribute("dropdownvalue")
    }
    setFilter(prevState => ({
        ...prevState,
        filter: filterS
    }));
    console.log(filter.status, "STATUSSS");
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
                  <h3 className="text-white mb-0">Payments</h3>
                <div className="">
                  <UncontrolledDropdown size="sm" className="float-right">
                    <DropdownToggle caret className="">
                      {filter.status ? filter.status : "Status"}
                    </DropdownToggle>
                    <DropdownMenu right id="status">
                      <DropdownItem onClick={handleFilterChange} dropDownValue="Active">Active</DropdownItem>
                      <DropdownItem onClick={handleFilterChange} dropDownValue="Inactive">Inactive</DropdownItem>
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
                    <th scope="col">Register Number</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Transfer Number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {transactionHistory && transactionHistory.length ?
                  transactionHistory.map((list, index) => {
                    return(
                    <tr>
                    <th scope="row">
                      <span className="mb-0 text-sm">Argon Design System</span>
                    </th>
                    <td>{list.register_number}</td>
                    <td>{list.transaction_mode}</td>
                    <td>{list.transfer_number}</td>
                    <td>{list.amount}</td>
                    <td>{list.transaction_type}</td>   
                    <td>{list.updatedAt}</td>
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
