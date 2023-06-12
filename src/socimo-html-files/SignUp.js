import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "../css/signup.css";
import firebase from "firebase";

function SignUp() {
  let history = useHistory();

  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    name: "",
    password: "",
    phone: "",
    address: "",
    img: "",
    bio: "",
    status: true,
    loading: false,
    error: [],
    userRef: firebase.database().ref("users"),
    errorUser: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      name: formData.firstName + " " + formData.lastName,
    });
  }, [formData.firstName, formData.lastName]);

  const saveUserToDb = async (uid) => {
    const data = formData;
    try {
      const response = await axios.post(
        `https://truongxuaapp.online/api/users/sign-up?userId=${uid}`,
        data,
        
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = (e) => {
    setFormData({ ...formData, loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((createUser) => {
        console.log(createUser.user.uid);
        createUser.user
          .updateProfile({
            displayName: formData.name,
            // photoURL:`http://gravatar.com/avatar/${md5(createUser.user.email)}?d=identicon`
          })
          .then(() => {
            saveUser(createUser).then(() => {
              console.log("user save");
            });
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.message.includes("already in use")) {
          setFormData({ ...formData, errorUser: "Tài khoản đã tồn tại" });
        } else {
          setFormData({ ...formData, errorUser: "" });
        }
      });
  };

  const saveUser = (createUser) => {
    saveUserToDb(createUser.user.uid);
    return formData.userRef.child(createUser.user.uid).set({
      name: createUser.user.displayName,
      // avatar: createUser.user.photoURL
    });
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(register);
  };

  return (
    <div>
      {/* page loader */}
      <div className="theme-layout">
        <div className="authtication bluesh high-opacity">
          <div className="verticle-center">
            <div className="welcome-note">
              <div className="logo">
                <img src="images/logo.png" alt="" />
                <span>Socimo</span>
              </div>
              <h1>Welcome to Socimo</h1>
              <p>
                Socimo is a one and only plateform for the researcheres,
                students, and Acdamic people. Every one can join this plateform
                free and share his ideas and research with seniors and juniours
                comments and openions.
              </p>
            </div>
            <div
              className="bg-image"
              style={{
                backgroundImage: "url(images/resources/login-bg.png)",
              }}
            />
          </div>
        </div>
        <div className="auth-login">
          <div className="verticle-center">
            <div className="signup-form">
              <h4>
                <i className="icofont-lock" /> Singup
              </h4>
              <form className="c-form">
                <div className="row merged-10">
                  <div className="col-lg-12">
                    <h4>What type of researcher are you?</h4>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "Nhập tên", // JS only: <p>error message</p> TS only support string
                      })}
                      onChange={handleChange}
                      name="firstName"
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="error">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Nhập họ", // JS only: <p>error message</p> TS only support string
                      })}
                      onChange={handleChange}
                      name="lastName"
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <input
                      type="text"
                      {...register("email", {
                        required: "Nhập Email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        }, // JS only: <p>error message</p> TS only support string
                      })}
                      onChange={handleChange}
                      name="email"
                      placeholder="Email@"
                    />
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                    <p style={{ color: "red", marginLeft: 10 }}>
                      {formData.errorUser}
                    </p>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <input
                      type="password"
                      {...register("password", {
                        required: "Nhập mật khẩu",
                        pattern: {
                          value: /^[A-Za-z0-9]+$/,
                          message: "Mật khẩu không chứa kí tự đặc biệt",
                        },
                        minLength: {
                          value: 6,
                          message: "mật khẩu lớn hơn hoặc bằng 6 ký tự", // JS only: <p>error message</p> TS only support string
                        },
                        // JS only: <p>error message</p> TS only support string
                      })}
                      onChange={handleChange}
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="error">{errors.password.message}</p>
                    )}
                  </div>
                  {/* <div className="col-lg-6 col-sm-6 col-md-6">
                      <input
                        type="radio"
                        id="student"
                        name="acdamic"
                        defaultValue="student"
                      />
                      <label htmlFor="student">Academic Or Student</label>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                      <input
                        type="radio"
                        id="ngo"
                        name="acdamic"
                        defaultValue="ngo"
                      />
                      <label htmlFor="ngo">
                        Corporate, Govt, Or NGO Person
                      </label>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                      <input
                        type="radio"
                        id="medical"
                        name="acdamic"
                        defaultValue="medical"
                      />
                      <label htmlFor="medical">Medical</label>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                      <input
                        type="radio"
                        id="other"
                        name="acdamic"
                        defaultValue="other"
                      />
                      <label htmlFor="other">Not a Rsearcher</label>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                      <input type="text" name="company" placeholder="Institute, Company" />
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                      <input type="text" name="department" placeholder="Department" />
                    </div> */}
                  <div className="col-lg-12">
                    <input
                      type="text"
                      {...register("address", {
                        required: "Nhập địa chỉ", // JS only: <p>error message</p> TS only support string
                      })}
                      onChange={handleChange}
                      name="address"
                      placeholder="Your Position"
                    />
                    {errors.address && (
                      <p className="error">{errors.address.message}</p>
                    )}
                  </div>
                  {/* <div className="col-lg-12">
                      <div className="gender">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          defaultValue="male"
                        />
                        <label htmlFor="male">Male</label>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          defaultValue="female"
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div> */}
                  <div className="col-lg-12">
                    <div className="checkbox">
                      <input type="checkbox" id="checkbox" defaultChecked />
                      {/* <label htmlFor="checkbox">
                          <span>
                            I agree the terms of Services and acknowledge the
                            privacy policy
                          </span>
                        </label> */}
                    </div>
                    <Link to="/">
                      <button
                        onClick={handleSubmit(handleCreate)}
                        className="main-btn"
                        type="submit"
                      >
                        <i className="icofont-key" /> Signup
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
              <Link to="/">
                <p
                  className="back"
                  style={{
                    marginTop: 20,
                    fontSize: 16,
                    borderBottom: "2px solid #17a2b8",
                    paddingBottom: 5,
                    width: "max-content",
                  }}
                >
                  Quay về trang chủ
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
