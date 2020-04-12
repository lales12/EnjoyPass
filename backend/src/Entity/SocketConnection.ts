import { Socket } from "socket.io";

export class SocketConnection {
    public id: string;
    private _connection: Socket;

    constructor(connection: Socket) {
        this.id = connection.id;
        this._connection = connection;
    }

    public emit(channel: string, data: any) {
        this._connection.emit(channel, data);
    }
}
