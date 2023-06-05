import { Text, StyleSheet, View } from "react-native";

const Title = ({ children, style }) => {
    return (
        <View style={style}>
            <Text style={styles.title}>{children}</Text>
        </View>
    );
};
export default Title;

const styles = StyleSheet.create({
    title: {
        color: "gray",
        textAlign: "center",
        fontWeight: "bold",
        // fontSize: 22,s
    },
});
