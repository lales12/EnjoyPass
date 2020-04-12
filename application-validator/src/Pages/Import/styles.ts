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
        textAlign: "center",
        fontSize: 26,
        width: 220,
        alignSelf: "center",
    },
    qrContainer: {
        marginTop: 20,
        alignSelf: "center",
        overflow: "hidden",
        height: 350,
        width: 350,
    },
    qrMask: {
        width: 400,
        height: 500,
    },
    actionsContainer: {
        position: "absolute",
        height: 100,
        bottom: 130,
        width: "100%",

        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
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
