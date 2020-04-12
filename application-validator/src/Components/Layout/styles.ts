import { StyleSheet } from "react-native";

import { $gray } from "../../Styles/variables";

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        marginTop: 30,
        height: 100,
    },
    title: {
        fontSize: 36,
        lineHeight: 37,
        fontFamily: "bold",
        marginLeft: 10,
        color: $gray,
        width: 260,
    },
    logoContainer: {
        width: 30,
    },
    logo: {
        width: 44,
        height: 66,
        resizeMode: "contain",
    },
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
