import React, { FC, ReactElement, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import "ethers/dist/shims.js";

import { Wallet } from "ethers";

interface ICredentialsContext {
    getPublicKey: () => Promise<string>;
    getPrivateKey: () => Promise<string>;
    setCredentials: (passphrase: string) => void;
    generateCredentials: (passphrase: string) => void;
}

const PRIVATE_KEY = "privateKey";

const CredentialsContext = createContext<ICredentialsContext>({
    getPublicKey: () => {
        throw new Error("Void implementation");
    },
    getPrivateKey: () => {
        throw new Error("Void implementation");
    },
    setCredentials: (passphrase: string) => {
        throw new Error("Void implementation");
    },
    generateCredentials: (passphrase: string) => {
        throw new Error("Void implementation");
    },
});

interface IProps {
    children: ReactElement;
}

export const CredentialsProvider: FC<IProps> = (props): ReactElement => {
    const getPublicKey = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            SecureStore.getItemAsync(PRIVATE_KEY)
                .then((privateKey) => {
                    if (privateKey) {
                        const wallet = new Wallet(privateKey);

                        resolve(wallet.address);
                    }
                })
                .catch(() => reject("No stored credentials"));
        });
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

    const setCredentials = () => {
        console.log("setting credentials");
    };

    const generateCredentials = async (passphrase: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const wallet = Wallet.createRandom(Date.now);

            SecureStore.setItemAsync(PRIVATE_KEY, wallet.privateKey).then(() => {
                console.log("stored");
                resolve();
            });
        });
    };
    return (
        <CredentialsContext.Provider value={{ setCredentials, getPublicKey, getPrivateKey, generateCredentials }}>
            {props.children}
        </CredentialsContext.Provider>
    );
};

export const useCredentialsContext = () => useContext(CredentialsContext);
