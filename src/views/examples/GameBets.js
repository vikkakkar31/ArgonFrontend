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
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
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
import { getGames, getGamesBets, getUserList, getWallets } from "../../redux/actions";
const GameBets = (props) => {
    const { userList } = props;
    const { gameBets, gamesList } = props.games;
    const { walletsList } = props.wallets;
    let walletData = walletsList.filter((wallet) => {
        return wallet?.phone_number
    })
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        filterS: {
            game_id: "",
            user_id: "",
            amount: "",
            min: "",
            max: "",
            createdDate: moment(new Date()).format('YYYY-MM-DD'),
        },
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
        dispatch(getWallets({}, (errors, res) => {
            dispatch({ type: 'LOADING_SUCCESS' });
        }));
        getGameBetsData({ ...filter.filterS });
    }, []);
    const filterOptions = createFilterOptions({
        ignoreCase: false,
        ignoreAccents: false,
    });
    const getGameBetsData = (query = {}) => {
        dispatch(getGamesBets(query, (errors, res) => {
            var values = {};
            var inside_bets = {};
            var outside_bets = {};
            if (res.data.length) {
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
                            inside_bets[`andar_${targetNUmber}`] = !isNaN(inside_bets[targetNUmber]) ? inside_bets[targetNUmber] + bets.bet_amount : bets.bet_amount;
                        })
                    }
                    if (element.outside_bets.length) {
                        element.outside_bets.forEach((bets) => {
                            let targetNUmber = bets.bet_number;
                            outside_bets[`bahar_${targetNUmber}`] = !isNaN(outside_bets[targetNUmber]) ? outside_bets[targetNUmber] + bets.bet_amount : bets.bet_amount;
                        })
                    }
                });
                setInputValues(values);
                setAndarValues(inside_bets);
                setBaharValues(outside_bets);
            } else {
                setInputValues({});
                setAndarValues({});
                setBaharValues({});
            }

            dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }
    console.log(inputValues, andarValues, baharValues, "hi here");
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
        setFilter((prevState) => ({
            ...prevState,
            filterS: {
                ...filter.filterS,
                [id]: value,
            },
        }));
    };
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Dark table */}
                <Row className="mt-5">
                    <div className="col ">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="mb-0">Games Bets</h3>
                                <div className="d-flex mt-2">
                                    <InputGroup size="sm" className="w-25">
                                        <InputGroupAddon addonType="prepend" className="d-inline">
                                            <Button className="bg-default shadow"><i className="ni ni-calendar-grid-58 text-white" /></Button>
                                        </InputGroupAddon>
                                        <Input
                                            type="date"
                                            autoComplete="new-sdate"
                                            id="createdDate"
                                            placeholder="Start Date"
                                            name="createdDate"
                                            value={filter.filterS.createdDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2">
                                        <Input
                                            type="select"
                                            autoComplete="new-name"
                                            value={filter.filterS.game_id}
                                            onChange={handleChange}
                                            id="game_id"
                                            placeholder="Select Game"
                                            name="game_id"
                                            required
                                        >
                                            <option key={"select"} value={""}>Select Game</option>
                                            {gamesList && gamesList.length ?
                                                gamesList.map((list, index) => {
                                                    return (
                                                        <option key={index} value={list._id}>{list?.game_name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </Input>
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2 auto-complete-search">
                                        <Autocomplete
                                            filterOptions={filterOptions}
                                            id="wallet_id"
                                            options={walletData}
                                            value={filter.filterS.wallet_id}
                                            onChange={(option, value) => {
                                                setFilter((prevState) => ({
                                                    ...prevState,
                                                    filterS: {
                                                        ...filter.filterS,
                                                        wallet_id: value,
                                                    },
                                                }));
                                            }}
                                            renderOption={(option) => (
                                                <React.Fragment>
                                                    <Grid item xs>
                                                        {option?.user_id?.first_name + option?.user_id?.last_name}
                                                        <Typography variant="body2" color="textSecondary">
                                                            {option?.phone_number}
                                                        </Typography>
                                                    </Grid>
                                                </React.Fragment>
                                            )}
                                            // fullWidth={true}
                                            getOptionLabel={(option) => option?.phone_number}
                                            renderInput={(params) => <TextField style={{ color: "white", fontSize: '10px' }} {...params} label="Select Phone Number" variant="outlined" />}
                                        />
                                        {/* <Input
                                            type="select"
                                            autoComplete="new-name"
                                            value={filter.filterS.user_id}
                                            onChange={handleChange}
                                            id="user_id"
                                            placeholder="Select Player"
                                            name="user_id"
                                            required>
                                            <option key={"select"} value={""}>Select User</option>
                                            {userList && userList.length ?
                                                userList.map((list, index) => {
                                                    return (
                                                        <option key={index} value={list._id}>{list?.first_name + list?.last_name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </Input> */}
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2">
                                        <Input
                                            type="number"
                                            onChange={handleChange}
                                            id="amount"
                                            placeholder="Amount"
                                            name="amount"
                                            value={filter.filterS.amount}
                                        />
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2">
                                        <Input
                                            type="number"
                                            onChange={handleChange}
                                            id="min"
                                            placeholder="Min"
                                            name="min"
                                            value={filter.filterS.min}
                                        />
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2">
                                        <Input
                                            type="number"
                                            onChange={handleChange}
                                            id="max"
                                            placeholder="Max"
                                            name="max"
                                            value={filter.filterS.max}
                                        />
                                    </InputGroup>
                                    <InputGroup size="sm" className="w-25 ml-2">
                                        <Input
                                            type="Button"
                                            onClick={() => getGameBetsData({ ...filter.filterS })}
                                            className="bg-default text-white"
                                            value={"Search"}
                                        ></Input>
                                    </InputGroup>
                                </div>
                            </CardHeader>
                            <div className="col games-table">
                                <div>
                                    <div className="bet-table-container ">
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
        wallets: state.wallets,
        userList: state.user.userList
    };
}

export default withRouter(connect(mapStateToProps, {})(GameBets));