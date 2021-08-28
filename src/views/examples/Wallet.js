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
import { getWallets, updateWallet } from "../../redux/actions"; 

const Wallet = (props) => {
  const { walletsList } = props.wallets;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const [filter, setFilter] = useState({
    status: ''
  });

  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
		dispatch({ type: 'LOADING_START' });
        dispatch(getWallets((errors, res) => {
			  dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }, []);  

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

  /**
   *
   * @param id - The id of the wallet
   * @param currentTotalAmount - The current total amount of the wallet
   */
  const onEdit = ({id, currentTotalAmount}) => {
      setInEditMode({
          status: true,
          rowKey: id
      })
      setTotalAmount(currentTotalAmount);
  }

  /**
     *
     * @param id
     * @param newTotalAmount
     */
    const updateWallet = ({id, newTotalAmount}) => {

      // dispatch(updateProfile(newValue, (err, res) => {
      //   res.then()
      //   .then(err=>{
      //     onCancel();
      //     dispatch(getWallets((errors, res) => {
      //       dispatch({ type: 'LOADING_SUCCESS' });
      //       })
      //     )
      //   })
      // }));
      // fetch(`${INVENTORY_API_URL}/${id}`, {
      //     method: "PATCH",
      //     body: JSON.stringify({
      //         total_amount: newTotalAmount
      //     }),
      //     headers: {
      //         "Content-type": "application/json; charset=UTF-8"
      //     }
      // })
      //     .then(response => response.json())
      //     .then(json => {
      //         // reset inEditMode and total amount values
      //         onCancel();

      //         // fetch the updated data
      //         getWallets();
      //     })
  }

  /**
     *
     * @param id -The id of the wallet
     * @param newTotalAmount - The new total amount of the wallet
     */
    const onSave = ({id, newTotalAmount}) => {
      updateWallet({id, newTotalAmount});
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
                  <h3 className="text-white mb-0">Wallet Details</h3>
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
                    <th scope="col">Phone Number</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {walletsList && walletsList.length ?
                  walletsList.map((list, index) => {
                    return(
                    <tr>
                      <td>{list.user_id}</td>
                      <td>{list.phone_number}</td>
                      <td>{list.total_amount}</td>
                      <td>{list.status}</td>
                      <td>
                      {
                        inEditMode.status && inEditMode.rowKey === list.id ? (
                            <React.Fragment>
                                <button
                                    className={"btn-success"}
                                    onClick={() => onSave({id: list.id, newTotalAmount: totalAmount})}
                                >
                                    Save
                                </button>

                                <button
                                    className={"btn-secondary"}
                                    style={{marginLeft: 8}}
                                    onClick={() => onCancel()}
                                >
                                    Cancel
                                </button>
                            </React.Fragment>
                        ) : (
                            <button
                                className={"btn-primary"}
                                onClick={() => onEdit({id: list.id, currentTotalAmount: list.total_amount})}
                            >
                                Edit
                            </button>
                        )
                    }
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
    wallets: state.wallets
	};
}

export default withRouter(connect(mapStateToProps, {})(Wallet));
