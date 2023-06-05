import { View, Text, Pressable, StyleSheet, FlatList, Image, Button } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useCallback, useEffect, useState, useMemo, useContext } from "react";
import LocationPicker from "../components/Form/LocationPicker";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import ImagesList from "../components/Form/ImagesList";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../data/auth-context";
import { getFormattedDate } from "../util/date";
import Place from "../models/place";
import { PlaceContext } from "../data/place-context";
//-----------------------------------------------------------------------------------------------------------------
const FurtherInformation = ({ navigation, route }) => {
    //-------------------------------------------------
    const placeCtx = useContext(PlaceContext);
    //-------------------------------------------------
    // picked Location
    const [pickedLocation, setPickedLocation] = useState();
    //-------------------------------------------------
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    });
    //-------------------------------------------------
    // call the onPickLocation prop when ever the location is picked
    useEffect(() => {
        const handleLocation = async () => {
            if (pickedLocation) {
                pickLocationHandler(pickedLocation);
            }
        };
        handleLocation();
    }, [pickedLocation, pickLocationHandler]);

    //-----------------------------------------------------
    const prevButtonHandler = () => {
        navigation.goBack();
    };
    //-----------------------------------------------------

    const [allImages, setAllImages] = useState([]);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setAllImages((prev) => {
                return [...prev, ...result.assets];
            });
        }
    };
    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setAllImages((prev) => {
                return [...prev, ...result.assets];
            });
        }
    };
    //------------------------------------------
    const savePlaceHandler = async () => {
        //         const furtherInfo = {
        //             files: allImages,
        //             point: pickedLocation,
        //         };
        //         placeCtx.addFurtherInformation(furtherInfo);
        //         const userId = AsyncStorage.getItem("userID");
        //
        //         const place = {
        //             user_id: userId,
        //             time: getFormattedDate(new Date()),
        //             files: allImages,
        //         };
        //         console.log(place);
        navigation.navigate("MapScreen");
    };
    //------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleinnerContainer}>
                        <View style={styles.counter}>
                            <Text style={styles.count}>3</Text>
                        </View>
                        <View style={styles.textsContainer}>
                            <Text style={{ fontSize: 18, color: GlobalStyles.colors.darkblue }}>اطلاعات تکمیلی</Text>
                            <Text style={{ fontSize: 9 }}>افزودن تصاویر و مختصات مربوط به مکان </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 12 }}>تصاویر و مختصات مربوط به مکان مورد نظر را وارد کنید </Text>
                </View>
                <View style={{ height: "35%", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "100%", height: "100%" }}>
                        <View style={styles.buttonsContainer}>
                            <Pressable style={[styles.buttons]} onPress={takeImage}>
                                <FontAwesome name="camera" size={22} color={GlobalStyles.colors.darkblue} />
                            </Pressable>
                            <Pressable style={[styles.buttons]} onPress={pickImage}>
                                <FontAwesome name="picture-o" size={22} color={GlobalStyles.colors.darkblue} />
                            </Pressable>
                        </View>
                        <View style={styles.imagesList}>
                            {allImages.length > 0 ? (
                                <ImagesList data={allImages} />
                            ) : (
                                <View style={styles.imagePreviewContainer}>
                                    <Text style={{ textAlign: "center" }}>عکسی اضافه نشده است</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={{ height: "25%", marginTop: 10 }}>
                    <LocationPicker onPickLocation={pickLocationHandler} />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={prevButtonHandler}>
                        <Text style={{ color: "white" }}>قبلی</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={savePlaceHandler}>
                        <Text style={{ color: "white" }}>ذخیره</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

//------------------------------------------------------------------------------------------------------------
export default FurtherInformation;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: GlobalStyles.colors.white,
    },
    titleContainer: {
        height: "10%",
        marginTop: 50,
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
    titleinnerContainer: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    count: {
        color: "white",
        fontSize: 20,
    },
    textsContainer: {
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },
    description: {
        height: "10%",
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: "center",
    },
    button: {
        paddingHorizontal: 25,
        justifyContent: "center",
        marginRight: 12,
        marginLeft: 12,
        height: "40%",
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "12%",
    },
    buttonsContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: "15%",
    },
    buttons: {
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        marginLeft: 5,
        flex: 1,
        height: "90%",
        backgroundColor: GlobalStyles.colors.white,
        elevation: 5,
        shadowColor: "blue",

        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
    },
    imagePreviewContainer: {
        borderWidth: 1,
        width: "95%",
        height: "80%",
        borderStyle: "dashed",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    imagesList: {
        flex: 1,
        // borderWidth: 1,
        // borderRadius: 10,
        // elevation: 5,
        marginTop: 10,
        // borderWidth:1,
        // backgroundColor: "white",
        // borderColor: "white",
        // shadowColor: GlobalStyles.colors.darkblue,
        justifyContent: "center",
        alignItems: "center",
    },
});
