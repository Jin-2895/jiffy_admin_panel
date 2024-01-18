import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "./store/actions";
import { bindActionCreators } from "redux";
import jwtService from "services/jwtService";

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on("onAutoLogin", () => {
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.setUserData(user);
            this.props.SetLogin();

            resolve();
          })
          .catch((error) => {
            this.props.logout();
            resolve();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
        }

        this.props.logout();

        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  render() {
    return (
      <>
        {this.state.waitAuthCheck ? (
          ""
        ) : (
          <React.Fragment children={this.props.children} />
        )}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      SetLogin: userActions.SetLogin,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
