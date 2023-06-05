import { Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/colors";

const Button = ({ onPress, children, style }) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, style, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        borderColor: "gray",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        textAlign: "center",
        color: "white",
    },
});
