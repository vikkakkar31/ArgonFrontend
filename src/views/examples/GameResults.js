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
import { getGames, updateGameResults } from "../../redux/actions";

const GameResults = (props) => {
  console.log(props, "PROPSSSSSS");
  const { gameResults, gamesList } = props.games;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    game_name: "",
    winning_bet_number: 0,
    winning_amount: 0,
    submitted: false,
  });
  const [filter, setFilter] = useState({
    status: ''
  });

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
		dispatch({ type: 'LOADING_START' });
        dispatch(getGames((errors, res) => {
			  dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }, []);

    const getSearchGame = (e) => {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === id) {
        setState(prevState => ({
          ...prevState,
          [id]: value,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          [id]: value
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
      game_name: state.game_name,
      winning_bet_number: state.winning_bet_number,
      winning_amount: state.winning_amount
    }
    if (reqData) {
      dispatch(updateGameResults(reqData, (res, errors) => {
        if(res && res.status == 200)
        {
          setState(prevState => ({
            ...prevState,
            submitted: true
          }));
        }
      }));
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0 text-center">Add Game Result</h3>
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
                        value={state.game_name}
                        onChange={handleChange}
                        className="form-control"
                        id="game_name"
                        placeholder="Select Game"
                        name="game_name"
                        required>
                        {gamesList && gamesList.length ?
                          gamesList.map((list, index) => {
                            return(
                              <option key={index}>{list.game_name}</option>
                            )
                          }) : ''
                        }
                      </Input>
                    </InputGroup>
                    {
                      state.submitted && !state.game_name &&
                      <div className="error">Game name is required</div>
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
                        id="winning_bet_number"
                        placeholder="Enter winning bet number"
                        name="password"
                        value={state.winning_bet_number}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {
                      state.submitted && !state.winning_bet_number &&
                      <div className="error">Winning Bet Number is required</div>
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
                        autoComplete="new-wamount"
                        className="form-control"
                        id="winning_amount"
                        placeholder="Enter End Date"
                        name="winning_amount"
                        value={state.winning_amount}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {
                      state.submitted && !state.winning_amount &&
                      <div className="error">Winning Amount is required</div>
                    }
                  </FormGroup>
                  <div className="text-center">
                    <Button disabled={!(state.game_name && state.winning_bet_number && state.winning_amount)} onClick={handleSubmit} className="my-4" color="primary" type="button">
                    Add Result
                  </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>


        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Games List</h3>
                  <div className="d-flex mt-2">
                  <InputGroup size="sm" className="w-50">
                    <Input
                      type="text"
                      name=""
                      value={searchText || ""}
                      onChange={getSearchGame}
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
                    <th scope="col">Game Name</th>
                    <th scope="col">Winning Bet Number</th>
                    <th scope="col">Winning Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {gamesList && gamesList.length ?
                  gamesList.map((list, index) => {
                    return(
                    <tr>
                      <td>{list.game_name}</td>
                      <td>{list.start_date}</td>
                      <td>{list.end_date}</td>
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
    games: state.games
  };
}

export default withRouter(connect(mapStateToProps, {})(GameResults));
