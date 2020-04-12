import { StyleSheet } from "react-native";

import { $primaryColor, $gray } from "../../Styles/variables";
import { $label, $input, $buttonPrimary, $buttonText, $alertText } from "../../Styles/components";

export const styles = StyleSheet.create({
    loaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: "#fff",
        opacity: 0.6,
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    formControl: {
        marginTop: 30,
    },
    input: {
        ...$input,
        marginTop: 10,
    },
    alertText: {
        ...$alertText,
        marginTop: 4,
        marginLeft: 4,
    },
    label: $label,
    buttonText: $buttonText,
    button: $buttonPrimary,
    buttonContainer: {
        bottom: 40,
        left: 30,
        right: 30,
        position: "absolute",
    },
});
