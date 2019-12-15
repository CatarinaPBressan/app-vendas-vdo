import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";

import { fetchUser } from "../actions/account";

export class LoginPage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="login-page">
        LoginPage
        <button onClick={this.props.fetchUser}>Fetch User</button>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user
});
const mapDispatchToProps = {
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
