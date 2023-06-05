import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGISScreen from "../screens/AllGISScreen";
// import FormsScreen from "../screens/FormsScreen";
import FurtherInformation from "../screens/FurtherInformation";
import Map from "../screens/Map";
import MapScreen from "../screens/MapScreen";
import PlaceInformation from "../screens/PlaceInformation";
import UserInformation from "../screens/UserInformation";
//-----------------------------------------------------------------------------------------------------------------------------
const StackNavigator = () => {
    //-------------------------------------------------------------
    const Stack = createNativeStackNavigator();
    //-------------------------------------------------------------
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center", animation: "fade" }}>
            <Stack.Screen name="AllGIS" component={AllGISScreen} options={{ title: "اطلاعات اماکن" }} />
            <Stack.Screen name="Map" component={Map} options={{ title: "نقشه" }} />
            <Stack.Screen name="UserInformation" component={UserInformation} options={{ headerShown: false }} />
            <Stack.Screen name="PlaceInformation" component={PlaceInformation} options={{ headerShown: false }} />
            <Stack.Screen name="FurtherInformation" component={FurtherInformation} options={{ headerShown: false }} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
    );
};
//-----------------------------------------------------------------------------------------------------------------------------
export default StackNavigator;
