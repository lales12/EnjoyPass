import { StyleSheet } from "react-native";

import { $backgroundColor, $primaryColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    logo: {
        width: 170,
        height: 200,
        resizeMode: "contain",
        marginTop: 0,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        // backgroundColor: $backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    actionsContainer: {
        height: 120,
        marginTop: 50,
    },
    baseButton: {
        width: 260,
        height: 50,
        borderRadius: 25,
        borderColor: "#fff",
    },
    whiteButton: {
        backgroundColor: "#fff",
    },
    transparentButtonText: {
        color: $primaryColor,
        fontSize: 19,
    },
    whiteButtonText: {
        color: "#fff",
        fontSize: 19,
    },
});
