import React, { Component } from "react";
import "./styles/Login.css";
import axios from "axios";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      goBack: false,
    };
  }

  componentDidMount() {
    try {
      if (this.props.route.params.loggedOut === "Logout") {
        localStorage.removeItem("token");
      }
      if (this.props.route.params.bookLogin === true) {
        this.setState({
          goBack: true,
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <div className="body">
        <div>
          <h1 className="title">Login</h1>
          <label htmlFor="fname" className="input">
            Username:
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="loginInput"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Email"
          />
          <label htmlFor="pw" className="input">
            Password:
          </label>
          <input
            type="password"
            id="pw"
            name="pw"
            className="loginInput"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Password"
          />
          <br />
          <br />
          <button
            className="btn btn-danger"
            icon="login"
            mode="outlined"
            onClick={async () => {
              this.setState({
                loading: true,
              });
              await axios
                .post("http://localhost:3000/login/admin", {
                  email: this.state.email,
                  password: this.state.password,
                })
                .then(async (res) => {
                  if (res.data.status === "success") {
                    alert("Successfully logged in!");
                    await localStorage.setItem("loggedIn", true);
                    this.props.history.push("/books");
                  } else {
                    alert("Incorrect email/password");
                    await localStorage.setItem("loggedIn", false);
                  }
                })
                .catch((err) => {
                  console.error(err);
                  this.setState({
                    loading: false,
                  });
                  alert(
                    "Incorrect email or password. If you are sure it is correct, please check your internet connection and retry typing."
                  );
                });
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
