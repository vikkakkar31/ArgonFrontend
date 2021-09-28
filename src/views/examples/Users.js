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
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@material-ui/core";

const Users = (props) => {
  console.log(props, "PROPSSS");
  const { userList } = props;
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    filterS: {
      status: '',
      phone_number: "",
      searchText: ""
    }
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getUserList(query, (errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }

  const getSearchUser = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    // let user = shortListedUser.filter(user => {
    //     let userName = user.shortlistedUser.first_name + user.shortlistedUser.last_name;
    //     return userName.indexOf(e.target.value) > 0;
    // });
    // setSearchedShortListedUser(user);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

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
                <h3 className="text-white mb-0">Users Details</h3>
                <div className="d-flex mt-2">
                  <InputGroup size="sm" className="w-25">
                    <Input
                      id="searchText"
                      type="text"
                      name="searchText"
                      value={filter.filterS.searchText}
                      onChange={handleFilterChange}
                      placeholder="Search Name"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="phone_number"
                      step="1"
                      type="number"
                      name="phone_number"
                      value={filter.filterS.phone_number}
                      onChange={handleFilterChange}
                      placeholder="Search Phone Number"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input type="Button" onClick={() => getUserData({ ...filter.filterS })} className="bg-default text-white" value={"Search"}></Input>
                  </InputGroup>
                </div>
              </CardHeader>
              <TableContainer>
                <Table className="align-items-center table-dark table-flush"
                  responsive>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-white">First name</TableCell>
                      <TableCell className="text-white" align="center">Last Name</TableCell>
                      <TableCell className="text-white" align="center">Phone NUmber</TableCell>
                      <TableCell className="text-white" align="center"> Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList && userList.length ?
                      userList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((list, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="text-white">{list?.first_name}</TableCell >
                              <TableCell className="text-white" align="center">{list?.last_name}</TableCell >
                              <TableCell className="text-white" align="center">{list?.phone_number}</TableCell >
                              <TableCell className="text-white" align="center">{list?.status}</TableCell >
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
                        count={userList.length}
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
    userList: state.user.userList
  };
}

export default withRouter(connect(mapStateToProps, {})(Users));
