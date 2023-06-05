import { Pressable, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const IconButton = ({ icon, color, onPress, style }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}>
            <FontAwesome name={icon} size={22} color={color} onPress={onPress} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        margin: 4,
        borderColor: "gray",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
});
