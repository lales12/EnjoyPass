import { StyleSheet } from "react-native";

import { $gray } from "../../Styles/variables";

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        marginTop: 30,
        height: 100,
    },
    title: {
        fontSize: 31,
        fontWeight: "700",
        marginLeft: 20,
        color: $gray,
        width: 150,
    },
    logoContainer: {
        width: 30,
    },
    logo: {
        width: 40,
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
