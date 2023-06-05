import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Text, ImageBackground, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";

const ImagesList = ({ data }) => {
    const renderImage = (itemData) => {
        const item = itemData.item;
        return (
            <View style={styles.imageContainer}>
                <ImageBackground style={{ width: 170, height: "100%", borderRadius: 12 }} source={{ uri: item.uri }} imageStyle={styles.image}>
                    <LinearGradient colors={["#00000000", "#00000000", "#000"]} style={styles.linear}></LinearGradient>
                </ImageBackground>
            </View>
        );
    };

    return (
        <View style={styles.listContainer}>
            <FlatList data={data} horizontal={true} renderItem={renderImage} style={{ flex: 1 }} />
        </View>
    );
};

export default ImagesList;

const styles = StyleSheet.create({
    imageContainer: {
        marginHorizontal: 5,
        borderRadius: 12,
        //   borderWidth: 1,
        height: "80%",
        marginVertical: 10,
    },
    image: {
        borderRadius: 12,
        width: "100%",
        height: "100%",
    },
    linear: {
        height: "100%",
        width: "100%",
        borderRadius: 12,
    },
    listContainer: {
        // borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
