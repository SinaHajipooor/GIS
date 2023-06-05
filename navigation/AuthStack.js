import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import AuthenticateScreen from "../screens/AuthenticateScreen";
//---------------------------------------------------------------------------------------------------------
const AuthStack = () => {
    //--------------------------------------
    const Stack = createNativeStackNavigator();
    //--------------------------------------
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Authenticate" component={AuthenticateScreen} options={{ animation: "slide_from_left" }} />
        </Stack.Navigator>
    );
};
//---------------------------------------------------------------------------------------------------------
export default AuthStack;
