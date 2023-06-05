import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { GlobalStyles } from "../../constants/colors";
import { StyleSheet, View } from "react-native";

const SelectOptions = ({ placeholder, style, data }) => {
    const [selected, setSelected] = useState("");

    const options = data;

    return (
        <View style={style}>
            <SelectList
                boxStyles={styles.input}
                searchPlaceholder="جستجو"
                setSelected={(val) => setSelected(val)}
                data={options}
                save="value"
                placeholder={placeholder}
                notFoundText="یافت نشد"
                dropdownStyles={styles.input}
            />
        </View>
    );
};

export default SelectOptions;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0,
    },
});
