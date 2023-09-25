import React, { useState, useContext, createContext } from "react";
import { axios } from "../config/api";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const signup = async (username, password) => {
        try {
            return await axios.post("/auth/signup", {
                username,
                password,
            });
        } catch (err) {
            const { response } = err;
            return { message: response.data.message, error: true };
        }
    };

    const signin = async (username, password) => {
        try {
            const response = await axios.post("/auth/signin", {
                username,
                password,
            });

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
            }

            return response.data;
        } catch (err) {
            const { response } = err;
            return { message: response.data.message, error: true };
        }

    };

    const headers = () => {
        if (!user) { return {}; }
        return { 'x-access-token': user.accessToken };
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post("/auth/refresh-token", { refreshToken: user.refreshToken });
            setUser({...user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            });
            return;
        } catch (err) {
            const { response } = err;
            return { message: response.data.message, error: true };
        }
    };

    const signout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return {
        user,
        headers,
        refreshToken,
        signin,
        signout,
        signup
    };
};
