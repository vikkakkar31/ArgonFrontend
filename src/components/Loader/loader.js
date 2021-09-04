import React, { Component } from "react";
import { Loader } from "react-loaders";
import { connect } from "react-redux";

import "./loader.css";

class RenderLoader extends Component {
  render() {
    const { showLoader, checked, search, chat } = this.props;
    //console.log((!showLoader || !checked), !showLoader, !checked)
    // if (!showLoader || !checked){
    //   return null;
    // }
    //add search condition to temporarily disable loader when user is typing/searching
    if (!showLoader || !checked || search || chat) {
      return null;
    }

    return (
      <div className="loader-overlay">
        <Loader type="ball-scale-multiple" active color={'linear-gradient(87deg, #11cdef 0, #1171ef 100%)'} />
      </div>
    );
  }
}

const mapStateToProps = ({ loader, session, search, posts }) => {
  return {
    showLoader: loader.load,
    checked: session.checked,
  };
};

export default connect(mapStateToProps)(RenderLoader);
