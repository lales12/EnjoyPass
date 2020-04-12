import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fadeContainer: {
        zIndex: 10,
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    fade: {
        backgroundColor: "#000",
        opacity: 0.5,
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    modal: {
        borderRadius: 20,
        padding: 30,
        alignSelf: "center",
        width: 300,
        backgroundColor: "#fff",
        zIndex: 30,
    },
});
