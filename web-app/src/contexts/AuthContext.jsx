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

  const login = async ({ email, password, rememberMe }) => {
    const response = await axios.post("/users/authenticate", {
      email,
      password,
    }).then(async (res) => {
      const token = res.data.token;
  
      setSession(token);
  
      const userData = await axios.get("/users/me");
  
      dispatch({
        type: "LOGIN",
        payload: {
          user: userData.data,
        },
      });
    }).catch((err) => {
      console.log(err);
      // if unauthorized, log to console
      if (err.error.statusCode === 401) {
        console.log("Unauthorized");
      }
    });

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
