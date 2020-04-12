import { StyleSheet } from "react-native";

import { $primaryColor, $gray, $dangerColor } from "../../Styles/variables";
import { $buttonPrimary, $buttonText, $buttonEmpty, $buttonTextEmpty } from "../../Styles/components";

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    title: {
        color: $primaryColor,
        fontFamily: "bold",
        textAlign: "center",
        fontSize: 26,
        width: 220,
        alignSelf: "center",
    },
    qrContainer: {
        marginTop: 20,
        alignSelf: "center",
        overflow: "hidden",
        height: 300,
        width: 300,
    },
    qrMask: {
        alignSelf: "center",
        width: 400,
        height: 500,
    },
    noCameraText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "regular",
        width: 250,
        alignSelf: "center",
        textAlign: "center",
        marginTop: 30,
    },
    actionsContainer: {
        marginTop: 60,
    },
    textDanger: {
        fontSize: 20,
        marginTop: 20,
        color: $dangerColor,
        textAlign: "center",
    },
    buttonEmpty: {
        ...$buttonEmpty,
    },
    textButtonEmpty: {
        ...$buttonTextEmpty,
    },
    button: {
        ...$buttonPrimary,
    },
    textButton: {
        ...$buttonText,
    },
});
