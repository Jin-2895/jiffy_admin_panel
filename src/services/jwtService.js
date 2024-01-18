import axios from "axios";
// import jwtDecode from "jwt-decode";
import Utils from "./eventemitter";
import Domain from "lib/Config";
import cryptoJS from "crypto-js";

class jwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  signInAdmin = (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        // .post(`${Domain}/api/admin/login`, { email: username, password })
        .post(`${Domain}/api/user/login`, { email: username, password })
        .then((response) => {
          // if (response.data.result.user) {
          if (response.data) {
            // this.setSession(response.data.result.access_token);
            this.setSession(response.data.result.tokenInfo);
            resolve(response.data.result?.userInfo);
          } else {
            return reject(response);
          }
        })
        .catch((error) => {
          return error.response
            ? reject(error.response.data.message)
            : reject("Network Error");
        });
    });
  };

  // on refresh
  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Domain}/api/user/validate`)
        .then((response) => {
          if (response.data.result.userInfo) {
            this.setSession(response.data.result.tokenInfo);
            resolve(response.data.result.userInfo);
          } else {
            reject(JSON.stringify(response));
          }
        })
        .catch((error) => {
          reject("Validation Failed");
        });
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  decryptData = async (value) => {
    return new Promise(function (resolve, reject) {
      try {
        let bytes = cryptoJS.AES.decrypt(value, "OneTwoThreeFourPolymers");
        if (!bytes) throw `Cannot Decrypt Value '${value}'`;
        let originalText = bytes.toString(cryptoJS.enc.Utf8);
        if (!originalText) throw `Cannot Decrypt Value '${value}'`;
        resolve(originalText);
      } catch (e) {
        reject(e);
      }
    });
  };

  isAuthTokenValid = async (access_token) => {
    if (!access_token) {
      return false;
    }

    let decoded = await this.decryptData(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;
