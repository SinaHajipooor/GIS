import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/colors";

const Input = ({ label, keyboardType, secure, onUpdateValue, value, style, isInvalid }) => {
    return (
        <View style={styles.inputContainer}>
            {/* <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text> */}
            <TextInput
                style={[styles.input, style, isInvalid && styles.inputInvalid]}
                autoCapitalize={false}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
                placeholder={label}
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: "black",
        marginBottom: 4,
    },
    labelInvalid: {
        color: GlobalStyles.colors.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderColor: "gray",
        backgroundColor: GlobalStyles.colors.white,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    inputInvalid: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});
