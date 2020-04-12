import { StyleSheet } from "react-native";

import { $buttonEmpty, $buttonTextEmpty } from "../../Styles/components";
import { $gray, $primaryColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    qrContainer: {
        height: 230,
        margin: 40,
        alignItems: "center",
    },
    textAddress: {
        fontSize: 12,
        alignSelf: "center",
    },
    rememberContainer: {
        alignItems: "center",
    },
    remainDays: {
        color: $primaryColor,
        fontSize: 32,
        fontFamily: "bold",
        alignSelf: "center",
    },
    rememberMessage: {
        textAlign: "center",
        fontFamily: "regular",
        paddingTop: 30,
        width: 200,
    },
    buttonContainer: {
        alignItems: "center",
        paddingTop: 20,
    },
    eyeImage: {
        width: 25,
        marginLeft: 10,
        resizeMode: "contain",
    },
    button: {
        ...$buttonEmpty,
        width: 200,
        alignSelf: "center",
    },
    buttonText: $buttonTextEmpty,
    qrImage: {},
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "stretch",
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        backgroundColor: "#fff",
    },
});
