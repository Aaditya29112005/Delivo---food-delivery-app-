import { io, Socket } from "socket.io-client";

class SocketService {
    private socket: Socket | null = null;
    // Use your local network IP for physical devices, localhost for simulators
    // Current IP: 192.168.128.173
    private readonly SERVER_URL = "http://192.168.128.173:3000";

    connect() {
        this.socket = io(this.SERVER_URL);

        this.socket.on("connect", () => {
            console.log("Connected to socket server:", this.socket?.id);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });
    }

    joinRoom(orderId: string) {
        this.socket?.emit("join_room", orderId);
    }

    emitLocation(orderId: string, location: any, role: 'customer' | 'driver') {
        this.socket?.emit("update_location", { orderId, location, role });
    }

    subscribeToLocation(callback: (data: any) => void) {
        this.socket?.on("location_updated", callback);
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }
}

export default new SocketService();
