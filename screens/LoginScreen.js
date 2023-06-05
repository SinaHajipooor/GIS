import { View, Text, StyleSheet, Image, TextInput, Alert, Pressable } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/auth";
//----------------------------------------------------------------------------------------------------------------------------
const LoginScreen = ({ navigation }) => {
    //------------------------------------------
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    //------------------------------------------
    const [phoneNumber, setPhoneNumber] = useState("");
    const phoneNumberChangeHandler = (enteredPhoneNumber) => {
        setPhoneNumber(enteredPhoneNumber);
    };
    //------------------------------------------
    const loginHandler = async () => {
        if (phoneNumber.length == 11) {
            setIsAuthenticating(true);
            const data = await login(phoneNumber);
            setIsAuthenticating(false);
            navigation.navigate("Authenticate", { data: data });
        } else {
            Alert.alert("خطایی رخ داده است", "شماره همراه نامعتبر است");
        }
    };
    //------------------------------------------
    if (isAuthenticating) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }

    //------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.infoContainer}>
                <View style={{ height: "60%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="شماره همراه"
                        keyboardType="phone-pad"
                        onChangeText={phoneNumberChangeHandler}
                        value={phoneNumber}
                    />
                    <Pressable style={styles.buttonContainer} onPress={loginHandler}>
                        <Text style={styles.buttonText}>ورود</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/GISImage.png")} style={styles.image} />
            </View>
        </View>
    );
};

//-----------------------------------------------------------------------------------------------------------------------------
export default LoginScreen;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "90%",

        height: "25%",
        marginTop: 50,
    },
    inputContainer: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        backgroundColor: GlobalStyles.colors.background,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        marginTop: 50,
    },

    buttonContainer: {
        width: "90%",
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    imageContainer: { height: "40%", marginTop: 50 },
    image: {
        width: 370,
        height: 300,
        marginTop: 50,
    },
});
