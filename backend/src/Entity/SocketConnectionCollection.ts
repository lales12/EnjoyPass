import { SocketConnection } from "./SocketConnection";
import { Socket } from "socket.io";
interface IResponse {
    address: string;
    response: string;
}

type DisconnectCallbackFunction = () => void;
type MessageCallbackFunction = (address: any) => void;
type ResponseCallbackFunction = (data: IResponse) => void;

export class SocketConnectionCollection {
    public connectionsCount = 0;
    private _connectionRelation: {
        [address: string]: string;
    };
    private _connections: {
        [key: string]: SocketConnection;
    };

    constructor() {
        this._connections = {};
        this._connectionRelation = {};
    }

    public addConnection(connection: Socket) {
        const socketConnection = new SocketConnection(connection);

        connection.on("disconnect", this.removeConnection(connection));
        connection.on("send-address", this._handleConnection(connection));
        connection.on("resolve", this._handleResponse(connection));

        this._connections[socketConnection.id] = socketConnection;
        ++this.connectionsCount;
    }

    public sendMessage = (address: string, channel: string, message: any) => {
        console.log("REquest send challenge to", address);

        if (this._connectionRelation[address]) {
            const socketId = this._connectionRelation[address];
            this._connections[socketId].emit(channel, message);
            return;
        }

        throw Error("User not registered");
    };

    private removeConnection = (connection: Socket): DisconnectCallbackFunction => {
        return () => {
            console.log("----------Desconxion");

            delete this._connections[connection.id];

            --this.connectionsCount;
        };
    };

    private _handleResponse = (connection: Socket): ResponseCallbackFunction => {
        return (data: IResponse) => {
            console.log("Te responde con: ", data);
        };
    };
    private _handleConnection = (connection: Socket): MessageCallbackFunction => {
        return (message: any) => {
            this._connectionRelation[message.address] = connection.id;

            console.log(this._connectionRelation);
        };
    };
}
