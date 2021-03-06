import React, { ReactElement, FC, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

import Button from "apsl-react-native-button";

import LayoutModal from "../Layout";

import { styles } from "./styles";
import { useCredentialsContext } from "../../../Context/CredentialProvider";
import { $primaryColor } from "../../../Styles/variables";

const validatingImage = require("../../../assets/modals/validating.png");
const validImage = require("../../../assets/modals/valid.png");
const errorImage = require("../../../assets/modals/error.png");

export enum EStates {
    Validating,
    NoValidated,
    Validated,
}

interface IProps {
    onCloseModal: () => void;
    modalState: EStates;
}

const VerificationModal: FC<IProps> = (props: IProps): ReactElement => {
    let imageType;
    let title;
    let text;
    let buttonText;
    let buttonAction;

    switch (props.modalState) {
        case EStates.Validating: {
            imageType = validatingImage;
            title = "Petición enviada";
            text = "Hemos enviado la peticion estamos esperano la respuesta";
            buttonText = "Esperando";
            break;
        }

        case EStates.Validated: {
            imageType = validImage;
            title = "Esta todo perfecto";
            text = "El usuario ha sido validado y puede acceder";
            buttonText = "Cerrar";
            buttonAction = props.onCloseModal;

            break;
        }

        case EStates.NoValidated: {
            imageType = errorImage;
            title = "¡La validacion no ha ido bien!";
            text = "El usuario no ha sido validado";
            buttonText = "Lo sentimos";
            buttonAction = props.onCloseModal;
            break;
        }
    }
    return (
        <LayoutModal>
            <View style={styles.container}>
                <Image source={imageType} style={styles.image} />

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.content}>{text}</Text>

                <Button
                    onPress={buttonAction}
                    style={{
                        ...styles.button,
                        backgroundColor: EStates.Validating == props.modalState ? "#eee" : $primaryColor,
                        borderColor: EStates.Validating == props.modalState ? "#eee" : $primaryColor,
                    }}
                    textStyle={styles.textButton}
                    disabled={EStates.Validating == props.modalState}
                >
                    {buttonText}
                </Button>
            </View>
        </LayoutModal>
    );
};

export default VerificationModal;
