import { View, StyleSheet, Alert, Image, Pressable, Text } from "react-native";
// import OutlinedButton from "../UI/OutlinedButton";
import IconButton from "../UI/IconButton";
// import { Colors } from "../../constants/colors";
import { GlobalStyles } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
// we have two ways of locating user
// 1- locating use by GPS
// 2- allowing the user to pick a location on a map
const LocationPicker = ({ onPickLocation }) => {
    //-------------------------------------------------------------------
    // to check if we have a picked Location or not
    const [pickedLocation, setPickedLocation] = useState();
    //-------------------------------------------------------------------
    // this hook will returns a boolean(it will be true if the component is focuse and false if it is not )
    const isFocused = useIsFocused();
    //-------------------------------------------------------------------

    // to access the navigation obj
    const navigation = useNavigation();

    // to access the data that we passed to this screen
    const route = useRoute();
    //-------------------------------------------------------------------

    // this hook gives us an array with 2 elements . the first element is the locationPermissionInformation and the second element is the request permission function
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    // to show the preview of the picked location
    useEffect(() => {
        if (isFocused && route.params) {
            // get the prameter that we sent to this comnponent (pickedLocation)
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);
    //--------------------------------------------------------------------
    // call the onPickLocation prop when ever the location is picked
    useEffect(() => {
        const handleLocation = async () => {
            if (pickedLocation) {
                // const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation(pickedLocation);
            }
        };
        handleLocation();
    }, [pickedLocation, onPickLocation]);
    //--------------------------------------------------------------------
    // to check if we have the permission to use location or not
    const verifyPermissions = async () => {
        // the same logic as what we had in imagePicker
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Access Denied", "You need to grant location permissions to use this app");
        }
        return false;
    };
    //-------------------------------------------------------------------
    //
    //     // to locate the user
    //     const getLocationHandler = async () => {
    //         // check if we have the permission or not
    //         const hasPermission = await verifyPermissions();
    //         // stop the execution if we dont have the permission
    //         if (!hasPermission) {
    //             return;
    //         }
    //         // give us the current position of the user . we get back the location obj from this function . we can pass an object to this function to have some configuration
    //         const location = await getCurrentPositionAsync();
    //         // set the picked location
    //         setPickedLocation({
    //             lat: location.coords.latitude,
    //             lng: location.coords.longitude,
    //         });
    //     };
    //-------------------------------------------------------------------
    // to open the map and allowing the user to picking a location
    const pickOnMapHandler = () => {
        // open the map screen
        navigation.navigate("Map");
    };
    //-------------------------------------------------------------------
    // helper variable to show a text if we dont have any location
    let locationPreview = <Text>مختصات وارد نشده است !</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={[styles.image, { borderWidth: 1 }]}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }
    //-------------------------------------------------------------------

    return (
        <View style={{ flex: 1, flexDirection: "row", height: "100%" }}>
            <View style={{ height: "100%", width: "18%", alignItems: "center" }}>
                <Pressable
                    style={[
                        styles.locationButton,
                        {
                            height: "90%",
                            justifyContent: "center",
                            width: "90%",
                        },
                    ]}
                    onPress={pickOnMapHandler}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: GlobalStyles.colors.darkblue,
                        }}
                    >
                        نقشه
                    </Text>
                    <IconButton icon="map-marker" color={GlobalStyles.colors.darkblue} />
                </Pressable>
            </View>
            <View style={styles.locationPreview}>{locationPreview}</View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    // map
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        backgroundColor: GlobalStyles.colors.white,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    // map preview image
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },

    // buttons
    actions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    address: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "95%",
        // borderWidth: 1,
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        height: "90%",
        width: "80%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    locationButton: {
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        // flex: 1,
        width: "90%",
        marginLeft: 5,
        borderRadius: 10,
        elevation: 5,
        // shadowColor: GlobalStyles.colors.darkblue,
        shadowColor: "blue",

        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
    },
    locationPreview: {
        justifyContent: "center",
        flex: 1,
        // borderWidth: 1,
        height: "90%",
        marginLeft: 12,
        marginRight: 8,
        alignItems: "center",
        borderRadius: 15,
        // borderStyle: "dashed",
        // borderWidth: 1,
        backgroundColor: GlobalStyles.colors.white,
        elevation: 5,
        shadowColor: "blue",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        // borderColor: GlobalStyles.colors.darkblue,
        backgroundColor: GlobalStyles.colors.white,
    },
});
