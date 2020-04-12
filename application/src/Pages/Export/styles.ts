import { StyleSheet } from "react-native";
import { $dangerColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    qrContainer: {
        height: 230,
        margin: 40,
        alignItems: "center",
    },
    rememberContainer: {
        alignItems: "center",
    },
    rememberMessage: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: "regular",
        color: $dangerColor,
        paddingTop: 30,
        width: 200,
    },
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
