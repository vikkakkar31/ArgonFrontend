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
import _ from "lodash";

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
import { getGames, getGamesBets, getUserList } from "../../redux/actions";
const GameBets = (props) => {
    const { userList } = props;
    const { gameBets, gamesList } = props.games;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        status: '',
        start_date: Date.now(),
    });
    const [hrows, setHRowsCount] = useState(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]);
    const [vrows, setVRowsCount] = useState(["01", "11", "21", "31", "41", "51", "61", "71", "81", "91"]);
    const [singleRows, setSingleRowsCount] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [inputValues, setInputValues] = useState({});
    const [resultValues, setResultValues] = useState({});
    const [andarValues, setAndarValues] = useState({});
    const [baharValues, setBaharValues] = useState({});
    const [totalbat, setTotalBat] = useState(0);
    const [totalandar, setTotalAndar] = useState(0);
    const [totalbahar, setTotalBahar] = useState(0);

    useEffect(() => {
        dispatch({ type: 'LOADING_START' });
        dispatch(getGames((errors, res) => {
        }));
        dispatch(getUserList((errors, res) => {
        }));
        dispatch(getGamesBets({}, (errors, res) => {
            console.log(res, "ressasd");
            let userData = []
            var values = _.cloneDeep(inputValues);
            var resultValues = _.cloneDeep(resultValues);
            var inside_bets = _.cloneDeep(andarValues);
            var outside_bets = _.cloneDeep(baharValues);
            res.data.forEach(element => {
                if (element.bets.length) {
                    element.bets.forEach((bets) => {
                        let targetNUmber = bets.bet_number;
                        for (let item of vrows) {
                            let sum = 0;
                            for (let sitem of hrows) {
                                let currentNUmber = Number(item) + Number(sitem) - 1;
                                if (currentNUmber === targetNUmber) {
                                    values[`${sitem}_${item}`] = values[`${sitem}_${item}`] ? values[`${sitem}_${item}`] + bets.bet_amount : bets.bet_amount;
                                }
                            }
                        }
                    })
                }
                if (element.inside_bets.length) {
                    element.inside_bets.forEach((bets) => {
                        let targetNUmber = bets.bet_number;
                        inside_bets[`andar_${targetNUmber}`] = !isNaN(values[targetNUmber]) ? values[targetNUmber] + bets.bet_amount : bets.bet_amount;
                    })
                }
                if (element.outside_bets.length) {
                    element.outside_bets.forEach((bets) => {
                        let targetNUmber = bets.bet_number;
                        outside_bets[`bahar_${targetNUmber}`] = !isNaN(values[targetNUmber]) ? values[targetNUmber] + bets.bet_amount : bets.bet_amount;
                    })
                }
            });
            setInputValues(values);
            setAndarValues(inside_bets);
            setBaharValues(outside_bets);
            dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }, []);
    useEffect(() => {
        calculateSumValues();
    }, [inputValues, andarValues, baharValues]);

    // main table input value change
    const onRowValueChange = ({ target }) => {
        var values = _.cloneDeep(inputValues);
        values[target.name] = target.value;
        setInputValues(values);
    };

    const onAndarValueChange = ({ target }) => {
        var values = _.cloneDeep(andarValues);
        values[target.name] = target.value;
        const total = Object.keys(values).map((key) => values[key]).reduce((totalValue, item) => totalValue + Number(item), 0);
        setTotalAndar(total);
        setAndarValues(values);
    };

    const onBaharValueChange = ({ target }) => {
        var values = _.cloneDeep(baharValues);
        values[target.name] = target.value;
        const total = Object.keys(values).map((key) => values[key]).reduce((totalValue, item) => totalValue + Number(item), 0);
        setTotalBahar(total);
        setBaharValues(values);
    };

    //calculate sum for main table vertical rows
    const calculateSumValues = () => {
        var values = _.cloneDeep(resultValues);
        for (let item of vrows) {
            let sum = 0;
            for (let sitem of hrows) {
                sum = !isNaN(inputValues[`${sitem}_${item}`]) ? (sum + Number(inputValues[`${sitem}_${item}`])) : sum;
            }
            values["result_" + item] = sum;
        }
        const total = Object.keys(values).map((key) => values[key]).reduce((totalValue, item) => totalValue + item, 0);
        console.log(andarValues, "andarValues");
        let baharTotal = 0;
        let anderTotal = 0;
        if (Object.keys(andarValues).length) {
            anderTotal = Object.keys(andarValues).map((key) => andarValues[key]).reduce((totalValue, item) => totalValue + Number(item), 0);
        }
        if (Object.keys(baharValues).length) {
            baharTotal = Object.keys(baharValues).map((key) => baharValues[key]).reduce((totalValue, item) => totalValue + Number(item), 0);
        }

        setTotalBahar(baharTotal);
        setTotalAndar(anderTotal);
        setTotalBat(total);
        setResultValues(values);
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
        // setState(prevState => ({
        //     ...prevState,
        //     [id]: value,
        // }));
    };
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Dark table */}
                <Row className="mt-5">
                    <div className="col games-table">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Games List</h3>
                                <div className="d-flex mt-2">
                                    <FormGroup>
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-calendar-grid-58" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="date"
                                                autoComplete="new-sdate"
                                                className="form-control"
                                                id="start_date"
                                                placeholder="Start Date"
                                                name="start_date"
                                                value={filter.start_date}
                                                // onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <InputGroup size="sm">
                                        <Input
                                            type="select"
                                            autoComplete="new-name"
                                            // value={state.game_name}
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
                                    <InputGroup size="sm">
                                        <Input
                                            type="select"
                                            autoComplete="new-name"
                                            // value={state.game_name}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="game_name"
                                            placeholder="Select Player"
                                            name="game_name"
                                            required>
                                            {userList && userList.length ?
                                                userList.map((list, index) => {
                                                    return (
                                                        <option key={index} value={list._id}>{list?.first_name + list?.last_name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </Input>
                                    </InputGroup>
                                    <InputGroup size="sm">
                                        <Input
                                            type="input"
                                            autoComplete="amount"
                                            // onChange={handleChange}
                                            className="form-control"
                                            id="amount"
                                            placeholder="Amount"
                                            name="amount"
                                        />
                                    </InputGroup>
                                    <InputGroup size="sm">
                                        <Button className="my-4" color="primary" type="button">
                                            Search
                                        </Button>
                                    </InputGroup>

                                </div>
                            </CardHeader>
                            <div className="bet-table-container">
                                <div className="l-sec">
                                    <div className="bet-rows">
                                        {
                                            hrows.map((item, index) => {
                                                return (
                                                    <div key={item}>
                                                        {
                                                            vrows.map((sItem, sIndex) => {
                                                                if (index === 0 || sIndex === 0) {
                                                                    return (
                                                                        <div key={`${item}_${sItem}`} className="l-item">
                                                                            <label> {index === 0 ? sItem : item}</label>
                                                                            <input
                                                                                name={`${item}_${sItem}`}
                                                                                value={inputValues[`${item}_${sItem}`]}
                                                                                onChange={onRowValueChange}
                                                                                type="textfield" />
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div key={`${item}_${sItem}`}  >
                                                                            <input
                                                                                // key={`${item}_${sItem}`} 
                                                                                name={`${item}_${sItem}`}
                                                                                value={inputValues[`${item}_${sItem}`]}
                                                                                onChange={onRowValueChange}
                                                                                type="textfield" />
                                                                        </div>
                                                                    )
                                                                };
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="result-row">
                                        {
                                            vrows.map((item, index) => {
                                                return (
                                                    <div key={`result_${item}`}>
                                                        <input
                                                            name={`result_${item}`}
                                                            value={resultValues[`result_${item}`]}
                                                            // onChange={onResultValueChange}
                                                            type="textfield" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="r-sec">
                                    <div className="total-bet">
                                        Total bet = Rs {totalbat}
                                    </div>
                                </div>
                            </div>

                            <div className="single-row-table">
                                <div className="h-title"><h3>ANDAR-HARUF</h3></div>
                                <div className="result-row single-row">
                                    {
                                        singleRows.map((item, index) => {
                                            return (
                                                <div key={`andar_${item}`} className="l-item">
                                                    <label> {item}</label>
                                                    <input
                                                        name={`andar_${item}`}
                                                        value={andarValues[`andar_${item}`]}
                                                        onChange={onAndarValueChange}
                                                        type="textfield" />
                                                </div>
                                            )
                                        })
                                    }
                                    <div key={`andar_total`} className="l-item">
                                        <label>Total</label>
                                        <input
                                            name={`andar_total`}
                                            value={totalandar}
                                            // onChange={onAndarValueChange}
                                            type="textfield" />
                                    </div>
                                </div>
                            </div>

                            <div className="single-row-table">
                                <div className="h-title"><h3>BAHAR</h3></div>
                                <div className="result-row single-row">
                                    {
                                        singleRows.map((item, index) => {
                                            return (
                                                <div key={`bahar_${item}`} className="l-item">
                                                    <label> {item}</label>
                                                    <input
                                                        name={`bahar_${item}`}
                                                        value={baharValues[`bahar_${item}`]}
                                                        onChange={onBaharValueChange}
                                                        type="textfield" />
                                                </div>
                                            )
                                        })
                                    }
                                    <div key={`bahar_total`} className="l-item">
                                        <label>Total</label>
                                        <input
                                            name={`bahar_total`}
                                            value={totalbahar}
                                            // onChange={onBaharValueChange}
                                            type="textfield" />
                                    </div>
                                </div>
                            </div>

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
        games: state.games,
        userList: state.user.userList
    };
}

export default withRouter(connect(mapStateToProps, {})(GameBets));