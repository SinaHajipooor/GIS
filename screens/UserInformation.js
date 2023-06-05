import { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { PlaceContext } from "../data/place-context";
//------------------------------------------------------------------------------------------------------------------------------
const UserInformation = ({ navigation }) => {
    //---------------------------------------------
    const placeCtx = useContext(PlaceContext);
    //---------------------------------------------
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [nationalNumber, setNationalNumber] = useState("");
    //---------------------------------------------
    const fistnameChangeHandler = (enteredText) => {
        setFirstname(enteredText);
    };
    const lastnameChangeHandler = (enteredText) => {
        setLastname(enteredText);
    };
    const nationalNumberChangeHandler = (enteredNumber) => {
        setNationalNumber(enteredNumber);
    };
    //---------------------------------------------
    const nextButtonHandler = () => {
        const userInfo = {
            ownerFirstName: firstname,
            ownerLastName: lastname,
            ownerNationalCode: nationalNumber,
        };
        placeCtx.addUserInformation(userInfo);
        navigation.navigate("PlaceInformation");
    };
    //---------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <View style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.counter}>
                            <Text style={styles.count}>1</Text>
                        </View>
                        <View style={styles.textsContainer}>
                            <Text style={{ fontSize: 18, color: GlobalStyles.colors.darkblue }}>مالک/ مستاجر</Text>
                            <Text style={{ fontSize: 9 }}>افزون اطلاعات شخصی</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: "15%", marginLeft: 10, justifyContent: "center" }}>
                    <Text style={{ fontSize: 12 }}>اطلاعات مالک / مستاجر را وارد کنید</Text>
                </View>
                <View style={{ height: "45%", justifyContent: "flex-start", marginLeft: 10 }}>
                    <TextInput style={styles.input} placeholder="نام" value={firstname} onChangeText={fistnameChangeHandler} />
                    <TextInput style={styles.input} placeholder=" نام خانوادگی" value={lastname} onChangeText={lastnameChangeHandler} />
                    <TextInput
                        style={styles.nationalNumberInput}
                        placeholder="کدملی"
                        keyboardType="number-pad"
                        value={nationalNumber}
                        onChangeText={nationalNumberChangeHandler}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
                    <Pressable style={styles.button} onPress={nextButtonHandler}>
                        <Text style={{ color: "white" }}>بعدی</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
//--------------------------------------------------------------------------------------------------------------------
export default UserInformation;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        width: "90%",
        height: 400,
        backgroundColor: GlobalStyles.colors.white,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
        marginBottom: 20,
    },
    titleContainer: {
        height: "25%",
    },
    counter: {
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GlobalStyles.colors.darkblue,
        marginLeft: 10,
    },
    count: {
        color: "white",
        fontSize: 20,
    },
    textsContainer: {
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },

    input: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: GlobalStyles.colors.background,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        backgroundColor: GlobalStyles.colors.white,
        width: "80%",
        marginVertical: 8,
    },
    button: {
        paddingHorizontal: 25,
        justifyContent: "center",
        marginRight: 15,
        height: "70%",
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
    },
    nationalNumberInput: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: GlobalStyles.colors.background,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        backgroundColor: GlobalStyles.colors.white,
        width: "60%",
        marginVertical: 8,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});
