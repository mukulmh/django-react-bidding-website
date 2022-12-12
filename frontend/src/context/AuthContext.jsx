import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

let Base_URL = "http://localhost:8000/api"
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  let [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${Base_URL}/auth/login/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/profile");
    } else {
      alert(data.msg);
      console.log(data.msg);
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${Base_URL}/auth/register/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        phone: e.target.phone.value,
        fullname: e.target.fullname.value,
        password: e.target.password.value,
        // image: e.target.image.value,
      }),
    });
    let data = await response.json();
    if (response.status === 201) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/profile");
    } else {
      alert(JSON.stringify(data));
      // console.log(JSON.stringify(data))
    }
  //   try {
  //     let response = await axios({
  //       method: "post",
  //       url: "http://localhost:8000/api/auth/register/",
  //       data: {
  //         email: e.target.email.value,
  //         phone: e.target.phone.value,
  //         fullname: e.target.fullname.value,
  //         password: e.target.password.value,
  //         image: "image.png",
  //       },
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     let data = await response.data;
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     navigate("/profile");
  //   } catch (err) {
  //     if (err.response) {
  //       alert("Something went wrong!");
  //     }
  //   }
  };

  let logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logOutUser: logOutUser,
    registerUser: registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
