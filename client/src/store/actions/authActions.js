import axios from "axios";

const userRegisterAction = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_REGISTER" });

      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: response.date.token,
      });
    } catch (err) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: err.response.data,
      });
    }
  };
};

const userLoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOGIN" });

      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: response.date.token,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: err.response.data,
      });
    }
  };
};

const LoadUserAction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/users", {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({ type: "LOAD_USER", payload: response.data });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: err.response.data,
      });
    }
  };
};

export { userRegisterAction, userLoginAction };
