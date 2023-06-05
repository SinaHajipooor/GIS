import { Button, View, StyleSheet, Alert, Image, Text, Pressable } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus, MediaTypeOptions } from "expo-image-picker";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/colors";

const ImagePicker = ({ onTakeImage }) => {
    //-----------------------------------------------------------------
    // to store the image that we take
    const [pickedImage, setPickedImage] = useState();
    //-----------------------------------------------------------------
    // this hook gives us an array with 2 elements the first one is the camera permission information and the sexond one is a request permission function(for ios )
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    // to check if we have permission to use the camera or not
    const verifyPermissions = async () => {
        // PermissionStatus.UNDETERMINED means that we dont know yet if we have access or not
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            // granted is a property that will true if the permission has been accepted and it will false if it was rejected
            return permissionResponse.granted;
        } else if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Access denied !", "Tou need to accept camera permission to use this app ");
            return false;
        }
        return true;
    };
    //-----------------------------------------------------------------
    // to open the camera
    const takeImageHandler = async () => {
        // here we give a boolean that is true if we have the permission and false if we dont have the permission
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            // here we dont have the permission and we just return nothing . because we want to cancel the execution
            return;
        }
        // this function will open the camera and wait for us to take photo . the execution of this function will not stop until the user take the photo
        // as a prameter we can pass an object to config camera
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        // the image that we taked uri
        setPickedImage(image?.assets[0]?.uri);
        // send the image uri to the placeForm by the onTakeImage prop
        onTakeImage(image?.assets[0]?.uri);
    };

    //-----------------------------------------------------------------
    // to open gallery
    const openGalleryHandler = async () => {
        const image = await launchImageLibraryAsync({
            // allowsEditing: true,
            mediaTypes: MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        // the image picked uri
        setPickedImage(image?.assets[0]?.uri);
        // send the image uri to the placeForm by the onTakeImage prop
        onTakeImage(image?.assets[0]?.uri);
    };
    //-----------------------------------------------------------------
    // a helper variable to show the image or not
    let imagePreview = <Text>عکسی اضافه نشد</Text>;
    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }

    //-----------------------------------------------------------------

    return (
        <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.button, { marginBottom: 10 }]} onPress={takeImageHandler}>
                        <FontAwesome name="camera" size={22} color={GlobalStyles.colors.darkblue} />
                    </Pressable>
                    <Pressable style={[styles.button, { marginBottom: 10 }]} onPress={openGalleryHandler}>
                        <FontAwesome name="picture-o" size={22} color={GlobalStyles.colors.darkblue} />
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 1, marginBottom: 10, alignItems: "center", justifyContent: "center", paddingLeft: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50%" }}>
                    <View style={[styles.imagePreview]}>{imagePreview}</View>
                    <View style={styles.imagePreview}>{imagePreview}</View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50%" }}>
                    <View style={styles.imagePreview}>{imagePreview}</View>
                    <View style={styles.imagePreview}>{imagePreview}</View>
                </View>
            </View>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    // image
    imagePreview: {
        width: "45%",
        height: "90%",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 15,
        borderStyle: "dashed",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    //---------------------------------------------
    buttonsContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "80%",
    },
    button: {
        paddingHorizontal: 15,
        justifyContent: "center",
        width: "90%",
        marginLeft: 5,
        height: "40%",
        backgroundColor: GlobalStyles.colors.white,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
        marginVertical: 10,
    },
});
