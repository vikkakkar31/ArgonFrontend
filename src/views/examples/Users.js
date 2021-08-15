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
import React, { useEffect, useState }  from "react";
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter, useHistory } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getUserList } from "../../redux/actions"; 

const Users = (props) => {
  console.log(props, "PROPSSS");
  // const { UserList } = props.user;
  const dispatch = useDispatch();
  // const [wallets, setWallets] = useState([]);

  useEffect(() => {
		dispatch({ type: 'LOADING_START' });
        dispatch(getUserList((errors, res) => {
			  dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }, []);

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
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {/* {walletsList && walletsList.length ?
                  walletsList.map((list, index) => {
                    return(
                    <tr>
                      <td>{list.user_id}</td>
                      <td>{list.phone_number}</td>
                      <td>{list.total_amount}</td>
                    </tr>
                    )
                  }) : ''
                } */}
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
