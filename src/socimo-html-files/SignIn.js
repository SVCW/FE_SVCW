import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { userInfo } from "../redux/actions/userInfo";
import { tokenUser } from "../redux/actions/userInfo";
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup", //redirect
  signInSuccessUrl: "/home",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: "",
    loading: false,
    currentUser: {},
    token: "",
    errorUser: "",
    errorPassword: "",
  };
  jwtDecode = require("jwt-decode").default;

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  encodeToDecode = async (tokenUser) => {
    const data= {
      idToken : tokenUser,
    }
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/log-in`,data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        let decoded = this.jwtDecode(response.data);

        decoded.author = response.data;

        const infoDe = await this.findUserById(decoded.Id, response.data);

        decoded.infoDetail = infoDe;
        if (decoded.SchoolId === "") {
          decoded.infoSchool = "";
        } else {
          const schoolDe = await this.findSchoolById(
            decoded.SchoolId,
            response.data
          );
          decoded.infoSchool = schoolDe;
        }
        this.props.userInfo(decoded);
      }
    } catch (err) {
      console.error(err);
    }
  };
  encodeToDecodeEP = async (email,password) => {
    try {
      const data = {
        email: email,
        password: password
      }
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/sign-in`,data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data);
        let decoded = this.jwtDecode(response.data);
        decoded.author = response.data;

        const infoDe = await this.findUserById(decoded.Id, response.data);

        decoded.infoDetail = infoDe;
        if (decoded.SchoolId === "") {
          decoded.infoSchool = "";
        } else {
          const schoolDe = await this.findSchoolById(
            decoded.SchoolId,
            response.data
          );
          decoded.infoSchool = schoolDe;
        }
        this.props.userInfo(decoded);
      }
    } catch (err) {
      console.error(err);
    }
  };

  findUserById = async (id, token) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${id}`,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  findSchoolById = async (id, token) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schools/${id}`,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  signInWithGoogle = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async (res) => {
        let token = res.user._lat;
         this.props.tokenUser(token);
        await this.encodeToDecode(res.user._lat);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .then(() =>
        setTimeout(() => {
          this.props.history.push("/home");
        }, 3000)
      );
  };

  handleSubmit = (e, history) => {
    e.preventDefault();
    let token = "";
    if (this.isFormValid) {
      this.setState({ error: [], loading: true });
      const { email, password, error } = this.state;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signInUser) => {
          console.log(signInUser);
        })
        .then(() => {
          firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(async function (idToken) {
              token = idToken;
            })
            .then(() => {
              this.props.tokenUser(token);
            })
            .then(async () => {
              await this.encodeToDecodeEP(email,password);
            });
        })
        .then(() => {
          setTimeout(() => {
            this.props.history.push("/home");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);

          if (err.message.includes("email address")) {
            this.setState({ errorUser: "Sai Email" });
            this.setState({ errorPassword: "" });
          } else if (err.message.includes("password is invalid")) {
            this.setState({ errorPassword: "Sai mật khẩu" });
            this.setState({ errorUser: "" });
          } else {
            this.setState({
              errorUser: "Tài khoản không tồn tại vui lòng đăng ký",
            });
            this.setState({ errorPassword: "" });
          }
        });
    }
  };

  isFormValid = () => this.state.email && this.state.password;
  render() {
    const { history } = this.props;
    return (
      <div>
        {/* <div className="page-loader" id="page-loader"> */}
        {/* <div className="loader">
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
            <span className="loader-item" />
          </div> */}
        {/* </div> */}
        {/* page loader */}
        <div className="theme-layout">
          <div className="authtication bluesh high-opacity">
            <div
              className="bg-image"
              style={{ backgroundImage: "url(images/resources/login-bg3.jpg)" }}
            />
            <ul className="welcome-caro">
              <li className="welcome-box">
                <figure>
                  <img
                    style={{
                      width: 573,
                      height: 435,
                    }}
                    src="https://kyuc.net/wp-content/uploads/2015/11/nhung-bai-tho-tham-lai-truong-xua-that-xuc-dong.jpg"
                    alt=""
                  />
                </figure>

                <h4>Trường Xưa - Quay về thời cấp ba còn nhiều hoài bão</h4>
                <p>
                  Những câu chuyện chưa được nói, những tình cảm chưa được thổ
                  lộ. Tất cả sẽ có trong app Trường Xưa - Nơi biến giấc mơ không
                  thể thành có thể
                </p>
              </li>
              <li className="welcome-box">
                <figure>
                  <img
                    style={{
                      width: 573,
                      height: 435,
                    }}
                    src="https://sites.google.com/site/trianthayco2015/_/rsrc/1447331457103/tho-ca/vetruongxuathamthay/6330222761_6eb5e98f68_b.jpg?height=264&width=400"
                    alt=""
                  />
                </figure>

                <h4>
                  Trường xưa - Sống lại thời cấp 3 theo mong muốn của mỗi người
                </h4>
                <p>
                  Tại đây các bạn có thể tìm về trường cũ để ôn lại nhiều kỉ
                  niệm tuyệt vời
                </p>
              </li>
              <li className="welcome-box">
                <figure>
                  <img
                    style={{
                      width: 573,
                      height: 435,
                    }}
                    src="https://lh3.googleusercontent.com/proxy/HikYTXGpLWIbJPo9MAYM1YN9YH7tkZPyYh_hPzXGhHL7xXm7bE5m3oqLSnN5YOsDrAcKFaJ8PTceEn0kmxN2JXsSakZG4waukeT6DIWhYO68R3LaciSeMn1qQsHHImpGJh4CeSF3HtKujiU"
                    alt=""
                  />
                </figure>
                <h4>Trường Xưa - Nơi kết nối các cựu học sinh ở các trường</h4>
                <p>
                  Đây là nơi để các cựu học sinh tìm về trường cũ, tìm bạn bè
                </p>
              </li>
            </ul>
          </div>
          <div className="auth-login">
            <div className="logo">
              <img src="images/logo.png" alt="" />
              <span>Socimo</span>
            </div>
            <div className="mockup left-bottom">
              <img src="images/mockup.png" alt="" />
            </div>
            <div className="verticle-center">
              <div className="login-form">
                <h4>
                  <i className="icofont-key-hole" /> Đăng nhập
                </h4>
                <form className="c-form">
                  <input
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                  <p style={{ color: "red", marginLeft: 10 }}>
                    {this.state.errorUser}
                  </p>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    placeholder="Mật khẩu"
                  />
                  <p style={{ color: "red", marginLeft: 10 }}>
                    {this.state.errorPassword}
                  </p>
                  {/* <input type="checkbox" id="checkbox" defaultChecked />
                    <label htmlFor="checkbox">
                      <span>Remember Me</span>
                    </label> */}
                  <p
                    onClick={this.signInWithGoogle}
                    style={{
                      marginTop: 20,
                      fontSize: 16,
                      borderBottom: "2px solid #17a2b8",
                      paddingBottom: 4,
                      width: "max-content",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Đăng nhập với Google
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <div className="login-buttons">
                      <button
                        style={{
                          marginRight: 8,
                        }}
                        className="main-btn"
                        onClick={this.signInWithGoogle}
                      >
                        Đăng nhập với Google
                      </button>
                    </div> */}

                    {/* <Link to="/home"> */}
                    <button
                      style={{
                        marginLeft: 8,
                      }}
                      onClick={this.handleSubmit}
                      className="main-btn"
                    >
                      <i className="icofont-key" /> Đăng nhập
                    </button>
                  </div>

                  {/* </Link> */}
                </form>
                <Link to="/signup">
                  <p
                    style={{
                      marginTop: 20,
                      fontSize: 16,
                      borderBottom: "2px solid #17a2b8",
                      paddingBottom: 4,
                      width: "max-content",
                    }}
                  >
                    {" "}
                    Đăng ký tài khoản
                  </p>
                </Link>
              </div>
            </div>
            <div className="mockup right">
              <img src="images/star-shape.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  token: state.userReducer.token,
});
const mapDispatchToProps = (dispatch) => ({
  userInfo: (info) => dispatch(userInfo(info)),
  tokenUser: (token) => dispatch(tokenUser(token)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
