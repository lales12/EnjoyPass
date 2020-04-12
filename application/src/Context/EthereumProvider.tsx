import React, { FC, ReactElement, createContext, useContext, useState } from "react";

import { Contract, providers, utils } from "ethers";
import { config } from "../config";

import EnjoyPassContract from "../assets/Contracts/EnjoyPassContract.json";

interface IEthereumContext {
    getAddressValidity: (address: string) => Promise<number>;
    validateSignature: (message: string, signedMessage: string) => Promise<boolean>;
}

interface IProps {
    children: ReactElement;
}

const DISEASE = 0;

const ethereumProvider = new providers.JsonRpcProvider(config.provider);
const EthereumContext = createContext<IEthereumContext>({
    getAddressValidity: (address: string) => {
        throw Error("Void implementation ");
    },
    validateSignature: (signature: string, signedMessage: string) => {
        throw new Error("Void implementation");
    },
});

export const EthereumProvider: FC<IProps> = (props: IProps) => {
    const [contract, setContract] = useState();

    useState(() => {
        setContract(new Contract(config.contractAddress, EnjoyPassContract.abi, ethereumProvider));
    }, []);

    const getAddressValidity = async (address: string): Promise<number> => {
        if (contract) {
            try {
                const timeStamp = await contract.getUserStamp(config.disease, address);
                const intValue = parseInt(timeStamp.toString());
                const nowValue = Date.now() / 1000;

                if (intValue && intValue > nowValue) {
                    const timeUntilExpire = intValue - nowValue;

                    return Math.trunc(timeUntilExpire / (60 * 60 * 24));
                }

                throw Error("Invalid validity");
            } catch (error) {}
        }

        return 0;
    };

    const validateSignature = async (message: string, signedMessage: string): Promise<boolean> => {
        let sig = utils.splitSignature(signedMessage);

        if (contract) {
            const valid = await contract.checkUserValidity(DISEASE, message, sig.v, sig.r, sig.s);

            if (valid) {
                return true;
            }
        }

        throw new Error("Error validating validity");
    };

    return <EthereumContext.Provider value={{ getAddressValidity, validateSignature }}>{props.children}</EthereumContext.Provider>;
};

export const useEthereumContext = () => useContext(EthereumContext);
