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
    Container,
    Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { addGame, getGamesBets } from "../../redux/actions";
const GameBets = (props) => {
    const { gameBets } = props.games;
    const dispatch = useDispatch();
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
        dispatch(getGamesBets({}, (errors, res) => {
            console.log(res, "ressasd");
            let userData = []
            var values = _.cloneDeep(inputValues);
            var inside_bets = _.cloneDeep(andarValues);
            var outside_bets = _.cloneDeep(baharValues);
            res.data.forEach(element => {
                element.bets.forEach((bets) => {
                    let targetNUmber = bets.bet_number
                    bets.user_bet.forEach((userBet) => {
                        values[targetNUmber] = values[targetNUmber] ? values[targetNUmber] + userBet.bet_amount : userBet.bet_amount;
                    })

                })
                element.inside_bets.forEach((bets) => {
                    let targetNUmber = bets.bet_number
                    bets.user_bet.forEach((userBet) => {
                        inside_bets[`andar_${targetNUmber}`] = values[targetNUmber] ? values[targetNUmber] + userBet.bet_amount : userBet.bet_amount;
                    })

                })
                element.outside_bets.forEach((bets) => {
                    let targetNUmber = bets.bet_number
                    bets.user_bet.forEach((userBet) => {
                        outside_bets[`bahar_${targetNUmber}`] = values[targetNUmber] ? values[targetNUmber] + userBet.bet_amount : userBet.bet_amount;
                    })

                })
            });
            setInputValues(values);
            setAndarValues(inside_bets);
            setBaharValues(outside_bets);
            dispatch({ type: 'LOADING_SUCCESS' });
        }));
    }, []);
    useEffect(() => {
        calculateSumValues();
    }, [inputValues]);

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
    console.log(gameBets, "gameBets", inputValues, andarValues);

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
        setTotalBat(total);
        setResultValues(values);


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
        games: state.games
    };
}

export default withRouter(connect(mapStateToProps, {})(GameBets));