import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
//---------------------------------------------------------------------------------------------------
export const AuthContext = createContext({
    token: "",
    userId: null,
    isAuthenticated: false,

    authenticate: (token, userId) => {},

    logout: () => {},
});
//---------------------------------------------
const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [userId, setUserId] = useState();
    const authenticate = (token, userId) => {
        setAuthToken(token);
        setUserId(userId);
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userId", userId);
    };

    const logout = () => {
        setAuthToken(null);
        setUserId(null);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
    };

    const value = {
        token: authToken,
        userId: userId,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//---------------------------------------------------------------------------------------------------

export default AuthContextProvider;
