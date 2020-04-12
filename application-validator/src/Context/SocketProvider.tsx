import React, { FC, ReactElement, createContext, useContext, useState, useEffect, useRef } from "react";
import SocketIO, { Socket } from "socket.io-client";
import { config } from "../config";

interface ISocketContext {
    //receiveChallenge: () => void;
    resolve: (address: string, response: string) => void;
    sendChallenge: (address: string, challenge: string) => Promise<void>;
    connect: (address: string) => void;
    addListener: (cb: TListener) => void;
    addListenerError: (cb: TListener) => void;
}

const SocketContext = createContext<ISocketContext>({
    // receiveChallenge: () => {
    //     throw new Error("Void implementation");
    // },
    resolve: () => {
        throw new Error("Void implementation");
    },
    sendChallenge: () => {
        throw new Error("Void implementation");
    },
    addListener: () => {
        throw new Error("Void implementation");
    },
    addListenerError: () => {
        throw new Error("Void implementation");
    },
    connect: (address: string) => {
        throw new Error("Void implementation");
    },
});

type TListener = (callback: Function) => void;

interface IProps {
    children: ReactElement;
}

const client = SocketIO(config.socketServer);

export const SocketProvider: FC<IProps> = (props): ReactElement => {
    const [userAddress, setUserAddress] = useState<string>("");
    const [listeners, setListeners] = useState<TListener[]>([]);
    const [listenersError, setListenersError] = useState<TListener[]>([]);

    useEffect(() => {
        const reconnect = () => {
            console.log("Try reconnect with address", userAddress);

            if (client.connected && userAddress) {
                client.emit("send-address", { address: userAddress });
                return;
            }

            setTimeout(reconnect, 5000);
        };

        client.on("response", (message: any) => {
            console.log("Te envian respuesta", message);
            let listener;
            console.log("Te envia respuesta ", listeners.length);

            for (listener of listeners) {
                listener(message);
            }
        });

        client.on("error-message", (message: any) => {
            let listener;
            console.log("error ", listeners.length);

            for (listener of listenersError) {
                listener(message);
            }
        });
        client.on("disconnect", reconnect);
    }, []);

    const connect = (address: string): void => {
        client.emit("send-address", { address: address });
        setUserAddress(address);
    };

    const sendChallenge = async (address: string, challenge = ""): Promise<void> => {
        console.log("Challenge enviado");
        await client.emit("challenge", { address, challenge });
    };

    const resolve = async (address: string, response: string) => {
        console.log("Sending response to address", address);
        await client.emit("resolve", { address, response });
    };

    const addListenerError = (callback: TListener): void => {
        listenersError.push(callback);
        setListenersError(listenersError);
    };

    const addListener = (callback: TListener): void => {
        listeners.push(callback);
        setListeners(listeners);
    };

    return (
        <SocketContext.Provider value={{ addListener, addListenerError, connect, resolve, sendChallenge }}>
            {props.children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => useContext(SocketContext);
