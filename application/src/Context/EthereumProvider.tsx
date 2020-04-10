import React, { FC, ReactElement, createContext, useContext, useState } from "react";
import { Contract, providers } from "ethers";
import { config } from "../config";
import EnjoyPassContract from "../assets/Contracts/EnjoyPassContract.json";

interface IEthereumContext {
    getAddressValidity: (address: string) => Promise<number>;
}

interface IProps {
    children: ReactElement;
}

const ethereumProvider = new providers.JsonRpcProvider(config.provider);
const EthereumContext = createContext<IEthereumContext>({
    getAddressValidity: (address: string) => {
        throw Error("Void implementation ");
    },
});

export const EthereumProvider: FC<IProps> = (props: IProps) => {
    const [contract, setContract] = useState();

    useState(() => {
        setContract(new Contract(config.contractAddress, EnjoyPassContract.abi, ethereumProvider));
    }, []);

    const getAddressValidity = async (address: string): Promise<number> => {
        console.log("Getting address validity", address);
        if (contract) {
            console.log("Pides el timestapm");

            try {
                const timeStamp = await contract.getUserValidity(config.disease, address);
                const intValue = parseInt(timeStamp.toString());
                const nowValue = Date.now();

                if (intValue && intValue > nowValue) {
                    const timeUntilExpire = intValue - nowValue;

                    return Math.trunc(timeUntilExpire / (1000 * 60 * 60 * 24));
                }

                throw Error("Invalid validity");
            } catch (error) {
                console.log("La cosa ha ido mal");
                console.log(error);
            }
        }

        return 0;
    };

    return <EthereumContext.Provider value={{ getAddressValidity }}>{props.children}</EthereumContext.Provider>;
};

export const useEthereumContext = () => useContext(EthereumContext);
