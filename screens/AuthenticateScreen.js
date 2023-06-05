import { View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useContext, useEffect, useState } from "react";
import Button from "../components/UI/Button";
import { AuthContext } from "../data/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { confirm } from "../util/auth";
//---------------------------------------------------------------------------------------------------------------------------
const AuthenticateScreen = ({ route }) => {
    //------------------------------------------------
    const data = route.params.data;
    const authCtx = useContext(AuthContext);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    //-------------------------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);
    //-------------------------------------------------
    const authenticateAgain = async () => {
        setMinutes(1);
        setSeconds(30);
    };
    //-------------------------------------------------
    const enterHandler = async () => {
        const userData = {
            user_id: data.user.id,
            otp_token: data.otp_token,
            req_otp_code: "11111",
        };
        setIsSubmiting(true);
        const userInfo = await confirm(userData);
        authCtx.authenticate(userInfo.token, `${userInfo.userId}`);
        setIsSubmiting(false);
    };
    //------------------------------------------------
    if (isSubmiting) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //------------------------------------------------
    return (
        <View style={styles.rootScreen}>
            <View style={styles.formCard}>
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/AuthenticateImage.png")} style={styles.image} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <View style={styles.otpContainer}>
                        <TextInput
                            style={styles.otpText}
                            value={otp}
                            keyboardType="number-pad"
                            onChangeText={(value) => {
                                setOtp(value);
                            }}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button onPress={enterHandler} style={styles.button}>
                            ورود
                        </Button>
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 15,
                                height: "30%",
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                                justifyContent: "center",
                                alignItems: "baseline",
                            }}
                        >
                            {seconds > 0 || minutes > 0 ? (
                                <Text style={{ color: GlobalStyles.colors.darkblue }}>
                                    {`زمان باقی مانده : ${seconds < 10 ? `${seconds}` : seconds} : `}
                                    {minutes < 10 ? `0${minutes}` : minutes}
                                </Text>
                            ) : (
                                <Pressable style={{ marginRight: 15 }} onPress={authenticateAgain}>
                                    <Text style={{ color: GlobalStyles.colors.darkblue }}>ارسال مجدد</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
//---------------------------------------------------------------------------------------------------------------------------

export default AuthenticateScreen;
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    formCard: {
        // marginTop: 110,
        marginBottom: 15,
        width: "80%",
        height: 450,
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 4,
        borderRadius: 15,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
    },
    imageContainer: {
        height: "48%",
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    image: {
        height: "100%",
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    otpContainer: {
        marginBottom: 50,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 30,
    },
    otpBox: {
        borderColor: "black",
        borderWidth: 0.5,
        marginHorizontal: 20,
        elevation: 4,
        borderRadius: 15,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
        borderColor: GlobalStyles.colors.gray,
    },
    otpText: {
        fontSize: 25,
        textAlign: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: GlobalStyles.colors.darkblue,
        width: "100%",
    },
    buttonsContainer: {
        marginTop: 5,
        marginBottom: 12,
        width: "100%",
        // flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        marginBottom: 20,
        width: "90%",
        backgroundColor: GlobalStyles.colors.darkblue,
        // marginRight: 50,
    },
});
