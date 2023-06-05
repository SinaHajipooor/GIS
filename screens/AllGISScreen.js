import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { AuthContext } from "../data/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/colors";
//------------------------------------------------------------------------------------------------------------------
const AllGISScreen = ({ navigation }) => {
    //--------------------------------------------------
    const authCtx = useContext(AuthContext);
    //--------------------------------------------------
    const confirmLogout = () => {
        return Alert.alert("آیا می خواهید از حساب خود خارج شوید ؟", "", [
            {
                text: "لغو",

                onPress: () => {},
                style: "cancel",
            },
            { text: "بله", onPress: authCtx.logout },
        ]);
    };
    //--------------------------------------------------
    const addGISHandler = () => {
        navigation.navigate("UserInformation");
    };
    //--------------------------------------------------

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={confirmLogout}>
                    <Ionicons name="exit-outline" size={26} color={GlobalStyles.colors.darkblue} />
                </Pressable>
            ),
            headerRight: () => (
                <Pressable onPress={addGISHandler}>
                    <Ionicons name="add" size={30} color={GlobalStyles.colors.darkblue} />
                </Pressable>
            ),
        });
    }, []);
    //--------------------------------------------------
    return (
        <View style={styles.root}>
            <Text>GIS List</Text>
        </View>
    );
};
//------------------------------------------------------------------------------------------------------------------
export default AllGISScreen;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
