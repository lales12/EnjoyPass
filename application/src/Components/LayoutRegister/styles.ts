import { StyleSheet } from "react-native";

import { $primaryColor, $gray } from "../../Styles/variables";
import { $label, $input, $buttonPrimary, $buttonText, $alertText } from "../../Styles/components";

export const styles = StyleSheet.create({
    title: {
        fontSize: 31,
        marginTop: 60,
        fontFamily: "bold",
        color: $gray,
        width: 300,
    },
    backContainer: {
        width: 200,
        height: 20,
    },
    backButton: {
        paddingTop: 30,
        paddingLeft: 4,
        flexDirection: "row",
    },
    backText: {
        width: 70,
        marginLeft: 4,
        fontSize: 16,
        color: $primaryColor,
        fontFamily: "bold",
    },
    arrow: {
        fontWeight: "bold",
        fontSize: 16,
        width: 10,
        color: $gray,
    },
    container: {
        width: "100%",
        height: "100%",
        padding: 30,
        backgroundColor: "#fff",
    },
});
