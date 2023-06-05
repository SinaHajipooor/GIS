import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

// to display full screen map
const Map = ({ navigation, route }) => {
    //--------------------------------------------------------------------
    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
    };
    //--------------------------------------------------------------------
    // wil use this state to add a marker
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    //--------------------------------------------------------------------
    // to identify the region
    const region = {
        //  lat and lng will define the center of the map
        latitude: initialLocation ? initialLocation.lat : 32.8733,
        longitude: initialLocation ? initialLocation.lng : 59.2163,
        // Delta will define how much content besides the center of the map will be visible ( these are used to set the zoom level of the map )
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    //--------------------------------------------------------------------
    // when we press on the map
    const selectLocationHandler = (event) => {
        // to avoid moving the marker by user we came from detail screen . (we have initial location just in detail screen so we can use it to check )
        if (initialLocation) {
            return;
        }
        // get the lat
        const lat = event.nativeEvent.coordinate.latitude;
        // get the lng
        const lng = event.nativeEvent.coordinate.longitude;

        // select location
        setSelectedLocation({ lat: lat, lng: lng });
    };
    //------------------------- -------------------------------------------
    // save and confirm a location
    // useCallback hook is use to  sure that the function is not recreated unnecessarily . the first prameter that we pass into this hook is our function and second prameter is the dependency array
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No Location picked ! ", "You have to pick a location first");
            // we   shouldnt continue ther execution in this case
            return;
        }
        navigation.navigate("FurtherInformation", { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng });
    }, [navigation, selectedLocation]);
    //------------------------- -------------------------------------------
    // we use this hook because we want to run some code when this component is rendered for the first time
    // to add a save button in the header of this component and
    useLayoutEffect(() => {
        // remove save button when the user come to map from details screen
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />,
        });
    }, [navigation, savePickedLocationHandler, initialLocation]);
    //------------------------- -------------------------------------------

    // MapView is a built-in component by react-native-maps to show the map
    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
