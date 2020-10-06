const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: null,
  error: null,
  user: null,
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_LOGIN":
    case "USER_REGISTER":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
    case "USER_REGISTER_SUCCESS":
      localStorage.setItem("token", payload);

      return {
        token: payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case "USER_LOGIN_FAIL":
    case "USER_REGISTER_FAIL":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
