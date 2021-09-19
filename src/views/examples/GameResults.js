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
  Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getGameResults, updateGameResults, getGames } from "../../redux/actions";
import { TableBody, TableCell ,Table, TablePagination,TableRow ,TableContainer,TableHead,TableFooter } from "@material-ui/core";

const GameResults = (props) => {
  console.log(props, "PROPSSSSSS");
  const { gameResults, gamesList } = props.games;
  const dispatch = useDispatch();
  const [gamesSet, setGames] = useState([]);
  const [state, setState] = useState({
    game_name: "",
    winning_bet_number: "",
    winning_amount: "",
    submitted: false,
  });
  const [filter, setFilter] = useState({
    filterS: {
      game_id: "",
      winning_bet_number: "",
      winning_amount: ""
    }
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
    dispatch({ type: 'LOADING_START' });
    dispatch(getGames((errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getGameResults({}, (errors, res) => {
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
  };

  const getGameResultData = (query = {}) => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getGameResults(query, (errors, res) => {
      setGames(res.response);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState(prevState => ({
      ...prevState,
      submitted: true
    }));
    let reqData = {
      "_id": state.game_name,
      "role": "admin",
      "today_game_result": {
        "game_bet_id": state.game_name,
        "winning_bet_number": state.winning_bet_number,
        "winning_amount": state.winning_amount,
      }
    }
    if (reqData) {
      dispatch(updateGameResults(reqData, (res, errors) => {
        if (res && res.status == 200) {
          toastr.success('Success', "Game Result Added")
          setState(prevState => ({
            ...prevState,
            submitted: true
          }));
        }
      }));
    }
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gameResults.length) : 0;

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
                            return (
                              <option key={index} value={list._id}>{list?.game_name}</option>
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
                  {/* <FormGroup>
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
                        placeholder="Winning Amount"
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
                  </FormGroup> */}
                  <div className="text-center">
                    <Button disabled={!(state.game_name && state.winning_bet_number)} onClick={handleSubmit} className="my-4" color="primary" type="button">
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
                <h3 className="text-white mb-0">Games Result List</h3>
                <div className="d-flex mt-2">
                  <InputGroup size="sm" className="w-25">
                    <Input
                      type="select"
                      autoComplete="new-name"
                      value={filter.filterS.game_id}
                      onChange={handleFilterChange}
                      id="game_id"
                      placeholder="Select Game"
                      name="game_id"
                      required>
                      <option key="select" value="">Select Game</option>
                      {gamesList && gamesList.length ?
                        gamesList.map((list, index) => {
                          return (
                            <option key={index} value={list._id}>{list?.game_name}</option>
                          )
                        }) : ''
                      }
                    </Input>
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="winning_bet_number"
                      type="text"
                      name="winning_bet_number"
                      value={filter.filterS.winning_bet_number}
                      onChange={handleFilterChange}
                      placeholder="Search Winning Bet Number"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input
                      id="winning_amount"
                      step="1"
                      type="number"
                      name="winning_amount"
                      value={filter.filterS.winning_amount}
                      onChange={handleFilterChange}
                      placeholder="Search Winning Amount"
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="w-25 ml-2">
                    <Input type="Button" onClick={() => getGameResultData({ ...filter.filterS })} className="bg-default text-white" value={"Search"}></Input>
                  </InputGroup>
                </div>
              </CardHeader>
              <TableContainer>
                <Table className="align-items-center table-dark table-flush"
                  responsive>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-white">Game Name</TableCell>
                      <TableCell  className="text-white" align="center">Winning Bet Number</TableCell>
                      <TableCell className="text-white" align="center">Winning Amount</TableCell>
                      <TableCell className="text-white" align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {gameResults && gameResults.length ?
                    gameResults
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((list, index) => {
                      return (
                        <TableRow>
                          <TableCell className="text-white">{list?.game_id?.game_name}</TableCell>
                          <TableCell className="text-white" align="center">{list?.winning_bet_number}</TableCell>
                          <TableCell className="text-white" align="center">{list?.winning_amount}</TableCell>
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
                      count={gameResults.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}/>
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
                    <th scope="col">Game Name</th>
                    <th scope="col">Winning Bet Number</th>
                    <th scope="col">Winning Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {gameResults && gameResults.length ?
                    gameResults.map((list, index) => {
                      return (
                        <tr>
                          <td>{list?.game_id?.game_name}</td>
                          <td>{list?.winning_bet_number}</td>
                          <td>{list?.winning_amount}</td>
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
    games: state.games
  };
}

export default withRouter(connect(mapStateToProps, {})(GameResults));
