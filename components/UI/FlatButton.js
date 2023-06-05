import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";

const FlatButton = ({ children, onPress, style }) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, style, pressed && styles.pressed]} onPress={onPress}>
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
};

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: "center",
        color: GlobalStyles.colors.orange,
    },
});
