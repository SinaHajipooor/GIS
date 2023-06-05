import { useContext } from "react";
import { AuthContext } from "../data/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import StackNavigator from "./StackNavigator";
//-------------------------------------------------------------------------------------------------------------
const Navigation = () => {
    const authCtx = useContext(AuthContext);
    //---------------------------------------------------------
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <StackNavigator />}
        </NavigationContainer>
    );
};

//-------------------------------------------------------------------------------------------------------------
export default Navigation;
