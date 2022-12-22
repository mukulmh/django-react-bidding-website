import { createContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

let Base_URL = "http://127.0.0.1:8000/api";
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

  // let loginUser = async (user) => {
  //   let response = await fetch(`${Base_URL}/auth/login/`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   let data = await response.json();
  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     // navigate("/profile");
  //   } else {
  //     alert(data.msg);
  //     console.log(data.msg);
  //   }
  //   return response;
  // };
  let loginUser = async (user) => {
    let response = await axios
      .post(`${Base_URL}/auth/login/`, user, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        return response;
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response.data.msg);
        return error.response;
      });
    return response;
  };

  let registerUser = async (state) => {
    let form_data = new FormData();
    form_data.append("email", state.email);
    form_data.append("phone", state.phone);
    form_data.append("password", state.password);
    form_data.append("fullname", state.fullname);
    form_data.append("image", state.image, state.image.name);
    let url = `${Base_URL}/auth/register/`;
    // try {
    //   let response = await axios.post(url, form_data, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   });

    //   if (response.status === 201) {
    //     setAuthTokens(response.data);
    //     setUser(jwt_decode(response.data.access));
    //     localStorage.setItem("authTokens", JSON.stringify(response.data));
    //     // navigate("/profile");
    //   }
    //   return response;
    // } catch (err) {
    //   console.log(err.response);
    //   alert(JSON.stringify(err.response));
    //   return err.response;
    // }
    let response = await axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        return response;
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response.data.msg);
        return error.response;
      });
    return response;
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
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    authTokens: authTokens,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
