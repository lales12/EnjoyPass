import React, { ReactElement, FC } from "react";
import { View } from "react-native";

import { styles } from "./styles";

interface IProps {
    children: ReactElement;
}

const LayoutModal: FC<IProps> = (props: IProps): ReactElement => {
    return (
        <View style={styles.fadeContainer}>
            <View style={styles.modal}>{props.children}</View>

            <View style={styles.fade}></View>
        </View>
    );
};

export default LayoutModal;
