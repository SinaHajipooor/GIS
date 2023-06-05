import { View, ScrollView, TextInput, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { GlobalStyles } from "../constants/colors";
import { getAllStates, getCities } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Tags from "react-native-tags";
import { useState, useEffect, useContext } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { PlaceContext } from "../data/place-context";
//------------------------------------------------------------------------------------------------------------------------------------------------
const PlaceInformation = ({ navigation, route }) => {
    //-------------------------------------------------
    const placeCtx = useContext(PlaceContext);
    //-------------------------------------------------
    const [isLoading, setIsLoading] = useState(false);
    // all the states
    const [states, setStates] = useState([]);
    // all the cities of one state
    const [cities, setCities] = useState([]);
    //-------------------------------------------------
    const [selectedState, setSelectedState] = useState(); // ostan
    const [selectedCity, setSelectedCity] = useState(); // shahr
    const [selectedPropertyType, setSelectedPropertyType] = useState(); //  noe melk
    const [selectedUsageType, setSelectedUsageType] = useState(); // noe karbari
    const [phones, setPhones] = useState([]);
    // other inputs
    const [inputs, setInputs] = useState({
        mainStreet: "", // khiabane asli
        byStreet: "", // khiabane faree
        lane: "", // kooche
        floor: "", // tabaqe
        unit: "", // vahed
        plate: "", // pelak
        gas_counter_number: "",
        electric_counter_number: "",
        water_counter_number: "",
        postal_code: "",
    });
    const inputsChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    };
    //-------------------------------------------------
    // property types
    const propertyTypes = [
        { key: "1", value: "زمین" },
        { key: "2", value: "ساختمان" },
        { key: "3", value: "مجتمع" },
    ];
    // useage types
    const usageTypes = [
        { key: "1", value: "تجاری" },
        { key: "1", value: "مسکونی" },
        { key: "1", value: "اداری" },
    ];
    // get states and cities
    useEffect(() => {
        const getStates = async () => {
            const states = await getAllStates();
            let newArray = states?.map((item) => {
                return { key: item.id, value: item.name };
            });
            setStates(newArray);
        };
        getStates();
        if (selectedState) {
            const getAllCities = async () => {
                const cities = await getCities(selectedState);
                let newArray = cities.cities.map((item) => {
                    return { key: item.id, value: item.name };
                });
                setCities(newArray);
            };
            getAllCities();
        }
    }, [selectedState, selectedCity]);
    //-------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    //-------------------------------------------------
    const nextButtonHandler = () => {
        const placeInfo = {
            state: selectedState,
            city: selectedCity,
            mainStreet: inputs.mainStreet,
            byStreet: inputs.byStreet,
            lane: inputs.lane,
            floor: inputs.floor,
            unit: inputs.unit,
            plate: inputs.plate,
            gas_counter_number: inputs.gas_counter_number,
            electric_counter_number: inputs.electric_counter_number,
            water_counter_number: inputs.water_counter_number,
            propertyType: selectedPropertyType,
            usageType: selectedUsageType,
            postal_code: inputs.postal_code,
            phones: phones,
        };
        placeCtx.addPlaceInformation(placeInfo);
        navigation.navigate("FurtherInformation");
    };
    const prevButtonHandler = () => {
        navigation.goBack();
    };
    //-------------------------------------------------

    return (
        // <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-start", borderWidth: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <View style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.counter}>
                            <Text style={styles.count}>2</Text>
                        </View>
                        <View style={styles.textsContainer}>
                            <Text style={{ fontSize: 18, color: GlobalStyles.colors.darkblue }}>اطلاعات ملک</Text>
                            <Text style={{ fontSize: 9 }}>افزون اطلاعات مربوط به مکان</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: "10%", justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, marginLeft: 10 }}>اطلاعات مربوط به مکان مورد نظر را وارد کنید</Text>
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginTop: 10 }}>
                    <View style={{ width: "50%" }}>
                        <SelectList boxStyles={styles.input} searchPlaceholder="جستجو" setSelected={(val) => setSelectedState(val)} data={states} save="value" placeholder="استان" notFoundText="یافت نشد" dropdownStyles={styles.input} />
                    </View>
                    <View style={{ width: "46%", marginLeft: 10 }}>
                        <SelectList boxStyles={styles.input} searchPlaceholder="جستجو" setSelected={(val) => setSelectedCity(val)} data={cities} save="value" placeholder="شهرستان" notFoundText="یافت نشد" dropdownStyles={styles.input} />
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginTop: 35 }}>
                    <TextInput style={[{ width: "35%", marginRight: 5 }, styles.input]} placeholder="خیابان اصلی" onChangeText={inputsChangeHandler.bind(this, "mainStreet")} value={inputs.mainStreet} />
                    <TextInput style={[{ width: "35%", marginRight: 5, marginLeft: 1 }, styles.input]} placeholder="خیابان فرعی" onChangeText={inputsChangeHandler.bind(this, "byStreet")} value={inputs.byStreet} />
                    <TextInput style={[{ width: "25%" }, styles.input]} placeholder="کوچه" keyboardType="number-pad" onChangeText={inputsChangeHandler.bind(this, "lane")} value={inputs.lane} />
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginTop: 35 }}>
                    <TextInput style={[{ width: "35%", marginRight: 5 }, styles.input]} placeholder="طبقه" onChangeText={inputsChangeHandler.bind(this, "floor")} value={inputs.floor} />
                    <TextInput style={[{ width: "35%", marginRight: 5, marginLeft: 1 }, styles.input]} placeholder="واحد" onChangeText={inputsChangeHandler.bind(this, "unit")} value={inputs.unit} />
                    <TextInput style={[{ width: "25%" }, styles.input]} placeholder="پلاک" keyboardType="number-pad" onChangeText={inputsChangeHandler.bind(this, "plate")} value={inputs.plate} />
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginTop: 35 }}>
                    <TextInput style={[{ width: "32%", marginRight: 5 }, styles.input]} placeholder="کنتور گاز" keyboardType="number-pad" onChangeText={inputsChangeHandler.bind(this, "gas_counter_number")} value={inputs.gas_counter_number} />
                    <TextInput style={[{ width: "32%", marginRight: 5, marginLeft: 1 }, styles.input]} placeholder="کنتور برق" keyboardType="number-pad" onChangeText={inputsChangeHandler.bind(this, "electric_counter_number")} value={inputs.electric_Counter_number} />
                    <TextInput style={[{ width: "32%" }, styles.input]} placeholder="کنتورآب" keyboardType="number-pad" onChangeText={inputsChangeHandler.bind(this, "water_counter_number")} value={inputs.water_counter_number} />
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginTop: 35 }}>
                    <View style={{ width: "45%" }}>
                        <SelectList boxStyles={styles.input} searchPlaceholder="جستجو" setSelected={(val) => setSelectedPropertyType(val)} data={propertyTypes} save="value" placeholder="نوع ملک" notFoundText="یافت نشد" dropdownStyles={styles.input} />
                    </View>
                    <View style={{ width: "50%", marginLeft: 15 }}>
                        <SelectList boxStyles={styles.input} searchPlaceholder="جستجو" setSelected={(val) => setSelectedUsageType(val)} data={usageTypes} save="value" placeholder="نوع کاربری" notFoundText="یافت نشد" dropdownStyles={styles.input} />
                    </View>
                </View>
                <Text style={{ fontSize: 10, marginLeft: 190, marginTop: 40, color: "gray" }}>شماره تلفن</Text>
                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                    <View style={{ width: "40%", marginRight: 5, marginLeft: 5 }}>
                        <TextInput
                            style={{
                                width: "100%",
                                paddingHorizontal: 6,
                                paddingVertical: 6,
                                borderRadius: 12,
                                elevation: 5,
                                shadowColor: GlobalStyles.colors.darkblue,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.3,
                                backgroundColor: "white",
                                borderWidth: 0.5,
                                borderColor: GlobalStyles.colors.background,
                            }}
                            placeholder="کدپستی"
                            keyboardType="number-pad"
                            onChangeText={inputsChangeHandler.bind(this, "postal_code")}
                            value={inputs.postal_code}
                        />
                    </View>
                    <View style={{ width: "55%", marginRight: 5, marginLeft: 5, justifyContent: "center" }}>
                        <Tags onChangeTags={(tags) => setPhones(tags)} maxNumberOfTags={3} inputContainerStyle={styles.input} inputStyle={{ backgroundColor: "white" }} />
                    </View>
                </View>
                <View style={{ flexDirection: "row", height: "10%", marginTop: 100, justifyContent: "space-between" }}>
                    <Pressable style={styles.button} onPress={prevButtonHandler}>
                        <Text style={{ color: "white" }}>قبلی</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={nextButtonHandler}>
                        <Text style={{ color: "white" }}>بعدی</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};
//------------------------------------------------------------------------------------------------------------------------------------------------
export default PlaceInformation;
const styles = StyleSheet.create({
    formContainer: {
        // flex: 1,
        backgroundColor: GlobalStyles.colors.white,
        padding: 8,
        overflow: "hidden",
        borderWidth: 1,
        height: "100%",
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
        marginLeft: 6,
    },
    count: {
        color: "white",
        fontSize: 20,
    },
    textsContainer: {
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },
    input: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.background,
    },
    button: {
        paddingHorizontal: 25,
        justifyContent: "center",
        marginRight: 5,
        marginLeft: 5,
        height: "50%",
        backgroundColor: GlobalStyles.colors.darkblue,
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkblue,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        borderRadius: 10,
    },
});
