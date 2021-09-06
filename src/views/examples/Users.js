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
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Input,
  Table,
  Container,
  Row,
  UncontrolledDropdown,
  InputGroup,
  InputGroupAddon,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getUserList } from "../../redux/actions";

const Users = (props) => {
  console.log(props, "PROPSSS");
  const { userList } = props;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    status: ''
  });

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getUserList((errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }, []);

  const getSearchUser = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    // let user = shortListedUser.filter(user => {
    //     let userName = user.shortlistedUser.first_name + user.shortlistedUser.last_name;
    //     return userName.indexOf(e.target.value) > 0;
    // });
    // setSearchedShortListedUser(user);
  };

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
                <h3 className="text-white mb-0">Users List</h3>
                <div className="d-flex mt-2">
                  <InputGroup size="sm" className="w-50">
                    <Input
                      type="text"
                      name=""
                      value={searchText || ""}
                      onChange={getSearchUser}
                      placeholder="Search....."
                    />
                    <InputGroupAddon addonType="append">
                      <Button className="bg-default shadow"><i className="fas fa-search text-white" /></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <UncontrolledDropdown size="sm" className="w-50">
                    <DropdownToggle caret className="float-right">
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
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {userList && userList.length ?
                    userList.map((list, index) => {
                      return (
                        <tr key={index}>
                          <td>{list?.first_name}</td>
                          <td>{list?.last_name}</td>
                          <td>{list?.phone_number}</td>
                          <td>{list?.status}</td>
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
    userList: state.user.userList
  };
}

export default withRouter(connect(mapStateToProps, {})(Users));
