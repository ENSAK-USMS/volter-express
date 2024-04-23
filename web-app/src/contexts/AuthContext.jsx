import React, { createContext, useEffect, useReducer } from "react";
import axios from "../utils/axios";
import { setSession } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  owner: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
// console.log("i m here ");
  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");

      try {
        if (accessToken) {
          setSession(accessToken);
          console.log("i m here ", accessToken);
          const response = await axios.get("/users/me");
          console.log(response.data);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              isInitialized: true,
              user: response.data?.data?.user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        if (accessToken) {
          setSession(null);
        }
        console.log(err);

        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async ({ username, password, rememberMe }) => {
    console.log("username", username,"password", password);
    let good = true;
    const response = await axios.post("/authenticate", {
      username,
      password,
    }).then(async (res) => {
      const token = res.data.id_token;

      console.log("token", token);
  
      setSession(token);
  
      const userData = await axios.get("/account");
  
      dispatch({
        type: "LOGIN",
        payload: {
          user: userData.data,
        },
      });
    }).catch((err) => {
      console.log(err);
      // if unauthorized, log to console
      if (err.status === 401) {
        console.log("Unauthorized");
      }
      else {
        console.log("Error: ", err);
      }
      good = false;
    });
    return good;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
