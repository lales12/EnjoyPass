import React, { FC, ReactElement, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import "ethers/dist/shims.js";

import { Wallet } from "ethers";

interface ICredentialsContext {
    getPublicKey: () => Promise<string>;
    deleteKey: () => Promise<void>;
    getPrivateKey: () => Promise<string>;
    importCredentials: (privateKey: string) => Promise<string>;
    generateCredentials: (passphrase: string) => Promise<string>;
    signChallenge: (challenge: string) => Promise<string>;
}

const PRIVATE_KEY = "privateKey";

const CredentialsContext = createContext<ICredentialsContext>({
    getPublicKey: () => {
        throw new Error("Void implementation");
    },
    deleteKey: () => {
        throw new Error("Void implementation");
    },
    getPrivateKey: () => {
        throw new Error("Void implementation");
    },
    importCredentials: (privateKey: string) => {
        throw new Error("Void implementation");
    },
    generateCredentials: (passphrase: string) => {
        throw new Error("Void implementation");
    },
    signChallenge: (challenge: string) => {
        throw new Error("Void implementation");
    },
});

interface IProps {
    children: ReactElement;
}

export const CredentialsProvider: FC<IProps> = (props): ReactElement => {
    const getPublicKey = async (): Promise<string> => {
        const privateKey = await SecureStore.getItemAsync(PRIVATE_KEY);
        if (privateKey) {
            const wallet = new Wallet(privateKey);

            return wallet.address;
        }

        throw new Error("Empty credentials");
    };

    const deleteKey = async (): Promise<void> => {
        await SecureStore.deleteItemAsync(PRIVATE_KEY);
    };

    const getPrivateKey = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            SecureStore.getItemAsync(PRIVATE_KEY)
                .then((privateKey) => {
                    if (privateKey) {
                        return resolve(privateKey);
                    }

                    reject("This account dont have credentials");
                })
                .catch(() => reject("No stored credentials"));
        });
    };

    const importCredentials = async (privateKey: string): Promise<string> => {
        const wallet = new Wallet(privateKey);

        await SecureStore.setItemAsync(PRIVATE_KEY, privateKey);

        return wallet.address;
    };

    const signChallenge = async (challenge: string): Promise<string> => {
        const privateKey = await SecureStore.getItemAsync(PRIVATE_KEY);

        if (privateKey) {
            const wallet = new Wallet(privateKey);

            return wallet.signMessage(challenge);
        }

        throw new Error("Error retrieving private key to sign");
    };

    const generateCredentials = async (passphrase: string): Promise<string> => {
        const wallet = Wallet.createRandom(Date.now);

        await SecureStore.setItemAsync(PRIVATE_KEY, wallet.privateKey);

        return wallet.address;
    };

    return (
        <CredentialsContext.Provider
            value={{
                importCredentials,
                getPublicKey,
                getPrivateKey,
                generateCredentials,
                signChallenge,
                deleteKey,
            }}
        >
            {props.children}
        </CredentialsContext.Provider>
    );
};

export const useCredentialsContext = () => useContext(CredentialsContext);
