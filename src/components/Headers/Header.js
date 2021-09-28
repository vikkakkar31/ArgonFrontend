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
import { Link, withRouter, useHistory } from "react-router-dom";
import { getTodayResult, getWallets, getTransactionHistory, getUserRequest, getGamesBets } from "../../redux/actions";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {
  const { todayResult } = props.games;
  const { walletsList } = props.wallets;
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAddLAmount, setTotalAddedAmount] = useState(0);
  const [totalWithdrwalAmount, setTotalWithdrwalAmount] = useState(0);
  const [pendingRequest, setPendingRequest] = useState(0);
  const [lastBid, setLastBid] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'LOADING_START' });
    dispatch(getTodayResult({}, (errors, res) => {
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getWallets({}, (errors, res) => {
      let total = 0;
      res.data.forEach((wallet) => {
        total = wallet.total_amount ? wallet.total_amount + total : total;
      })
      setTotalAmount(total);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getTransactionHistory({}, (errors, res) => {
      let wtotal = 0;
      let atotal = 0;
      res.data.forEach((wallet) => {
        wtotal = (wallet.amount && wallet.transaction_status === 'approved' && wallet.transaction_type === 'debit') ? wallet.amount + wtotal : wtotal;
        atotal = (wallet.amount && wallet.transaction_status === 'approved' && wallet.transaction_type === 'credit') ? wallet.amount + atotal : atotal;
      })
      setTotalAddedAmount(atotal);
      setTotalWithdrwalAmount(wtotal);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getUserRequest({}, (errors, res) => {
      let total = res.data.length + pendingRequest;
      setPendingRequest(total);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getUserRequest({ transaction_type: 'credit' }, (errors, res) => {
      let total = res.data.length + pendingRequest;
      setPendingRequest(total);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
    dispatch(getGamesBets({}, (errors, res) => {
      let lastINdex = res.data.length ? res.data[res.data.length - 1] : {};
      setLastBid(lastINdex);
      dispatch({ type: 'LOADING_SUCCESS' });
    }));
  }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Today Add Money
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalAddLAmount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        {/* <i className="fa fa-arrow-up" /> 3.48% */}
                      </span>{" "}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total withdrawal
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {totalWithdrwalAmount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        {/* <i className="fas fa-arrow-down" /> 3.48% */}
                      </span>{" "}
                      {/* <span className="text-nowrap">Since last week</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Latest Result
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{todayResult.length ? todayResult[0]?.winning_bet_number : '-'}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">{todayResult.length ? moment(todayResult[0].created_at).format("MM-DD-YYYY, h:mm a") : ''}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Amount
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalAmount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        {/* <i className="fas fa-arrow-up" /> 12% */}
                      </span>{" "}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="pt-5">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Pending Request
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{pendingRequest}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        {/* <i className="fas fa-arrow-up" /> 12% */}
                      </span>{" "}
                      {/* <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Last Commission
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Last Budding
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{todayResult.length ? todayResult[0]?.last_user_bid : '-'}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">{todayResult.length ? moment(todayResult[0].created_at).format("MM-DD-YYYY, h:mm a") : ''}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Last Winning
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{todayResult.length ? todayResult[0]?.winning_amount : 0}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">{todayResult.length ? moment(todayResult[0].created_at).format("MM-DD-YYYY, h:mm a") : '-'}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    games: state.games,
    wallets: state.wallets
  };
}

export default withRouter(connect(mapStateToProps, {})(Header));