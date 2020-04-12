import { StyleSheet } from "react-native";

import { $primaryColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    fontOptions: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
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
