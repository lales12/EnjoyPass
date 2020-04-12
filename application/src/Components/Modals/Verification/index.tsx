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
    NoValidated,
    Validating,
    Validated,
    Error,
}

interface IProps {
    onSignChallenge: () => void;
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
        case EStates.NoValidated: {
            imageType = validatingImage;
            title = "Estamos verificando que eres tú";
            text = "Ya han leído tu código QR, sólo falta que pulses el botón para confirmar tu identidad.";
            buttonText = "Sí, soy yo";
            buttonAction = props.onSignChallenge;
            break;
        }

        case EStates.Validating: {
            imageType = validatingImage;
            title = "Estamos verificando que eres tú";
            text = "Estamos firmando la petición y enviandola para su verificación";
            buttonText = "Validando";
            break;
        }

        case EStates.Validated: {
            imageType = validImage;
            title = "¡Genial! \n Ya estás dentro";
            text = "Tu código es válido y ya puedes entrar. Esperamos que disfrutes mucho del evento. ";
            buttonText = "Gracias";
            buttonAction = props.onCloseModal;
            break;
        }
        case EStates.Error: {
            imageType = errorImage;
            title = "¡Ups! \n Algo no va bien";
            text = "Tu código no es válido. Lo sentimos. Dirígete a tu médico para validar el código.";
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
