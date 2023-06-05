import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../data/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Navigation from "./Navigation";
//-----------------------------------------------------------------------------------------------------------------
const Root = () => {
    //---------------------------------------------------------
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);
    //--------------------------------------------------------
    useEffect(() => {
        const fetchToken = async () => {
            setIsTryingLogin(true);
            const storedToken = await AsyncStorage.getItem("token");
            setIsTryingLogin(false);

            const userId = await AsyncStorage.getItem("userId");
            if (storedToken) {
                authCtx.authenticate(storedToken, userId);
            }
            setIsTryingLogin(false);
        };
        fetchToken();
    }, []);
    //--------------------------------------------------------
    if (isTryingLogin) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //--------------------------------------------------------
    return <Navigation />;
};
//-------------------------------------------------------------------------------------------------------------------
export default Root;
