import { StyleSheet } from "react-native";

import { $backgroundColor } from "../../Styles/variables";

export const styles = StyleSheet.create({
    logo: {
        width: 170,
        resizeMode: "contain",
        marginTop: 0,
    },
    container: {
        flex: 1,
        backgroundColor: $backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
});
