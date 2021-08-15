import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
// import ReduxToastr from 'react-redux-toastr';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };

  }
  render() {
    const { authenticated, checked, user ,location : {pathname} } = this.props;
    return (
      <React.Fragment>
         {/* <ReduxToastr
          timeOut={4000}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
           /> */}
        {/* <PageLoader isLoaded={this.props.isLoaded} /> */}
        <Switch>
          {authenticated && checked && 
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
              <Redirect from="/" to="/admin/index" />
            </Switch>
          }
          {!authenticated && checked &&
            <Switch>
              <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
              <Redirect from="/" to="/auth/login" />
            </Switch>
          }
        </Switch>
        {/* {appRoutes(authenticated, checked, user,pathname)} */}
      </React.Fragment>
    );
  }
};

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired,
};

function mapStateToProps({ session, networkReducer, loader }) {
  return {
    checked: session.checked,
    authenticated: session.authenticated,
    user: session.user,
    // isLoaded: loader.load
  };
}
export default withRouter(connect(mapStateToProps)(App));