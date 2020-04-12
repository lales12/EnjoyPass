import { StyleSheet } from "react-native";

import { $primaryColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    fontOption: {
        fontFamily: "bold",
        fontSize: 20,
    },
    fontOptions: {
        fontFamily: "regular",
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    plusSign: {
        fontSize: 24,
    },
    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
    },
    options: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: $primaryColor,
    },
});
