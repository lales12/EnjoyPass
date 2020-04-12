import { SocketConnection } from "./SocketConnection";
import { Socket } from "socket.io";
interface IResponse {
    address: string;
    response: string;
}

interface IChallenge {
    address: string;
    challenge: string;
}

type DisconnectCallbackFunction = () => void;
type MessageCallbackFunction = (address: any) => void;
type ResponseCallbackFunction = (data: IResponse) => void;
type ChallengeCallbackFunction = (data: IChallenge) => void;

export class SocketConnectionCollection {
    public connectionsCount = 0;
    private _connectionRelation: {
        [address: string]: string;
    };
    private _reverseConnectionRelation: {
        [socketId: string]: string;
    };
    private _connections: {
        [key: string]: SocketConnection;
    };

    constructor() {
        this._connections = {};
        this._connectionRelation = {};
        this._reverseConnectionRelation = {};
    }

    public addConnection(connection: Socket) {
        console.log("User connected");
        const socketConnection = new SocketConnection(connection);

        connection.on("disconnect", this.removeConnection(connection));
        connection.on("send-address", this._handleConnection(connection));
        connection.on("resolve", this._handleResponse(connection));
        connection.on("challenge", this._handleChallenge(connection));

        this._connections[socketConnection.id] = socketConnection;
        ++this.connectionsCount;
    }

    public sendMessage = (address: string, channel: string, message: any) => {
        console.log("REquest send challenge to", address);

        if (this._connectionRelation[address]) {
            const socketId = this._connectionRelation[address];
            console.log(socketId);
            try {
                this._connections[socketId].emit(channel, message);
            } catch (error) {
                console.log("Error use not registered");
                console.log(error);
            }
        }
    };

    private removeConnection = (connection: Socket): DisconnectCallbackFunction => {
        return () => {
            console.log("----------Desconxion");
            const userAddress = this._reverseConnectionRelation[connection.id];

            delete this._connections[connection.id];
            delete this._connectionRelation[userAddress];
            delete this._reverseConnectionRelation[connection.id];

            --this.connectionsCount;
        };
    };

    private _handleResponse = (connection: Socket): ResponseCallbackFunction => {
        return (data: IResponse) => {
            const resolverAddress = this._reverseConnectionRelation[connection.id];
            console.log(`Envias las respuesta a ${data.address} del challenge desde ${resolverAddress}`);

            this.sendMessage(data.address, "response", { challenge: data.response, address: resolverAddress });
        };
    };

    private _handleChallenge = (connection: Socket): ChallengeCallbackFunction => {
        return (data: IChallenge) => {
            const requesterAddress = this._reverseConnectionRelation[connection.id];
            console.log(`Envias el challenge a ${data.address} al destino ${requesterAddress}`);
            console.log(data.challenge);

            if (this._connectionRelation[data.address]) {
                return this.sendMessage(data.address, "challenge", { challenge: data.challenge, address: requesterAddress });
            } else {
                console.log("Erroor paraa :", requesterAddress);
                return this.sendMessage(requesterAddress, "error-message", {
                    error: `The user with address ${data.address} is not connected`,
                });
            }
        };
    };

    private _handleConnection = (connection: Socket): MessageCallbackFunction => {
        return (message: any) => {
            this._connectionRelation[message.address] = connection.id;
            this._reverseConnectionRelation[connection.id] = message.address;

            console.log(this._connectionRelation);
        };
    };
}
